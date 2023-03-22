import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote'
import Noteitem from './Noteitem'



const Notes = (props) => {
let history = useNavigate()

    const context = useContext(NoteContext)
    const {notes,getNotes,editNote}= context
      useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    }
    else {
      history('/login')
    }
  }, [])
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateNote = async() => {
        ref.current.click();
        
notes.map((note)=>{return setNote({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag})

})

}
const ref= useRef(null)
const refClose = useRef(null)

const handleClick = () => {
  
  editNote(note.id,note.etitle,note.edescription,note.etag)
  refClose.current.click()
  props.showAlert("Note Updated Successfully","success")

    };
  
    const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
    };

return (
    
<>
<button ref={ref} type="button" className="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            aria-describedby="emailHelp"
            value={note.etitle}
            onChange={onChange}
            minLength={5} required
          />

        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            value={note.edescription}
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            value={note.etag}
            onChange={onChange}

          />
        </div>

      </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleClick}  type="button" className="btn btn-primary" disabled={note.etitle.length<5 || note.edescription.length<5 } >Update Note</button>
      </div>
    </div>
  </div>
</div>
<AddNote showAlert={props.showAlert}/>
<div className="container ">
    <h2 style={{color:"#fff"}} >Your Notes</h2>
    <div className="row">
    <div className="container" style={{color:"#fff"}}>
    {notes.length===0 && "No Notes to display"}
    </div>
    {notes.map((note)=>{


        return <>

<Noteitem  key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        </>

    })}
  
    </div>
  </div>
    </>
  )
}

export default Notes