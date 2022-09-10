import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { TiPlus } from "react-icons/ti";
import QuestionModal from "../QuestionModal/QuestionModal";
import SeeModal from "../SeeModal/SeeModal";
import UploadModal from "../UploadModal/UploadModal";
import classes from "./UploadQuiz.module.css";
const UploadQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [addModalIsOpen, setAddModalIsOpen] = useState({
    id: "",
    modalOpen: false,
  });
  const [seeModalIsOpen, setSeeModalIsOpen] = useState({
    id: "",
    modalOpen: false,
  });
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState({
    id: "",
    modalOpen: false,
  });
  const [loading, setLoading] = useState();

  //fetch data form temp quiz collection
  const fetchData = async () => {
    const response = await fetch(
      "https://quizzzical.herokuapp.com/allTempQuiz"
    );
    if (!response.ok) {
      throw new Error("Data could not be fetched!");
    } else {
      return response.json();
    }
  };
  useEffect(() => {
    fetchData()
      .then((data) => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  //delete data from temp quiz collection
  const handleDelete = (id) => {
    fetch(`https://quizzzical.herokuapp.com/deleteTempQuiz/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          window.location.reload(false);
        }
      });
  };

  function openAddModal(id) {
    const addObj = {
      id: id,
      modalOpen: true,
    };
    setAddModalIsOpen(addObj);
  }

  function closeAddModal() {
    setAddModalIsOpen({ id: "", modalOpen: false });
  }
  function openSeeModal(id) {
    const seeObj = {
      id: id,
      modalOpen: true,
    };
    setSeeModalIsOpen(seeObj);
  }

  function closeSeeModal() {
    setSeeModalIsOpen({ id: "", modalOpen: false });
  }
  function openUploadModal(id) {
    const uploadObj = {
      id: id,
      modalOpen: true,
    };
    setUploadModalIsOpen(uploadObj);
  }

  function closeUploadModal() {
    setUploadModalIsOpen({ id: "", modalOpen: false });
  }
  return (
    <div className="container-fluid px-4 outlet-container">
      <div className={`col ${classes.tableWrapper}`}>
        {addModalIsOpen && (
          <QuestionModal
            modalIsOpen={addModalIsOpen}
            closeModal={closeAddModal}
          />
        )}
        {seeModalIsOpen && (
          <SeeModal modalIsOpen={seeModalIsOpen} closeModal={closeSeeModal} />
        )}
        {uploadModalIsOpen && (
          <UploadModal
            modalIsOpen={uploadModalIsOpen}
            closeModal={closeUploadModal}
          />
        )}

        {loading ? (
          <div
            className="spinner-border"
            style={{ display: "flex", margin: "0 auto" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <table className="table bg-white rounded shadow-sm  table-hover">
            <thead>
              <tr>
                <th scope="col" width="50">
                  #
                </th>
                <th scope="col">Quiz title</th>
                <th scope="col">Price</th>
                <th scope="col">See Questions</th>
                <th scope="col">Add Question</th>
                <th scope="col">Upload</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr key={quiz._id}>
                  <td>
                    <b>{index + 1}</b>
                  </td>
                  <td>{quiz.title}</td>
                  <td>
                    <TbCurrencyTaka />
                    {quiz.price}
                  </td>
                  <td>
                    <button
                      className={`${classes.actionBtn} ${classes.seeBtn}`}
                      onClick={() => openSeeModal(quiz._id)}
                    >
                      <AiFillEye style={{ fontSize: "1.5rem" }} />
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${classes.actionBtn} ${classes.addBtn}`}
                      onClick={() => openAddModal(quiz._id)}
                    >
                      <TiPlus style={{ fontSize: "1.5rem" }} />
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${classes.actionBtn} ${classes.uploadBtn}`}
                      onClick={() => openUploadModal(quiz._id)}
                    >
                      <IoMdCloudUpload style={{ fontSize: "1.5rem" }} />
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${classes.actionBtn} ${classes.deleteBtn}`}
                      onClick={() => handleDelete(quiz._id)}
                    >
                      <MdDelete style={{ fontSize: "1.5rem" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UploadQuiz;
