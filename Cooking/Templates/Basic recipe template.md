```dataviewjs
const ingredients = [
  {name: "Flour", quantity: "200g"},
  {name: "Eggs", quantity: "2 pcs"},
  {name: "Milk", quantity: "300ml"}
];

const steps = [
  "Mix flour and eggs.",
  "Add milk and stir.",
  "Cook for 15 minutes."
];

// Create a two-column layout using HTML
dv.el("div", "", {style: "display: flex; justify-content: space-between;"}, [
  dv.el("div", ingredients.map(ingredient => `${ingredient.quantity} ${ingredient.name}`).join("<br/>"), {style: "flex: 1; margin-right: 20px;"}),
  dv.el("div", steps.map(step => `${step}`).join("<br/>"), {style: "flex: 1;"})
]);
```



