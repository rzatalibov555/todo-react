import { useState, useEffect } from 'react';
import { NoteForm } from "components/NoteForm/NoteForm";
import { useParams } from "react-router-dom";

export function Note(props) {

  const {id} = useParams(); 
  
  const [noteData, setNoteData] = useState({});

  useEffect(() => {
    
    fetch(`http://localhost:3200/notes/${Number(id)}`)
      .then((response) => response.json())
      .then((data) => setNoteData(data))
      .catch((error) => console.log(error));
  }, []);
  
  console.log(noteData)
  


  return (
    <>
     
      
        <NoteForm
        // isEditable={isEditable}
        // title={isEditable ? "Update note" : noteData.title}
        // note={noteData}
        // onClickDelete={deleteNote_}
        // onClickEdit={() => setIsEditable(!isEditable)}
        // onSubmit={isEditable && submit}
        />
    </>
  );
}
