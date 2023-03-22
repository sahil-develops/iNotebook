import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';



const Noteitem = (props) => {
const context = useContext(NoteContext)
const {deleteNote}=context
  const {note,updateNote} = props; 
  return (
<>
<div className='col-md-3'>
<div className="card my-3" >

  <div className="card-body">
  {/* <h6> need to the username of user </h6> */}
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <p className="btn btn-primary" style={{cursor:"default",fontSize:"0.9rem"}}>#&nbsp;{note.tag}</p>
    <br />
    <i style={{cursor:"pointer"}} className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Note Deleted Successfully","success")}}></i>
    <i style={{cursor:"pointer"}} className="fa-solid fa-pen mx-2" onClick={()=>{updateNote(note._id)}}></i>
        <br />

  </div>
</div>
</div>
</>

  )
}

export default Noteitem