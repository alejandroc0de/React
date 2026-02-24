import {useRef,useState} from 'react'
import './App.css'


function App() {
  const inputRef = useRef();
  const [todos, setTodos] = useState([])

  function handleSubmit(){
    const task = inputRef.current.value
    if(!task){
      return
    }
    const newTodo = {
      id: Date.now(),
      text : task,
      status : "Not Started"
    };
    setTodos([...todos,newTodo])
    inputRef.current.value = ""
  }

  function TodoItem({todo,index}){
    return (
            <li>
            {todo.text}
            <select value={todo.status}
            onChange={(e) => {
              const newTodos = [...todos];
              newTodos[index].status = e.target.value;
              setTodos(newTodos)
            }}>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            </li>
    )
  }

  // Guardamos las todos en 2 arrays diferentes 
  const activeTodos = todos.filter(todo=>todo.status !=="Completed")
  const completedTodos = todos.filter(todo=> todo.status === "Completed")

  return (
    <div>
        <h1>Todo list</h1>
        <input type="text" ref={inputRef}/>
        <button onClick={handleSubmit}> Submit </button>
        <ul>
          {activeTodos.map((todo,index) => {
            return <TodoItem key={todo.id} todo={todo} index={index}></TodoItem>
          })}
        </ul>

        <h2>Completed</h2>
        <ul>
          {completedTodos.map((todo,index) => {
            return <TodoItem key={todo.id} todo={todo} index={index}></TodoItem>
          })}
        </ul>
    </div>
  )
}
export default App
