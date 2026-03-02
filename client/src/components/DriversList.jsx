import { FaPhoneAlt } from "react-icons/fa";

function DriversList({ drivers }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Drivers</h2>

        {drivers.length === 0 && (
            <p className="text-gray-500">No drivers created yet</p>
        )}

        <div className="space-y-3">
            {
            drivers?.map((driver, ind) => (
                <div 
                    key={ind}
                    className="border rounded p-3"
                >
                    <p className="font-semibold">
                        { ind+1 }. { driver.fname } { driver.lname }
                    </p>

                    <p className="flex flex-row gap-2 items-center text-sm">
                        <FaPhoneAlt 
                            className="text-red-500"
                        />
                        { driver.phone }
                    </p>
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default DriversList