import "./NewsCardList.css";
import NewsCard from "../NewsCard/newsCard";
import { PreLoader } from "../PreLoader/preLoader";

function NewsCardList({
  searchTerm,
  loading,
  newsArticles,
  onShowMore,
  canShowMore,
  totalArticles,
  error,
  onSaveArticle,
  isLoggedIn,
  savedArticles,
  isSavedNewsPage,
  onDeleteClick,
}) {
  return (
    <section className="newsCardList">
      <h2 className="newsCardList__title">Search results</h2>

      {loading ? (
        <PreLoader />
      ) : error ? (
        <p className="newsCardList__error">{error}</p>
      ) : newsArticles.length > 0 ? (
        <ul className="newsCardList__cards">
          {newsArticles.map((article) => (
            <li
              key={article.url || article.title}
              className="newsCardList__item"
            >
              <NewsCard
                keyword={
                  isSavedNewsPage ? article.searchTerm || "" : searchTerm
                }
                urlToImage={article.urlToImage}
                publishedAt={article.publishedAt}
                title={article.title}
                description={article.description}
                name={article.name}
                isLoggedIn={isLoggedIn}
                onSave={() => onSaveArticle(article, searchTerm)}
                savedArticles={savedArticles}
                url={article.url}
                isSavedNewsPage={isSavedNewsPage}
                onDelete={
                  isSavedNewsPage ? () => onDeleteClick(article) : undefined
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="newsCardList__nothing-found">Nothing Found</p>
      )}

      {canShowMore && !loading && newsArticles.length < totalArticles && (
        <button className="newsCardList__show-more-btn" onClick={onShowMore}>
          Show More
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
