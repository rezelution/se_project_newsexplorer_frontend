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
import { getSavedArticles, saveArticle } from "../../utils/api";
import { checkToken } from "../../utils/auth";

import { APIkey } from "../../utils/constants";

import * as auth from "../../utils/auth";

import AppContext from "../../contexts/AppContext";
import { deleteItem } from "../../utils/api";
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
  const [currentUser, setCurrentUser] = useState(null);
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

  const handleRegistration = ({ email, password, name }) => {
    auth
      .register(email, password, name)
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
      .then(({ data, token }) => {
        if (token) {
          localStorage.setItem("jwt", token);
          console.log("Token saved:", localStorage.getItem("jwt")); // Debug
          setCurrentUser({ ...data, token });
          setIsLoggedIn(true);
          return getSavedArticles(token).then((res) => {
            setSavedArticles(res.data);
            closeActiveModal();
            navigate("/");
          });
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

    // Check if article already saved by unique url
    const alreadySaved = savedArticles.some(
      (savedArticle) => savedArticle.url === article.url
    );

    if (alreadySaved) {
      console.log("Article already saved");
      return;
    }

    const articleWithSearch = { ...article, keyword: searchTerm };

    saveArticle(articleWithSearch, currentUser.token)
      .then((saved) => {
        setSavedArticles((prev) => [...prev, saved.data]);
      })
      .catch((err) => {
        console.error("Error saving article:", err);
      });
  };

  const handleItemDelete = () => {
    if (!selectedArticle || !selectedArticle._id) {
      console.warn("Missing selected article or ID.");
      return;
    }

    deleteItem(selectedArticle._id, currentUser.token)
      .then(() => {
        setSavedArticles((prev) =>
          prev.filter((item) => item._id !== selectedArticle._id)
        );
        setSelectedArticle(null);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete the item:", error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setUserLoading(false);
      setIsLoggedIn(false);
      setCurrentUser(null);
      setSavedArticles([]);
      return;
    }
    checkToken(token)
      .then((res) => {
        console.log("checkToken response:", res); // Debug
        setCurrentUser({ ...res.data, token });
        setIsLoggedIn(true);
        return getSavedArticles(token).catch((err) => {
          console.error("Failed to fetch saved articles:", err);
          return { data: [] }; // Fallback
        });
      })
      .then((res) => {
        console.log("getSavedArticles response:", res); // Debug
        setSavedArticles(res.data);
      })
      .catch((err) => {
        console.error("Token check failed:", err);
        if (err.message.includes("401")) {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
          setSavedArticles([]);
        }
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

        const updatedArticles = filteredData.map((article) => {
          const saved = savedArticles.find(
            (savedArticle) => savedArticle.url === article.url
          );
          return {
            ...article,
            isSaved: !!saved,
            _id: saved?._id || null,
            keyword: saved ? saved.keyword : searchTerm,
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
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
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
