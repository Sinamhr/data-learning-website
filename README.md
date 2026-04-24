# Data Learning Website

This repository contains the source code for the **Data Learning** companion website. 

**Website:** http://rossellaarcucci.com/data-learning/

The website is designed to support a review-style paper [Link to the paper: coming soon] by providing:

- a **guided wizard** for method recommendation,
- structured pages on **model families**,
- explanations of **data challenges**,
- short **concept pages** for the questionnaire terms,
- and a lightweight framework for linking user needs to representative papers.

The overall aim is to help users navigate methodological choices based on:
- data modality,
- task type,
- data volume,
- constraints,
- data quality / labels,
- and dynamics.

## What the wizard does

The wizard is based on a tagged paper collection.

- Papers are tagged by the **data science and AI4good** research group members according to the core dimensions used in the questionnaire, including **modality**, **task**, **data volume**, **constraints**, **quality / labels**, **dynamics**, and **model family**.
- In addition to the human-labelled paper set, an **AI-assisted extension** of the dataset is used to increase coverage.
- These tags are converted into a **binary representation** so that user responses can be matched efficiently against the paper collection.
- Based on the selected answers, the wizard returns recommended **model families** and representative papers.
- If the user also answered the more restrictive questions (such as **constraints**, **quality / labels**, or **dynamics**) and the result set becomes too narrow, the wizard can offer a **broaden search** option. This keeps the core answers (**modality**, **task**, and **data volume**) and clears the more restrictive filters to widen the suggestions.

## Project scope

This repository contains the **website code and content structure** only.

It does **not** include:
- the full tagging datasets,
- generated JSON data files that are maintained separately,
- or other shared project assets that are not owned by a single contributor.

These data resources are intentionally excluded from version control.

## Main features

- **Interactive wizard** for recommending methods and representative papers
- Separate result groups for:
  - human-labelled papers
  - AI-assisted / AI-annotated papers
- Website sections for:
  - Methods
  - Data challenges
  - Concepts
  - About / Overview
- Dark-themed frontend built with **Docusaurus**
- Static-site design for simple hosting and low maintenance

## Tech stack

- [Docusaurus](https://docusaurus.io/) for the website framework
- React / TypeScript for interactive components
- Markdown for most content pages
- JSON-based datasets for the wizard logic