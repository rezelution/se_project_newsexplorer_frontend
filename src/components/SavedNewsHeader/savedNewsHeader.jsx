import "./savedNewsHeader.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/navigation";

function SavedNewsHeader({
  currentUser,
  isLoggedIn,
  searchTerm,
  savedArticles,
  handleLogOut,
  handleMobileHomeClick,
}) {
  function formatKeywords(keywords) {
    if (!Array.isArray(keywords) || keywords.length === 0) return "None";

    if (keywords.length <= 2) {
      return keywords
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(", ");
    }

    const shuffled = keywords
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .sort(() => 0.5 - Math.random());

    const randomTwo = shuffled.slice(0, 2);

    const othersCount = keywords.length - 2;

    return `${randomTwo.join(", ")}, and ${othersCount} other${
      othersCount > 1 ? "s" : ""
    }`;
  }

  const keywordList = [
    ...new Set(savedArticles.map((a) => a.keyword).filter(Boolean)),
  ];
  const formattedKeywords = formatKeywords(keywordList);
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
        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleLogOut={handleLogOut}
          isSavedNewsPage={true}
          handleMobileHomeClick={handleMobileHomeClick}
        />{" "}
      </nav>

      <div className="savedNewsHeader__title-group">
        <p className="savedNewsHeader__subhead">Saved Articles</p>
        <h1 className="savedNewsHeader__title">
          {currentUser.name
            ? currentUser.name.charAt(0).toUpperCase() +
              currentUser.name.slice(1) +
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
