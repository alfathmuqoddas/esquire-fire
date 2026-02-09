# Esquire

Esquire is a sample real-estate web app, created with react, tailwind, firebase firestore, and firebase auth. It's meant to demonstrate firebase capability as a proper backend service.

## Features

1. "/" search page, user will the available property, user will select one or more filter like address, price range, lot size range, and floor size range
2. "/search?:query-params" this is the resulting page after user performing the filter in the main page, it will use query params as the filter value
3. "/property/:propertyId" this is the detail page of the property
4. "/create" page to add property listing
5. "/edit/:propertyId" page to edit the existing property

## Tech Stack

1. ReactJS + Typescript + Vite
2. Tailwindcss for styling
3. React Router for routing library
4. Nuqs for query params as state library
5. Zustand for global state management
6. Firebase Firestore for db
7. Firebase Auth for robust authentication sdk
