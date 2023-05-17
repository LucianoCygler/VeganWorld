import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientData,
  deleteClient,
  updateClientData,
  cleanClient_Id,
} from "../../redux/actions/actions";
import style from "./MyProfile.module.css";
import { useNavigate } from "react-router-dom";

const MyData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { nombre, apellido, email, direccion, telefono, dni, ciudad, id } =
    user;
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(nombre || "");
  const [editedSurname, setEditedSurname] = useState(apellido || "");
  const [editedEmail, setEditedEmail] = useState(email || "");
  const [editedPhone, setEditedPhone] = useState(telefono || "");
  const [editedCity, setEditedCity] = useState(ciudad || "");
  const [editedDNI, setEditedDNI] = useState(dni || "");
  const [editedAddress, setEditedAddress] = useState(direccion || "");
  const [profileImage, setProfileImage] = useState(null);
  const [selectedUser, setselectedUser] = useState(user);

  const handleEditUser = () => {
    setEditMode(true);
  };

  const handleDeleteUser = () => {
    dispatch(deleteClient(id));
    alert("Account deleted");
    window.location.reload();
  };

  const handleSaveUser = () => {
    const newUser = {
      nombre: editedName,
      apellido: editedSurname,
      email: editedEmail,
      ciudad: editedCity,
      telefono: editedPhone,
      direccion: editedAddress,
      DNI: editedDNI,
    };
    setselectedUser(newUser);
    dispatch(updateClientData(id, newUser));
    alert("Client Data updated");
    setEditMode(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/login");
    } else {
      dispatch(getClientData(id));
    }
  }, [selectedUser]);
  return (
    <div className={style.container}>
      {editMode ? (
        <div className={style.edit}>
          <div className={style.divFlex}>
            <h3 className={style.h3}>First Name:</h3>
            <input
              className={style.input1}
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>
          <div className={style.divFlex}>
            <h3 className={style.h3}>Surname:</h3>
            <input
              className={style.input2}
              type="text"
              value={editedSurname}
              onChange={(e) => setEditedSurname(e.target.value)}
            />
          </div>
          <div className={style.divFlex}>
            <h3 className={style.h3}>Email:</h3>
            <input
              className={style.input3}
              type="text"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </div>
          <div className={style.divFlex}>
            <h3 className={style.h3}>Phone:</h3>
            <input
              className={style.input4}
              type="text"
              value={editedPhone}
              onChange={(e) => setEditedPhone(e.target.value)}
            />
          </div>
          <div className={style.divFlex}>
            <h3 className={style.h3}>City:</h3>
            <input
              className={style.input5}
              type="text"
              value={editedCity}
              onChange={(e) => setEditedCity(e.target.value)}
            />
          </div>
          <div className={style.divFlex}>
            <h3 className={style.h3}>Address</h3>
            <input
              className={style.input6}
              type="text"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
            />
          </div>
          <input
            className={style.input8}
            type="file"
            onChange={handleImageChange}
          />

          <button className={style.buttonEdit} onClick={handleSaveUser}>
            Save Data
          </button>
        </div>
      ) : (
        <div className={style.c}>
          <h1>My Profile</h1>
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <img className={style.input8} src="https://s.alicdn.com/@sc04/kf/Hd45a4a8662ba407f8e4d3ad430722b26j.jpg_960x960.jpg" alt="Default Profile" />
          )}
          <h2>
            {nombre} {apellido}
          </h2>

          <p>
            <span style={{ fontWeight: "bold" }}> Email: </span>
            {email}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}> Phone Number: </span>
            {telefono}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}> City: </span>
            {ciudad}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}> Address: </span>
            {direccion}
          </p>
          {/* {!dni ? (
            " "
          ) : (
            <p>
              <span style={{ fontWeight: "bold" }}> DNI: </span> {dni}
            </p>
          )} */}

          <button className={style.button} onClick={handleEditUser}>
            Edit User
          </button>
        </div>
      )}
    </div>
  );
};

export default MyData;
