import { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const handelSignIn = (e) => {
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

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
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
  const validateForm = (e) => {
    const newErrors = {};
    const passwordPattern = /^[a-zA-Z0-9]+$/;
    if (!formData.userName.trim()) {
      newErrors.userName = "Enter  username here.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Enter password here.";
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password = "Password must not contains invalid symbols";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="loginFormSec">
      <div className="FormContainer">
        <div className="signin">
          <h1>Log In </h1>
        </div>
        <div className="haveAcc">
          <p>Have an account?</p>
        </div>
        <form onSubmit={handelSignIn} id="login-form">
          <input
            type="text"
            value={formData.userName}
            onChange={handleChange}
            name="userName"
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
        </form>
        <div className="forgetPass">
          <p>Forget your password?</p>
        </div>
        <button id="btnSignin" form="login-form">
          Sign In
        </button>
        <div className="newAcc">
          <Link to="/signup">OR Create a New Account</Link>
        </div>
      </div>
    </div>
  );
}
