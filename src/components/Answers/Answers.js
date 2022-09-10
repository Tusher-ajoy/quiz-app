import classes from "./Answer.module.css";

const Answers = ({ opt, value, handleAnsChange }) => {
  return (
    <div className={`col-md-6 ${classes.itemsCenter}`}>
      <input
        type="checkbox"
        name=""
        id={opt}
        value={opt}
        onChange={(e) => handleAnsChange(e)}
      />
      <label htmlFor={opt}>{value}</label>
    </div>
  );
};

export default Answers;
