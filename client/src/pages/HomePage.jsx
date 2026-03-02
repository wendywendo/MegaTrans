function HomePage() {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl text-center flex flex-col gap-8">
        
        <h1 className="text-5xl font-extrabold text-gray-900">
          Welcome to MegaTrans!
        </h1>
        
        <p className="text-gray-600 text-lg leading-relaxed">
          MegaTrans is your smart and reliable bus tracking and management system.
          Keep track of your routes, monitor buses in real-time, and ensure safe
          transportation for all passengers.
        </p>

        <p className="text-gray-500 text-md">
          Whether you're a driver, parent, or admin, MegaTrans makes it easy
          to manage schedules, bookings, and notifications, all in one place.
        </p>

        <p className="text-gray-500 text-md">
          Our mission is to simplify public transportation management with
          transparency, efficiency, and convenience.
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Default Users (for tests)</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Admin Card */}
            <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl underline mb-2">Admin</h3>
              <p>John Doe</p>
              <p>Phone: 0712345678</p>
              <p>Password: john@123</p>
            </div>

            {/* Driver Card */}
            <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl underline mb-2">Driver</h3>
              <p>Jane Doe</p>
              <p>Phone: 0787654321</p>
              <p>Password: jane@123</p>
            </div>

            {/* Parent Card */}
            <div className="bg-gray-100 p-4 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl underline mb-2">Parent</h3>
              <p>Register using signup page</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-left">
          <h2 className="text-2xl font-semibold mb-3">TEST HOW IT WORKS (For best experience!)</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Login as admin. Create buses, drivers (if you want), and routes.</li>
            <li>Register as parent. Login as parent and book a trip.</li>
            <li>
              Login as driver. See your schedule and select a route. Mark passengers as boarded (Notification will be sent to parent). Start trip and visualize movement (click checkbox on left).
            </li>
            <li>View parent/admin to see bus location updates.</li>
          </ol>
        </div>

        <p className="text-gray-400 italic mt-6">Note: This is a simple prototype!</p>
      </div>
    </div>
  );
}

export default HomePage;