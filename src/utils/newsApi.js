import apiErrorMessages from "./apiErrorMessages";

const newsApiBaseUrl =
  import.meta.env.MOD === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const APIkey = import.meta.env.VITE_NEWS_API_KEY;

export const getNewsArticles = ({ searchTerm, APIkey }) => {
  const getFormattedDateNDaysAgo = (n) => {
    const date = new Date();
    date.setDate(date.getDate() - n);
    return date.toISOString().split("T")[0];
  };

  const fromDate = getFormattedDateNDaysAgo(7);
  const toDate = new Date().toISOString().split("T")[0];

  const url =
    `${newsApiBaseUrl}?` +
    "q=" +
    encodeURIComponent(searchTerm) +
    "&" +
    "from=" +
    fromDate +
    "&" +
    "to=" +
    toDate +
    "&" +
    "sortBy=popularity&" +
    "pageSize=100";

  const req = new Request(url, {
    headers: {
      "X-Api-Key": APIkey,
    },
  });

  return fetch(req)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error! Status: " + response.status);
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

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

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
