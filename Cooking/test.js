<%* 
// Define the scaling factor
let scale = 2; // Change this to your desired scaling factor

// Get the content of the note
let content = app.plugins.plugins.template.getNoteContent(app.plugins.plugins.template.getActiveNote());

// Replace the quantities
content = content.replace(/(\d+)(\s+)(\w+)/g, (match, quantity, space, unit) => {
    return `${(quantity * scale)}${space}${unit}`;
});

// Update the note content
app.plugins.plugins.template.setNoteContent(app.plugins.plugins.template.getActiveNote(), content);
*%>
