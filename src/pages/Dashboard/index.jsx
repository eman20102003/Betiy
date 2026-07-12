import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import NoteCard from "../../components/NoteCard";
import NoteForm from "../../components/NoteForm";

import useAuth from "../../hooks/useAuth";

import "./Dashboard.css";


function Dashboard() {

  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [notes, setNotes] = useState(() => {

    const savedNotes = localStorage.getItem(
      "noto-notes"
    );

    return savedNotes
      ? JSON.parse(savedNotes)
      :
      [
        {
          id: 1,
          title: "Welcome to Noto",
          content: "Start writing your ideas ✨",
          color: "yellow",
          pinned: true
        }
      ];

  });

  useEffect(() => {

    localStorage.setItem(
      "noto-notes",
      JSON.stringify(notes)
    );

  }, [notes]);

  const addNote = (newNote) => {

    setNotes([
      ...notes,
      newNote
    ]);

  };

  const updateNote = (updatedNote) => {

    setNotes(

      notes.map(note =>
        note.id === updatedNote.id
          ? updatedNote
          : note
      )

    );

    setEditingNote(null);

  };

  const deleteNote = (id) => {

    setNotes(
      notes.filter(
        note => note.id !== id
      )
    );

  };

  const pinNote = (id) => {

    setNotes(

      notes.map(note =>

        note.id === id
          ?
          {
            ...note,
            pinned: !note.pinned
          }

          :
          note

      ) );};
  const filteredNotes = [...notes]

    .filter(note =>

      note.title
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      note.content
        .toLowerCase()
        .includes(search.toLowerCase())

    )

    .sort((a, b) =>
      b.pinned - a.pinned
    );

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1>
          Welcome {user?.name} 📝
        </h1>
        <input

          className="search-input"

          placeholder="Search notes..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

        />

        <NoteForm
          onAdd={addNote}
          editingNote={editingNote}
          onUpdate={updateNote}

        />

        <div className="notes-grid">
          {filteredNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onPin={pinNote}
              onEdit={setEditingNote}

            />
          ))}
        </div>
      </div>
    </div>
 );
}

export default Dashboard;