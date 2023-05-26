import { useState } from "react";
import { auth } from "../../../src/Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { registerUser } from "../../../src/redux/actions/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


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
    if (Object.keys(error).length > 0) {
      alert("Missing data...")        
    } else {
    createUserWithEmailAndPassword(auth, form.email, form.contraseña)
      .then((userCredential) => {
        setView("login");
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(registerUser(form));
  }
  };
  
  const validationsForm = (initialForm) => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexname = /^[a-zA-Z ]+$/;
    const regexDireccion = /^[a-zA-Z0-9\s]+$/ ;

    //EMAIL
    if (!initialForm.email) {
      errors.email = "Email is required";      
    } else if (initialForm.email.length > 40) {
      errors.email = "The email exceeds the maximum of 40 characters.";
    } else if (!emailRegex.test(initialForm.email.trim())) {
      errors.email = "Invalid email format";
    }
    
    //PASSWORD
    if (!initialForm.contraseña) {
      errors.contraseña = "Must create a password";
    } else if (initialForm.contraseña.length > 12 || initialForm.contraseña.length < 6) {
      errors.contraseña = "it must have between 6 and 12 characters";
    }

    //NOMBRE
    if (!initialForm.nombre.trim()) {
      errors.nombre = "Name is required";
    } else if (!regexname.test(initialForm.nombre.trim())){
      errors.nombre = "Only accepts uppercase and lowercase letters.";
    } else if (initialForm.nombre.length > 15) {
      errors.nombre = "The name exceeds the maximum of 15 characters.";
    }
      
    //APELLIDO
    if (!initialForm.apellido.trim()) {
      errors.apellido = "The surname is required";
    } else if (!regexname.test(initialForm.apellido.trim())) {
      errors.apellido = "Only accepts uppercase and lowercase letters.";
    } else if (initialForm.apellido.length > 15) {
      errors.apellido = "The surname exceeds the maximum of 15 characters.";
    }
      

    //TELEFONO 
    if (!initialForm.telefono) {
      errors.telefono = "The Phone field is required.";
    } else if (isNaN(initialForm.telefono))
      errors.telefono = "The Phone field only accepts numbers.";
    else if (initialForm.telefono.length > 10) {
      errors.telefono = "The Phone cannot have more than 10 digits.";
    }

    //CIUDAD
    if (!initialForm.ciudad) {
      errors.ciudad = "City is required"
    } else if (!regexname.test(initialForm.ciudad.trim())) {
      errors.ciudad = "Only accepts uppercase and lowercase letters."
    } else if (initialForm.ciudad.length > 20) {
      errors.ciudad = "The city exceeds the maximum of 20 characters."
    }

    //DIRECCION
    if (!initialForm.direccion) {
      errors.direccion = "Adress is required"
    } else if (!regexDireccion.test(initialForm.direccion.trim())) {
      errors.direccion = "Only accepts uppercase and lowercase letters."
    } else if (initialForm.direccion.length > 20) {
      errors.direccion = "The Adress exceeds the maximum of 20 characters."
    }

    //EDAD
    const edad = parseInt(initialForm.edad)
    if (!initialForm.edad) {
      errors.edad = "The age is required";
    } else if (isNaN(initialForm.edad)) {
      errors.edad = "Only numbers accepts";
    } else if (edad > 100 || edad < 18) {
      errors.edad = "you must be over 18 and under 100 years old"
    } else if (initialForm.edad.length > 2) {
      errors.edad = "you must be over 18 and under 100 years old"
    }
      

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
     
      
      <div className="form-outline mb-4">
      <label className="form-label" htmlFor="typeEmailX-2">
          Email
        </label>
        <input
          placeholder="Email here..."
          type="email"
          name="email"
          id="typeEmailX-2"          
          className={`form-control form-control-lg ${!error.email ? "" : "is-invalid"}`}
          onChange={handleChange}
          onBlur={handleBlur}
        />        
        {error.email && ( <span className="invalid-feedback">{`${error.email}`}</span> )}                
      </div>
      
      <div className="form-outline mb-4">
      <label className="form-label" htmlFor="typePasswordX-2">
          Password
        </label>
        <input
          placeholder="Password here..."
          type="password"
          name="contraseña"
          id="typePasswordX-2"
          className={`form-control form-control-lg ${!error.contraseña ? "" : "is-invalid"}`}
          onChange={handleChange}
          onBlur={handleBlur}
        />        
        {error.contraseña && ( <span className="invalid-feedback">{`${error.contraseña}`}</span> )}
      </div>
       

      <div className="form-outline mb-4">
      <label className="form-label" htmlFor="typeEmailX-2">
          Name
        </label>
        <input
          placeholder="Name here..."        
          type="text"
          name="nombre"
          className={`form-control form-control-lg ${!error.nombre ? "" : "is-invalid"}`}
          onChange={handleChange}
          onBlur={handleBlur}
        />        
        {error.nombre && ( <span className="invalid-feedback">{`${error.nombre}`}</span> )}
      </div>
      
      <div className="form-outline mb-4">
      <label className="form-label" htmlFor="typeEmailX-2">
          SurName
        </label>
        <input
          placeholder="Surname aqui..."
          type="text"
          name="apellido"
          className={`form-control form-control-lg ${!error.apellido ? "" : "is-invalid"}`}
          onChange={handleChange}
          onBlur={handleBlur}
        />        
        {error.apellido && ( <span className="invalid-feedback">{`${error.apellido}`}</span> )}
      </div>
      
      <div className="form-outline mb-4">
      <label className="form-label" htmlFor="typeEmailX-2">
          City
        </label>
        <input
          placeholder="City aqui..."
          type="text"
          name="ciudad"
          className={`form-control form-control-lg ${!error.ciudad ? "" : "is-invalid"}`}
          onChange={handleChange}
          onBlur={handleBlur}
        />        
        {error.ciudad && ( <span className="invalid-feedback">{`${error.ciudad}`}</span> )}
      </div>
      
      <div className="form-outline mb-4">
      <label className="form-label" htmlFor="typeEmailX-2">
          Address
        </label>
        <input
          placeholder="Address aqui..."
          type="text"
          name="direccion"
          className={`form-control form-control-lg ${!error.direccion ? "" : "is-invalid"}`}
          onChange={handleChange}
          onBlur={handleBlur}
        />        
        {error.direccion && ( <span className="invalid-feedback">{`${error.direccion}`}</span> )}
      </div>
      
      <div className="form-outline mb-4">
      <label className="form-label" htmlFor="typeEmailX-2">
          Phone Number
        </label>
        <input
          placeholder="Phone here..."
          type="text"
          name="telefono"
          className={`form-control form-control-lg ${!error.telefono ? "" : "is-invalid"}`}
          onChange={handleChange}
          onBlur={handleBlur}
        />        
        {error.telefono && ( <span className="invalid-feedback">{`${error.telefono}`}</span> )}
      </div>
      
      <div className="form-outline mb-4">
      <label className="form-label" htmlFor="typeEmailX-2">
          Edad
        </label>
        <input
          placeholder="Edad here..."
          type="text"
          name="edad"
          className={`form-control form-control-lg ${!error.edad ? "" : "is-invalid"}`}
          onChange={handleChange}
          onBlur={handleBlur}
        />        
        {error.edad && ( <span className="invalid-feedback">{`${error.edad}`}</span> )}
      </div>

      <hr className="my-4" />
      <button class="button2" type="button" onClick={handleSubmit}>
        Sign Up
      </button>
      
    </div>
  );
};

export default LoginForm;
