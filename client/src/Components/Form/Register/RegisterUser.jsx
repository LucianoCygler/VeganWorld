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

  const regexname = /^[a-zA-Z]+$/;

  if (!initialForm.nombre.trim()) {
    errors.nombre = "El campo del nombre es requerido";
  } else if (!regexname.test(initialForm.nombre.trim()))
    errors.nombre = "El campo del nombre solo acepta letras en Mayuscula y Minuscula";

  if (!initialForm.apellido.trim()) {
    errors.apellido = "El campo del apellido es requerido";
  } else if (!regexname.test(initialForm.apellido.trim()))
    errors.apellido = "El campo del apellido solo acepta letras en Mayuscula y Minuscula";

  return errors;
};
/* */


const RegisterUser = () => {
  const { register, error, handleChange, handleBlur, handleSubmit } = useForm(
    initialForm,
    validationsForm
  );

//!borrar consolelog luego
console.log(register);


  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div classname={style.div1}> Nombre</div>
      <div classname={style.div2}>
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

      <div classname={style.div3}> Apellido</div>
      <div classname={style.div4}>
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

      <div classname={style.div9}> Ciudad</div>
      <div classname={style.div10}>

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

      <div classname={style.div11}> Dirección</div>
      <div classname={style.div12}>

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

      <div classname={style.div13}> Telefono</div>
      <div classname={style.div14}>

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

      <div classname={style.div15}> Edad</div>
      <div classname={style.div16}>

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

      <div classname={style.div17}> DNI</div>
      <div classname={style.div18}>
    
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
        <button>Sing In</button>
      </div>
    </form>
  );
};

export default RegisterUser;
