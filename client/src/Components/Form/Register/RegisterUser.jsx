
import useForm from "./UseForm/UseForm";
import style from "./RegisterUser.module.css"


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
      errors.name =
        "El campo del nombre solo acepta letras en Mayuscula y Minuscula";
  
    if (!form.image.trim()) {
      errors.image = "El campo de la image es requerido";
    } else if (!regexEmail.test(form.image.trim()))
      errors.image = "No es un enlace URL correcto";
  
    return errors;
  };
  
  /* */





const RegisterUser = () => {
    
    const {
        register,
        error,
        setRegister,
        handleChange,
        handleBlur,
        handleSubmit,
      } = useForm(initialForm, validationsForm);




  return (
    <form className={style.form}>
      
        <div classname={style.div1}> Nombre</div>
        <div classname={style.div2}> <input type="text" value={register.name} name="name" placeholder="Ingrese Nombre"/></div>

        <div classname={style.div3}> Apellido</div>
        <div classname={style.div4}> <input type="text" value={register.lastname} name="lastname" placeholder="Ingrese Nombre"/></div>

        <div classname={style.div5}> Correo Electronico </div>
        <div classname={style.div6}><input type="text" value={register.email} name="email" placeholder="Ingrese Correo Electronico..."/></div>

        <div classname={style.div7}> Contraseña </div>
        <div classname={style.div8}> <input type="Password" value={register.password} name="password"  placeholder="Ingrese una contraseña"/></div>

        <div classname={style.div9}> Ciudad</div>
        <div classname={style.div10}> <input type="text" value={register.city} name="city"  placeholder="Ingrese su ciudad"/></div>

        <div classname={style.div11}> Dirección</div>
        <div classname={style.div12}> <input type="text" value={register.direction} name="direction"  placeholder="Ingrese su dirección"/></div>

        <div classname={style.div13}> Telefono</div>
        <div classname={style.div14}> <input type="text" value={register.telephone} name="telephone"  placeholder="Ingrese su teléfono"/></div>

        <div classname={style.div15}> Edad</div>
        <div classname={style.div16}> <input type="text" value={register.age} name="age"  placeholder="Ingrese edad"/></div>

        <div classname={style.div17}> DNI</div>
        <div classname={style.div18}> <input type="text" value={register.dni} name="dni"  placeholder="Ingrese su DNI"/></div>

        <div classname={style.div19}><button>Sing In</button> </div>

    </form>
  );
};


export default RegisterUser
