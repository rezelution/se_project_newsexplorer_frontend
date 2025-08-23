import apiErrorMessages from "./apiErrorMessages";

// fetch articles from API
export const getNewsArticles = ({ searchTerm, APIkey }) => {
  const getFormattedDateNDaysAgo = (n) => {
    const date = new Date();
    date.setDate(date.getDate() - n);
    return date.toISOString().split("T")[0];
  };

  const fromDate = getFormattedDateNDaysAgo(7);
  const toDate = new Date().toISOString().split("T")[0];

  return fetch(
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      searchTerm
    )}&from=${fromDate}&to=${toDate}&pageSize=100`,
    { headers: { "X-Api-Key": APIkey } }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === "error") {
        const message =
          apiErrorMessages[data.code] || data.message || "Unknown API error";
        throw new Error(message);
      }
      return data;
    })
    .catch((error) => {
      console.error("Fetch failed:", error.message);
      throw error;
    });
};

// formatting date
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

// filter article data based on needed fields
export const filterNewsArticles = (data) => {
  return data.articles.map((article) => ({
    urlToImage: article.urlToImage,
    publishedAt: formatDate(article.publishedAt),
    title: article.title,
    description: article.description,
    name: article.source?.name || "Unknown Source",
    url: article.url,
  }));
};
