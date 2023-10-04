import { useState, useEffect } from 'react'
import './App.css';


function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/todos");
        let todos = await res.json();
        todos.forEach(todo => {
          todo.isChecked = false
        })
        console.log(todos)
        setTodos(todos)
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    }
    fetchData()
  }, [])

  const handleClick = id => e => {
    console.log("clicked", id)
    setTodos(todos => todos.map(elem => elem._id == id ? { ...elem, isChecked: !elem.isChecked } : elem))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Versions</h1>
      </header>
      <section className="App-content">
        {todos.length > 0 ? (
          <ul className="todo-list">
            {todos.map(todo => (
              <li
                key={todo._id}
                onClick={handleClick(todo._id)}
                className={`todo-item ${todo.isChecked ? "checked" : ""}`}
              >
                {todo.title} - {todo.created_at}
              </li>
            ))}
          </ul>
        ) : (
          <h3 className="no-todos">No Todos Available</h3>
        )}
      </section>
    </div>
  );
}
export default App;
