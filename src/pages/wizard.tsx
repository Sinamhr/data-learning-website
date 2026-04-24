import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

type Schema = Record<string, string[]>;

type Paper = {
  id: string;
  title: string;
  year?: string | number | null;

  doi?: string | null;
  url?: string | null;
  authors_raw?: string | null;
  author_surnames?: string[] | null;
  citation_short?: string | null;

  data_modality_mask: number;
  task_mask: number;
  data_volume_mask: number;
  constraints_mask: number;
  quality_labels_mask: number;
  dynamics_mask: number;
  compute_budget_mask?: number;
  model_family_mask: number;

  model_family?: string[];
  is_multimodal?: boolean;
};

type Answers = {
  data_modality_mask: number;
  task_mask: number;
  data_volume_mask: number;
  constraints_mask: number;
  quality_labels_mask: number;
  dynamics_mask: number;
};

const DEFAULT_ANSWERS: Answers = {
  data_modality_mask: 0,
  task_mask: 0,
  data_volume_mask: 0,
  constraints_mask: 0,
  quality_labels_mask: 0,
  dynamics_mask: 0,
};

function bit(i: number): number {
  return 1 << i;
}

function popcount(x: number): number {
  let c = 0;
  while (x) {
    x &= x - 1;
    c++;
  }
  return c;
}

function isMultimodalMask(modalityMask: number): boolean {
  return popcount(modalityMask) >= 2;
}

function niceLabel(token: string): string {
  const map: Record<string, string> = {
    tabular: "Tabular",
    image_2d: "Image (2D)",
    image_3d: "Image (3D / volumetric)",
    text: "Text",
    graph: "Graph",

    classification: "Classification",
    regression: "Regression",
    segmentation: "Segmentation",
    object_instance_detection: "Object / instance detection",
    forecasting: "Forecasting",
    generation: "Generation",
    control_decision_making: "Control / decision-making",

    small: "Small",
    medium: "Medium",
    big: "Big",

    confidentiality: "Confidentiality",
    uncertainty_required: "Uncertainty required",
    interpretability: "Interpretability",
    speed: "Speed / latency",
    prior_knowledge_domain_laws: "Prior knowledge (domain laws)",
    ood: "OOD / distribution shift",

    missing_data: "Missing data",
    sparse_data: "Sparse data",
    noisy_data: "Noisy data",
    noisy_labels: "Noisy labels",
    noisy_or_limited_labels: "Noisy or limited labels",
    uncertainty: "Uncertainty",
    distributed_federated: "Distributed / federated",
    class_imbalance: "Class imbalance",

    stationary: "Stationary",
    non_stationary: "Non-stationary",

    foundation_self_supervised_transfer: "Foundation models, self-supervised learning and transfer learning",
    physics_informed_hybrid: "Physics-informed and hybrid models",
    sequence_dynamics: "Sequence and dynamics-based models",
    graph_geometric_unstructured_meshes: "Graph-based methods, geometric models and unstructured meshes",
    explainability_uncertainty: "Models for explainability and uncertainty",
    generative_synthetic_augmentation: "Generative models and synthetic augmentation",
    reinforcement_learning_agent_based: "Reinforcement learning",
  };

  return map[token] ?? token.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function maskToText(options: string[] | undefined, mask: number): string {
  if (!options || !mask) return "";
  const out: string[] = [];
  for (let i = 0; i < options.length; i++) {
    if (mask & bit(i)) out.push(niceLabel(options[i]));
  }
  return out.join(", ");
}

const QUALITY_NOISY_LABELS_BIT = bit(3);
const QUALITY_NOISY_OR_LIMITED_BIT = bit(4);
const QUALITY_ALIAS_BITS = QUALITY_NOISY_LABELS_BIT | QUALITY_NOISY_OR_LIMITED_BIT;

function qualityMaskSatisfiesStrict(paperMask: number, answerMask: number): boolean {
  const otherAnswer = answerMask & ~QUALITY_ALIAS_BITS;
  if (otherAnswer && (paperMask & otherAnswer) !== otherAnswer) return false;

  const aliasSelected = (answerMask & QUALITY_ALIAS_BITS) !== 0;
  if (!aliasSelected) return true;

  return (paperMask & QUALITY_ALIAS_BITS) !== 0;
}

function qualityMaskSatisfiesLoose(paperMask: number, answerMask: number): boolean {
  if (!answerMask) return true;

  const otherAnswer = answerMask & ~QUALITY_ALIAS_BITS;
  if ((paperMask & otherAnswer) !== 0) return true;

  const aliasSelected = (answerMask & QUALITY_ALIAS_BITS) !== 0;
  if (aliasSelected && (paperMask & QUALITY_ALIAS_BITS) !== 0) return true;

  return false;
}

function displayQuestionOptions(schemaKey: string, options: string[]): string[] {
  if (schemaKey === "quality_labels") {
    return options.filter((opt) => opt !== "noisy_labels");
  }
  return options;
}

function answerMaskForDisplay(schemaKey: string, mask: number): number {
  if (schemaKey === "quality_labels" && (mask & QUALITY_ALIAS_BITS)) {
    return (mask & ~QUALITY_ALIAS_BITS) | QUALITY_NOISY_OR_LIMITED_BIT;
  }
  return mask;
}

function normalizeDoi(doi: string): string {
  return doi.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, "");
}

function doiUrl(doi: string): string {
  return `https://doi.org/${normalizeDoi(doi)}`;
}

function paperExternalLink(p: Paper): string | null {
  if (p.url && p.url.trim()) return p.url.trim();
  if (p.doi && p.doi.trim()) return doiUrl(p.doi);
  return null;
}

function paperMetaLabel(p: Paper): string {
  if (p.citation_short && p.citation_short.trim()) return p.citation_short.trim();
  if (p.doi && p.doi.trim()) return normalizeDoi(p.doi);
  if (p.url && p.url.trim()) return p.url.trim();
  return p.id;
}

function matchesStrict(p: Paper, a: Answers): boolean {
  if (a.data_modality_mask && (p.data_modality_mask & a.data_modality_mask) !== a.data_modality_mask) return false;
  if (a.task_mask && (p.task_mask & a.task_mask) !== a.task_mask) return false;
  if (a.data_volume_mask && (p.data_volume_mask & a.data_volume_mask) !== a.data_volume_mask) return false;
  if (a.constraints_mask && (p.constraints_mask & a.constraints_mask) !== a.constraints_mask) return false;
  if (a.quality_labels_mask && !qualityMaskSatisfiesStrict(p.quality_labels_mask, a.quality_labels_mask)) return false;
  if (a.dynamics_mask && (p.dynamics_mask & a.dynamics_mask) !== a.dynamics_mask) return false;
  return true;
}

function matchesLoose(p: Paper, a: Answers): boolean {
  if (a.data_modality_mask && (p.data_modality_mask & a.data_modality_mask) === 0) return false;
  if (a.task_mask && (p.task_mask & a.task_mask) === 0) return false;
  if (a.data_volume_mask && (p.data_volume_mask & a.data_volume_mask) === 0) return false;
  if (a.constraints_mask && (p.constraints_mask & a.constraints_mask) === 0) return false;
  if (a.quality_labels_mask && !qualityMaskSatisfiesLoose(p.quality_labels_mask, a.quality_labels_mask)) return false;
  if (a.dynamics_mask && (p.dynamics_mask & a.dynamics_mask) === 0) return false;
  return true;
}

function scorePaper(p: Paper, a: Answers): number {
  let s = 0;

  const modOverlap = p.data_modality_mask & a.data_modality_mask;
  const taskOverlap = p.task_mask & a.task_mask;
  const cOverlap = p.constraints_mask & a.constraints_mask;
  const qOverlapDirect = p.quality_labels_mask & (a.quality_labels_mask & ~QUALITY_ALIAS_BITS);
  const qOverlapAlias =
    (a.quality_labels_mask & QUALITY_ALIAS_BITS) && (p.quality_labels_mask & QUALITY_ALIAS_BITS) ? 1 : 0;
  const qOverlap = qOverlapDirect;

  s += 6 * popcount(modOverlap);
  s += 6 * popcount(taskOverlap);

  if (a.data_volume_mask && (p.data_volume_mask & a.data_volume_mask)) s += 3;
  if (a.dynamics_mask && (p.dynamics_mask & a.dynamics_mask)) s += 2;

  s += 2 * popcount(cOverlap);
  s += 2 * (popcount(qOverlap) + qOverlapAlias);

  if (isMultimodalMask(a.data_modality_mask) && p.is_multimodal) s += 2;

  return s;
}

function rankTop(papers: Paper[], a: Answers, k: number): Array<{ p: Paper; s: number }> {
  return papers
    .map((p) => ({ p, s: scorePaper(p, a) }))
    .sort((x, y) => y.s - x.s)
    .slice(0, k);
}

export default function WizardPage() {
  const schemaUrl = useBaseUrl("/data/schema.json");
  const papersUrl = useBaseUrl("/data/papers_min.json");

  const aiSchemaUrl = useBaseUrl("/data/ai_schema.json");
  const aiPapersUrl = useBaseUrl("/data/ai_papers_min.json");

  const [schema, setSchema] = useState<Schema | null>(null);
  const [aiSchema, setAiSchema] = useState<Schema | null>(null);

  const [papers, setPapers] = useState<Paper[]>([]);
  const [aiPapers, setAiPapers] = useState<Paper[]>([]);

  const [answers, setAnswers] = useState<Answers>({ ...DEFAULT_ANSWERS });
  const [step, setStep] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [loadErr, setLoadErr] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const humanSchemaReq = fetch(schemaUrl);
        const humanPapersReq = fetch(papersUrl);

        const aiSchemaReq = fetch(aiSchemaUrl).catch(() => null as any);
        const aiPapersReq = fetch(aiPapersUrl).catch(() => null as any);

        const [sRes, pRes, asRes, apRes] = await Promise.all([
          humanSchemaReq,
          humanPapersReq,
          aiSchemaReq,
          aiPapersReq,
        ]);

        if (!sRes.ok) throw new Error(`schema.json HTTP ${sRes.status}`);
        if (!pRes.ok) throw new Error(`papers_min.json HTTP ${pRes.status}`);

        const s = (await sRes.json()) as Schema;
        const p = (await pRes.json()) as Paper[];

        setSchema(s);
        setPapers(p);

        if (asRes && asRes.ok) {
          const as = (await asRes.json()) as Schema;
          setAiSchema(as);
        } else {
          setAiSchema(null);
        }

        if (apRes && apRes.ok) {
          const ap = (await apRes.json()) as Paper[];
          setAiPapers(ap);
        } else {
          setAiPapers([]);
        }

        setLoadErr(null);
      } catch (e: any) {
        setLoadErr(e?.message ?? String(e));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [schemaUrl, papersUrl, aiSchemaUrl, aiPapersUrl]);

  const uiSchema: Schema | null = schema ?? aiSchema;

  const steps = useMemo(() => {
    return [
      {
        schemaKey: "data_modality",
        answerKey: "data_modality_mask" as const,
        label: "Modality (choose all that apply)",
        question: "What is your data type?",
        learnMore: "/docs/concepts/modality",
        kind: "multi" as const,
      },
      {
        schemaKey: "task",
        answerKey: "task_mask" as const,
        label: "Task type (choose all that apply)",
        question: "What do you want to do with your data?",
        learnMore: "/docs/concepts/task",
        kind: "multi" as const,
      },
      {
        schemaKey: "data_volume",
        answerKey: "data_volume_mask" as const,
        label: "Data volume",
        question: "How many samples do you have?",
        learnMore: "/docs/concepts/data-volume",
        kind: "single" as const,
      },
      {
        schemaKey: "constraints",
        answerKey: "constraints_mask" as const,
        label: "Constraints (choose all that apply)",
        question: "Do you have prediction/usage constraints?",
        learnMore: "/docs/concepts/constraints",
        kind: "multi" as const,
      },
      {
        schemaKey: "quality_labels",
        answerKey: "quality_labels_mask" as const,
        label: "Quality / labels (choose all that apply)",
        question: "What are the limitations of your data?",
        learnMore: "/docs/concepts/quality-labels",
        kind: "multi" as const,
      },
      {
        schemaKey: "dynamics",
        answerKey: "dynamics_mask" as const,
        label: "Dynamics (optional)",
        question: "Does your data change over time?",
        learnMore: "/docs/concepts/dynamics",
        kind: "single_optional" as const,
      },
    ];
  }, []);

  const isResults = step >= steps.length;

  function toggleMulti(field: keyof Answers, idx: number) {
    const m = bit(idx);
    setAnswers((prev) => {
      const next = { ...prev };
      next[field] = (prev[field] & m) ? (prev[field] & ~m) : (prev[field] | m);
      return next;
    });
  }

  function setSingle(field: keyof Answers, idx: number) {
    setAnswers((prev) => ({ ...prev, [field]: bit(idx) }));
  }

  function clearField(field: keyof Answers) {
    setAnswers((prev) => ({ ...prev, [field]: 0 }));
  }

  function resetAll() {
    setAnswers({ ...DEFAULT_ANSWERS });
    setStep(0);
  }

  const canBroadenSearch =
    answers.constraints_mask !== 0 ||
    answers.quality_labels_mask !== 0 ||
    answers.dynamics_mask !== 0;

  function broadenResultsUsingCoreFields() {
    setAnswers((prev) => ({
      ...prev,
      constraints_mask: 0,
      quality_labels_mask: 0,
      dynamics_mask: 0,
    }));
    setStep(steps.length);
  }

  const humanStrict = useMemo(() => papers.filter((p) => matchesStrict(p, answers)), [papers, answers]);
  const humanLooseAll = useMemo(() => papers.filter((p) => matchesLoose(p, answers)), [papers, answers]);

  const aiStrict = useMemo(() => aiPapers.filter((p) => matchesStrict(p, answers)), [aiPapers, answers]);
  const aiLooseAll = useMemo(() => aiPapers.filter((p) => matchesLoose(p, answers)), [aiPapers, answers]);

  const humanStrictIds = useMemo(() => new Set(humanStrict.map((p) => p.id)), [humanStrict]);
  const aiStrictIds = useMemo(() => new Set(aiStrict.map((p) => p.id)), [aiStrict]);

  const humanLoose = useMemo(
    () => humanLooseAll.filter((p) => !humanStrictIds.has(p.id)),
    [humanLooseAll, humanStrictIds]
  );

  const aiLoose = useMemo(
    () => aiLooseAll.filter((p) => !aiStrictIds.has(p.id)),
    [aiLooseAll, aiStrictIds]
  );

  const counts = useMemo(() => {
    return {
      humanStrict: humanStrict.length,
      humanLoose: humanLoose.length,
      aiStrict: aiStrict.length,
      aiLoose: aiLoose.length,
    };
  }, [humanStrict, humanLoose, aiStrict, aiLoose]);

  const humanStrictTop = useMemo(() => rankTop(humanStrict, answers, 12), [humanStrict, answers]);
  const humanLooseTop = useMemo(() => rankTop(humanLoose, answers, 12), [humanLoose, answers]);

  const aiStrictTop = useMemo(() => rankTop(aiStrict, answers, 12), [aiStrict, answers]);
  const aiLooseTop = useMemo(() => rankTop(aiLoose, answers, 12), [aiLoose, answers]);

  const recommendedFamilies = useMemo(() => {
    if (!uiSchema) return [];
    const famList = uiSchema["model_family"] ?? [];
    const counts = new Map<string, number>();

    const source = humanStrictTop.length ? humanStrictTop : humanLooseTop;
    for (const { p } of source) {
      for (let i = 0; i < famList.length; i++) {
        if (p.model_family_mask & bit(i)) {
          counts.set(famList[i], (counts.get(famList[i]) ?? 0) + 1);
        }
      }
    }

    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [uiSchema, humanStrictTop, humanLooseTop]);

  return (
    <Layout title="Start" description="Guided method selection wizard">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--7">
            {!isResults ? (
              <>
                <h1>Start</h1>
                <p>
                  Answer a few questions to get recommended method families and representative papers from our tagged library.
                </p>
              </>
            ) : (
              <>
                <h1>Results</h1>
                <p>
                  Here are the recommended method families and representative papers based on your selections.
                </p>
              </>
            )}
            {loading && <p>Loading dataset…</p>}
            {loadErr && (
              <div className="alert alert--danger" role="alert">
                <b>Could not load dataset.</b>
                <div style={{ marginTop: 8 }}>
                  {loadErr}
                  <div style={{ marginTop: 8 }}>
                    Check that <code>static/data/schema.json</code> and <code>static/data/papers_min.json</code> exist.
                    <br />
                    Optional AI dataset: <code>static/data/ai_schema.json</code> and <code>static/data/ai_papers_min.json</code>.
                  </div>
                </div>
              </div>
            )}

            {!loading && !loadErr && uiSchema && (
              <>
                {!isResults ? (
                  <section className="card dl-wizard-card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <div>
                        <h2 style={{ marginBottom: 4 }}>
                          <b>{step + 1}) {steps[step].question}</b>
                        </h2>
                        <div style={{ opacity: 0.9 }}>{steps[step].label}</div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <Link
                          to={steps[step].learnMore}
                          target="_blank"
                          rel="noreferrer"
                          className="button button--secondary button--sm"
                        >
                          Learn more
                        </Link>
                      </div>
                    </div>

                    <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {(() => {
                        const options = displayQuestionOptions(steps[step].schemaKey, uiSchema[steps[step].schemaKey] ?? []);
                        const field = steps[step].answerKey as keyof Answers;

                        return options.map((opt, idx) => {
                          const actualIdx = (uiSchema[steps[step].schemaKey] ?? []).indexOf(opt);
                          const mask = bit(actualIdx >= 0 ? actualIdx : idx);
                          const isMergedQualityOption =
                            steps[step].schemaKey === "quality_labels" && opt === "noisy_or_limited_labels";

                          const selected =
                            steps[step].kind === "multi"
                              ? isMergedQualityOption
                                ? (answers[field] & QUALITY_ALIAS_BITS) !== 0
                                : (answers[field] & mask) !== 0
                              : answers[field] === mask;

                          return (
                            <button
                              key={opt}
                              className={`button button--sm ${selected ? "button--primary" : "button--outline button--secondary"}`}
                              onClick={() => {
                                if (steps[step].kind === "multi") {
                                  if (isMergedQualityOption) {
                                    setAnswers((prev) => {
                                      const next = { ...prev };
                                      const current = prev[field] as number;
                                      next[field] =
                                        (current & QUALITY_ALIAS_BITS) !== 0
                                          ? (current & ~QUALITY_ALIAS_BITS)
                                          : (current | QUALITY_NOISY_OR_LIMITED_BIT);
                                      return next;
                                    });
                                  } else {
                                    const effectiveIdx = actualIdx >= 0 ? actualIdx : idx;
                                    toggleMulti(field, effectiveIdx);
                                  }
                                } else {
                                  const effectiveIdx = actualIdx >= 0 ? actualIdx : idx;
                                  setSingle(field, effectiveIdx);
                                }
                              }}
                              type="button"
                            >
                              {niceLabel(opt)}
                            </button>
                          );
                        });
                      })()}
                    </div>

                    {steps[step].kind === "single_optional" && (
                      <div style={{ marginTop: 10 }}>
                        <button
                          className="button button--link"
                          type="button"
                          onClick={() => clearField(steps[step].answerKey as keyof Answers)}
                        >
                          I’m not sure / skip this
                        </button>
                      </div>
                    )}

                    <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ opacity: 0.9, lineHeight: 1.4 }}>
                        <div><b>Matches so far</b></div>
                        <div>Human: strict <b>{counts.humanStrict}</b>, loose <b>{counts.humanLoose}</b></div>
                        <div>AI: strict <b>{counts.aiStrict}</b>, loose <b>{counts.aiLoose}</b></div>
                      </div>

                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          className="button button--secondary"
                          type="button"
                          onClick={() => setStep((s) => Math.max(0, s - 1))}
                          disabled={step === 0}
                        >
                          Back
                        </button>
                        <button
                          className="button button--primary"
                          type="button"
                          onClick={() => setStep((s) => s + 1)}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </section>
                ) : (
                  <section className="card dl-wizard-card" style={{ padding: 16 }}>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                      <button className="button button--secondary" type="button" onClick={() => setStep(steps.length - 1)}>
                        Back to questions
                      </button>
                      <button className="button button--outline button--secondary" type="button" onClick={resetAll}>
                        Reset
                      </button>
                    </div>
                    
                    <div className="card dl-wizard-card" style={{ padding: 16, marginBottom: 16 }}>
                      <h3 style={{ marginTop: 0, marginBottom: 10 }}>
                        Recommended model families (from human-labelled papers)
                      </h3>

                      {recommendedFamilies.length === 0 ? (
                        <p>No strong model-family signal yet (try selecting more options).</p>
                      ) : (
                        <ul style={{ marginBottom: 12 }}>
                          {recommendedFamilies.map(([fam, n]) => (
                            <li key={fam}>
                              {niceLabel(fam)} — appears in <b>{n}</b> of the top matches
                            </li>
                          ))}
                        </ul>
                      )}

                      <Link
                        className="button button--sm button--secondary"
                        to="/docs/methods/overview"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Learn more
                      </Link>
                    </div>

                    <h3 style={{ marginTop: 14 }}>Human-labelled papers</h3>
                    <ResultsBlock title="Strict matches" subtitle="All selected options matched within each question." items={humanStrictTop} />
                    <ResultsBlock title="Loose matches" subtitle="At least one selected option matched within each question, excluding papers already shown in Strict matches." items={humanLooseTop} />

                    <h3 style={{ marginTop: 18 }}>AI-annotated papers</h3>
                    <p style={{ marginTop: 6, opacity: 0.85 }}>
                      These entries are tagged with the assistance of an AI system and may contain be less accurate. Use as additional pointers rather than definitive recommendations.
                    </p>
                    <ResultsBlock title="Strict matches (AI)" subtitle="All selected options matched within each question." items={aiStrictTop} />
                    <ResultsBlock title="Loose matches (AI)" subtitle="At least one selected option matched within each question, excluding papers already shown in Strict matches." items={aiLooseTop} />

                    {canBroadenSearch && (
                      <div className="card dl-wizard-card" style={{ padding: 16, marginTop: 18 }}>
                        <h4 style={{ marginTop: 0, marginBottom: 8 }}>
                          Too few results. Broaden search using only modality, task, and data volume?
                        </h4>
                        <button
                          className="button button--sm button--secondary"
                          type="button"
                          onClick={broadenResultsUsingCoreFields}
                        >
                          Broaden the search
                        </button>
                      </div>
                    )}
                  </section>
                )}

                {!isResults && (
                  <div style={{ marginTop: 12, opacity: 0.85 }}>
                    <button className="button button--link" type="button" onClick={() => setStep(steps.length)}>
                      Jump to results
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="col col--5">
            <div className="card dl-wizard-card" style={{ padding: 16 }}>
              <h2>Answer summary</h2>
              <p style={{ opacity: 0.9 }}>Quick summary of your current selections.</p>

              {!uiSchema ? (
                <p>—</p>
              ) : (
                <ul style={{ marginBottom: 0 }}>
                  <li><b>Modality:</b> {maskToText(uiSchema.data_modality, answers.data_modality_mask) || "—"}</li>
                  <li><b>Task:</b> {maskToText(uiSchema.task, answers.task_mask) || "—"}</li>
                  <li><b>Data volume:</b> {maskToText(uiSchema.data_volume, answers.data_volume_mask) || "—"}</li>
                  <li><b>Constraints:</b> {maskToText(uiSchema.constraints, answers.constraints_mask) || "None selected"}</li>
                  <li><b>Quality/labels:</b> {maskToText(uiSchema.quality_labels, answerMaskForDisplay("quality_labels", answers.quality_labels_mask)) || "None selected"}</li>
                  <li><b>Dynamics:</b> {maskToText(uiSchema.dynamics, answers.dynamics_mask) || "Skipped"}</li>
                </ul>
              )}

              <div style={{ marginTop: 14 }}>
                <button className="button button--outline button--secondary button--sm" type="button" onClick={resetAll}>
                  Reset all
                </button>
              </div>
            </div>

            <div className="card dl-wizard-card margin-top--md" style={{ padding: 16 }}>
              <h2>Tip</h2>
              <p style={{ marginBottom: 0 }}>
                If you get zero strict matches, try relaxing constraints/quality first, or use the “Loose matches” section.
              </p>
            </div>
            
            {isResults && (
              <div className="card dl-wizard-card margin-top--md" style={{ padding: 16 }}>
                <h2>How to read these recommendations</h2>
                <ul style={{ marginBottom: 12, paddingLeft: "1.2rem" }}>
                  <li>
                    <b>Strict</b>: papers that match all of your selected options within each question.
                  </li>
                  <li>
                    <b>Loose</b>: papers that match at least one of your selected options within each question.
                  </li>
                  <li>
                    <b>Human-labelled</b>: papers tagged manually by the project team.
                  </li>
                  <li>
                    <b>AI-annotated</b>: papers from the extended dataset tagged with assistance from an AI system.
                  </li>
                  {canBroadenSearch && (
                    <li>
                      <b>Broaden the search</b>: Keep core filters (modality, task, data volume) and clear the rest to widen results
                    </li>
                  )}
                </ul>

                <Link
                  className="button button--sm button--secondary"
                  to="/docs/concepts/recommendation-types"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more
                </Link>
              </div>
            )}

          </div>
        </div>
      </main>
    </Layout>
  );
}

function ResultsBlock({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: Array<{ p: Paper; s: number }>;
}) {
  return (
    <div style={{ marginTop: 10 }}>
      <h4 style={{ marginBottom: 6 }}>{title}</h4>
      <div style={{ marginBottom: 8, opacity: 0.85 }}>{subtitle}</div>

      {items.length === 0 ? (
        <p style={{ marginTop: 6 }}>No matches found.</p>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {items.map(({ p, s }) => {
            const link = paperExternalLink(p);
            const meta = paperMetaLabel(p);

            return (
              <div key={p.id} className="card dl-wizard-result-card" style={{ padding: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <b>
                      {p.title}
                      {p.year ? ` (${p.year})` : ""}
                    </b>
                    <div style={{ opacity: 0.7, fontSize: 12, wordBreak: "break-all" }}>{meta}</div>
                  </div>
                </div>

                {p.model_family?.length ? (
                  <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.model_family.slice(0, 6).map((mf) => (
                      <span key={mf} className="badge badge--secondary">
                        {niceLabel(mf)}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {link ? (
                    <Link
                      className="button button--sm button--primary"
                      to={link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Link to the paper
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}