import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Answers from "../Answers/Answers";
import ProgressBar from "../ProgressBar/ProgressBar";
import Nav from "../shared/Nav/Nav";
import classes from "./Quiz.module.css";

const myReducer = (prevState, action) => {
  let array;
  switch (action.type) {
    case "ADD":
      array = [...prevState];
      array.push(action.payload);
      return array;
    default:
      break;
  }
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [singleAnswer, setSingleAnswer] = useState([]);
  const [questionSetting, setQuestionSetting] = useState([]);
  const [userAnswer, dispatcher] = useReducer(myReducer, []);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { state } = useLocation();

  //calculate percentage of progress
  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  //countdown timer function questionSetting?.time * 6
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          if (questionSetting?.timing === "wholeQuestion") {
            submitQuiz();
          } else {
            if (percentage === 100) {
              submitQuiz();
            } else {
              nextQuestion();
              setMinutes(questionSetting?.time);
            }
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  //countdownEnd

  useEffect(() => {
    fetch(`https://quizzzical.herokuapp.com/getQuestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: state?.qId }),
    })
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [state]);
  useEffect(() => {
    fetch("https://quizzzical.herokuapp.com/getQuizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qId: state.qId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestionSetting(data[0]);
        setMinutes(data[0]?.time);
      });
  }, [state]);

  //handle select
  const handleChange = (e) => {
    const questionId = questions[currentQuestion]?._id;
    const { value, checked } = e.target;
    if (checked) {
      setSingleAnswer([...singleAnswer, { value, questionId }]);
    } else {
      setSingleAnswer(singleAnswer.filter((e) => e.value !== value));
    }
  };

  //handle next button
  const nextQuestion = () => {
    dispatcher({ type: "ADD", payload: singleAnswer });
    if (currentQuestion <= questions.length) {
      setCurrentQuestion((preCurrentQ) => preCurrentQ + 1);
    }
  };
  //handle previous button
  const prevQuestion = () => {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((preCurrentQ) => preCurrentQ - 1);
    }
  };

  // calculate result
  let userAns = [];
  userAnswer.forEach((element) => {
    for (let i = 0; i < element.length; i++) {
      userAns.push(element[i].value);
    }
    userAns.push(" ");
  });
  const userAnsArr = userAns.join("").split(" ");
  let correctAns = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnsArr[i] === questions[i].ans) {
      correctAns++;
    }
  }
  const submitQuiz = () => {
    dispatcher({ type: "ADD", payload: singleAnswer });
    const { email } = currentUser;
    const ansObj = { email, userAnswer, correctAns, qId: state.qId };
    fetch("https://quizzzical.herokuapp.com/enrolled", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ansObj),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate(`/result/${state.qId}`, {
            state: { correctAns, retake: questionSetting?.retake },
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.quiz}>
      <div className="container">
        {/* Navbar */}
        <Nav />

        {/* Quiz container */}
        <div className="row">
          <div className={`col-md-8 p-4 pt-5 mt-4 ${classes.quizContainer}`}>
            {/* Timer */}
            <div className={classes.timer}>
              {minutes === 0 && seconds === 0 ? null : (
                <h2>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </h2>
              )}
            </div>

            {/* Question */}
            <h2>{questions[currentQuestion]?.name}</h2>
            <hr style={{ color: "#1bf797" }} />

            {/* Answer option section */}
            <form className={`${classes.answerForm} row`}>
              {["A", "B", "C", "D"].map((index) => (
                <Answers
                  key={index}
                  opt={index}
                  value={
                    questions[currentQuestion] &&
                    questions[currentQuestion][index]
                  }
                  handleAnsChange={handleChange}
                />
              ))}
            </form>

            {/* Progress bar component */}
            <ProgressBar
              next={nextQuestion}
              prev={prevQuestion}
              progress={percentage}
              submit={submitQuiz}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
