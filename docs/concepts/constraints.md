---
title: Constraints
sidebar_position: 5
---

**Constraints** are real-world requirements that can change what “best” means.

If you select many constraints, strict matches may become small. The wizard will also show broader matches.

You can select any that apply.

## Options in this tool

### Confidentiality/privacy
Your data cannot be freely shared, moved, or stored (e.g., patient data, sensitive legal cases).  
**Typical approaches:** access controls, federated learning, privacy-preserving methods, careful logging.

### Uncertainty required
You need calibrated confidence or uncertainty estimates.  
**Typical approaches:** ensembles, Bayesian approximations, calibration, conformal prediction.

### Interpretability/explainability
You need transparent model logic that humans can inspect (for trust, safety, regulation).  
**Typical approaches:** simpler models, post-hoc explanations, interpretable features, audit trails.

### Speed/latency
You need fast predictions (edge deployment, real-time systems).  
**Typical approaches:** smaller models, distillation, quantisation, caching, simpler pipelines.

### Use prior knowledge
You have domain expertise (physics, constraints, invariances) that should guide learning.  
**Typical approaches:** physics-informed/hybrid models, constrained optimisation, structure-aware architectures.

### Out-of-distribution (OOD)/shift
You expect the test setting or target distribution to differ from the training data.  
**Typical approaches:** robust training, domain adaptation, uncertainty monitoring, stress tests.


