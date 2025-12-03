import React from 'react'
import { useState } from 'react'
import '../../App.css'

const AddTask = ({ onAdd }) => {

  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if(!text){
      emptyFieldsPopupMsg();
      // alert("Add Event")
      return
    }
    function emptyFieldsPopupMsg(){
      document.getElementById('emptyFields').style.display = 'block';
      setTimeout(function() {
          document.getElementById('emptyFields').style.display = 'none';
      }, 3000); // 3 seconds before hiding the error message
  }
    onAdd({ text, day, reminder});

    setText('')
    setDay('')
    setReminder(false)
  }

  return (<>
    <form className='add-form' onSubmit={onSubmit}>
    <label>Event</label>
    <div className='form-control'>
        
        {/* <input type='text' placeholder='Add Event' value={text} onChange={(e) =>
          setText(e.target.value)
        }/> */}
        <textarea name="code input" type='text' onChange={(e) =>
          setText(e.target.value)} value={text} className="form-control btn-block " placeholder="write code" rows="4" ></textarea>
    </div>

    <label>Day & Time</label>
    <div className='form-control'>
        <input type='date' placeholder='Date'  value={day} onChange={(e) =>
          setDay(e.target.value)
        }/>
    </div>
    <div className='form-control form-control-check'>
        <label>Set Event</label>
        <input type='checkbox'  checked={reminder} value={reminder} onChange={(e) =>
          setReminder(e.currentTarget.checked)
        }/>
    </div>
    <input type='submit' className='btn btn-block' value='Add Event' />
    </form>

    
        <div className="msgError" id="emptyFields">
            Fill-in infomation.
        </div>
        
    </>
  )
}

export default AddTask