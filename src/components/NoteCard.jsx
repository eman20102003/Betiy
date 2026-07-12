import "../styles/NoteCard.css";
function NoteCard({ 
  note, 
  onDelete, 
  onPin,
  onEdit
}) {
  return (
    <div className={`note-card ${note.color}`}>

      <div className="note-header">
        <h3>
          {note.title}
        </h3>
        <button 
          onClick={() => onPin(note.id)}
        >

          {note.pinned ? "⭐" : "☆"}

        </button>
      </div>
      <p>
        {note.content}
      </p>
      <div className="note-actions">
        <button
          className="edit-btn"
          onClick={()=>onEdit(note)}
        >
         ✏️ Edit

        </button>
        <button
          className="delete-btn"
          onClick={()=>onDelete(note.id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>

  );}


export default NoteCard;