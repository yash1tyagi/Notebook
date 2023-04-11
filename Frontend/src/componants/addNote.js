
import { useState, useContext } from 'react';
import NoteContext from '../context/notes/noteContext'

export const AddNote = () => {
    const context = useContext(NoteContext)
    const {addNote} = context
    const[note, setNote] = useState({title:"", description:"",tag:"default"})
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:""})
    }
    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return <div className= 'container my-3'>
              <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" value={note.title} className="form-control" id="title" name="title" aria-describedby="emailHelp"onChange={onChange} />
                </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" value={note.description} className="form-control" id="description"  name="description" onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
  </div>;
};
