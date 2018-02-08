const Note = (function() {
  return class Note {
    constructor({
      user_id,
      title,
      body,
      id
    }) {
      this.id = id;
      this.user_id = user_id;
      this.title = title;
      this.body = body;
    }

    renderSidebarNotes() {
      // console.log("rendering sidebar", this.renderBody)

      let noteItem = document.createElement("li");
      noteItem.id = "note" + this.id // confused here

      noteItem.addEventListener('click', this.renderBody.bind(this))
      //the first this binds it to the li
      //the second one skips up to the parent

      let noteTitle = document.createTextNode(this.title);
      // console.log("sidebar", this);

      let noteBodyItem = document.createElement("SPAN");
      let noteBody = document.createTextNode(this.body.substring(0, 150) + "...");
      noteBodyItem.append(noteBody);
      noteItem.append(noteTitle);
      noteItem.append(noteBodyItem);

      return noteItem; //learn more about this
    }

    renderBody() {
      // grab HTML elements and assign variables
      let content = document.querySelector('.content')
      let toolbar = document.querySelector('.toolbar')

      // clear contents
      content.innerHTML = ""
      toolbar.innerHTML = ""

      // populate data
      let noteTitle = document.createElement('h3')
      noteTitle.innerHTML = this.title;
      // console.log("body", this);

      let noteBody = document.createElement('p')
      noteBody.innerHTML = this.body;

      content.append(noteTitle)
      content.append(noteBody)

      // create Delete button
      let deleteNoteBtn = document.createElement('button')
      deleteNoteBtn.className = 'ui red button'
      deleteNoteBtn.innerText = 'Delete'
      deleteNoteBtn.value = this.id

      deleteNoteBtn.addEventListener('click', this.deleteNote.bind(this))
      toolbar.append(deleteNoteBtn)

    }

    deleteNote(e) {
      e.preventDefault();

      // grab HTML elements and assign variables
      let content = document.querySelector('.content')
      let toolbar = document.querySelector('.toolbar')

      // clear contents of the full note section
      content.innerHTML = ""
      toolbar.innerHTML = ""

      /// remove note from the sidebar
      let sideNote = document.getElementById(`note${this.id}`)
      sideNote.remove();

      // delete the database entry
      fetch(`http://localhost:3000/api/v1/notes/${this.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // "Accept": "application/json"
        }
      })

    }


  };
})();
