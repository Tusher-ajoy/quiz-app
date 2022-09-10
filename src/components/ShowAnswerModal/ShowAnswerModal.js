import { useEffect, useState } from "react";
import Modal from "react-modal";
import classes from "./ShowAnswerModal.module.css";

const ShowAnswerModal = ({ modalIsOpen, closeModal }) => {
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
          </div>
        ))
      ) : (
        <p style={{ color: "#1bf797" }}>You don not add any question yet!</p>
      )}
    </Modal>
  );
};

export default ShowAnswerModal;
