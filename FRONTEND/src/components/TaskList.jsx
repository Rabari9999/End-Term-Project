import React,{useState} from "react";
import API from '../utils/api'

function TaskList({tasks,onDelete}){
    const [deletingId,setDeletingId] = useState(null)
    const handleDelete = async (id)=>{
        setDeletingId(id)
        try{
            await API.delete(`/tasks/${id}`)
            onDelete();
        }catch(err){
            console.log(err)
            alert('Failed to delete task')
        }
        setDeletingId(null)
    } 
    {tasks.length===0 && <p className="no-tasks" >No tasks yet!</p> }
    return(
        <div className="task-list-container">
            {tasks.map(task=> (
                <div key={task._id} className="task-card">
                    <div className="task-content">
                        <h4 className="task-title">{task.title}</h4>
                        <p className="task-description">{task.description}</p>
                    </div>
                    <button className="delete-btn"
                        onClick={()=> handleDelete(task._id)}
                        disabled = {deletingId===task._id}
                        style={{background:'#dc2626'}}
                    >{deletingId===task._id ? "Deleting":"Delete"}</button>
                </div>
            ))}
        </div>
    )
}

export default TaskList