import { useState } from "react";
import { auth } from "../../../src/Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { registerUser } from "../../../src/redux/actions/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const initialForm = {
  nombre: "",
  apellido: "",
  email: "",
  contraseña: "",
  ciudad: "",
  direccion: "",
  telefono: "",
  edad: "",
  dni: "",
};
const LoginForm = ({ handleCloseModal, setView }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(initialForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  const handleSubmit = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, form.email, form.contraseña)
      .then((userCredential) => {
        const user = userCredential.user;
        const idToken = user.getIdToken();
        localStorage.setItem("token", idToken);
        localStorage.setItem("email", user.email);
        console.log(user);
        setView("login");
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(registerUser(form));
  };
  const validationsForm = (initialForm) => {
    let errors = {};

    const regexname = /^[a-zA-Z ]+$/;

    if (!initialForm.nombre.trim()) {
      errors.nombre = "El campo del nombre es requerido";
    } else if (!regexname.test(initialForm.nombre.trim()))
      errors.nombre =
        "El campo del nombre solo acepta letras en Mayuscula y Minuscula";

    if (!initialForm.apellido.trim()) {
      errors.apellido = "El campo del apellido es requerido";
    } else if (!regexname.test(initialForm.apellido.trim()))
      errors.apellido =
        "El campo del apellido solo acepta letras en Mayuscula y Minuscula";

    if (!initialForm.telefono) {
      errors.telefono = "El campo del Telefono es requerido";
    } else if (isNaN(initialForm.telefono))
      errors.telefono = "El campo del telefono solo acepta numeros";
    else if (initialForm.telefono.length > 10) {
      errors.telefono = "El Telefono no puede tener mas de 10 numeros";
    }

    if (!initialForm.edad) {
      errors.edad = "El campo edad es requerido";
    } else if (isNaN(initialForm.edad))
      errors.edad = "El campo edad solo acepta numeros";

    return errors;
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
    setError(validationsForm({ ...form, [name]: value }));
  };

  const handleBlur = (event) => {
    handleChange(event);
    setError(validationsForm(form));
  };
  return (
    <div>
      {error.email && <p>{error.email}</p>}
      <div className="form-outline mb-4">
        <input
          type="email"
          name="email"
          id="typeEmailX-2"
          className="form-control form-control-lg"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label className="form-label" htmlFor="typeEmailX-2">
          Email
        </label>
      </div>
      {error.contraseña && <p>{error.contraseña}</p>}
      <div className="form-outline mb-4">
        <input
          type="password"
          name="contraseña"
          id="typePasswordX-2"
          className="form-control form-control-lg"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label className="form-label" htmlFor="typePasswordX-2">
          Password
        </label>
      </div>
      {error.nombre && <p>{error.nombre}</p>}

      <div className="form-outline mb-4">
        <input
          type="text"
          name="nombre"
          className="form-control form-control-lg"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label className="form-label" htmlFor="typeEmailX-2">
          Name
        </label>
      </div>
      {error.apellido && <p>{error.apellido}</p>}
      <div className="form-outline mb-4">
        <input
          type="text"
          name="apellido"
          className="form-control form-control-lg"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label className="form-label" htmlFor="typeEmailX-2">
          SurName
        </label>
      </div>
      {error.ciudad && <p>{error.ciudad}</p>}
      <div className="form-outline mb-4">
        <input
          type="text"
          name="ciudad"
          className="form-control form-control-lg"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label className="form-label" htmlFor="typeEmailX-2">
          City
        </label>
      </div>
      {error.direccion && <p>{error.direccion}</p>}
      <div className="form-outline mb-4">
        <input
          type="text"
          name="direccion"
          className="form-control form-control-lg"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label className="form-label" htmlFor="typeEmailX-2">
          Address
        </label>
      </div>
      {error.telefono && <p>{error.telefono}</p>}
      <div className="form-outline mb-4">
        <input
          type="text"
          name="telefono"
          className="form-control form-control-lg"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label className="form-label" htmlFor="typeEmailX-2">
          Phone Number
        </label>
      </div>
      {error.edad && <p>{error.edad}</p>}
      <div className="form-outline mb-4">
        <input
          type="text"
          name="edad"
          className="form-control form-control-lg"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label className="form-label" htmlFor="typeEmailX-2">
          Edad
        </label>
      </div>
      <hr className="my-4" />
      <button class="button2" type="button" onClick={handleSubmit}>
        Sign Up
      </button>

      {/* <NavLink to={"/Register"}>
        <button class="button2" type="button">
          Sign up
        </button>
      </NavLink> */}

      {/* <button
        className="btn btn-lg btn-block btn-primary"
        style={{ backgroundColor: "#dd4b39" }}
        type="submit"
      > 
        <i className="fab fa-google me-2"></i> Sign in with Google
      </button> */}
    </div>
  );
};

export default LoginForm;
