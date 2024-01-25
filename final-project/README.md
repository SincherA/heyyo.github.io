# React + Vite

# App Component
The App component is the root component of the application. It uses the react-router-dom library to manage routing within the application.

The App component renders a Navbar and Hero component at the top of every page. It then defines several routes using the Routes and Route components from react-router-dom.

The root path ("/") displays a dashboard with four sections: News, Music, Movies, and Food. Each section uses a corresponding API component (NewsApi, SpotifyRecommendations, MovieApi, MealApi) to fetch and display relevant data.

There are also individual routes for each of these sections ("/news", "/music", "/movies", "/food"), which display a more detailed view of the corresponding data.

The "/myday" route is a private route, which means it checks if a user is logged in before rendering the LoggedInDashboard component. If a user is not logged in, they are redirected to the root path ("/").

The App component also renders a Footer component at the bottom of every page.

The PrivateRoute component is a helper component used to create private routes. It checks if a user is logged in by looking for a 'loggedInUser' item in the local storage. If a 'loggedInUser' item exists, it renders its children. If not, it redirects the user to the root path ("/").

The App component is styled with the 'app.css' stylesheet.

# Navbar
The Navbar component is a part of a web application built with React. It uses the react-router-dom library for navigation, react-modal for displaying a login form in a modal, and appwriteConfig.js for user authentication.

The component maintains several pieces of state: isModalOpen for controlling the visibility of the login modal, email and password for the login form inputs, loggedInUser for the currently authenticated user, and errorMessage for any error messages during login.

On initial render, the component checks if there's a logged-in user stored in local storage. If there is, it sets loggedInUser to that user.

The handleLoginClick function opens the login modal, and the closeModal function closes it.

The login function is an asynchronous function that attempts to create a new session for the user using the account.createEmailSession method from appwriteConfig.js. If successful, it sets loggedInUser to the email of the logged-in user, clears the form inputs, closes the modal, clears any error messages, stores the logged-in user in local storage, and navigates to the '/myday' route. If there's an error, it sets errorMessage to a message about invalid credentials.

The logout function is another asynchronous function that attempts to delete the current session using the account.deleteSession method from appwriteConfig.js. If successful, it clears loggedInUser, removes the logged-in user from local storage, and navigates to the root route.

The component's render method returns a navigation bar with links to various routes. If a user is logged in, it also includes a link to the '/myday' route and a logout button. If no user is logged in, it includes a login button that opens the login modal.

The login modal contains a form with fields for email and password, and buttons for logging in and closing the modal. If there's an error message, it's displayed above the form.

# Hero
The Hero component is a promotional section that encourages users to register for the application. It uses the react-modal library to display a registration form in a modal.

Upon rendering, the component checks if a user is logged in by looking for a 'loggedInUser' item in the local storage. If a 'loggedInUser' item exists, the isLoggedIn state is set to true.

The Hero component does not render on the 'myday' route or if the user is logged in. If the user is not logged in, a 'Register' button is displayed. When clicked, this button opens a registration form in a modal.

The registration form includes fields for username, email, and password. If the form is submitted with any empty fields, an error message is displayed. If the registration is successful, the user is logged in and the form fields are cleared. If the registration fails, an error message is displayed.

The Hero component is styled with the 'hero.css' stylesheet.


# LoggedInDashboard Component

The LoggedInDashboard component is a personalized dashboard for logged-in users. It uses React's useState and useEffect hooks to manage state and side effects.

Upon rendering, the component checks if a user is logged in by looking for a 'loggedInUser' item in the local storage. If a 'loggedInUser' item exists, the isLoggedIn state is set to true.

The LoggedInDashboard component also fetches weather data for a specified city from the OpenWeatherMap API. The city is initially set to 'London', but users can search for weather data of other cities using the search form. If the search form is submitted with an empty input, an error message is displayed.

While the weather data is being fetched, a loading message is displayed. Once the data is fetched, it is displayed in a weather details section. The weather details include the weather description, temperature, feels like temperature, minimum temperature, maximum temperature, and cloudiness.

In addition to the weather details, the LoggedInDashboard component also renders a Hero component (if the user is not logged in), a ToDoList component, and a MyCalendar component.

The LoggedInDashboard component is styled with the 'LoggedInDashboard.css' stylesheet.
The LoggedInDashboard component is a personalized dashboard for logged-in users. It uses React's useState and useEffect hooks to manage state and side effects.

Upon rendering, the component checks if a user is logged in by looking for a 'loggedInUser' item in the local storage. If a 'loggedInUser' item exists, the isLoggedIn state is set to true.

The LoggedInDashboard component also fetches weather data for a specified city from the OpenWeatherMap API. The city is initially set to 'London', but users can search for weather data of other cities using the search form. If the search form is submitted with an empty input, an error message is displayed.

While the weather data is being fetched, a loading message is displayed. Once the data is fetched, it is displayed in a weather details section. The weather details include the weather description, temperature, feels like temperature, minimum temperature, maximum temperature, and cloudiness.

In addition to the weather details, the LoggedInDashboard component also renders a Hero component (if the user is not logged in), a ToDoList component, and a MyCalendar component.

The LoggedInDashboard component is styled with the 'LoggedInDashboard.css' stylesheet.

# ToDo List
The ToDoList component is a task management application that allows users to add, edit, and delete tasks. It categorizes tasks into three sections: 'Todos', 'In Progress', and 'Completed'.

Tasks are initially added to the 'Todos' section. From there, they can be moved to the 'In Progress' section, and finally to the 'Completed' section. Tasks can also be moved back from 'In Progress' to 'Todos', or from 'Completed' to 'In Progress'.

The state of the tasks in each section is stored in local storage, so the data persists even after the page is refreshed. The component also displays the total number of tasks across all sections.

The ToDoList component is styled with the 'toDoList.css' stylesheet and uses icons from the react-icons/bi library.


# My Calendar
The MyCalendar component is a calendar application that allows users to add, edit, and delete notes for specific dates. It uses the react-calendar library to display a calendar and the react-icons/bi library for edit and delete icons.

Upon rendering, the component loads any saved notes from local storage. The notes are displayed in a list, with each note showing the date it's associated with and the note text. Users can add a new note for the currently selected date, or edit and delete existing notes.

The state of the notes is stored in local storage, so the data persists even after the page is refreshed.

The MyCalendar component is styled with the 'MyCalendar.css' and 'react-calendar/dist/Calendar.css' stylesheets.


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
