import classes from "./ProgressBar.module.css";

const ProgressBar = ({ next, prev, progress, submit }) => {
  return (
    <div className="my-4 d-flex justify-content-between align-items-center">
      <button className="buttons" onClick={prev}>
        ← last question
      </button>
      <progress
        className={classes.progressBar}
        value={progress}
        max="100"
      ></progress>
      <button
        className="buttons"
        type="submit"
        onClick={progress === 100 ? submit : next}
      >
        {progress === 100 ? "submit" : "next question →"}
      </button>
    </div>
  );
};

export default ProgressBar;
