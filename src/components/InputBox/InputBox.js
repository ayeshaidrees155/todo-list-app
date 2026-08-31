import React, { useEffect, useState } from "react";
import "./style.css";
import { PiBookDuotone } from "react-icons/pi";

export default function InputBox({ onAdd, taskToEdit, isEditing }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setText(taskToEdit.text);
    } else {
      setText("");
    }
  }, [taskToEdit]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    let updatedValue = value;
    if (value.length > 0) {
      updatedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
    }
    setText(updatedValue);
  };

  const handleAdditem = (e) => {
    e.preventDefault();
    if (text.length === 0) return;

    // prop
    onAdd(text);
    setText("");
  };

  return (
    <div className="inputParent">
      <div className="inputBox">
        <form
          onSubmit={handleAdditem}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div className="iconInputSec">
            <div className="iconDiv">
              <PiBookDuotone className="inputIcon" />
            </div>
            <input
              onChange={handleInputChange}
              className="textInput"
              value={text}
              type="text"
              placeholder={isEditing ? "Update Task" : "New Todo"}
              style={{ fontSize: "16px", width: "100%" }}
            />
          </div>

          <button type="submit" className="addBtn">
            {isEditing ? "Update Task" : "Add New Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
