<div align="center">
    <h1>Lis Pendens  Web Application </h1>
    <h6>
        <i>Edge Innovative Tech - Copyright (c) 2024</i>
    </h6>
    <hr />
</div>

This is a platform that will provide access to the legal status of landed property/ies in Anambra State, Nigeria for interested buyers to have sufficient information on the legal standing of property/ies they have interest in purchasing or/and renting.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [API Documentation](#api-documentation)
- [Application Architecture](#application-architecture)
- [Integration](#integration)
- [Installation Guide](#installation-guide)
- [Deployment](#deployment)
- [License](#License)
## Overview
Users should be able to: 
- Lookup property information on landing page without logging in.
- Sign up or Sign in on landing page.
- Search property using property title, registered title number, survey plan number, name of owner of property and location/address of property(no., street, LGA, city).
- Access own search history on platform.
- Update profile settings.

Admin (Court Registrar) should be able to:
- Add, delete, update case.
- Sign up or Sign in on landing page.

Super Admin should be able to:
- Revoke user/admin access and/or permissions.
- Add, delete, update user/admin.
- Handle flagged cases.
- Add, delete, update cases.
- Sign up or Sign in on landing page.

## Technologies Used
 + [React](https://react.dev) - UI Library
 + [Vite ](https://vitejs.dev/guide/) - Build tool
 + [React Hook Form](https://react-hook-form.com/) - Form Validation Library 
 + [Yup](https://github.com/jquense/yup/blob/master/README.md) - Form Validation Management Library
 + [React Tanstack Table](https://tanstack.com/table/v8/docs/adapters/react-table) - Headless Table Library
 + [TailwindCSS](https://tailwindcss.com/) - CSS Framework
 + [React Toastify](https://fkhadra.github.io/react-toastify/introduction/) - Notification Library
 + [Postman API](https://learning.postman.com/docs/introduction/overview/) - API Documentation
 + [EmailJS](https://www.emailjs.com/docs/) - Email Service Library
 + [React Icons](https://react-icons.github.io/react-icons/) - Superset Icon Library


## API Documentation
All APIs used are properly documented in [LisPendens API Documentation](https://documenter.getpostman.com/view/18112964/2s9YyqjNJN#b52f8c69-179b-4ccb-ac5f-00759b98c624) using Postman API

## Application Architecture
The folder structure for the application is detailed below
```
├── public                      # Directory for static assets served directly (images, favicon, etc.)
├── src                         # Directory for source code
│   ├── assets                  # Directory for icon components
│   ├── components              # Directory for UI components
│   ├── context                 # Directory for global data extracted as context
│   ├── hooks                   # Directory for custom hooks
│   ├── pages                   # Directory for app's pages
│   ├── provider                # Directory for
│   ├── Services                # Directory for app's requests (authorization, data fetching, etc)
│   ├── utils                   # Directory for static data rendered in app
│   ├── App.css                 # Stylesheet for App.jsx
│   ├── App.jsx                 # Main component rendered
│   ├── index.css               # Global stylesheet
│   └── main.jsx                # Entry point where App.jsx is rendered
├── .env                        # Environment variables file
├── .eslintrc.cjs               # ESLint configuration file
├── .gitignore                  # Untracked files
├── index.html                  # Entry point for Vite server (during development)
├── package-lock.json           # Dependency-tree record file
├── package.json                # App dependencies file
├── postcss.config.js           # PostCSS configuration file
├── README.md                   # Project documentation file
├── tailwind.config.js          # TailwindCSS configuration file
├── vercel.json                 # Deployment information file
└── vite.config.js              # Vite configuration file
```
## Integration
This web application is compatible with all web browsers.

## Installation Guide
1. Clone the repository 
`git clone https://github.com/edgeinnovativetech/lis-pendens.git`

2. Change directory into the cloned folder `cd lis-pendens`

3. Install dependencies `npm install`

4. Run app in local server `npm run dev` 

5. Follow generated link to launch app in browser

## Deployment
[Vercel](https://vercel.com/dashboard) was used to deploy the application.

## License
Edge Innovative Tech - Copyright (c) 2024 - Present, LIS-PENDENS/Storage Service.
