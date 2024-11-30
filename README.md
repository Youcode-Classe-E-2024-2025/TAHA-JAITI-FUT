# FUT Team Builder Application

## Overview
The FUT Team Builder is an interactive application for creating and managing your FIFA Ultimate Team (FUT). Users can add, position, and edit players dynamically while adhering to tactical formations such as 4-4-2 or 4-3-3. The app ensures an engaging user experience with responsive design, localStorage data management, and seamless animations using Anime.js.

## Key Features
- Dynamic Player Management
- Add players via a dynamic form with fields for:
- Name, position, rating, stats, and other details.
- Limit of 11 players in the starting formation, with additional players as substitutes.

## Tactical Formation Adjustments
- Supports multiple formations:
- 4-3-3: GK, 2 CB, 1 LB, 1 RB, 3 CM, 1 LW, 1 RW, and 1 ST.
- 4-4-2: GK, 2 CB, 1 LB, 1 RB, 2 CM, 1 RM, 1 LM, and 2 ST.
- Automatically positions players based on the selected formation.
- Updates formation layout dynamically.

## Player Card Features
- Add, edit, and delete player cards through a responsive UI.
- Validate player details to ensure correct input values.
- Maintain data consistency and integrity.

## Responsive Design
- Fully responsive UI:
- Adapts to various screen sizes (desktop, tablet, mobile).
- Adjusts player positions for an optimal user experience.

# LocalStorage Integration
- Saves player data to localStorage:
- Ensures persistence of user data.
- Automatically loads saved data on app startup.

## Code Features
- Event Management with Animation
- Fetching Player Data
- Validation Logic

## Folder Structure
/public
├── assets/                 # Main images files
├── componants/             # Componants used by the main.js
├── index.html              # Main HTML file
├── main.js                 # Main JavaScript file
├── players.json            # Player data
├── style.css               # Output TailwindCSS stylesheet file

## Technologies Used
- HTML5: For structuring the app.
- TailwindCSS and native CSS: For styling and responsive design.
- JavaScript: For DOM manipulation and business logic.
- Anime.js: For smooth animations.
- LocalStorage: To save and retrieve user data.