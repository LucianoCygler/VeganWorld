import { useState } from "react";
import axios from "axios";

const useForm = (initialForm, validationsForm) => {
  const [register, setRegister] = useState(initialForm);
  const [error, serError] = useState({});


  // AGREGAR A FORM LOS DEL EVENTO Y VALUE
  const handleChange = (event) => {
    const { name, value } = event.target;

    setRegister({ ...register, [name]: value });
  };


  const handleBlur = (event) => {
    handleChange(event)
    serError(validationsForm(register))
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/client", register)
      .then((res) => {
        alert(res.data.message);
        setRegister(initialForm);
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
    error
  }

};

export default useForm;
