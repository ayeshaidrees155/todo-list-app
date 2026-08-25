import React from "react";
import "./style.css";
import { LuNotepadText } from "react-icons/lu";

export default function Header() {
  const handelLogout = () => {
    localStorage.removeItem("isLoggenIn");
    localStorage.removeItem("loggedUser");
    window.location.href = "/login";
  };

  return (
    <div className="navBar">
      <div className="logo">
        <LuNotepadText className="logoIcon" />
      </div>
      <div className="logOutSec">
        <div className="circle"></div>
        <button onClick={handelLogout} className="logoutBtn">
          Logout
        </button>
      </div>
    </div>
  );
}
