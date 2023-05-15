import style from "./Comments.module.css";

const CustomerComments = ({commentsToShow}) => {
  
  return (
    <div className={style.divComments}>
      {commentsToShow.map((custom) => {
        return (
          <>
            <div>{custom.comment}</div>
            <div>{custom.nombre}</div>
          </>
        );
      })}
    </div>
  );
};
export default CustomerComments;
