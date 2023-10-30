import { useState } from "react";
import { Trash, Pencil } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import s from "./style.module.css";
import { useDispatch } from "react-redux";
import { deleteNote_by_Id } from "store/notes/notes-slice"; // deleteNote_by_Id import
import { updateNote_by_Id } from "store/notes/notes-slice"; // updateNote_by_Id import

export function TextCard({ title, content, subtitle, onClick, id }) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isTrashHovered, setISTrashHovered] = useState(false);
  const [isUpdateHovered, setISUpdateHovered] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch() //delete

  function onClickTrash_(e) {
    e.stopPropagation();
    dispatch(deleteNote_by_Id(id)) // Delete dispatch
  }

  function onClickUpdate_(e) {
    e.stopPropagation();
    navigate(`notes/${id}`)
  // updateNote dispatch
  }

  return (
    <div
      onClick={onClick}
      className={`card ${s.container}`}
      style={{ borderColor: isCardHovered ? "#0d6efd" : "transparent" }}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div className="card-body">
        <div className={s.title_row}>
          <h5 className="card-title">{title}</h5>
          <Trash
            size={20}
            onMouseEnter={() => setISTrashHovered(true)}
            onMouseLeave={() => setISTrashHovered(false)}
            style={{ color: isTrashHovered ? "#FF7373" : "#b8b8b8" }}
            onClick={onClickTrash_} // deleteNote_by_Id onclik
          />

          <Pencil
            size={20}
            onMouseEnter={() => setISUpdateHovered(true)}
            onMouseLeave={() => setISUpdateHovered(false)}
            style={{ color: isUpdateHovered ? "#FF7373" : "#b8b8b8" }}
            onClick={onClickUpdate_} // Update onclik
          />
        </div>
        <h6 className={`card-subtitle mb-2 text-muted`}>{subtitle}</h6>
        <p className={`card-text ${s.text_content}`}>{content}</p>
      </div>
    </div>
  );
}
