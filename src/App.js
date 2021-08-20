import { useState , useEffect } from "react"
import Header from './components/Header'
import Tasks from './components/Tasks';
import Addtask from "./components/Addtask";

const App = () =>{
  const [showAddtask, setShowaddTask] = useState(true)
  const [tasks,setTasks] = useState([])

  useEffect(()=>{

    const getTasks = async ()=>{
      const dataFromserver = await fetchTasks()
      setTasks(dataFromserver)
    }

    getTasks()
  },[])

  const fetchTasks = async ()=>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
//addTask

const addTask = async(task)=>{
  console.log(task)
  const res = await fetch('http://localhost:5000/tasks',{
    method:"POST",
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(task)
  })
  const data = await res.json()
  setTasks([...tasks,data])

  // const id = Math.floor(Math.random() * 10000)+1
  // const newTask = {id,...task}
  // setTasks([...tasks,newTask])
}

//deleteTask
const deleteTask =async (id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'DELETE'
  })
  setTasks(tasks.filter((task)=>task.id!== id))
}

//toggle reminder

const toggleReminder = (id)=>{
  console.log('reminder',id)
  setTasks(
    tasks.map((task)=> task.id === id ?{...task, reminder:!task.reminder}: task)
  )
}

  return (
    <div className = 'container'>
      <Header  
      onAdd={()=> setShowaddTask(!showAddtask)}
      showAdd={showAddtask}
      />
      {showAddtask && <Addtask onAdd = {addTask}/>}
      {tasks.length > 0 ? (
              <Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleReminder} />

      ) : ('no task to show')}
    </div>
  )
}

export default App;
