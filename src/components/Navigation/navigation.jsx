import "./navigation.css";
import { Link } from "react-router-dom";
import signOutIcon from "../../assets/signOut_Icon.svg";
import signOutIconBlack from "../../assets/signOut_Icon_black.svg";
import articlesIconWhite from "../../assets/articles_icon_white.svg";
import homeIcon from "../../assets/home_icon_black.svg";

function Navigation({
  isLoggedIn,
  currentUser,
  handleLoginClick,
  handleLogOut,
  isSavedNewsPage = false,
  isOpen,
  handleArticlesClick,
  handleMobileHomeClick,
}) {
  return (
    <>
      {!isLoggedIn ? (
        <nav className="navigation">
          <Link to="/" className="navigation__home">
            Home
          </Link>
          <button
            onClick={handleLoginClick}
            type="button"
            className="navigation_signInBtn--loggedOut"
          >
            Sign in
          </button>
        </nav>
      ) : isSavedNewsPage ? (
        <nav className="navigation__saved-news">
          <Link to="/" className="navigation__saved-news-home">
            Home
          </Link>
          <Link
            to="/saved-news"
            className="navigation__saved-news-articles navigation__saved-news-articles--active"
          >
            Saved Articles
          </Link>
          <button
            className="navigation__saved-news-signOutBtn"
            onClick={handleLogOut}
          >
            {currentUser?.name}
            <img
              src={signOutIconBlack}
              alt="Logout Icon"
              className="navigation__saved-news-logOutIcon"
            />
          </button>
        </nav>
      ) : (
        <nav className="navigation">
          <Link to="/" className="navigation__home">
            Home
          </Link>
          <Link to="/saved-news" className="navigation__nav-saved-articles">
            Saved Articles
          </Link>
          <button className="navigation__signOutBtn" onClick={handleLogOut}>
            {currentUser?.name}
            <img
              src={signOutIcon}
              alt="Logout Icon"
              className="navigation__logOutIcon"
            />
          </button>
        </nav>
      )}
      {!isOpen &&
        (!isLoggedIn ? (
          // Mobile  menu for logged out users
          <nav className="navigation__mobile">
            <button
              className="navigation__mobileBtn"
              onClick={handleLoginClick}
              type="button"
            >
              <span className="navigation__bar" />
              <span className="navigation__bar" />
            </button>
          </nav>
        ) : isSavedNewsPage ? (
          <nav className="navigation__mobile">
            <button
              className="navigation__HomeIcon"
              onClick={handleMobileHomeClick}
              type="button"
            >
              <img src={homeIcon} alt="Home Icon" />
            </button>
            <button
              className="navigation__MobileSignOutBtn"
              onClick={handleLogOut}
              type="button"
            >
              <img src={signOutIconBlack} alt="Logout Icon" />
            </button>
          </nav>
        ) : (
          <nav className="navigation__mobile">
            <button
              className="navigation__articlesIconWhite"
              onClick={handleArticlesClick}
            >
              <img src={articlesIconWhite} alt="Articles Icon" />
            </button>
            <button
              className="navigation__MobileSignOutBtn"
              onClick={handleLogOut}
              type="button"
            >
              <img src={signOutIcon} alt="Logout Icon" />
            </button>
          </nav>
        ))}
    </>
  );
}

export default Navigation;
