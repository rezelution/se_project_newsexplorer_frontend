import "./newsCard.css";

function NewsCard({
  urlToImage,
  publishedAt,
  title,
  description,
  name,
  isLoggedIn,
  onSave,
  onDelete,
  savedArticles = [],
  url,
  keyword,
  isSavedNewsPage = false,
}) {
  const isSaved = savedArticles.some((saved) => saved.url === url);

  const handleClick = () => {
    if (isSavedNewsPage) {
      onDelete?.();
    } else {
      if (!isLoggedIn) return; // Don't save if not logged in
      onSave?.();
    }
  };

  return (
    <div className="card">
      {/* keywords and delete button */}
      {isSavedNewsPage ? (
        <div className="card__keyword-and-delete-icon">
          <div className="card__keywords">
            {keyword
              ? keyword
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(", ")
              : "Unknown"}
          </div>
          <button
            className="card__bookmark-delete"
            onClick={handleClick}
            title="Remove from saved"
          ></button>
        </div>
      ) : (
        <div className="card__bookmark-wrapper">
          {!isLoggedIn && (
            <div className="card__bookmark-message">
              Sign in to save articles
            </div>
          )}
          <div
            className={`card__bookmark ${
              isSaved ? "card__bookmark--saved" : ""
            } ${isLoggedIn ? "logged-in" : "logged-out"}`}
            onClick={handleClick}
            title={
              isLoggedIn
                ? isSaved
                  ? "Remove bookmark"
                  : "Save article"
                : "Sign in to save"
            }
          ></div>
        </div>
      )}

      <img className="card__image" src={urlToImage} alt={title} />

      <div className="card__content">
        <p className="card__date">{publishedAt}</p>
        <h2 className="card__title">{title}</h2>
        <h3 className="card__description">{description}</h3>
        <a href={url} target="_blank" rel="noreferrer" className="card__source">
          {name}
        </a>
      </div>
    </div>
  );
}

export default NewsCard;
