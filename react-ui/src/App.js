import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';

const versionUrl = axios.create({
  baseURL: `http://localhost:8000`,
});

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("fetch...")
        const res = await versionUrl.get("/todos");
        console.log("res: ", res)
        let todos = await res.data;
        console.log(todos)
        setTodos(todos)
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    }
    fetchData()
  }, [])

  const handleClick = (id, checked) => async e => {
    console.log("clicked", id)
    try {
      const response = await versionUrl.post(`/todos/check/${id}`, { checked })
      const newTodo = await response.data;
      console.log(newTodo);
      setTodos(todos => todos.map(elem => elem._id === id ? { ...elem, checked: checked } : elem))
      console.log(todos)
    } catch (e) {
      console.error('Error during the fetch operation', e);
    }
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
                onClick={handleClick(todo._id, !todo.checked)}
                className={`todo-item ${todo.checked ? "checked" : ""}`}
              >
                <span style={{ color: todo.checked ? "red" : "green" }}>{todo.title}</span>
                {todo.checked ? <span className="check-icon checked">X</span> :
                  <span className="check-icon unchecked">✓</span>}
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
