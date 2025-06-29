
import { mockBookings } from "./operatorMockData";

const BookingsTab: React.FC = () => (
  <div className="bg-white p-8 rounded-lg border border-gray-200">
    <h2 className="text-xl font-medium mb-2">Booking Management</h2>
    <p className="text-gray-500 mb-6">
      View and manage all your upcoming and past bookings
    </p>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-left">
        <thead>
          <tr>
            <th className="py-2 px-3 font-medium text-gray-600">Booking ID</th>
            <th className="py-2 px-3 font-medium text-gray-600">Guest</th>
            <th className="py-2 px-3 font-medium text-gray-600">Experience</th>
            <th className="py-2 px-3 font-medium text-gray-600">Date</th>
            <th className="py-2 px-3 font-medium text-gray-600">Amount</th>
            <th className="py-2 px-3 font-medium text-gray-600">Status</th>
            <th className="py-2 px-3 font-medium text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {mockBookings.map((booking) => (
            <tr key={booking.id} className="border-b">
              <td className="py-2 px-3">{booking.id}</td>
              <td className="py-2 px-3">{booking.guest}</td>
              <td className="py-2 px-3">{booking.experience}</td>
              <td className="py-2 px-3">
                {new Date(booking.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="py-2 px-3">{booking.amount}</td>
              <td className="py-2 px-3">
                {booking.status === "confirmed" && (
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                    Confirmed
                  </span>
                )}
                {booking.status === "pending" && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">
                    Pending
                  </span>
                )}
                {booking.status === "completed" && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                    Completed
                  </span>
                )}
                {booking.status === "cancelled" && (
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">
                    Cancelled
                  </span>
                )}
              </td>
              <td className="py-2 px-3">
                <button className="text-indigo-600 hover:underline text-sm">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mockBookings.length === 0 && (
        <div className="py-6 text-center text-gray-500">
          No bookings found
        </div>
      )}
    </div>
  </div>
);

export default BookingsTab;
