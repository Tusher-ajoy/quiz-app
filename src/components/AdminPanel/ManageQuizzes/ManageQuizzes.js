import { useEffect, useState } from "react";
import ManageQTable from "../ManageQTable/ManageQTable";
import classes from "./ManageQuiz.module.css";
const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://quizzzical.herokuapp.com/allQuizzes")
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);
  return (
    <div className="container-fluid px-4 outlet-container">
      <div className={`col ${classes.tableWrapper}`}>
        {loading ? (
          <p>loading...</p>
        ) : (
          <>
            <table className="table bg-white rounded shadow-sm  table-hover">
              <thead>
                <tr>
                  <th scope="col" width="50">
                    #
                  </th>
                  <th scope="col">Quiz title</th>
                  <th scope="col">Description</th>
                  <th scope="col">No. Submission</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              {quizzes.map((quiz, index) => (
                <ManageQTable key={quiz._id} qId={quiz.qId} />
              ))}
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageQuizzes;
