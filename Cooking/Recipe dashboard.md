---
cssclasses:
  - recipe-dashboard
---
```dataview
table without id
	embed(link(image)),
	file.link as "Title",
	"**Source:** " + link as "Source",
	"**Type:** " + type as "Type",
	"Tags " + tags as "Tags",
	"**Servings:** " + servings as "Servings"
from "Recipes" and -"Sourdough"
```