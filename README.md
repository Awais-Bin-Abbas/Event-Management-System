# Event Management System

This is a web-based Event Management System developed using React.js and Redux Toolkit. It allows users to explore upcoming events, search for events, view their details, and register for events they are interested in.

The application uses the Ticketmaster Discovery API to fetch real event information. Users can also manage their registrations through the My Events page.

## Technologies Used

- React.js
- Redux Toolkit
- React Router
- JavaScript
- CSS
- Vite
- Ticketmaster Discovery API
- Local Storage

## Features

### User Authentication
- Users can create an account using their name, email, and password.
- Registered users can log in and log out.
- Form validation is included for registration and login.
- Duplicate email registrations are prevented.
- Login sessions are saved using Local Storage.

### Event Exploration
- Browse upcoming events fetched from Ticketmaster.
- Search events using keywords.
- Filter events by categories such as Music, Sports, Arts & Theatre, and Film.
- View event images, dates, venues, and categories.

### Event Details
- View detailed information about an event.
- See the event date, time, venue, and location.
- View the category and genre of the event.
- Open the event's official Ticketmaster page.

### Event Registration
- Logged-in users can register for events.
- Duplicate registrations are prevented.
- Registration information is saved for each user separately.
- Users can cancel registrations for upcoming events.

### My Events
- View all registered events.
- Separate upcoming and completed events.
- Access event details.
- Cancel upcoming event registrations.

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Awais-Bin-Abbas/Event-Management-System.git
```

### 2. Open the Project Folder

Navigate to the folder containing `package.json`.

```bash
cd Event-Management-System
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure the API Key

This project uses the Ticketmaster Discovery API.

Create