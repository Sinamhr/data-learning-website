---
title: Recommendation types
sidebar_position: 8
---

The results page separates recommendations into different groups to help you interpret them more clearly.

## Strict recommendations
These are papers that match **all of your selected options within each answered question**.

For example, if you selected:
- modality: **text** and **image 2D**
- constraints: **interpretability** and **uncertainty required**

then a strict match is a paper that contains both selected modalities and both selected constraints.

Strict recommendations are usually the most precise matches.

## Loose recommendations
These are papers that match **at least one** of your selected options within each question.

Using the same example above, a loose match may contain:
- **text** or **image 2D**
- **interpretability** or **uncertainty required**

Loose recommendations are broader and are useful when the strict group is too small or empty.

## Human-labelled papers
These papers were tagged manually by the project team.

They are generally the most trusted source in the current system.

## AI-annotated papers
These papers come from the extended dataset and were tagged with the assistance of an AI system.

They are useful for expanding coverage, but they may contain less precise labels than the human-labelled set.

## Broaden search
If the current selections return too few results, you can use **Broaden the search**.  
This keeps the core choices (**modality**, **task**, and **data volume**) and clears the more restrictive filters to return a wider set of suggestions.

## How to use the result groups
A good rule is:

1. Start with **strict human-labelled** recommendations  
2. Then check **loose human-labelled** recommendations  
3. Use **AI-annotated** recommendations as additional suggestions and broader pointers