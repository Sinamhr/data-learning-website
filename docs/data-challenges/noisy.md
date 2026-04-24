---
title: Noisy data
sidebar_position: 5
---

Noisy data arise when observations contain errors, distortions, mislabelling, or irrelevant variation. In many real-world contexts, noise is extensive, resulting from imperfect sensors, human annotation errors, or environmental variability. The central challenge is maintaining a sufficient signal-to-noise ratio to support reliable learning.

Naïve models trained on noisy data may overfit spurious patterns, produce unstable predictions, or exhibit overconfidence. Common failure modes include sensitivity to outliers, poor generalisation, and the amplification of artefacts.

Robust approaches typically incorporate uncertainty modelling, allowing the system to reliably express confidence in its predictions. Physics-informed methods can constrain solutions to physically plausible regimes, reducing the influence of noise. Sequence and dynamics-based models can exploit temporal structure to smooth or filter noisy observations. Additionally, pretrained representations from foundation models may improve robustness by capturing generalisable features.

Importantly, noise handling should not be treated solely as a preprocessing step; in many cases, it must be integrated into the modelling framework itself.