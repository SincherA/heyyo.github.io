// MyCalendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css'; // Import the CSS file

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleNoteSave = () => {
    if (newNote.trim() !== '') {
      const updatedNotes = [...notes, { date: selectedDate, note: newNote }];
      setNotes(updatedNotes);
      setNewNote('');
    }
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

      {/* Right side for notes */}
      <div className="notes-container">
        <h2>Important Days</h2>
        {notes.map((note) => (
          <div key={note.date.toISOString()} className="note-container">
            <p>Day {note.date.toLocaleDateString()}</p>
            <p>{note.note}</p>
          </div>
        ))}
        {selectedDate && (
          <div className="note-container">
            <h3>Add a Note for Day {selectedDate.toLocaleDateString()}</h3>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter your note..."
              className="note-container"
            />
            <button onClick={handleNoteSave}>Save Note</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
