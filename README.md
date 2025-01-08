# IdeaDock

IdeaDock is a productivity tool that allows users to save YouTube videos and Tweets to view later. It also provides a feature called ShareLink to easily share links with others. This project is designed to help users curate and manage content that they find interesting across various platforms.

## Features

- Save YouTube Videos: Easily save YouTube videos to your IdeaDock account for later viewing.
- Save Tweets: Capture interesting tweets from Twitter and save them for later.
- ShareLink: Share saved links (YouTube or Tweets) with others via a unique URL.

## Tech Stack

- Frontend: HTML, CSS, JavaScript (React or other modern frontend frameworks)
- Backend: Node.js, Express
- Database: MongoDB (for saving links and user information)
- Authentication: JWT for secure user login and registration
- External APIs: YouTube API (to save videos) and Twitter API (to save tweets)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/ideadock.git
   cd ideadock
   ```

2. **Install Dependencies**

   **Backend:**
   Navigate to the backend directory and install required dependencies:

   ```bash
   cd backend
   npm install
   ```

   **Frontend:**
   Navigate to the frontend directory and install required dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. **Set up Environment Variables**

   Create a `.env` file in both the frontend and backend directories and set the following environment variables:

   **Backend:**
   - `DB_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT authentication
   - `YOUTUBE_API_KEY`: API key for YouTube Data API (if needed)
   - `TWITTER_API_KEY`: API key for Twitter API (if needed)

   **Frontend:**
   - `REACT_APP_BACKEND_URL`: URL to the backend server (e.g., `http://localhost:5000`)

4. **Run the Application**

   **Start the Backend:**
   ```bash
   node build/index.js
   ```

   **Start the Frontend:**
   ```bash
   cd frontend
   npm rum dev
   ```

   Now, you should be able to access the application by navigating to `http://localhost:3000` (or whichever port the frontend uses).

## Usage

### Save YouTube Videos

1. Log in to your IdeaDock account.
2. Search for a YouTube video and copy the URL.
3. Paste the URL into the "Save YouTube" section in your dashboard to save it for later viewing.

### Save Tweets

1. Log in to your IdeaDock account.
2. Copy the URL of a Tweet you want to save.
3. Paste the Tweet URL into the "Save Tweet" section in your dashboard to save it for later viewing.

### Share Links with ShareLink

1. Once you've saved a link (YouTube video or Tweet), you will be given a unique ShareLink.
2. Share the ShareLink with anyone, and they can access the saved content directly.

## Contributing

Fork the repository.

## API

The IdeaDock API provides endpoints for managing user accounts, saving YouTube videos and Tweets, and sharing links. Detailed API documentation will be provided in a separate file.

## License

This project is licensed under the [MIT License](LICENSE).
