import { useState } from "react";
import { auth } from "../../../src/Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { registerUser } from "../../../src/redux/actions/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Input, FormControl, FormLabel, FormErrorMessage, Button, Box } from "@chakra-ui/react";



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
  const [errors, setErrors] = useState(initialForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(errors).some(error => error)) {
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

  const validationsForm = (form) => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexname = /^[a-zA-Z ]+$/;
    const regexDireccion = /^[a-zA-Z0-9\s]+$/;

    //EMAIL
    if (!form.email) {
      errors.email = "Email is required";
    } else if (form.email.length > 40) {
      errors.email = "The email exceeds the maximum of 40 characters.";
    } else if (!emailRegex.test(form.email.trim())) {
      errors.email = "Invalid email format";
    }

    //PASSWORD
    if (!form.contraseña) {
      errors.contraseña = "Must create a password";
    } else if (form.contraseña.length > 12 || form.contraseña.length < 6) {
      errors.contraseña = "it must have between 6 and 12 characters";
    }

    //NOMBRE
    if (!form.nombre.trim()) {
      errors.nombre = "Name is required";
    } else if (!regexname.test(form.nombre.trim())) {
      errors.nombre = "Only accepts uppercase and lowercase letters.";
    } else if (form.nombre.length > 15) {
      errors.nombre = "The name exceeds the maximum of 15 characters.";
    }

    //APELLIDO
    if (!form.apellido.trim()) {
      errors.apellido = "The surname is required";
    } else if (!regexname.test(form.apellido.trim())) {
      errors.apellido = "Only accepts uppercase and lowercase letters.";
    } else if (form.apellido.length > 15) {
      errors.apellido = "The surname exceeds the maximum of 15 characters.";
    }


    //TELEFONO 
    if (!form.telefono) {
      errors.telefono = "The Phone field is required.";
    } else if (isNaN(form.telefono))
      errors.telefono = "The Phone field only accepts numbers.";
    else if (form.telefono.length > 10) {
      errors.telefono = "The Phone cannot have more than 10 digits.";
    }

    //CIUDAD
    if (!form.ciudad) {
      errors.ciudad = "City is required"
    } else if (!regexname.test(form.ciudad.trim())) {
      errors.ciudad = "Only accepts uppercase and lowercase letters."
    } else if (form.ciudad.length > 20) {
      errors.ciudad = "The city exceeds the maximum of 20 characters."
    }

    //DIRECCION
    if (!form.direccion) {
      errors.direccion = "Adress is required"
    } else if (!regexDireccion.test(form.direccion.trim())) {
      errors.direccion = "Only accepts uppercase and lowercase letters."
    } else if (form.direccion.length > 20) {
      errors.direccion = "The Adress exceeds the maximum of 20 characters."
    }

    //EDAD
    const edad = parseInt(form.edad)
    if (!form.edad) {
      errors.edad = "The age is required";
    } else if (isNaN(form.edad)) {
      errors.edad = "Only numbers accepts";
    } else if (edad > 100 || edad < 18) {
      errors.edad = "you must be over 18 and under 100 years old"
    } else if (form.edad.length > 2) {
      errors.edad = "you must be over 18 and under 100 years old"
    }

    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    const fieldErrors = validationsForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: fieldErrors[name] });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const fieldErrors = validationsForm(form);
    if (!value.trim()) {
      delete fieldErrors[name];
    }
    setErrors({ ...errors, [name]: fieldErrors[name] });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <FormControl mb={4} isInvalid={errors.email}>
        <FormLabel htmlFor="typeEmailX-2">Email</FormLabel>
        <Input
          placeholder="Email here..."
          type="email"
          name="email"
          id="typeEmailX-2"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
      </FormControl>

      <FormControl mb={4} isInvalid={errors.contraseña}>
        <FormLabel htmlFor="typePasswordX-2">Password</FormLabel>
        <Input
          placeholder="Password here..."
          type="password"
          name="contraseña"
          id="typePasswordX-2"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.contraseña && <FormErrorMessage>{errors.contraseña}</FormErrorMessage>}
      </FormControl>

      <FormControl mb={4} isInvalid={errors.nombre}>
        <FormLabel htmlFor="typeNameX-2">Name</FormLabel>
        <Input
          placeholder="Name here..."
          type="text"
          name="nombre"
          id="typeNameX-2"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.nombre && <FormErrorMessage>{errors.nombre}</FormErrorMessage>}
      </FormControl>

      <FormControl mb={4} isInvalid={errors.apellido}>
        <FormLabel htmlFor="typeSurnameX-2">SurName</FormLabel>
        <Input
          placeholder="Surname here..."
          type="text"
          name="apellido"
          id="typeSurnameX-2"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.apellido && <FormErrorMessage>{errors.apellido}</FormErrorMessage>}
      </FormControl>

      <FormControl mb={4} isInvalid={errors.ciudad}>
        <FormLabel htmlFor="typeCityX-2">City</FormLabel>
        <Input
          placeholder="City here..."
          type="text"
          name="ciudad"
          id="typeCityX-2"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.ciudad && <FormErrorMessage>{errors.ciudad}</FormErrorMessage>}
      </FormControl>

      <FormControl mb={4} isInvalid={errors.direccion}>
        <FormLabel htmlFor="typeAddressX-2">Address</FormLabel>
        <Input
          placeholder="Address here..."
          type="text"
          name="direccion"
          id="typeAddressX-2"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.direccion && <FormErrorMessage>{errors.direccion}</FormErrorMessage>}
      </FormControl>

      <FormControl mb={4} isInvalid={errors.telefono}>
        <FormLabel htmlFor="typePhoneX-2">Phone Number</FormLabel>
        <Input
          placeholder="Phone here..."
          type="text"
          name="telefono"
          id="typePhoneX-2"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.telefono && <FormErrorMessage>{errors.telefono}</FormErrorMessage>}
      </FormControl>

      <FormControl mb={4} isInvalid={errors.edad}>
        <FormLabel htmlFor="typeAgeX-2">Age</FormLabel>
        <Input
          placeholder="Age here..."
          type="text"
          name="edad"
          id="typeAgeX-2"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.edad && <FormErrorMessage>{errors.edad}</FormErrorMessage>}
      </FormControl>

      <hr className="my-4" />
      <Button className="button2" type="button" onClick={handleSubmit}>
        Sign Up
      </Button>
    </Box>
  );
};

export default LoginForm;