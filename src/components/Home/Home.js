import { useEffect, useState } from "react";
import CardPlaceholder from "../CardPlaceholder/CardPlaceholder";
import QuizCard from "../QuizCard/QuizCard";
import Footer from "../shared/Footer/Footer";
import Nav from "../shared/Nav/Nav";

const Home = () => {
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
    <>
      <div className="container">
        {/* Navbar */}
        <Nav />

        {/* All Quizzes section start */}
        <section className="py-5">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {loading ? (
              <>
                <CardPlaceholder />
                <CardPlaceholder />
                <CardPlaceholder />
              </>
            ) : (
              quizzes.map((quiz) => <QuizCard key={quiz._id} qId={quiz.qId} />)
            )}
          </div>
        </section>
        {/* All Quizzes section end */}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
