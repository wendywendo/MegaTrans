# Mega Trans (Built for Mega Hackathon 2026)

## Problem Statement

In Kenya, many students in boarding schools travel long distances home at the end of school terms using booked buses. As phones are not allowed in schools, parents often book buses for the students through teachers. Students then travel alone, making it difficult for parents to know where the bus is, whether the child has boarded safely, or the expected arrival time.

The current transport system lacks:

* **Real-time visibility** of bus location
* **Transparent communication** between drivers, schools, and parents
* **Accountability mechanisms** to confirm student boarding and arrival

This gap causes anxiety for parents and safety risks for students, especially during long journeys.

---

## Proposed Solution

A **web-based bus tracking and student transport monitoring system** that enables:

* Drivers to share live bus location automatically
* Parents to track their child’s bus in real time
* Student check-ins to confirm boarding and arrival

---

## Tools Used

* **Frontend:** React, LeafletJS, OpenStreetMap API
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Deployment:** Render

The system uses the MERN stack for seamless integration, with OpenStreetMap and LeafletJS to display dynamic bus locations on maps.

---

## Live Demo

Try it out here: [https://megatrans.onrender.com/](https://megatrans.onrender.com/)

---

## Features

* Real-time bus location updates
* Student check-ins for boarding and arrival
* Role-based views for **Drivers**, **Parents**, and **Admins/Schools**
* Map routing using OpenStreetMap

---

## Possible Improvements

1. Use **WebSockets** for live location updates instead of polling
2. Use WebSockets for instant notifications
3. Calculate **Estimated Time of Arrival (ETA)** based on remaining route
4. Integrate **email, SMS, or WhatsApp notifications**

---

## Challenges Faced

1. **Real-time location tracking:** Updating bus positions dynamically was tricky.
2. **Map integration:** Some routes looked unrealistic in OpenStreetMap routing.
3. **Authentication & Role-based views:** Implementing different views for Drivers, Parents, and Admins required careful handling.

---

## Lessons Learned

* Integrating **OpenStreetMap** and **LeafletJS** for dynamic maps
* Handling **live location services** in a web app
* Managing **role-based authentication** in MERN stack

---

## Project Summary

Mega Trans addresses the safety and accountability gap in student transportation in Kenyan boarding schools. Students often travel long distances alone, leaving parents anxious about their safety.

This system allows:

* Drivers to share live bus locations and mark student boarding/arrival
* Parents to monitor their child’s bus in real time
* Schools/Admins to oversee all buses and routes

It aligns with **SDG 11** (Sustainable Cities and Communities) and **SDG 16** (Peace, Justice, and Strong Institutions) by improving safety, trust, and accountability.

---

## Running the Project

### 1. Clone the Repository

```bash
git clone https://github.com/wendywendo/MegaTrans.git
cd MegaTrans
```

### 2. Setup Backend

#### 2a. Install dependencies

```bash
cd server
npm install
```

#### 2b. Create `.env` file

```env
MONGO_URI=<your_mongodb_connection_string>
SECRET_KEY=<your_jwt_secret>
```

> `SECRET_KEY` can be any random string.

#### 2c. Start the server

```bash
npm run dev
```

Server runs at: `http://localhost:8000`

---

### 3. Setup Frontend

#### 3a. Install dependencies

```bash
cd ../client
npm install
```

#### 3b. Start React app

```bash
npm start
```

Frontend runs at: `http://localhost:3000`
