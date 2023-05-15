import { useState } from "react";
import axios from "axios";
import { registerUser } from "../../../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const useForm = (initialForm, validationsForm) => {
  const [register, setRegister] = useState(initialForm);
  const [error, serError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    dispatch(registerUser(register))
      .then((res) => {
        setRegister(initialForm);
        navigate("/login");
      })
      .catch((error) => {
        alert(error.response.data);
      });
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
