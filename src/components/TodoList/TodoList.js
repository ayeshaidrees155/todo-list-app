import React from "react";
import "./Todolist.css";
import { MdEdit, MdDelete } from "react-icons/md";

export default function TodoList({ items, onDel, onEdit }) {
  const hasItems = items && items.length > 0;
  return (
    <div className="todoListSec" style={{ padding: hasItems ? "15px" : "0px" }}>
      <ul className="itemsUl">
        {items?.map((item) => (
          <div key={item.id} className="liDiv">
            <li className="itemli">{item.text}</li>
            <MdEdit className="editIcon" onClick={() => onEdit(item)} />
            <MdDelete className="delIcon" onClick={() => onDel(item.id)} />
          </div>
        ))}
      </ul>
    </div>
  );
}
