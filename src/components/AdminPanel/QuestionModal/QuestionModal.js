import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import * as Yup from "yup";
import classes from "./QuestionModal.module.css";

Modal.setAppElement(document.getElementById("root"));

const QuestionModal = ({ modalIsOpen, closeModal }) => {
  const { id, modalOpen } = modalIsOpen;

  //From validation for create quiz
  const formSchema = Yup.object().shape({
    name: Yup.string().required("question name is mandatory"),
    A: Yup.string().required("option A is mandatory"),
    B: Yup.string().required("option B is mandatory"),
    C: Yup.string().required("option C is mandatory"),
    D: Yup.string().required("option D is mandatory"),
    ans: Yup.string().required("question answer name is mandatory"),
  });
  const formOption = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOption);
  const { errors } = formState;

  const onSubmit = (data) => {
    const questionData = { ...data, qId: id };
    fetch("http://localhost:5000/addQuestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          reset();
        }
      });
  };
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      className={classes.modalContainer}
      contentLabel="Add question modal modal"
    >
      <form onSubmit={handleSubmit(onSubmit)} className={classes.questionForm}>
        <label htmlFor="name">Enter question title : </label>
        {/* error handler for question name */}
        {errors.name && (
          <span style={{ color: "red" }}>*{errors.name?.message}</span>
        )}
        <input
          name="name"
          type="text"
          {...register("name")}
          placeholder="enter quiz title"
          className={errors.name ? classes.isInvalid : ""}
        />

        <label htmlFor="A">Enter first option : </label>
        {/* error handler for option A */}
        {errors.A && <span style={{ color: "red" }}>*{errors.A?.message}</span>}
        <input
          name="A"
          type="text"
          {...register("A")}
          placeholder="enter option A"
          className={errors.name ? classes.isInvalid : ""}
        />

        <label htmlFor="B">Enter second option:</label>
        {/* error handler for option B */}
        {errors.B && <span style={{ color: "red" }}>*{errors.B?.message}</span>}
        <input
          name="B"
          type="text"
          {...register("B")}
          placeholder="enter option B"
          className={errors.B ? classes.isInvalid : ""}
        />

        <label htmlFor="C">Enter third option:</label>
        {/* error handler for option C */}
        {errors.C && <span style={{ color: "red" }}>*{errors.C?.message}</span>}
        <input
          name="C"
          type="text"
          {...register("C")}
          placeholder="enter option C"
          className={errors.C ? classes.isInvalid : ""}
        />

        <label htmlFor="D">Enter fourth option:</label>
        {/* error handler for option D */}
        {errors.D && <span style={{ color: "red" }}>*{errors.D?.message}</span>}
        <input
          name="D"
          type="text"
          {...register("D")}
          placeholder="enter option D"
          className={errors.D ? classes.isInvalid : ""}
        />

        <label htmlFor="ans">Enter correct answer:</label>
        {/* error handler for question answers */}
        {errors.ans && (
          <span style={{ color: "red" }}>*{errors.ans?.message}</span>
        )}
        <input
          name="ans"
          type="text"
          {...register("ans")}
          placeholder="ex: A or AB"
          className={errors.ans ? classes.isInvalid : ""}
        />

        <input className="buttons" type="submit"></input>
      </form>
    </Modal>
  );
};

export default QuestionModal;
