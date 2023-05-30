import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPageReview } from "../../redux/actions/actions";
const CreatePageReview = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    title: "",
    desc: "",
  });
  const [error, setError] = useState({
    title: "",
    desc: "",
  });

  const validate = (input, error) => {
    const errors = { ...error };

    if (!input.title) errors.title = "*This input is mandatory.";
    else if (!/^[a-zA-Z]+$/.test(input.title)) {
      errors.title = "This input must have only letters";
    } else errors.title = "";

    if (!input.desc) errors.desc = "*This input is mandatory.";
    else errors.desc = "";

    return errors;
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(validate({ ...input, [e.target.name]: e.target.value }, error));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(createPageReview(input));
      setInput({
        title: "",
        desc: "",
      });
    } catch (error) {
      alert(error.message);
    }
    return;
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="div--form">
          <label htmlFor="title" className="label">
            Name:{" "}
          </label>
          <input
            className="input"
            type="text"
            name="title"
            onChange={handleChange}
            value={input.value}
          />
          <span className="span--form">{error.name}</span>
        </div>
        <div className="div--form">
          <label htmlFor="desc" className="label">
            Name:{" "}
          </label>
          <input
            className="input"
            type="text"
            name="desc"
            onChange={handleChange}
            value={input.value}
          />
          <span className="span--form">{error.name}</span>
        </div>
        {error.title || error.desc ? (
          <div>
            <h3>Errors founded.</h3>
            <h2>Please make sure to complete every field and try again.</h2>
          </div>
        ) : (
          <>
            <button type="submit" className="btn--form">
              Submit
            </button>
          </>
        )}
      </form>
    </>
  );
};
export default CreatePageReview;
