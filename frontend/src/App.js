


import "./App.css";
import Map, { Marker, Popup } from "react-map-gl";
import { useState, useEffect } from "react";
/* eslint-disable import/no-webpack-loader-syntax */

import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import CancelIcon from "@mui/icons-material/Cancel";
import * as dayjs from "dayjs";
import Login from "./components/LoginComponent/Login";
import Register from "./components/RegisterComponent/Register";

import relativeTime from "dayjs/plugin/relativeTime";



// import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
// import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';

// mapboxgl.workerClass = MapboxWorker;




dayjs.extend(relativeTime);

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));

  //states for marker and popup
  const [pins, setPins] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [newPlace, setNewPlace] = useState();

  // states for Add Pin
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);

  //show register hook

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  //show login hook

  // viewport state
  const [viewState, setViewState] = useState({
    longitude: 17,
    latitude: 53,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("https://kedarmakepins.herokuapp.com/api/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentId(id);
  };

  const handleAddPlace = (e) => {
    setNewPlace({
      long: e.lngLat.lng,
      lat: e.lngLat.lat,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      const res = await axios.post("https://kedarmakepins.herokuapp.com/api/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
    window.location.reload();
  };

  return (
    <div className="container">
      <Map
        {...viewState}
        style={{ width: "100vw", height: "100vh" }}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onDblClick={handleAddPlace}
        transitionDuration="200"
      >
        {pins.map((p) => (
          <div key={p._id}>
            <Marker
              longitude={p.long}
              latitude={p.lat}
              color={p.username === currentUser ? "red" : "slateblue"}
              onClick={() => handleMarkerClick(p._id)}
            ></Marker>
            {p._id === currentId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentId(null)}
              >
                <div className="pin-card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<StarIcon className="star" />)}
                  </div>
                  <label>Information</label>
                  <span>
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{dayjs(p.createdAt).fromNow()}</span>
                  <CancelIcon className="cancel-icon" />
                </div>
              </Popup>
            )}
          </div>
        ))}
        {currentUser && newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="left"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Share something about the place"
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="addpin-btn" type="submit">
                  Add Pin
                </button>
              </form>
              <CancelIcon className="cancel-icon" />
            </div>
          </Popup>
        )}

        {currentUser ? (
          <button
            type="submit"
            className="button logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>

            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}

        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </Map>
    </div>
  );
}

export default App;
