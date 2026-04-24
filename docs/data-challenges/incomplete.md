---
title: Incomplete data
sidebar_position: 6
---

Incomplete data arise when observations are missing, irregularly sampled, delayed, or only partially observed. This includes missing values in tabular datasets, sparse sensor networks, gaps in spatiotemporal fields, and asynchronous measurements across data sources. The challenge is not merely the absence of data, but the potential structure and bias associated with missingness.

Simplistic imputation strategies may introduce bias or artificial certainty, leading to misleading conclusions. In many scientific applications, the goal is not simply to fill gaps, but to reconstruct plausible system states consistent with known dynamics and constraints.

Graph-based methods are effective in propagating information across relational structures, while physics-informed approaches ensure consistency with domain knowledge. Sequence models can exploit temporal continuity, and uncertainty-aware methods are essential for representing the confidence of reconstructed values. More broadly, approaches such as data assimilation integrate observations with model-based predictions to produce coherent estimates of system state.