import { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import classes from "./QuizCard.module.css";

const QuizCard = ({ qId }) => {
  const [cardDetails, setCardDetails] = useState([]);
  const [enrolled, setEnrolled] = useState(0);
  const [totalRetake, setTotalRetake] = useState([]);
  const [takeRetake, setTakeRetake] = useState(0);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/oneTempQuiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: qId }),
    })
      .then((res) => res.json())
      .then((data) => setCardDetails(data));
  }, [qId]);

  useEffect(() => {
    fetch(`http://localhost:5000/enrolled/${qId}`)
      .then((res) => res.json())
      .then((data) => setEnrolled(data.length));
  }, [qId]);

  useEffect(() => {
    fetch("http://localhost:5000/getEnrolledData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qId: cardDetails[0]?._id,
        email: currentUser?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => setTakeRetake(data.length));
  }, [cardDetails, currentUser]);
  useEffect(() => {
    fetch("http://localhost:5000/getQuizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qId: cardDetails[0]?._id }),
    })
      .then((res) => res.json())
      .then((data) => setTotalRetake(data[0]));
  }, [cardDetails]);

  const leftRetake = totalRetake?.retake - takeRetake;

  const handleEnrolled = (id) => {
    leftRetake <= 0
      ? alert("Your retake is over!!")
      : navigate(`/quiz/${qId}`, { state: { qId } });
  };

  return (
    <div className="col" onClick={() => handleEnrolled(cardDetails[0]?._id)}>
      <div className={`h-card card h-100 ${classes.hCard}`}>
        <img
          src={`data:${cardDetails[0]?.image.contentType};base64,${cardDetails[0]?.image.img}`}
          className={`card-img-top ${classes.cardImgTop}`}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{cardDetails[0]?.title}</h5>
          <p className="card-text">{cardDetails[0]?.description}</p>
          <strong>{enrolled} people took this quiz</strong>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between align-items-center">
            <strong
              className={
                cardDetails[0]?.price === "0" ? classes.unpaid : classes.paid
              }
            >
              {cardDetails[0]?.price === "0" ? (
                "FREE"
              ) : (
                <>
                  <TbCurrencyTaka /> {cardDetails[0]?.price}
                </>
              )}
            </strong>
            <strong className={classes.enrollBtn}>
              {takeRetake <= 0 ? "Enroll" : "Retake"} &#10140;
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
