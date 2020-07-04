
function newNoteId() {
    return `${new Date().getTime()}`
}

function createNewNote(noteId, title, content) {
    const template = document.querySelector("#note-template");
    const clone = document.importNode(template.content, true);
    clone.querySelector(".note").setAttribute("id", noteId);
    clone.querySelector(".note-title").value = title;
    clone.querySelector(".note-content").value = content;
    return clone;
}

function deleteClickedNote(event) {
    let elementToDelete = event.target.parentNode;
    localStorage.removeItem(`${elementToDelete.id}`);
    elementToDelete.remove();
}

function setElementInLocalStorage(element) {
    localStorage.setItem(`${element.getAttribute("id")}`, JSON.stringify({
        title: `${element.querySelector(".note-title").value}`,
        content: `${element.querySelector(".note-content").value}`
    }));
}

function saveChangedText(event) {
    let changedElement = event.target.parentNode;
    setElementInLocalStorage(changedElement);
}

function appendNewNote(noteId=newNoteId(), title="Edit title!",
        content="Edit content!", elementIsNew=true) {
    document.querySelector('div.content').appendChild(createNewNote(noteId, title, content));
    let newElement = document.querySelector("div.content div.note:last-of-type");
    newElement.querySelector("button.deleteNote").addEventListener("click", deleteClickedNote);
    newElement.querySelector("textarea.note-title").addEventListener("input", saveChangedText);
    newElement.querySelector("textarea.note-content").addEventListener("input", saveChangedText);
    if (elementIsNew) setElementInLocalStorage(newElement);
}

function appendDefaultNewNote() {
     appendNewNote();
 }

function loadNotesFromLocalStorage() {
    let index = 0;
    while (noteId = localStorage.key(index)) {
        let storedNoteObject = JSON.parse(localStorage.getItem(noteId));
        appendNewNote(noteId, storedNoteObject.title, storedNoteObject.content, false);
        index++;
    }
}


function main() {
    loadNotesFromLocalStorage();
    document.querySelector("div.content button.newNote").addEventListener("click", appendDefaultNewNote);
}

main();