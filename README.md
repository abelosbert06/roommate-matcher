# Roommate Matcher

## A Node WebApp that matches compatible roommates

This project addresses the critical issue of incompatible roommate assignments in hostels. This application offers a solution by utilizing a data-driven approach to match students based on their living habits, study preferences, and other compatibility factors gathered through a detailed questionnaire. 

By implementing a weighted compatibility scoring system, the application will generate optimal roommate pairings. 

## Features

- **Compatibility Assessment Algorithm**: Calculates compatibility scores based on student responses to a questionnaire.
- **Weighted Scoring System**: Prioritizes certain compatibility factors over others for a nuanced assessment.
- **Efficient Backend**: Built using Node.js with Express.js for scalability and efficiency.
- **User-Friendly Interface**: Developed using HTML (EJS), CSS, and JavaScript.
- **Secure Data Storage**: Stores compatibility data securely on the server, accessible through an admin login page protected by bcrypt.


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/abelosbert06/roommate-matcher.git
    cd roommate-matcher
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```env
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```

4. Start the application:
    ```sh
    nodemon script.js
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Fill out the questionnaire and submit your responses.
3. Admins can log in at `http://localhost:3000/admin` to view and download compatibility scores.

## File Structure

- [script.js](http://_vscodecontentref_/0): Main server file.
- [views](http://_vscodecontentref_/1): Contains EJS templates for rendering HTML pages.
- [styles](http://_vscodecontentref_/2): Contains CSS files for styling.
- [data.json](http://_vscodecontentref_/3): Stores student responses.
- [compatibility_scores.json](http://_vscodecontentref_/4): Stores compatibility scores.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Node.js
- Express.js
- EJS
- bcrypt
- dotenv
- body-parser
- download-file
