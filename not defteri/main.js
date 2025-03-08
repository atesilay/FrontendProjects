// Sayfa yüklendiğinde notları getir
document.addEventListener("DOMContentLoaded", loadNotes);

// Yeni not ekleme fonksiyonu
function addNote() {
    const noteInput = document.getElementById("noteInput");
    const noteText = noteInput.value.trim();

    if (noteText === "") return; // Eğer boşsa ekleme

    createNoteElement(noteText);
    saveNote(noteText); // Notu localStorage'a kaydet

    noteInput.value = "";
}

// Notu ekrana ekleyen fonksiyon
function createNoteElement(text) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    // Not içeriğini oluştur
    noteDiv.innerHTML = `
        <span class="note-text">${text}</span>
        <div>
            <button onclick="editNote(this)">✏️</button>
            <button onclick="deleteNote(this)">❌</button>
        </div>
    `;

    document.getElementById("notes").appendChild(noteDiv);
}

// Notları localStorage'a kaydetme
function saveNote(text) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(text);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Sayfa açıldığında notları yükleme
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(note => createNoteElement(note));
}

// Not silme fonksiyonu
function deleteNote(button) {
    const note = button.parentElement.parentElement;
    note.style.animation = "fadeOut 0.3s ease-in-out";

    setTimeout(() => {
        note.remove();
        removeNoteFromStorage(note.querySelector(".note-text").textContent);
    }, 300);
}

// LocalStorage'dan notu silme
function removeNoteFromStorage(text) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note !== text);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Not düzenleme fonksiyonu
function editNote(button) {
    const noteDiv = button.parentElement.parentElement;
    const noteText = noteDiv.querySelector(".note-text");

    const newText = prompt("Notu düzenle:", noteText.textContent);
    if (newText) {
        updateNoteInStorage(noteText.textContent, newText);
        noteText.textContent = newText;
    }
}

// LocalStorage'da notu güncelleme
function updateNoteInStorage(oldText, newText) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    const index = notes.indexOf(oldText);
    if (index !== -1) {
        notes[index] = newText;
        localStorage.setItem("notes", JSON.stringify(notes));
    }
}

