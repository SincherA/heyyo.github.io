// MyCalendar.js
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { BiTrash, BiEdit } from "react-icons/bi";
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('calendarNotes')) || [];
    setNotes(storedNotes);
  }, []);

  // Save notes to localStorage whenever the notes state changes
  useEffect(() => {
    localStorage.setItem('calendarNotes', JSON.stringify(notes));
  }, [notes]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleNoteSave = () => {
    if (newNote.trim() !== '') {
      const updatedNotes = [...notes];
      if (editingNoteIndex !== null) {
        updatedNotes[editingNoteIndex] = { date: selectedDate, note: newNote };
        setEditingNoteIndex(null);
      } else {
        updatedNotes.push({ date: selectedDate, note: newNote });
      }
      setNotes(updatedNotes);
      setNewNote('');
    }
  };

  const handleNoteDelete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const handleNoteEdit = (index) => {
    setNewNote(notes[index].note);
    setEditingNoteIndex(index);
  };

  return (
    <div className="container">
      {/* Calendar on the left side */}
      <div className="calendar-container">
        <h2>Calendar</h2>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="day-container"
        />
      </div>
  
      {/* Notes container */}
      <div className="notes-container">
        <h2>Important Days</h2>
  
        {/* Note input always first */}
        <div className="note-container">
          <h3>Add a Note for Day {selectedDate ? selectedDate.toLocaleDateString() : ''}</h3>
          <div className="note-input-container">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter your note..."
              className="note-container"
            />
            <button className="save-note-button" onClick={handleNoteSave}>Save Note</button>
          </div>
        </div>
        {notes.map((note, index) => {
          const date = new Date(note.date);
          return (
            <div key={`${date.toISOString()}-${index}`} className="note-container">
              <p>Day {date.toLocaleDateString()}</p>
              <p>{note.note}</p>
              <button onClick={() => handleNoteEdit(index)}><BiEdit className="icon edit-icon"/></button>
              <button onClick={() => handleNoteDelete(index)}><BiTrash className="icon delete-icon"/></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
  
export default MyCalendar;