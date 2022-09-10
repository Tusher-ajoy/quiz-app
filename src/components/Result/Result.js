import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Nav from "../shared/Nav/Nav";
import ShowAnswerModal from "../ShowAnswerModal/ShowAnswerModal";
import classes from "./Result.module.css";

const Result = () => {
  const [question, setQuestions] = useState([]);
  const [takeRetake, setTakeRetake] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState({
    id: "",
    modalOpen: false,
  });
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const { id } = useParams();

  const { state } = useLocation();

  useEffect(() => {
    fetch(`http://localhost:5000/getQuestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:5000/getEnrolledData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qId: id, email: currentUser.email }),
    })
      .then((res) => res.json())
      .then((data) => setTakeRetake(data.length));
  }, [id, currentUser]);

  function openModal(id) {
    const seeObj = {
      id: id,
      modalOpen: true,
    };
    setModalIsOpen(seeObj);
  }

  function closeModal() {
    setModalIsOpen({ id: "", modalOpen: false });
  }
  const leftRetake = state.retake - takeRetake;
  return (
    <div className="container">
      {/* Navbar */}
      <Nav />

      {/* Score Part */}
      {/* <Confetti width={800} height={30} confettiSource={(10, 10)} /> */}
      <div className={classes.totalScore}>
        <h1>{`Your score is ${state.correctAns} out of ${question.length}`}</h1>
      </div>

      {/* see ans and retake button */}
      <div className="py-4 d-flex justify-content-evenly">
        <button
          className="buttons"
          disabled={leftRetake <= 0 ? true : false}
          onClick={() => navigate(`/quiz/${id}`, { state: { qId: id } })}
        >
          Retake left {leftRetake}
        </button>
        <button className="buttons" onClick={() => openModal(id)}>
          Show Answer
        </button>
      </div>
      {modalIsOpen.modalOpen && (
        <ShowAnswerModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Result;
