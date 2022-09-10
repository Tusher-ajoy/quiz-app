import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ManageQTable = ({ qId }) => {
  const [cardDetails, setCardDetails] = useState([]);
  const [enrolled, setEnrolled] = useState(0);
  const [qDeleted, setQDeleted] = useState(false);
  const [eDeleted, setEDeleted] = useState(false);

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

  //delete data
  const handleDelete = (id) => {
    //delete data form quizzes collection
    fetch(`http://localhost:5000/deleteQuizzes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setQDeleted(result);
      });
    //delete data form enroll collection
    fetch(`http://localhost:5000/deleteEnroll/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setEDeleted(result);
        }
      });
    if (qDeleted === true && eDeleted === true) {
      window.location.reload(false);
    }
  };
  return (
    <tbody>
      <tr>
        <td>{1}</td>
        <td>{cardDetails[0]?.title}</td>
        <td>{cardDetails[0]?.description}</td>
        <td>
          <Link
            to={`/dashboard/manage-quizzes/submissions/${qId}`}
            state={{ title: cardDetails[0]?.title }}
          >
            {enrolled}
          </Link>
        </td>
        <td>
          <button
            style={{
              border: "none",
              padding: "5px 15px",
              borderRadius: "5px",
              backgroundColor: "#f1bcc0",
            }}
            onClick={() => handleDelete(qId)}
          >
            <MdDelete style={{ fontSize: "1.5rem" }} />
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default ManageQTable;
