import useForm from "./UseForm/UseForm";
import style from "./RegisterUser.module.css";


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

//validación con REGEX
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

  return errors;
};
/* */

const RegisterUser = () => {
  const { register, error, handleChange, handleBlur, handleSubmit } = useForm(
    initialForm,
    validationsForm
  );

  return (
    <div className={style.contenedorprincipal}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.div1}> Nombre</div>
        <div className={style.div2}>
          <input
            type="text"
            value={register.nombre}
            name="nombre"
            placeholder="Ingrese Nombre"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {error.nombre && <p>{error.nombre}</p>}

        <div className={style.div3}> Apellido</div>
        <div className={style.div4}>
          <input
            type="text"
            value={register.apellido}
            name="apellido"
            placeholder="Ingrese Apellido"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {error.apellido && <p>{error.apellido}</p>}

        <div className={style.div5}> Correo Electronico </div>
        <div className={style.div6}>
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

        <div className={style.div7}> Contraseña </div>
        <div className={style.div8}>
          <input
            type="Password"
            value={register.contraseña}
            name="contraseña"
            placeholder="Ingrese una contraseña"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {error.contraseña && <p>{error.contraseña}</p>}

        <div className={style.div9}> Ciudad</div>
        <div className={style.div10}>
          <input
            type="text"
            value={register.ciudad}
            name="ciudad"
            placeholder="Ingrese su ciudad"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {error.ciudad && <p>{error.ciudad}</p>}

        <div className={style.div11}> Dirección</div>
        <div className={style.div12}>
          <input
            type="text"
            value={register.direccion}
            name="direccion"
            placeholder="Ingrese su dirección"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {error.direccion && <p>{error.direccion}</p>}

        <div className={style.div13}> Telefono</div>
        <div className={style.div14}>
          <input
            type="text"
            value={register.telefono}
            name="telefono"
            placeholder="Ingrese su teléfono"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {error.telefono && <p>{error.telefono}</p>}

        <div className={style.div15}> Edad</div>
        <div className={style.div16}>
          <input
            type="text"
            value={register.edad}
            name="edad"
            placeholder="Ingrese edad"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {error.edad && <p>{error.edad}</p>}

        {/* <div className={style.div17}> DNI</div>
        <div className={style.div18}>
          <input
            type="text"
            value={register.dni}
            name="dni"
            placeholder="Ingrese su DNI"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div> */}
        {/* {error.dni && <p>{error.dni}</p>} */}

        <div className={style.div19}>
          <button className={style.buttonlogin}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
