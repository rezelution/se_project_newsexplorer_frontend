import "./header.css";
import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/searchForm";
import Navigation from "../Navigation/navigation";

function Header({
  inputValue,
  onInputChange,
  onSearch,
  isLoggedIn,
  currentUser,
  handleLoginClick,
  isOpen,
  handleArticlesClick,
  handleMobileHomeClick,
  handleLogOut,
}) {
  return (
    <header className="header">
      <nav className="header__nav-group">
        <Link to="/" className="header__logo" aria-label="NewsExplorer Home">
          NewsExplorer
        </Link>
        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleLoginClick={handleLoginClick}
          isOpen={isOpen}
          handleArticlesClick={handleArticlesClick}
          handleMobileHomeClick={handleMobileHomeClick}
          handleLogOut={handleLogOut}
        />{" "}
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
