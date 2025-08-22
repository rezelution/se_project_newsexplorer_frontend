import "./header.css";
import { Link } from "react-router-dom";
import signOutIcon from "../../assets/signOut_Icon.svg";
import SearchForm from "../SearchForm/searchForm";

function Header({
  isLoggedIn,
  inputValue,
  onInputChange,
  onSearch,
  currentUser,
  handleLoginClick,
  handleLogOut,
}) {
  return (
    <header className="header">
      <nav className="header__nav-group">
        <Link to="/" className="header__logo" aria-label="NewsExplorer Home">
          NewsExplorer
        </Link>
        {isLoggedIn ? (
          <div className="header__nav">
            <Link to="/" className="header__nav-home">
              Home
            </Link>
            <Link to="/saved-news" className="header__nav-saved-articles">
              Saved Articles
            </Link>
            <button className="header__signOutBtn" onClick={handleLogOut}>
              {currentUser.userName}
              <img
                src={signOutIcon}
                alt="Logout Icon"
                className="header__logOutIcon"
              ></img>
            </button>
          </div>
        ) : (
          <div className="header__nav">
            <Link to="/" className="header__nav-home">
              Home
            </Link>
            <button
              onClick={handleLoginClick}
              type="button"
              className="header__signInBtn--loggedOut"
            >
              Sign in
            </button>
          </div>
        )}
      </nav>
      <section className="header__searchForm-group">
        <h1 className="header__headline">What's going on in the world?</h1>
        <h2 className="header__subhead">
          Find the latest news on any topic and save them in your personal
          account.
        </h2>
        <SearchForm
          inputValue={inputValue}
          onInputChange={onInputChange}
          onSearch={onSearch}
        />
      </section>
    </header>
  );
}

export default Header;
