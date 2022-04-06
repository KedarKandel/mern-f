import "./login.css";
import axios from "axios";
import { useRef, useState } from "react";
import PinDropIcon from "@mui/icons-material/PinDrop";
import CancelIcon from "@mui/icons-material/Cancel";



const Login = ({ setShowLogin, myStorage, setCurrentUser }) => {
  const [failure, setFailure] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("https://kedarmakepins.herokuapp.com/api/users/login", user);
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setShowLogin(false);
      setFailure(false);
      window.location.reload();
    } catch (err) {
      setFailure(true);
    }
  };

  return (
    <div className="login-container">
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
          className="password"
          type="password"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="login-btn">Login</button>

        {failure && <span className="failure"> Something went wrong!</span>}
      </form>
      <CancelIcon
        className="cancel-login"
        onClick={() => setShowLogin(false)}
      />
    </div>
  );
};

export default Login;
