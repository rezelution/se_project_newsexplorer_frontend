import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

import Header from "../Header/header";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/about";
import Footer from "../Footer/footer";

import { SavedNews } from "../SavedNews/savedNews";
import LogInModal from "../LoginModal/loginModal";
import RegisterModal from "../RegisterModal/registerModal";
import ConfirmationModal from "../ConfirmationModal/confirmationModal";
import RegisterSuccessModal from "../RegisterSuccessModal/registerSuccessModal";

import { getNewsArticles } from "../../utils/newsApi";
import { filterNewsArticles } from "../../utils/newsApi";

import { APIkey } from "../../utils/constants";

import * as auth from "../../utils/auth";

import AppContext from "../../contexts/AppContext";
import { saveArticle, deleteItem } from "../../utils/api";
import ProtectedRoute from "../../ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [error, setError] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  const [savedArticles, setSavedArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    window.scrollTo(0, 0);
  };

  const handleArticlesClick = () => {
    navigate("/saved-news");
  };

  const handleMobileHomeClick = () => {
    navigate("/");
  };

  const handleFormSearch = () => {
    setVisibleCount(3); // reset to first 3 for new search
    setSearchTerm(inputValue);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLoginClick = () => {
    setActiveModal("sign-in");
  };

  const handleRegisterClick = () => {
    setActiveModal("sign-up");
  };

  const handleDeleteClick = (article) => {
    setSelectedArticle(article);
    setActiveModal("delete-item");
  };

  const handleRegistration = ({ email, password, userName }) => {
    auth
      .register(email, password, userName)
      .then(() => {
        setActiveModal("registerSuccess_modal");
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) return;

    auth
      .authorize(email, password)
      .then(({ token, user }) => {
        if (token) {
          localStorage.setItem("jwt", token);
          setCurrentUser(user);
          setIsLoggedIn(true);
          closeActiveModal();
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleSaveArticle = (article, searchTerm) => {
    if (!isLoggedIn || !currentUser?.email) {
      setActiveModal("sign-in");
      return;
    }

    const key = "savedArticles_" + currentUser.email;
    let articles = localStorage.getItem(key);
    if (articles === null) {
      articles = [];
    } else {
      articles = JSON.parse(articles); // Turns string into array
    }

    const isDuplicate = articles.some((item) => item.title === article.title);

    if (isDuplicate) {
      return;
    }
    const articleWithSearch = { ...article, searchTerm };
    saveArticle(articleWithSearch, currentUser.email)
      .then((saved) => {
        setSavedArticles((prev) => [...prev, saved]);
      })
      .catch((err) => console.error("Error saving article:", err));
  };

  const handleItemDelete = () => {
    if (!selectedArticle || !selectedArticle._id) {
      console.warn("Missing selected article or ID.");
      return;
    }

    deleteItem(selectedArticle._id, currentUser.email)
      .then(() => {
        // Remove from state and localStorage
        setSavedArticles((prev) => {
          const updated = prev.filter(
            (item) => item._id !== selectedArticle._id
          );
          const savedKey = `savedArticles_${currentUser.email}`;
          localStorage.setItem(savedKey, JSON.stringify(updated));

          return updated;
        });

        setSelectedArticle(null);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete the item:", error);
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    setUserLoading(true);
    auth
      .checkToken(jwt)
      .then((response) => {
        const { userName, email } = response.data;
        setCurrentUser({ userName, email });
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token check failed:", err);
      })
      .finally(() => {
        setUserLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError(null);

    getNewsArticles({ searchTerm, APIkey })
      .then((data) => {
        const filteredData = filterNewsArticles(data);

        // Mark each article as saved if it exists in savedArticles by matching title and date
        const updatedArticles = filteredData.map((article) => {
          const saved = savedArticles.find(
            (savedArticle) =>
              savedArticle.title === article.title &&
              savedArticle.publishedAt === article.publishedAt
          );
          return {
            ...article,
            isSaved: !!saved,
            _id: saved?._id || null, // attach _id if saved
          };
        });

        setNewsArticles(updatedArticles);
      })
      .catch((err) => {
        console.error(err);
        setError(
          "Sorry, something went wrong during the request. Please try again later."
        );
      })
      .finally(() => setLoading(false));
  }, [searchTerm, savedArticles]);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    if (isLoggedIn && currentUser?.email) {
      const key = `savedArticles_${currentUser.email}`;
      const saved = JSON.parse(localStorage.getItem(key)) || [];
      setSavedArticles(saved);
    } else {
      setSavedArticles([]);
    }
  }, [isLoggedIn, currentUser]);

  return (
    <div className="page">
      <AppContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, userLoading, currentUser }}
      >
        <div className="page__content">
          {/* when components are rendered outside the routes they will show up on every page so they need to be rendered outside the routes 
          by using useLocation from react router dom */}
          {location.pathname !== "/saved-news" && (
            <Header
              isLoggedIn={isLoggedIn}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              onSearch={handleFormSearch}
              currentUser={currentUser}
              handleLoginClick={handleLoginClick}
              handleLogOut={handleLogOut}
              handleRegistration={handleRegistration}
              isOpen={!!activeModal}
              handleArticlesClick={handleArticlesClick}
              handleMobileHomeClick={handleMobileHomeClick}
            />
          )}
          <main>
            {location.pathname === "/" && searchTerm && (
              <NewsCardList
                searchTerm={searchTerm}
                loading={loading}
                newsArticles={newsArticles.slice(0, visibleCount)} // show only some
                onShowMore={() => setVisibleCount((prev) => prev + 3)} // increase count
                canShowMore={visibleCount < newsArticles.length} // check if more exist
                totalArticles={newsArticles.length}
                error={error}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onSaveArticle={handleSaveArticle}
                savedArticles={savedArticles}
                isSavedNewsPage={false}
              />
            )}
            <Routes>
              <Route path="/" element={<About isLoggedIn={isLoggedIn} />} />
              <Route
                path="/saved-news"
                element={
                  <ProtectedRoute>
                    <SavedNews
                      isLoggedIn={isLoggedIn}
                      currentUser={currentUser}
                      savedArticles={savedArticles}
                      handleLogOut={handleLogOut}
                      handleItemDelete={handleItemDelete}
                      handleDeleteClick={handleDeleteClick}
                      Loading={setLoading}
                      searchTerm={searchTerm}
                      handleMobileHomeClick={handleMobileHomeClick}
                    />
                  </ProtectedRoute>
                }
              />
              {/* uncomment below for testing  */}
              {/* <Route path="/loader-test" element={<PreLoader />} /> */}
            </Routes>
          </main>
          <Footer handleHomeClick={handleHomeClick} />
        </div>
        <LogInModal
          isOpen={activeModal === "sign-in"}
          handleCloseClick={closeActiveModal}
          onClose={closeActiveModal}
          handleLogin={handleLogin}
          handleRegisterClick={handleRegisterClick}
        />
        <RegisterModal
          isOpen={activeModal === "sign-up"}
          handleCloseClick={closeActiveModal}
          onClose={closeActiveModal}
          onRegister={handleRegistration}
          handleLoginClick={handleLoginClick}
        />
        <ConfirmationModal
          isOpen={activeModal === "delete-item"}
          handleCloseClick={closeActiveModal}
          handleItemDelete={handleItemDelete}
        />
        <RegisterSuccessModal
          isOpen={activeModal === "registerSuccess_modal"}
          handleLoginClick={handleLoginClick}
          handleCloseClick={closeActiveModal}
        />
      </AppContext.Provider>
    </div>
  );
}

export default App;
