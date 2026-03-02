function ActiveRoutes({ routes }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow lg:col-span-2">
        <h2 className="text-xl font-bold mb-4">Active Routes</h2>

        {routes.length === 0 && (
            <p className="text-gray-400">No active routes</p>
        )}

        <div className="space-y-4">
            {routes.map((route, ind) => (
            <div 
                key={route._id}
                className="p-2 border rounded"
            >
                <p className="font-semibold">
                    {ind + 1}. {route.from} ➡️ {route.to}
                </p>

                <p className="text-sm">Bus: {route.bus?.name}</p>
                <p className="text-sm"
                    >Driver: {route.driver?.fname} {route.driver?.lname}
                </p>
                <p className="text-sm">
                    Dept Time: {route.deptTime} | ETA: {route.eta}
                </p>
                <p className="text-xs">
                    {new Date(route.date).toLocaleDateString("en-GB")}
                </p>
            </div>
            ))}
        </div>
    </div>
  )
}

export default ActiveRoutes