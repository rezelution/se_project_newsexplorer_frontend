export function getItems(email) {
  const saved =
    JSON.parse(localStorage.getItem(`savedArticles_${email}`)) || [];
  return Promise.resolve(saved);
}

export function saveArticle(article, email) {
  const key = `savedArticles_${email}`;
  const existing = JSON.parse(localStorage.getItem(key)) || [];

  // Generate a unique _id for every saved article
  const compositeId = `${article.title}-${article.publishedAt}`;
  const alreadySaved = existing.some((item) => item._id === compositeId);

  if (!alreadySaved) {
    const saved = {
      _id: compositeId,
      name: article.source?.name || article.name || "Unknown Source",
      title: article.title,
      description: article.description,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      searchTerm: article.searchTerm,
      url: article.url,
    };

    const updated = [...existing, saved];
    localStorage.setItem(key, JSON.stringify(updated));
    return Promise.resolve(saved);
  }

  return Promise.resolve(existing.find((item) => item._id === compositeId));
}

export function deleteItem(articleId, email) {
  const key = `savedArticles_${email}`;
  const existing = JSON.parse(localStorage.getItem(key)) || [];

  const updated = existing.filter((a) => a._id !== articleId);
  localStorage.setItem(key, JSON.stringify(updated));

  return Promise.resolve({
    message: `Article ${articleId} deleted successfully.`,
  });
}
