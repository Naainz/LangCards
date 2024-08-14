# Language Flashcards Project

## Overview

This project is a language flashcard application designed to help users learn and memorize vocabulary in various languages. The app allows users to select a language, view flashcards with vocabulary words translated into that language, and track their progress by marking words as "Know" or "Don't Know". The interface is designed to be simple, responsive, and user-friendly, with additional features like a dark mode toggle for better visual comfort.

## Features

- **Language Selection**: Users can choose from a comprehensive list of languages. The app will then translate a predefined set of English vocabulary words into the selected language.
  
- **Flashcard System**: Each flashcard shows a translated word on the front and its English equivalent on the back. Users can flip the card by clicking on it to view the translation.

- **Progress Tracking**: Users can mark whether they know or don't know a word. If they know a word, it is dismissed from the current session. If they don't know a word, it will reappear after a few turns.

- **Dark Mode**: A toggle switch in the info panel allows users to switch between light and dark themes. The dark mode reverses the page's colors while maintaining the readability of the flashcard content.

- **Responsive Design**: The app is fully responsive, ensuring a consistent experience across different devices and screen sizes.

## Project Structure

- `index.astro`: The main page of the application. It includes the UI for the flashcards, language selection, and the dark mode toggle.

- `api/translate.json.ts`: The backend API endpoint used to translate words from English to the selected language using the MyMemory API. The API processes requests and returns a list of translated words.

- `en.json`: A predefined list of common English vocabulary words stored in JSON format. This file is used as the source for translations.

## How to Use

1. **Select a Language**: Click the globe icon at the top right to open the language selection panel. Choose a language from the list.

2. **View Flashcards**: The app will display flashcards with vocabulary words translated into the selected language. Click on a card to flip it and view the English translation.

3. **Mark Your Progress**: Use the "Know" or "Don't Know" buttons to track your learning. Words marked as "Know" will be removed from the session, while those marked as "Don't Know" will reappear after a few turns.

4. **Toggle Dark Mode**: Click the info icon at the top left to open the info panel. Use the dark mode toggle to switch between light and dark themes.

## Technologies Used

- **Astro**: The framework used to build the application.
- **JavaScript**: For handling interactivity and API requests.
- **MyMemory API**: Used to translate English words into other languages.
- **CSS**: Custom styling for the application, including light/dark mode themes and responsive design.

## Installation

1. Clone the repository:
```sh
git clone https://github.com/Naainz/LangCards.gits
cd LangCards
```

2. Install the dependencies:
```sh
npm install
```

3. Run the development server:
```sh
npm run dev
```

4. Open the webapp in your browser at `http://localhost:4321`.

## Acknowledgements

- **MyMemory API**: For providing the translation service used in this project.
- **Astro Framework**: For powering the frontend of this application.

## License

This project is licensed under the [MIT License](LICENSE).