import { useState } from "react";
import "../LoginForm/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;
    if (name === "userName" && value.length > 0) {
      updatedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    setFormData({ ...formData, [name]: updatedValue });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    const passwordPattern = /^[a-zA-Z0-9]+$/;
    if (!formData.userName.trim()) {
      newErrors.userName = "Enter username here.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Enter password here.";
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password = "Password must not contains invalid symbols";
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Enter password again.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Password doesn't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handelSignUp = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    //for greeting msg
    localStorage.setItem("loggedUser", formData.userName);
    navigate("/todo");
  };

  return (
    <div className="loginFormSec">
      <div className="FormContainer">
        <div className="signin">
          <h1>Sign Up </h1>
        </div>
        <form id="signup-form" onSubmit={handelSignUp}>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            id="userName"
            placeholder="Username"
            className="userName"
          />
          {errors.userName && (
            <p
              style={{
                color: "red",
                padding: 0,
                margin: 0,
                fontSize: "smaller",
              }}
            >
              {errors.userName}
            </p>
          )}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            placeholder="Password"
          />
          {errors.password && (
            <p
              style={{
                color: "red",
                padding: 0,
                margin: 0,
                fontSize: "smaller",
              }}
            >
              {errors.password}
            </p>
          )}
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p
              style={{
                color: "red",
                padding: 0,
                margin: 0,
                fontSize: "smaller",
              }}
            >
              {errors.confirmPassword}
            </p>
          )}
        </form>

        <button form="signup-form" id="btnSignin" style={{ margin: "12px" }}>
          Sign Up
        </button>
        <div className="newAcc">
          <p style={{ textDecoration: "underline", fontSize: "14px" }}>
            <Link to="/login"> Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
