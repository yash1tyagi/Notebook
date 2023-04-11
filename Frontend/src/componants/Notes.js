
import { AddNote } from "./addNote";
import NoteContext from '../context/notes/noteContext'
import Notesitem from './Notesitem';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Notes() {
    let navigate = useNavigate();
    const context = useContext(NoteContext)
    const { notes, getNotes, editNote } = context
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const[note, setNote] = useState({id:"", etitle:"", edescription:"",etag:"default"})


    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description})
    }


    const handleClick = (e) =>{
        console.log("note is updating " , note);
        refClose.current.click();
        editNote(note.id, note.etitle, note.edescription);
    }
    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return <div className='container'>
        <AddNote />
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleClick} type="button" className="btn btn-primary">Update Notes</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='row my-3 container'>
            <h2>Your Notes</h2>
            {notes.lenght===0 && "No Notes to display"}
            {
                notes.map((notes) => {
                    return <Notesitem key={notes._id} updateNote={updateNote} note={notes} />
                })
            }
        </div>;
    </div>
}

export default Notes;



