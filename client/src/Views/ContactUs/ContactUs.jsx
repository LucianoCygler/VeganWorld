import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./ContactUs.module.css";

import { sendEmail } from "../../redux/actions/actions";

import axios from "axios";

const formContactUser = {
  name: "",
  email: "",
  textContainer: "",
};
const ContactUs = () => {
  const dispatch = useDispatch();
  const comment = [];
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
      error.email = "check your email please";
    }
    if (!form.textContainer) {
      error.textContainer = "Write your comment is necessary";
    } else if (form.textContainer.length < 5) {
      error.textContainer =
        "Enter a little more text please tell us more about your opinion";
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
    event.preventDefault();
    if (
      Object.keys(error).length === 0 &&
      form.name.length &&
      form.textContainer.length
    ) {
      dispatch(sendEmail(form, 'contact'));
      alert("Thanks for your time. Good job!");
      setForm(formContactUser);
    } else {
      alert("Error, it is mandatory that you validate all the fields please");
    }
  };

  return (
    <div>
      <form id="fm" onSubmit={submitHandler}>
        <div className={style.contenedor}>
          <div className={style.form_left_container}>
            <h1 className={style.h1}>Contact us via email!</h1>

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
            <label htmlFor="textContainer"></label>
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
              <i
                className="fas fa-check-circle"
                style={{ color: "#2ecc71" }}
              ></i>
            ) : (
              <i></i>
            )}
          </div>

          <button className={style.create} type="submit">
            Submit
          </button>
        </div>
        <div className={style.ma}>
          <iframe
            className={style.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.7037906996197!2d-58.4969135!3d-34.636925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc93bc88e4279%3A0xc6e4c5cf528aa9fb!2sMundo%20Vegano!5e0!3m2!1ses!2sar!4v1684131909184!5m2!1ses!2sar"
            allowfullscreen
          ></iframe>
        </div>
      </form>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.703969221664!2d-58.497814741769595!3d-34.63692048947491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc93bc88e4279%3A0xc6e4c5cf528aa9fb!2sMundo%20Vegano!5e0!3m2!1ses!2sar!4v1684369093537!5m2!1ses!2sar"
        width={400}
        height={300}
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default ContactUs;
