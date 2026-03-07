# Flight-Pomodoro

<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/201bf4ad-9129-4dcd-b852-8bb0280abb9c" />


A productivity app that combines the Pomodoro technique with real-time flight tracking. Instead of staring at a countdown, you watch a plane fly from one real airport to another — and it lands exactly when your focus session ends. You can also use the basic pomodoro :)

**https://flight-pomodoro.netlify.app/focus**

---

## The Main Idea

I use Pomodoros every day to stay focused,listening to plane sounds, and I also love tracking flights. So I combined both. You pick an origin city, choose how long you want to focus, and the app finds real airports at that exact flight distance. Pick your destination, hit fly, and a plane starts moving across a live map in real time. Your focus session ends when the plane lands.

---

## Features

- **Classic Pomodoro** — Standard countdown timer with Focus and Break modes
- **Flight Focus** — Real-time plane animation on an interactive map
- **Real airport data** — 1,188 large airports from the our database
- **Haversine Formula** — Accurate great-circle distance calculations between airports
- **Dynamic destinations** — airports shown are filtered by your exact focus time (±10 min)
- **Flight sounds** — Ambient cabin audio plays during your focus session
- **Arrival celebration** — A success sound and message when the plane lands

  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/95d9a21d-fbc3-459e-8ed8-a2121582f47c" />


---

## Tech Stack

- **React** — UI and state management
- **React Router** — Navigation between Pomodoro and Flight Focus
- **Leaflet / React-Leaflet** — Interactive map
- **Leaflet-RotatedMarker** — Plane icon rotated toward destination
- **Tailwind CSS** — Styling
- **Vite** — Build tool

---

## How It Works

1. Enter your origin city and focus time in minutes
2. The app calculates flight times from your origin to all 1,188 airports using the **Haversine formula**
3. Airports within ±10 minutes of your focus time appear as markers on the map
4. Select your destination from the map popup
5. Hit **Let's Fly** — the plane starts moving and the timer begins
6. The plane's position is interpolated every second based on progress through the flight
7. When the timer ends, the plane lands and a success message appears

---

<img width="1920" height="1076" alt="image" src="https://github.com/user-attachments/assets/7101b3c4-d0d0-4870-b3ab-f53f99599fb1" />


## Run Locally

git clone [https://github.com/alejandroc0de/React/main/flight-pomodoro](https://github.com/alejandroc0de/React/tree/main/flight-pomodoro)
cd flight-pomodoro
npm install
npm run dev

---

## What I Learned

- Implementing the **Haversine formula** for real geographic distance calculations
- **Bearing calculation** to rotate the plane icon toward its destination
- Managing complex React state across multiple components
- Integrating **Leaflet** with React including custom icons, and map controls

---

Built by Alejandro Carrillo — Facatativa, Colombia 🇨🇴
