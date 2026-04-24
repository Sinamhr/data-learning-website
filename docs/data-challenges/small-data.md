---
title: Small data
sidebar_position: 2
---

Small data does not simply refer to datasets of limited size; rather, it describes situations in which the available observations are insufficient to capture the true variability of the system of interest. This frequently arises when data collection is expensive, labels require expert annotation, experiments are difficult to conduct, or high-fidelity simulations are computationally prohibitive. The core challenge is therefore limited coverage: the model observes too narrow a subset of the phenomenon to reliably distinguish underlying structure from incidental patterns.

In such settings, naive training approaches tend to result in overfitting, weak generalisation, and unreliable estimates of performance. Effective strategies typically involve leveraging external sources of structure. Foundation and transfer learning approaches are particularly valuable, as they shift representation learning to broader datasets and use the limited target data primarily for adaptation. Generative models can augment training data by introducing plausible variability, provided that synthetic samples reflect meaningful structure rather than replicating existing biases. Physics-informed and hybrid methods are also advantageous when strong domain knowledge can constrain the solution space.

In higher-stakes applications, uncertainty-aware methods play a crucial role, ensuring that model confidence reflects data limitations rather than masking them. Overall, the central strategy in small-data settings is not to learn entirely from scratch, but to incorporate prior knowledge, pretrained representations, or carefully validated augmentation.
