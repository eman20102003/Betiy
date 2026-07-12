import { useState, useEffect } from "react";
import "../styles/NoteForm.css";
function NoteForm({ onAdd, editingNote, onUpdate }) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("yellow");

  useEffect(() => {

    if (editingNote) {

      setTitle(editingNote.title);
      setContent(editingNote.content);
      setColor(editingNote.color);

    }

  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    const noteData = {

      title,
      content,
      color

    };

    if (editingNote) {
      onUpdate({
        ...editingNote,
        ...noteData
      });

    } else {
      onAdd({

        id: Date.now(),
        ...noteData,
        pinned:false

      });
    }
    setTitle("");
    setContent("");
    setColor("yellow");
  };

  return (

    <form
      className="note-form"
      onSubmit={handleSubmit}
    >
      <input

        placeholder="Note title..."

        value={title}

        onChange={(e)=>setTitle(e.target.value)}

      />
      <textarea

        placeholder="Write your note..."

        value={content}

        onChange={(e)=>setContent(e.target.value)}

      />
      <select

        value={color}
        onChange={(e)=>setColor(e.target.value)}

      >
        <option value="yellow">
          Yellow
        </option>

        <option value="blue">
          Blue
        </option>

        <option value="green">
          Green
        </option>

        <option value="pink">
          Pink
        </option>
      </select>
      <button>

        {editingNote 
          ? "Update Note"
          : "Add Note"
        }
      </button>
    </form>
  );
}
export default NoteForm;