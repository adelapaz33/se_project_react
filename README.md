# WTWR (What to Wear?): Front End Description

This is a weather-based clothing recommendation app with user authentication, profile management, and the ability to add/like clothing items.

# Tehcnologies Used

- React
- CSS Modules
- API integration
- React Router
- Authentication
- State management (local state, Context API)

# Key Features

- User authentication with registration and login validation
- Dynamic modal forms for various user actions
- Add, edit, and delete clothing items
- Custom weather-based API integration
- Form state handling with live validation
- Conditional rendering based on authentication status

# Challenges I Faced

One of the most challenging aspects of this project was implementing the sign-in and registration authentication flow. Managing user input, handling asynchronous requests to the backend, storing and validating JWT tokens, and conditionally rendering components based on the user's logged-in state required careful planning. I learned how to structure authentication logic cleanly and persist user sessions using localStorage. Debugging issues like 400 and 404 errors also helped me build stronger problem-solving skills and a deeper understanding of how frontend and backend systems communicate securely.

## Development Stack Info

This project uses [Vite](https://vitejs.dev/) for fast frontend development and HMR. It currently uses:

- [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react): Uses Babel for fast refresh during development.

Backend Deployment Link: https://github.com/adelapaz33/se_project_express/

Domain Name: https://ttwtwr.twilightparadox.com
