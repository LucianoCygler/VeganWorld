import { useState } from "react";
<<<<<<< Updated upstream
import axios from "axios";
import { registerUser } from "../../../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const useForm = (initialForm, validationsForm) => {
  const [register, setRegister] = useState(initialForm);
  const [error, serError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
=======
import { auth } from "../../../../Firebase/firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { registerUser } from "../../../../redux/actions/actions";
import { useDispatch } from "react-redux";

const useForm = (initialForm, validationsForm) => {
  const [register, setRegister] = useState(initialForm);
  const [error, serError] = useState({});
  const dispatch = useDispatch()


>>>>>>> Stashed changes
  // AGREGAR A FORM LOS DEL EVENTO Y VALUE
  const handleChange = (event) => {
    const { name, value } = event.target;

    setRegister({ ...register, [name]: value });
  };

  const handleBlur = (event) => {
    handleChange(event);
    serError(validationsForm(register));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
<<<<<<< Updated upstream
    dispatch(registerUser(register))
      .then((res) => {
        setRegister(initialForm);
        navigate("/login");
      })
      .catch((error) => {
        alert(error.response.data);
      });
=======
    createUserWithEmailAndPassword(auth, register.email, register.contraseña).then(userCredential=> {
      console.log(userCredential);
    }).catch(error => {
      console.log(error);
    })

    dispatch(registerUser(register))
>>>>>>> Stashed changes
  };

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    register,
    error,
  };
};

export default useForm;
