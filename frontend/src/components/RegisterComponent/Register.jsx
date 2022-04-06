import "./register.css";
import { useRef, useState } from "react";
import PinDropIcon from "@mui/icons-material/PinDrop";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const Register = ({ setShowRegister }) => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("https://kedarmakepins.herokuapp.com/api/users/register", newUser);
      setFailure(false);
      setSuccess(true);
    } catch (err) {
      setFailure(true);
    }
  };

  return (
    <div className="register-container">
      <div className="logo">
        <PinDropIcon className="pin-drop" />
        <h4>KedPin</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="username"
          type="text"
          placeholder="Username"
          ref={nameRef}
        />
        <input
          className="email"
          type="email"
          placeholder="email"
          ref={emailRef}
        />
        <input
          className="password"
          type="password"
          placeholder="password"
          ref={passwordRef}
        />
        <button>Register</button>

        {success && (
          <span className="success">Successfull. You can login now!</span>
        )}
        {failure && <span className="failure"> Something went wrong!</span>}
      </form>
      <CancelIcon
        className="cancel-register"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
};

export default Register;
