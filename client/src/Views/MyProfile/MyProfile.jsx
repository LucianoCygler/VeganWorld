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
  const [editedAdress, setEditedAdress] = useState(direccion || "");

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
      direccion: editedAdress,
    };
    dispatch(updateClientData(id, newUser));
    alert("Client Data updated");
    setEditMode(false);
    window.location.reload();
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    } else {
     
      dispatch(getClientData(user));
    }
    return () => {
      dispatch( cleanClient_Id ())
     }
  }, [dispatch, id]);
  return (
    <div className={style.container}>
      {editMode ? (
        <div className={style.edit}>
          First Name:
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          Surname:
          <input
            type="text"
            value={editedSurname}
            onChange={(e) => setEditedSurname(e.target.value)}
          />
          Email:
          <input
            type="text"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
          Phone:
          <input
            type="text"
            value={editedPhone}
            onChange={(e) => setEditedPhone(e.target.value)}
          />
          City:
          <input
            type="text"
            value={editedCity}
            onChange={(e) => setEditedCity(e.target.value)}
          />
          Adress
          <input
            type="text"
            value={editedAdress}
            onChange={(e) => setEditedAdress(e.target.value)}
          />
          {!dni ? (
            " "
          ) : (
            <>
              DNI:
              <input
                type="text"
                value={editedDNI}
                onChange={(e) => setEditedDNI(e.target.value)}
              />
            </>
          )}
            <button className={style.save} onClick={handleSaveUser}>Save Data
        </button>
          {/* <button onClick={handleSaveUser}>Save Data</button> */}
        </div>
      ) : (
        <div className={style.c}>
          <h1>My Profile</h1>
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
            <span style={{ fontWeight: "bold" }}> Phone Number: </span>
            {direccion}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}> City: </span>
            {ciudad}
          </p>
          {!dni ? (
            " "
          ) : (
            <p>
              <span style={{ fontWeight: "bold" }}> DNI: </span> {dni}
            </p>
          )}
          <button className={style.save}  onClick={handleEditUser}>Edit User</button>
        </div>
      )}
    </div>
  );
};

export default MyData;
