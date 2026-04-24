---
title: Models for explainability and uncertainty
sidebar_position: 6
---

This category encompasses methods that explicitly represent uncertainty, enhance interpretability, or both. In many scientific and decision-oriented applications, these properties are closely linked: uncertainty quantification informs how strongly a model should rely on data or prior assumptions, while explainability clarifies the reasoning behind model outputs. Together, they improve trust, transparency, and usability, particularly in high-stakes contexts where decisions must be justified and communicated clearly.

Uncertainty-aware approaches include probabilistic models and methods that incorporate uncertainty directly into inference. Variational data assimilation, for example, formulates estimation as an optimisation problem that balances prior knowledge with observational data under uncertainty. This framework has been widely adopted in large-scale systems such as numerical weather prediction. In machine learning, evidential deep learning provides a practical alternative to computationally expensive Bayesian methods by directly learning predictive uncertainty distributions.

Explainability, meanwhile, can be achieved either through design or after model training. The former approach emphasises models whose internal structure is inherently interpretable. Tree-based methods such as Random Forest and XGBoost are representative examples, as their predictions can be traced through feature splits and decision paths. Similarly, causal discovery methods aim to uncover underlying relationships between variables, providing insights into system dynamics rather than purely predictive associations.

Across these approaches, the unifying principle is that reliable decision-making requires not only accurate predictions but also an understanding of their limitations and underlying drivers. As such, explainability and uncertainty are not auxiliary features, but central components of robust machine learning systems.
