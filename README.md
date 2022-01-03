# GapFind

GapFind was created to find common gaps (free hours between the U classes) given the schedules of a group of classmates. Later, a new feature was implemented to analyze schedules and find hours with greater availability

### Older clients

I use the project's idea to learn web development. Each time I learned something important, I re-built the project for practice

- Version built with [Vanilla Js](https://github.com/dgop92/find-your-gap)
- Version built with [React Js](https://github.com/dgop92/find-your-gap-react)

### Server side

Most of the logic and algorithms are implemented in the server <br>
The API is built with Django - REST Framework [Go to Repo](https://github.com/dgop92/find-your-gap-api)

## Project setup

This project is just the client, you also need to set up the server.

Remember to create a .env file

### Download the dependencies with npm

```
npm install
```

### Run the app in localhost

```
npm start
```

### ¿Why Redux?

I was facing some problems with state management in some components. Using the context API leads to unnecessary re-renders, so I decided to use Redux to learn by practice. In the end, I realized that it was not necessary to use redux. Maybe using the basic API of React and doing some refactoring would solve the problem, but as I said before I just wanted to put Redux into practice.
