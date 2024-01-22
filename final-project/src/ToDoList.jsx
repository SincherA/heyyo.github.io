import { useState, useEffect } from 'react';
import './toDoList.css';
import { BiChevronRightCircle, BiChevronLeftCircle, BiBadgeCheck, BiTrash, BiEdit } from "react-icons/bi";

function ToDoList() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [inProgress, setInProgress] = useState(JSON.parse(localStorage.getItem('inProgress')) || []);
  const [completed, setCompleted] = useState(JSON.parse(localStorage.getItem('completed')) || []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('inProgress', JSON.stringify(inProgress));
  }, [inProgress]);

  useEffect(() => {
    localStorage.setItem('completed', JSON.stringify(completed));
    if (todos.length === 0 && inProgress.length === 0) {
      localStorage.removeItem('todos');
      localStorage.removeItem('inProgress');
    }
  }, [completed, todos, inProgress]);

  const handleAddTodo = () => {
    setTodos([...todos, { text: input, isEditing: false }]);
    setInput('');
  };

  const handleEdit = (list, setList, index) => {
    const newList = [...list];
    newList[index].isEditing = !newList[index].isEditing;
    setList(newList);
  };

  const handleEditChange = (list, setList, index, value) => {
    const newList = [...list];
    newList[index].text = value;
    setList(newList);
  };

  const handleMoveToInProgress = (index) => {
    setInProgress([...inProgress, todos[index]]);
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleMoveBackToTodos = (index) => {
    let newInProgress = [...inProgress];
    let movedTodo = newInProgress.splice(index, 1)[0];
    setTodos([...todos, movedTodo]);
    setInProgress(newInProgress);
  };

  const handleMoveToCompleted = (index) => {
    setCompleted([...completed, inProgress[index]]);
    setInProgress(inProgress.filter((_, i) => i !== index));
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleMoveToInProgressFromCompleted = (index) => {
    setInProgress([...inProgress, completed[index]]);
    setCompleted(completed.filter((_, i) => i !== index));
  };

  const handleDeleteFromCompleted = (index) => {
    setCompleted(completed.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-list">
      <div className="header">
        <h2>ToDo&apos;s List</h2>
        <h3>Total Todos: {todos.length + inProgress.length + completed.length}</h3>
      </div>
      <div className="input-field">
        <input type="text" className="todo-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add new todo" />
        <button className='add-button' onClick={handleAddTodo}>Add ToDo</button>
      </div>
      <div className="columns">
        <div className="column todo-column">
          <h2>Todos</h2>
          {todos.map((todo, index) => (
            <div key={index} className='todo-item'>
              {todo.isEditing ? (
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => handleEditChange(todos, setTodos, index, e.target.value)}
                />
              ) : (
                <span>{todo.text}</span>
              )}
              <div className="button-group">
                <button className="edit-button" onClick={() => handleEdit(todos, setTodos, index)}><BiEdit /></button>
                <button className="progress-button" onClick={() => handleMoveToInProgress(index)}><BiChevronRightCircle /></button>
                <button className="completed-button" onClick={() => handleDeleteTodo(index)}><BiTrash /></button>
              </div>           
            </div>
          ))}
        </div>
        <div className="column in-progress-column">
          <h2>In Progress</h2>
          {inProgress.map((todo, index) => (
            <div key={index} className='todo-item'>
              {todo.isEditing ? (
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => handleEditChange(inProgress, setInProgress, index, e.target.value)}
                />
              ) : (
                <span>{todo.text}</span>
              )}
              <div className="button-group">
                <button className="progress-button" onClick={() => handleMoveBackToTodos(index)}><BiChevronLeftCircle /></button>
                <button className="edit-button" onClick={() => handleMoveToCompleted(index)}><BiBadgeCheck /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="column completed-column">
          <h2>Completed</h2>
          {completed.map((todo, index) => (
            <div key={index} className='todo-item'>
              <span>{todo.text}</span>
              <div className="button-group">
                <button className="progress-button" onClick={() => handleMoveToInProgressFromCompleted(index)}><BiChevronLeftCircle /></button>
                <button className="completed-button" onClick={() => handleDeleteFromCompleted(index)}><BiTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;