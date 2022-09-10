import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import classes from "./UserModal.module.css";

Modal.setAppElement(document.getElementById("root"));

const UserModal = ({ modalIsOpen, closeModal, name, email }) => {
  const [isAdmin, setIsAdmin] = useState([]);
  const [enrolledCount, setEnrolledCount] = useState(0);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetch("https://quizzzical.herokuapp.com/getEnrolledDataByEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: currentUser.email }),
    })
      .then((res) => res.json())
      .then((data) => setEnrolledCount(data.length));
  }, [currentUser]);

  useEffect(() => {
    fetch("https://quizzzical.herokuapp.com/getAdmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => setIsAdmin(data));
  }, [email]);

  const { logout } = useAuth();
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={classes.modalContainer}
        contentLabel="User profile modal"
      >
        <h2 className="textHighlight text-center">{name}</h2>
        {isAdmin.length ? (
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "#1bf797" }}
          >
            Go to Admin panel
          </Link>
        ) : (
          <p>Total enrolled quiz : {enrolledCount}</p>
        )}
        <button
          className="buttons"
          onClick={() => {
            closeModal();
            logout();
          }}
        >
          Logout
        </button>
      </Modal>
    </>
  );
};

export default UserModal;
