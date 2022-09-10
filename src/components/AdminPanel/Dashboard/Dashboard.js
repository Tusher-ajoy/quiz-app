import { useEffect, useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { SiUploaded } from "react-icons/si";
const Dashboard = () => {
  const [totalQuiz, setTotalQuiz] = useState(0);
  const [uploadedQuiz, setUploadedQuiz] = useState(0);

  useEffect(() => {
    fetch("https://quizzzical.herokuapp.com/allTempQuiz")
      .then((res) => res.json())
      .then((data) => setTotalQuiz(data.length));
  }, []);

  useEffect(() => {
    fetch("https://quizzzical.herokuapp.com/allQuizzes")
      .then((res) => res.json())
      .then((data) => setUploadedQuiz(data.length));
  }, []);

  return (
    <div className="container-fluid px-4">
      {/* card part */}
      <div className="row g-3 my-2">
        <div className="col-md-4">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <div>
              <h3 className="fs-2">{totalQuiz}</h3>
              <p className="fs-5">Total quizzes</p>
            </div>
            <FaLayerGroup style={{ fontSize: "3rem", color: "#1bf797" }} />
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <div>
              <h3 className="fs-2">{uploadedQuiz}</h3>
              <p className="fs-5">Uploaded</p>
            </div>
            <SiUploaded style={{ fontSize: "3rem", color: "#1bf797" }} />
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <div>
              <h3 className="fs-2">{totalQuiz - uploadedQuiz}</h3>
              <p className="fs-5">Pending</p>
            </div>
            <MdPendingActions style={{ fontSize: "3rem", color: "#1bf797" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
