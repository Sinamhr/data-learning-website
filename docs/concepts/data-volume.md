---
title: Data volume
sidebar_position: 4
---

**Data volume** asks how much data you have available for the problem you want to solve.

This is not an exact number. What counts as *small*, *medium*, or *big* depends on many factors especially the **data modality**.

You should choose the option that best matches your practical situation.

## Options in this tool

### Small
You have relatively limited data for the task you want to solve.  
This often means:
- only a small number of labelled samples,
- expensive or difficult data collection,
- limited coverage of rare cases or edge cases.

**Examples:** expert-labelled medical images, field campaigns, rare-event data, small legal datasets.

### Medium
You have enough data to train useful models, but not so much that scale alone solves the problem.  
This is often the most common practical setting.

**Examples:** a moderate annotated image dataset, a few years of operational time series, a reasonably sized tabular dataset from one institution or project.

### Big
You have a large amount of data relative to the problem and modality.  
This may include:
- many labelled samples,
- high-dimensional data where each sample is large or complex,
- broad coverage of conditions,
- enough scale to support larger models or extensive training.

**Examples:** large text corpora, web-scale image datasets, long-running sensor archives, large operational business datasets, high-resolution simulations or 3D data with few but very large samples.


## Why it depends on modality

The same number of samples can mean very different things depending on the data type.

For example:
- **10,000 images** may be modest for computer vision,
- **10,000 3D volumes** may already be substantial,
- **10,000 text documents** may still be small for language modelling,
- **10,000 tabular rows** may be enough for some structured-data tasks but not for others.
