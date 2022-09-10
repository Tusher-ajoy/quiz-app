import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import * as Yup from "yup";
import classes from "./UploadModal.module.css";

const UploadModal = ({ modalIsOpen, closeModal }) => {
  const { id, modalOpen } = modalIsOpen;

  //From validation for upload quiz
  const formSchema = Yup.object().shape({
    time: Yup.number().required("quiz time is mandatory"),
    retake: Yup.number().required("retake number is mandatory"),
  });
  const formOption = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOption);
  const { errors } = formState;

  const onSubmit = (data) => {
    const quizData = { ...data, qId: id };

    fetch(`https://quizzzical.herokuapp.com/addQuiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Quiz added successfully");
          window.location.reload(false);
        }
      });
  };
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      className={classes.modalContainer}
      contentLabel="See question modal"
    >
      <form onSubmit={handleSubmit(onSubmit)} className={classes.uploadForm}>
        <label htmlFor="timing">
          <strong>Select quiz timing :</strong>
        </label>
        <select
          name="timing"
          {...register("timing")}
          className={errors.timing ? classes.isInvalid : ""}
        >
          <option value="perQuestion">Per question wise timing</option>
          <option value="wholeQuestion">Whole quiz wise timing</option>
        </select>

        <label htmlFor="time">
          <strong>Enter time in minutes:</strong>
        </label>
        {/* error handler for time */}
        {errors.time && (
          <span style={{ color: "red" }}>*{errors.time?.message}</span>
        )}
        <input
          name="time"
          type="number"
          {...register("time")}
          placeholder="enter quiz time"
          className={errors.time ? classes.isInvalid : ""}
        />

        <label htmlFor="showingAnswer">
          <strong>User can see answer :</strong>
        </label>
        <select
          name="showingAnswer"
          {...register("showingAnswer")}
          className={errors.showingAnswer ? classes.isInvalid : ""}
        >
          <option value="wholeAnswer">After submit whole quiz</option>
          <option value="perAnswer">After submit every question</option>
        </select>

        <label htmlFor="retake">
          <strong>Enter maximum number of retake:</strong>
        </label>
        {/* error handler for retake */}
        {errors.retake && (
          <span style={{ color: "red" }}>*{errors.retake?.message}</span>
        )}
        <input
          name="retake"
          type="number"
          {...register("retake")}
          placeholder="enter maximum number of retake"
          defaultValue={0}
          className={errors.retake ? classes.isInvalid : ""}
        />

        <input className="buttons" type="submit" value="upload" />
      </form>
    </Modal>
  );
};

export default UploadModal;
