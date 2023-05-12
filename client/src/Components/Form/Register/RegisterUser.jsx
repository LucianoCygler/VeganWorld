import useForm from "./UseForm/UseForm";
import style from "./RegisterUser.module.css";

const initialForm = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  city: "",
  direction: "",
  telephone: "",
  age: "",
  dni: "",
};

//validación con REGEX
const validationsForm = (form) => {
  let errors = {};

  const regexname = /^[a-zA-Z]+$/;
  const regexEmail = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

  if (!form.name.trim()) {
    errors.name = "El campo del nombre es requerido";
  } else if (!regexname.test(form.name.trim()))
    errors.name = "El campo del nombre solo acepta letras en Mayuscula y Minuscula";

  if (!form.lastname.trim()) {
    errors.lastname = "El campo del apellido es requerido";
  } else if (!regexEmail.test(form.image.trim()))
    errors.lastname = "El campo del apellido solo acepta letras en Mayuscula y Minuscula";

  return errors;
};

/* */

const RegisterUser = () => {
  const { register, error, handleChange, handleBlur, handleSubmit } = useForm(
    initialForm,
    validationsForm
  );

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div classname={style.div1}> Nombre</div>
      <div classname={style.div2}>
        {" "}
        <input
          type="text"
          value={register.name}
          name="name"
          placeholder="Ingrese Nombre"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {error.name && <p>{error.name}</p>}

      <div classname={style.div3}> Apellido</div>
      <div classname={style.div4}>
        {" "}
        <input
          type="text"
          value={register.lastname}
          name="lastname"
          placeholder="Ingrese Nombre"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {error.lastname && <p>{error.lastname}</p>}

      <div classname={style.div5}> Correo Electronico </div>
      <div classname={style.div6}>
        <input
          type="text"
          value={register.email}
          name="email"
          placeholder="Ingrese Correo Electronico..."
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {error.email && <p>{error.email}</p>}

      <div classname={style.div7}> Contraseña </div>
      <div classname={style.div8}>
        {" "}
        <input
          type="Password"
          value={register.password}
          name="password"
          placeholder="Ingrese una contraseña"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {error.password && <p>{error.password}</p>}

      <div classname={style.div9}> Ciudad</div>
      <div classname={style.div10}>
        {" "}
        <input
          type="text"
          value={register.city}
          name="city"
          placeholder="Ingrese su ciudad"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {error.city && <p>{error.city}</p>}

      <div classname={style.div11}> Dirección</div>
      <div classname={style.div12}>
        {" "}
        <input
          type="text"
          value={register.direction}
          name="direction"
          placeholder="Ingrese su dirección"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {error.direction && <p>{error.direction}</p>}

      <div classname={style.div13}> Telefono</div>
      <div classname={style.div14}>
        {" "}
        <input
          type="text"
          value={register.telephone}
          name="telephone"
          placeholder="Ingrese su teléfono"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {error.telephone && <p>{error.telephone}</p>}

      <div classname={style.div15}> Edad</div>
      <div classname={style.div16}>
        {" "}
        <input
          type="text"
          value={register.age}
          name="age"
          placeholder="Ingrese edad"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {error.age && <p>{error.age}</p>}

      <div classname={style.div17}> DNI</div>
      <div classname={style.div18}>
        {" "}
        <input
          type="text"
          value={register.dni}
          name="dni"
          placeholder="Ingrese su DNI"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {error.dni && <p>{error.dni}</p>}

      <div classname={style.div19}>
        <button>Sing In</button>{" "}
      </div>
    </form>
  );
};

export default RegisterUser;
