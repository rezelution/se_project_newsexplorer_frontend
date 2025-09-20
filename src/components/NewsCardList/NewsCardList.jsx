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
  const isInitialLoading = loading && newsArticles.length === 0;

  return (
    <section className="newsCardList">
      {!isSavedNewsPage && (
        <h2 className="newsCardList__title">Search results</h2>
      )}
      {isInitialLoading ? (
        <PreLoader />
      ) : error ? (
        <p className="newsCardList__error">{error}</p>
      ) : newsArticles.length > 0 ? (
        <ul className="newsCardList__cards">
          {newsArticles.map((article) => (
            <li key={`${article.url}-${article.publishedAt}`}>
              <NewsCard
                keyword={article.keyword}
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
