import { useState } from "react";
import { auth } from "../../../../Firebase/firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { registerUser } from "../../../../redux/actions/actions";
import { useDispatch } from "react-redux";

const useForm = (initialForm, validationsForm) => {
  const [register, setRegister] = useState(initialForm);
  const [error, serError] = useState({});
  const dispatch = useDispatch()


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
    createUserWithEmailAndPassword(auth, register.email, register.contraseña).then(userCredential=> {
      console.log(userCredential);
    }).catch(error => {
      console.log(error);
    })

    dispatch(registerUser(register))
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
