---
title: Unstructured data
sidebar_position: 4
---

Unstructured data encompass inputs that do not naturally conform to tabular formats, including text, images, audio, video, geospatial data, and multimodal combinations. In many real-world applications, such data are also heterogeneous, combining multiple modalities with different scales, semantics, and noise characteristics.

The primary challenge is representational: before meaningful predictions can be made, the system must determine how to encode the data, identify relevant features, and integrate information across modalities. Poor representation can lead to loss of context, ineffective fusion of information, and models that capture superficial patterns rather than underlying meaning.

Foundation and self-supervised learning approaches are particularly effective in this setting, as they enable representation learning directly from raw data. Graph and geometric methods are well suited to relational or non-Euclidean structures, while sequence models are essential for data with inherent order, such as text or time-dependent signals. In practice, successful approaches often combine multiple techniques, integrating modality-specific inductive biases with robust representation learning.