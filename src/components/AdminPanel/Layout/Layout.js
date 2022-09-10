import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import AccessDenied from "../AccessDenied/AccessDenied";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  const [isAdmin, setIsAdmin] = useState([]);
  const { currentUser } = useAuth();
  const { email } = currentUser;
  useEffect(() => {
    fetch("http://localhost:5000/getAdmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => setIsAdmin(data));
  }, [email]);
  return (
    <>
      {isAdmin.length ? (
        <div className="d-flex" id="wrapper">
          <Sidebar />
          <div id="page-content-wrapper">
            <Header />
            <Outlet />
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default Layout;
