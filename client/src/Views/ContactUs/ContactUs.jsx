import { useEffect, useState } from "react";
import style from "./ContactUs.module.css";

const formContactUser = {
  name: "",
  email: "",
  textContainer: "",
};
const ContactUs = () => {
  const comment = []
  const [form, setForm] = useState(formContactUser);

  const [error, setError] = useState(formContactUser);

  const validations = (form) => {
    let reg = /^[a-zA-Z\s]*$/;

    let regEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    const error = {};

    if (!form.name) {
      error.name = "Name is required in this field";
    }
    if (!reg.test(form.name)) {
      error.name = "Numbers or special characters are not allowed";
    }
    if (form.name.length > 20) {
      error.name = "the name can't longer than 20 characters";
    }
    if (!form.email) {
      error.email = "Email is required in this field";
    } else if (!regEmail.test(form.email)) {
      error.email =
      "In this field it is only required to write text please. No numbers or special characters are allowed";
    }
    if (!form.textContainer) {
      error.textContainer = "Write your comment is necessary";
    }else if (form.textContainer.length < 5) {
      error.textContainer = "Enter a little more text please tell us more about your opinion";
    }
    if (!reg.test(form.textContainer)) {
      error.textContainer = "Numbers or special characters are not allowed";
    }
    return error;
  };

  useEffect(() => {
    setError(validations(form));
  }, [form]);

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property]: value,
    });
    setError(validations({ ...form, [property]: value }));
  };

  const submitHandler = (event) => {
    event.prebenDeFault();
    if (
      Object.keys(error).length === 0 &&
      form.name.length &&
      form.textContainer.length
    ) {
      comment.push(form)
      alert("Thanks for your time. Good job!");
      setForm(formContactUser);
    } else {
      alert("Error, it is necessary that you validate all the fields please");
    }
  };

  return (

    <form id="fm" onSubmit={submitHandler}>
       <div className={style.ma} >
                <iframe className={style.map}  src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJu8oXNbJMbDkRHVYbLDveBHI&key=AIzaSyB7nR1mbT0--BkKc9rs_Fa0eQF6tYc1kFI" allowfullscreen></iframe>
            </div>
      <div className={style.contenedor}>

        <div className={style.form_left_container}>
          <h1 className={style.h1}>We want to know your opinion write us</h1>

          <div className={style.formdiv}>
            <label htmlFor="name">Name: </label>

            <input
              name="name"
              type="text"
              value={form.name}
              onChange={(e) => changeHandler(e)}
              style={
                form.name.length
                  ? error.name
                    ? { borderColor: "#e74c3c" }
                    : { borderColor: "#2ecc71" }
                  : []
              }
              autocomplete="off"
              placeholder="NAME"
              required
            />
            {error.name ? (
              <div>
                <i
                  className="fas fa-exclamacion-circle"
                  style={{ color: "#e74c3c" }}
                ></i>
                <p>{error.name}</p>
              </div>
            ) : form.name.length ? (
              <i
                className="fas fa-check-circle"
                style={{ color: "#2ecc71" }}
              ></i>
            ) : (
              <i></i>
            )}
          </div>

          <div className={style.formdiv}>
            <label htmlFor="email">Emil: </label>

            <input
              name="email"
              type="text"
              value={form.email}
              onChange={(e) => changeHandler(e)}
              style={
                form.email.length
                  ? error.email
                    ? { borderColor: "#e74c3c" }
                    : { borderColor: "#2ecc71" }
                  : []
              }
              autocomplete="off"
              placeholder="EMAIL"
              required
            />
            {error.email ? (
              <div>
                <i
                  className="fas fa-exclamacion-circle"
                  style={{ color: "#e74c3c" }}
                ></i>
                <p>{error.email}</p>
              </div>
            ) : form.email.length ? (
              <i
                className="fas fa-check-circle"
                style={{ color: "#2ecc71" }}
              ></i>
            ) : (
              <i></i>
            )}
          </div>
        </div>
        <div className={style.form_right_container}>
          <label htmlFor="textContainer"> 
          </label>
          <textarea
            name="textContainer"
            type="text"
            value={form.textContainer}
            onChange={(e) => changeHandler(e)}
            style={
              form.textContainer.length
                ? error.textContainer
                  ? { borderColor: "#e74c3c" }
                  : { borderColor: "#2ecc71" }
                : []
            }
            autocomplete="off"
            placeholder="TEXT"
            required
          />
          {error.textContainer ? (
            <div>
              <i
                className="fas fa-exclamacion-circle"
                style={{ color: "#e74c3c" }}
              ></i>
              <p>{error.textContainer}</p>
            </div>
          ) : form.textContainer.length ? (
            <i className="fas fa-check-circle" style={{ color: "#2ecc71" }}></i>
          ) : (
            <i></i>
          )}
        </div>

        <button className={style.create} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactUs;
