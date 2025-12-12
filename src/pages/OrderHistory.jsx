import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 mb-4 shadow-sm bg-white"
          >
            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">Order #{order.id}</h2>
              <p className="text-sm text-gray-600">{order.date}</p>
            </div>

            {/* Status */}
            <p className="text-sm mb-3">
              <span className="font-medium">Status:</span>{" "}
              <span className="text-blue-600 font-semibold">{order.status}</span>
            </p>

            {/* Items */}
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border-b pb-2"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-3 font-semibold">
              Total: ₹{order.total}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
