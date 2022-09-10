import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import CreateQuiz from "./AdminPanel/CreateQuiz/CreateQuiz";
import Dashboard from "./AdminPanel/Dashboard/Dashboard";
import Layout from "./AdminPanel/Layout/Layout";
import MakeAdmin from "./AdminPanel/MakeAdmin/MakeAdmin";
import ManageQuizzes from "./AdminPanel/ManageQuizzes/ManageQuizzes";
import SeeSubmission from "./AdminPanel/SeeSubmission/SeeSubmission";
import UploadQuiz from "./AdminPanel/UploadQuiz/UploadQuiz";
import "./App.css";
import Home from "./Home/Home";
import NotFound from "./NotFound/NotFound";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import Quiz from "./Quiz/Quiz";
import Result from "./Result/Result";
import Validation from "./Validation/Validation";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="quiz/:id" element={<Quiz />} />
            <Route path="result/:id" element={<Result />} />
            <Route path="dashboard" element={<Layout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="create-quiz" element={<CreateQuiz />} />
              <Route path="upload-quiz" element={<UploadQuiz />} />
              <Route path="manage-quizzes" element={<ManageQuizzes />} />
              <Route
                path="manage-quizzes/submissions/:qId"
                element={<SeeSubmission />}
              />
              <Route path="make-admin" element={<MakeAdmin />} />
            </Route>
          </Route>
          <Route path="validation" element={<Validation />} />
          <Route path="dashboard" element={<Layout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
