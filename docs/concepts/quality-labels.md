---
title: Data quality and labels
sidebar_position: 6
---

This question captures common issues in real datasets.  
You can select multiple items.

If you pick “Limited labels”, it often makes sense to also consider “transfer / self-supervised” methods.

## Options in this tool

### Missing data
Some features/measurements are absent (or entire samples are missing parts).  
**Common fixes:** imputation, models that handle missingness, careful data checks.

### Sparse data
Most entries are zero/empty/non-existent (common in high-dimensional tabular, NLP counts, recommender systems).  
**Common fixes:** sparse models, embeddings, regularisation, feature selection.

### Noisy data
Inputs are noisy (blur, artefacts, background clutter), measurements have systematic errors, sensor drift, or varying quality.
**Common fixes:** augmentation, denoising, robust training, preprocessing.

### Noisy or Limited labels
Labels are imperfect, inconsistent, or you have few labelled samples (even if unlabelled data is large).
**Common fixes:** label cleaning, noise-robust losses, weak supervision, learning with noisy labels, transfer learning, self-supervision, active learning, semi-supervised learning.

### Distributed / federated
Data is split across locations and cannot be centralised.  
**Common fixes:** federated learning, secure aggregation, careful evaluation per site.

### Class imbalance
Some classes are rare.  
**Common fixes:** reweighting, resampling, focal loss, better metrics, careful splits.

<!-- ### Unreliable measurements
**Common fixes:** quality flags, robust losses, uncertainty-aware modelling, filtering. 

### Need uncertainty estimates >>> should  be changed to Noise
You want confidence measures, not only point predictions.  
**Common fixes:** calibration, ensembles, conformal prediction, Bayesian methods.

-->
