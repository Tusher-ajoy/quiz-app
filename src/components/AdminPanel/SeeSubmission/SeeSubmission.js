import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import classes from "./SeeSubmission.module.css";

const SeeSubmission = () => {
  const [enrolled, setEnrolled] = useState([]);
  const { qId } = useParams();

  const location = useLocation();

  useEffect(() => {
    fetch(`http://localhost:5000/enrolled/${qId}`)
      .then((res) => res.json())
      .then((data) => setEnrolled(data));
  }, [qId]);
  return (
    <div className="container-fluid px-4 outlet-container">
      <div className={`col ${classes.tableWrapper}`}>
        <table className="table bg-white rounded shadow-sm  table-hover">
          <thead>
            <tr>
              <th scope="col" width="50">
                #
              </th>
              <th scope="col">Quiz title</th>
              <th scope="col">Email</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            {enrolled.map((data, index) => (
              <tr key={data._id}>
                <td>{++index}</td>
                <td>{location?.state?.title}</td>
                <td>{data.email}</td>
                <td>{data.correctAns}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeeSubmission;
