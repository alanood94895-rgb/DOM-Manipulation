// Array that stores all notes
let notes = [];

// Select HTML elements
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const notesContainer = document.getElementById("notesContainer");
const counter = document.getElementById("counter");

// Add note button
addBtn.addEventListener("click", addNote);

// Search input
searchInput.addEventListener("input", () => {
    searchNotes(searchInput.value);
});

// Event delegation for delete buttons
notesContainer.addEventListener("click", function(e){

    if(e.target.classList.contains("delete-btn")){

        const noteId = Number(
            e.target.parentElement.dataset.noteId
        );

        deleteNote(noteId);
    }

});

// Add a new note
function addNote(){

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    // Validate title
    if(title === ""){
        alert("Title is required!");
        return;
    }

    // Create note object
    const note = {
        id: Date.now(),
        title: title,
        content: content
    };

    // Add to array
    notes.push(note);

    // Save data
    saveNotes();

    // Refresh display
    renderNotes();

    // Clear inputs
    titleInput.value = "";
    contentInput.value = "";
}

// Render notes
function renderNotes(notesToRender = notes){

    notesContainer.innerHTML = "";

    notesToRender.forEach(note => {

        const card = document.createElement("div");
        card.className = "note-card";

        card.dataset.noteId = note.id;

        card.innerHTML = `
            <button class="delete-btn">Delete</button>
            <h3>${note.title}</h3>
            <p>${note.content}</p>
        `;

        notesContainer.appendChild(card);

    });

    updateCounter(notesToRender.length);

}

// Delete note
function deleteNote(noteId){

    notes = notes.filter(note => note.id !== noteId);

    saveNotes();

    renderNotes();

}

// Save notes to localStorage
function saveNotes(){

    localStorage.setItem(
        "notesData",
        JSON.stringify(notes)
    );

}

// Load notes from localStorage
function loadNotes(){

    const savedData = localStorage.getItem("notesData");

    if(savedData){

        notes = JSON.parse(savedData);

    }else{

        notes = [];

    }

    renderNotes();

}

// Search notes
function searchNotes(query){

    query = query.toLowerCase();

    const filteredNotes = notes.filter(note =>

        note.title.toLowerCase().includes(query) ||

        note.content.toLowerCase().includes(query)

    );

    renderNotes(filteredNotes);

}

// Update notes counter
function updateCounter(count){

    counter.textContent = `Total Notes: ${count}`;

}

// Load saved notes when page starts
loadNotes();