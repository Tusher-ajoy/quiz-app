import { useEffect, useState } from "react";
import Modal from "react-modal";
import classes from "./SeeModal.module.css";

const SeeModal = ({ modalIsOpen, closeModal }) => {
  const [questions, setQuestions] = useState([]);
  const { id, modalOpen } = modalIsOpen;
  useEffect(() => {
    fetch(`https://quizzzical.herokuapp.com/getQuestion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [id]);

  //delete question from questions collection
  const handleDelete = (e, id) => {
    fetch(`https://quizzzical.herokuapp.com/deleteQuestion/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          e.target.parentNode.style.display = "none";
          alert("Question deleted successfully");
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
      {questions.length ? (
        questions.map((question) => (
          <div key={question._id} className={classes.questionCard}>
            <h6>{question.name}</h6>
            <p>A. {question.A}</p>
            <p>B. {question.B}</p>
            <p>C. {question.C}</p>
            <p>D. {question.D}</p>
            <p>
              <strong>Answer:- {question.ans}</strong>
            </p>
            <button onClick={(e) => handleDelete(e, question._id)}>
              delete
            </button>
          </div>
        ))
      ) : (
        <p style={{ color: "#1bf797" }}>You don not add any question yet!</p>
      )}
    </Modal>
  );
};

export default SeeModal;
