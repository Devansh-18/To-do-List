import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
uuidv4();
import { FaBeer } from 'react-icons/fa';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'

function App() {
      
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished,setshowFinished] = useState(true)
  useEffect(() => {
    let todosString = localStorage.getItem("todos")
    if(todosString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const saveToLS = (params)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e)=>{
    setshowFinished(!showFinished)
  }

  const handleEdit = (e,id)=>{
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar/>
      <div className="m-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-yellow-100 min-h-[80vh] md:w-1/2">
        <div className="flex flex-col gap-3 addtodo my-5 w-full">
          <h2 className='text-lg font-bold'>Add a To-do</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-md px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<1} className='bg-yellow-400 hover:bg-yellow-500 p-2 py-1 font-bold text-sm text-black rounded-md '>Add</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-lg font-bold'>Your to-dos</h2>
          
        <div className="todos w-full">
          {todos.length === 0 && <div className='m-5 text-lg font-semibold'>No To-Do to display</div>}
        {todos.map(item=>{
            return (showFinished || !item.isCompleted) && <div key = {item.id} className="todo flex md:w-1/2 my-3 justify-between">
              <div className='flex gap-5 w-1/2'>
              <input name= {item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className=  {item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=> {handleEdit(e,item.id)}} className='bg-yellow-400 hover:bg-yellow-500 p-2 py-1 font-bold text-sm text-black rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e)=> {handleDelete(e,item.id)}} className='bg-yellow-400 hover:bg-yellow-500 p-2 py-1 font-bold text-sm text-black rounded-md mx-1'><MdDeleteForever /></button>
            </div>
          </div>
          })}
          
        </div>
      </div>
    </>
  )
}

export default App
