import "./savedNewsHeader.css";
import { Link } from "react-router-dom";
import signOutIconBlack from "../../assets/signOut_Icon_black.svg";

function SavedNewsHeader({
  currentUser,
  handleLogOut,
  searchTerm,
  savedArticles,
}) {
  function formatKeywords(keywords) {
    if (!Array.isArray(keywords) || keywords.length === 0) return "None";

    if (keywords.length <= 2) {
      return keywords
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(", ");
    }

    const firstTwo = keywords
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    const othersCount = keywords.length - 2;

    return `${firstTwo.join(", ")}, and ${othersCount} other${
      othersCount > 1 ? "s" : ""
    }`;
  }

  const formattedKeywords = formatKeywords(searchTerm);

  return (
    <header className="savedNewsHeader">
      <nav className="savedNewsHeader__nav-group">
        <Link
          to="/"
          className="savedNewsHeader__logo"
          aria-label="NewsExplorer Home"
        >
          NewsExplorer
        </Link>
        <div className="savedNewsHeader__nav">
          <Link to="/" className="savedNewsHeader__nav-home">
            Home
          </Link>

          <Link
            to="/saved-news"
            className="savedNewsHeader__nav-saved-articles savedNewsHeader__nav-saved-articles--active"
          >
            Saved Articles
          </Link>

          <button
            className="savedNewsHeader__signOutBtn"
            onClick={handleLogOut}
          >
            {currentUser.userName}
            <img
              src={signOutIconBlack}
              alt="Logout Icon"
              className="savedNewsHeader__logOutIcon"
            />
          </button>
        </div>
      </nav>

      <div className="savedNewsHeader__title-group">
        <p className="savedNewsHeader__subhead">Saved Articles</p>
        <h1 className="savedNewsHeader__title">
          {currentUser.userName
            ? currentUser.userName.charAt(0).toUpperCase() +
              currentUser.userName.slice(1) +
              ","
            : ""}{" "}
          you have {savedArticles.length} saved articles
        </h1>
        <p className="savedNewsHeader__keywords">
          By keywords: <b>{formattedKeywords}</b>
        </p>
      </div>
    </header>
  );
}

export default SavedNewsHeader;
