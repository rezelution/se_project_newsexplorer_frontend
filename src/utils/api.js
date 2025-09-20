const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://api.heatcheck.blinklab.com"
    : "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options)
    .then(checkResponse)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export const getSavedArticles = (token) => {
  return fetch(`${BASE_URL}/saved-news`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const saveArticle = (article, token) => {
  return fetch(`${BASE_URL}/saved-news`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  }).then(checkResponse);
};

function deleteItem(id, token) {
  return request(`${BASE_URL}/saved-news/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export { request, deleteItem, checkResponse };
