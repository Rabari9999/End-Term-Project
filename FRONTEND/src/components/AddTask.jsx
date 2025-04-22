import React,{useState} from "react";
import API from '../utils/api'

function AddTask({onAdd}){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [message,setMessage] = useState('')
    const [loading,setLoading] = useState(false)

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setMessage('')
        setLoading(true)
        try{
            const token = localStorage.getItem("token");
            console.log(token);
            await API.post('/tasks',{
                title,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTitle('')
            setDescription('')
            setMessage('Task added!');
            onAdd()
        }catch(err){
            console.log(err)
            setMessage('Failed to add Task')
        }       
        setLoading(false)
    }
    return(
        <form className="add-task-form" onSubmit={handleSubmit}>
            <input
            className="input task-title-input"
             type="text"
             placeholder="Task title"
             required
             value={title}
             onChange={(e)=>setTitle(e.target.value)}
             />
             <input
             type="text"
             placeholder="Description (optional)"
             value={description}
             onChange={(e)=>setDescription(e.target.value)}
             />
             <button className="submit-btn add-task-btn" type="submit" disabled={loading}>{loading?"Adding...":"Add Task"}</button> 
             {message && <div className={message==="Task added!"?"success":"error"}>{message}</div> }
        </form>
    )
}

export default AddTask