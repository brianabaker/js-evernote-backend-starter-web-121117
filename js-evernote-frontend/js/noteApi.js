const NoteApi = (function() {
  return class NoteApi {
    static fetchNotes() {
      return fetch("http://localhost:3000/api/v1/notes").then(res => res.json());
    }

    static postNote(noteTitle, noteBody) {
      return fetch('http://localhost:3000/api/v1/notes', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: 1, // ask about it
          title: noteTitle,
          body: noteBody,
        })
      })
      .then(res => res.json())
    }

    static deleteNote(){

    }

    static editNote(){

    }


  };
})();
