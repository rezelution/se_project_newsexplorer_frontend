# News Explorer

News Explorer is a user-friendly web app that allows you to search for and save news articles based on keywords. Users can search for articles from the last 7 days, bookmark them for later, and manage their saved articles in a personalized dashboard.

## Features

- **Search for News Articles**: Enter any keyword to find news articles published in the last 7 days.
- **View Article Details**: Each article displays an image, title, publication date, description, and a link to the full article.
- **Bookmark Articles**: Save articles to your account for later reading.
- **Manage Saved Articles**: View your saved articles and delete them when no longer needed.
- **Keyword-Based Organization**: Saved articles are displayed based on the keywords used to search for them.
- **User Authentication**: Users can log in, register, and manage their account details.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## Tech Stack

This app is built using the following technologies:

- **React** for the front-end framework.
- **React Router** for handling routing and navigation.
- **Context API** for global state management.
- **News API** to fetch the latest news articles.
- **Local Storage** for temporarily saving articles and user data.
- **JWT Authentication** for secure login and user management.

## How to Use

1. **Visit the App**: Open the website (GitHub Pages link below).
   ![App Screenshot](/screenshots/Website.png)
2. **Search for Articles**: Enter keywords in the search bar to find articles from the last 7 days.
   ![Search Example](/screenshots/Header_and_Search.png)
3. **Save Articles**: Bookmark articles by clicking the "Save" icon. If you're not logged in, you'll be prompted to log in first.
   ![Article Results](/screenshots/Search_Results.png)
4. **Login to Save Articles**: Once logged in, you can save articles and view them under your "Saved Articles" section.
   ![Login](/screenshots/log_in.png)
5. **View Saved Articles**: Manage your saved articles, organized by the search keywords you used to find them.
   ![Saved Articles](/screenshots/Saved_Articles.png)
6. **Delete Saved Articles**: You can delete articles from your saved list when they’re no longer needed.
   ![Delete Article](/screenshots/delete_articles.png)

## Deployment

This app is deployed on GitHub Pages. To access it:

1. Visit the deployed website at
   (https://rezelution.github.io/se_project_newsexplorer_frontend/)
2. Use the search functionality to start exploring and saving news articles.

## Future Improvements

- **Bookmark Toggling**: Allow logged-in users to toggle the save state of articles directly from the search page, switching between saved and unsaved states.
- **Backend Integration**: Build a backend server to handle persistent data storage and secure user management instead of relying on local storage.
- **Enhanced Search Filters**: Add additional filters for searching articles, such as category, date range, and source type.
- **User Profile Customization**: Allow users to personalize their profiles, such as adding a profile picture or bio.
- **UI/UX Enhancements**: Further improve the user interface and user experience, especially on mobile devices.
