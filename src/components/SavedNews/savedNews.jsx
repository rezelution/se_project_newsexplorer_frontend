import "./savedNews.css";
import SavedNewsHeader from "../SavedNewsHeader/savedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";

export function SavedNews({
  savedArticles,
  currentUser,
  handleLogOut,
  handleDeleteClick,
  isLoggedIn,
  handleMobileHomeClick,
}) {
  let allKeywords = [];

  // Extract and normalize keywords
  savedArticles.forEach((article) => {
    if (article.searchTerm) {
      const keywords = article.searchTerm.toLowerCase().split(" ");
      keywords.forEach((word) => {
        allKeywords.push(word.trim());
      });
    }
  });

  // Remove duplicate keywords
  const uniqueKeywords = [...new Set(allKeywords)];

  return (
    <div>
      <SavedNewsHeader
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        handleLogOut={handleLogOut}
        searchTerm={uniqueKeywords}
        savedArticles={savedArticles}
        handleMobileHomeClick={handleMobileHomeClick}
      />

      <section className="savedNews">
        {savedArticles.length === 0 ? (
          <p className="savedNews__noArticles">No saved articles yet.</p>
        ) : (
          <NewsCardList
            searchTerm={""}
            loading={false}
            newsArticles={savedArticles}
            onShowMore={() => {}}
            canShowMore={false}
            totalArticles={savedArticles.length}
            error={""}
            onSaveArticle={() => {}} // not used here
            onDeleteClick={handleDeleteClick}
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            isSavedNewsPage={true}
          />
        )}
      </section>
    </div>
  );
}
