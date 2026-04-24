---
title: Task type
sidebar_position: 3
---

A **task type** describes *what you want the model to produce*.

You can select **multiple tasks** if you want one system to do more than one thing (multi-task learning).

If you are unsure, start by selecting the task that matches your *evaluation*:
- If you will evaluate with “accuracy” → classification
- If you will evaluate with “error” (MAE/RMSE) → regression/forecasting

## Options in this tool

### Classification
Predict discrete categories, labels, or classes.
**Examples:** disease present/absent, land-cover class, spam/ham.

### Regression
Predict continuous numerical values.  
**Examples:** temperature, risk score, concentration, price.

### Segmentation
Classify pixels within an image 
**Examples:** tumor segmentation, cloud masks, road extraction.

### Detection
Locate objects and/or predict bounding boxes.  
**Examples:** vehicle detection, lesion detection, wildfire hotspots.

### Forecasting
Predict future states from past.  
**Examples:** time series, demand forecasting, weather variables, system monitoring.

### Generation
Generate novel data.  
**Examples:** image synthesis, text generation, data augmentation.

### Control/decision-making
Choose actions to optimise an objective.  
**Examples:** control systems, adaptive sampling, scheduling, policy learning, robotics.


