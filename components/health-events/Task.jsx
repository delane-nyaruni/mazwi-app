import React from 'react'
// import { FaTimes } from 'react-icons/fa'
const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`event ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
        <h4 className='health-event-task'>{task.text} 
            {/* <FaTimes style={{color:'red', cursor:'pointer'}}
            alt='My img' className='closeIcon' onClick={() => onDelete(task.id)}/> 
             */}
            </h4>  
        <p>{task.day}</p> 
    </div>
  )
}

export default Task