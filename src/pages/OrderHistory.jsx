import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          You have no orders yet.
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 dark:border-gray-700 
                       rounded-lg p-4 mb-4 shadow-sm 
                       bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between mb-2">
              <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                Order #{order.id}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {order.date}
              </p>
            </div>

            {/* Status */}
            <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">
              <span className="font-medium">Status:</span>{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {order.status}
              </span>
            </p>

            {/* Items */}
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 
                             border-b border-gray-200 dark:border-gray-700 
                             pb-2"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-3 font-semibold text-gray-900 dark:text-gray-100">
              Total: ₹{order.total}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
