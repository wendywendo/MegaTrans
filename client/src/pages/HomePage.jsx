function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-black text-white rounded-3xl shadow-lg p-10 max-w-3xl text-center flex flex-col gap-6">
        <h1 className="text-4xl font-bold">Welcome to MegaTrans!</h1>
        
        <p className="text-gray-300 text-lg">
          MegaTrans is your smart and reliable bus tracking and management system.
          Keep track of your routes, monitor buses in real-time, and ensure safe
          transportation for all passengers.
        </p>

        <p className="text-gray-400 text-md">
          Whether you're a driver, parent, or admin, MegaTrans makes it easy
          to manage schedules, bookings, and notifications, all in one place.
        </p>

        <p className="text-gray-400 text-md">
          Our mission is to simplify public transportation management with
          transparency, efficiency, and convenience.
        </p>
      </div>
    </div>
  );
}

export default HomePage;