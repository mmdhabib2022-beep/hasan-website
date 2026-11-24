let notes = JSON.parse(localStorage.getItem("myNotes")) || [];
let editIndex = -1;

function showNotes() {
    document.getElementById("notes").hidden = false;
    displayNotes();
}

function saveNote() {
    const title = document.getElementById("noteTitle").value.trim();
    const text = document.getElementById("noteText").value.trim();

    if (!title || !text) {
        alert("শিরোনাম ও নোট লিখো!");
        return;
    }

    if (editIndex === -1) {
        notes.push({title, text});
    } else {
        notes[editIndex] = {title, text};
    }

    localStorage.setItem("myNotes", JSON.stringify(notes));

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteText").value = "";
    document.getElementById("savedMessage").textContent = "নোট Save হয়েছে!";

    editIndex = -1;
    displayNotes();
}

function displayNotes() {
    const list = document.getElementById("notesList");
    list.innerHTML = "";

    notes.forEach((note, index) => {
        const item = document.createElement("div");
        const heading = document.createElement("h3");
        const content = document.createElement("p");
        const edit = document.createElement("button");
        const del = document.createElement("button");

        heading.textContent = note.title;
        content.textContent = note.text;

        edit.textContent = "✏️ Edit";
        edit.onclick = function() {
            document.getElementById("noteTitle").value = note.title;
            document.getElementById("noteText").value = note.text;
            editIndex = index;
        };

        del.textContent = "🗑️ Delete";
        del.onclick = function() {
            if (confirm("নোটটি মুছে ফেলবে?")) {
                notes.splice(index, 1);
                localStorage.setItem("myNotes", JSON.stringify(notes));
                displayNotes();
            }
        };

        item.append(heading, content, edit, del);
        list.appendChild(item);
    });
}

displayNotes();
