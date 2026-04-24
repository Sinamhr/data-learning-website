---
title: Data modality
sidebar_position: 2
---

A **data modality** is simply the *main type of data* you are working with.  
You can select **more than one** modality. If you pick two or more, your problem is **multimodal**.

If your data is *mostly one type* but has important side information (e.g., images + metadata), select **all that apply**.

## Options in this tool

### Tabular
Rows and columns (spreadsheets, databases).  
**Examples:** patient records, climate indices, survey results, business KPIs.  
**File type/extension:** .csv, .xlsx, .tsv, .json, .parquet, .nc, .hdf, and similar 
<!-- **Typical models:** linear models, tree-based models, MLPs. -->

### Image (2D)
Images, photos.  
**Examples:** satellite scenes, microscopy, X‑ray, natural images, 2D slices of videos.  
**File type/extension:** jpg/.jpeg, .png, .webp, .tiff, .npy, .nc, .hdf, and similar 
<!-- **Typical models:** CNNs, Vision Transformers, segmentation/detection models. -->

### Image (3D/volumetric)
Volumes, videos, or 3D stacks (often heavier and smaller datasets).  
**Examples:** MRI/CT, 3D microscopy, 3D point/voxel grids.  
**File type/extension:** .obj, .fbx, .stl, .dae, .gltf, .glb, .3mf, .gif, .mov, .mp4, .ply, .nc, .hdf, and similar 
<!-- **Typical models:** 3D CNNs, ViTs on patches, hybrid physics/geometry models. -->

### Text
Natural language documents (or structured text).  
**Examples:** clinical notes, legal text, reports, logs.  
**File type/extension:** .txt, .doc, .docx, .md, .rtf, .log, .pages, .emd, .asc, .pdf, and similar 
<!-- **Typical models:** Transformers, retrieval + LLM pipelines, topic/embedding models. -->

### Graph
Nodes + edges (and features), possibly dynamic.  
**Examples:** social networks, knowledge graphs, molecules, meshes.  
**File type/extension:** .graphml, .gml, .json, .csv, and .graph, and similar 
<!-- **Typical models:** graph neural networks, message passing, geometric learning. -->


