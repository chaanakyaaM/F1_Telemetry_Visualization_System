# 🏎️ F1 Telemetry Visualization system 
 
This project transforms official F1 telemetry data into an interactive race replay experience, rendering accurate SVG track maps and visualizing live car positions, speed, gear, RPM, throttle, and driver standings. It is designed for engineers, data enthusiasts, and racing fans who want deep insights into real race dynamics.

> **Think of it as a way to review and analyse F1 races using telemetry data.**


## Results

🎥 **Result**

[Click here for the results](./Result/f1_telemetry_visualization_system.mp4)

## ✨ Features

### 🗺️ Real Track Rendering
- SVG track paths generated directly from FastF1 coordinates telemetry.
- Accurate circuit geometry based on real race data.

### 🚗 Live Car Positioning
- Smooth interpolation of car positions based on race time.
- Cars move accuratly along the racing circuit.

### 📊 Dynamic Telemetry
#### Helps you monitor:
- Speed (km/h)
- Gear
- RPM
- Throttle (%)
- Distance traveled

### 🧠 Fastest Lap & Full Race Modes
- Switch between fastest lap from a race and full race telemetry
- Time-synchronized playback

### ⏯️ Playback Controls
- Play / Pause
- Speed control
- Timeline reset
- Zoom control for track view

### 🏁 Live Timing Dashboard
- Real-time driver list
- Color-coded drivers
- Focus on a specific driver

### 🧾 Driver & Session Details Panel
- Driver name, number, and team
- Session info (event, location, format)
- Live telemetry cards

# Drawback
- High initial data fetch latency, as it loads and processes extensive telemetry data before rendering the track and driver information.

## 🛠️ Tech Stack

### Frontend
- **React** – User Interface
- **Tailwind CSS** – UI styling
- **SVG** – Track and telemetry rendering

### Backend
- **FastAPI** – High-performance async API
- **FastF1** – Official Formula 1 telemetry & timing data
- **AsyncIO** – Non-blocking data processing
- **LRU Cache** – Optimized session loading
- **GZip Middleware** – Reduced payload sizes


# 📂 Project Structure
```
.
├── backend/
│   ├── main.py              # FastAPI server
│   ├── cache/               # FastF1 cache
│
├── frontend/
│   ├── public/
│   ├── Result/
│   │   ├── f1_telemetry_visualization_system.mp4
│   ├── src/
│   │   ├── components/
│   │   │   ├── Track.jsx
│   │   │   ├── MainContainer.jsx
│   │   │   ├── Racer.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Path.jsx
│   │   │   ├── RaceDetailsContainer.jsx
│   │   │   └── CoreContainer.jsx
│   │   ├── hooks/
│   │   │   ├── useDriverTelemetry.js
│   │   │   ├── useDriverDetails.js
│   │   │   ├── useFullRace.js
│   │   │   ├── useDriversData.js
│   │   │   ├── useEvents.js
│   │   │   ├── useTrack.js
│   │   │   ├── useFullRace.js
│   │   │   ├── useFRaceDetails.js
│   │   │   └── useRacersDashboard.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   ├── constants/
│   │   │   ├── Colors.js
│   │   │   └── Images.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
├── .env

```
# 🎮 How It Works (High Level)

- FastF1 fetches official telemetry data
- Backend processes & downsamples telemetry
- Frontend syncs telemetry with a race timer
- Car positions are interpolated between telemetry points
- SVG renders live car movement on the track
- Dashboard updates dynamically from shared telemetry state
- No fake data. No animations guessing positions.
Everything is driven by real telemetry.

# 🚀 Getting Started

## Frontend
```
npm install
npm run dev
```

## Backend
**To know about the backend [visit this repo](https://github.com/chaanakyaaM/F1_Telemetry_Visualization_System_Backend)**

# 🧠 Why This Project Matters

- Demonstrates real-time data visualization
- Shows strong async backend design
- Uses real-world motorsport data
- Combines frontend animation + backend data engineering
- Perfect for ML / Data / Visualization / Backend portfolios


## ⚠️ Challenges Faced

While building this project, several technical and design challenges were encountered and addressed:

- **High initial data latency:** Fetching large telemetry datasets caused delays. This was mitigated using **FastF1 caching**, **LRU caching** and **GZip compression** to speed up backend responses.  
- **Track size variability:** Not all circuits have the same scale, so a **dynamic zoom feature** was implemented to allow proper visualization of any track.  
- **Full race data size:** Full race telemetry datasets can be extremely large, so **downsampling** was implemented to reduce data size while maintaining smooth playback.
- **Asynchronous data fetching:** Multiple API requests for different types of data (drivers, track, telemetry) were handled concurrently using **asyncio**, improving overall load performance.  

NOTE: Images are yet to be corrected.

