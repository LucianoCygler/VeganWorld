import style from "./Comments.module.css";
import { useSelector } from "react-redux";

const CustomerComments = () => {
  const customerComments = useSelector((state) => state.customerComments);

  return (
    <div className={style.divComments}>
      {customerComments.map((custom) => {
        return (
          <>
            <div>{custom.image}</div>
            <div>{custom.comment}</div>
            <div>{custom.nombre}</div>
          </>
        );
      })}
    </div>
  );
};
export default CustomerComments;
