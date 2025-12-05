import { useState } from "react";
import { Star, Clock, Menu } from "lucide-react";

export default function PurchaseOrdersTable() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      reference: "P00008",
      vendor: "Meta",
      buyer: { initial: "A", name: "John Doe" },
      orderDeadline: "Today",
      total: "230.00 ₦",
      status: "RFQ",
      starred: false,
    },
    {
      id: 2,
      reference: "P00007",
      vendor: "Amazon",
      buyer: { initial: "A", name: "John Doe" },
      orderDeadline: "Today",
      total: "0.00 ₦",
      status: "RFQ",
      starred: false,
    },
    {
      id: 3,
      reference: "P00006",
      vendor: "Meta",
      buyer: { initial: "A", name: "John Doe" },
      orderDeadline: "Today",
      total: "0.00 ₦",
      status: "RFQ",
      starred: false,
    },
    {
      id: 4,
      reference: "P00005",
      vendor: "Meta",
      buyer: { initial: "A", name: "John Doe" },
      orderDeadline: "Today",
      total: "0.00 ₦",
      status: "RFQ",
      starred: false,
    },
    {
      id: 5,
      reference: "P00004",
      vendor: "Jumia",
      buyer: { initial: "Z", name: "zuckm709@gmail.com" },
      orderDeadline: "5 days ago",
      total: "2,875,000.00 ₦",
      status: "RFQ Sent",
      starred: false,
    },
    {
      id: 6,
      reference: "P00003",
      vendor: "Amazon",
      buyer: { initial: "A", name: "John Doe" },
      orderDeadline: "Today",
      total: "0.00 ₦",
      status: "Purchase Order",
      starred: false,
    },
    {
      id: 7,
      reference: "P00002",
      vendor: "Meta",
      buyer: { initial: "A", name: "John Doe" },
      orderDeadline: "Today",
      total: "230.00 ₦",
      status: "Purchase Order",
      starred: false,
    },
  ]);

  const [selectedRows, setSelectedRows] = useState(new Set());

  const toggleStar = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, starred: !order.starred } : order
      )
    );
  };

  const toggleRowSelection = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAllRows = () => {
    if (selectedRows.size === orders.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(orders.map((o) => o.id)));
    }
  };

  const getStatusColor = (status) => {
    if (status === "RFQ") return "bg-blue-600";
    if (status === "RFQ Sent") return "bg-blue-500";
    if (status === "Purchase Order") return "bg-green-600";
    return "bg-gray-600";
  };

  const getDeadlineColor = (deadline) => {
    if (deadline.includes("ago")) return "text-red-400";
    if (deadline === "Today") return "text-orange-400";
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-4 w-12">
                <input
                  type="checkbox"
                  checked={selectedRows.size === orders.length}
                  onChange={toggleAllRows}
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600"
                />
              </th>
              <th className="text-left p-4 w-12"></th>
              <th className="text-left p-4 text-gray-400 font-medium">
                Reference
              </th>
              <th className="text-left p-4 text-gray-400 font-medium">
                Vendor
              </th>
              <th className="text-left p-4 text-gray-400 font-medium">Buyer</th>
              <th className="text-left p-4 text-gray-400 font-medium">
                Order Deadline
              </th>
              <th className="text-left p-4 text-gray-400 font-medium">
                Activities
              </th>
              <th className="text-right p-4 text-gray-400 font-medium">
                Total
              </th>
              <th className="text-left p-4 text-gray-400 font-medium">
                Status
              </th>
              <th className="text-center p-4 w-12">
                <Menu size={18} className="text-gray-400" />
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-700 hover:bg-gray-750 transition"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(order.id)}
                    onChange={() => toggleRowSelection(order.id)}
                    className="w-4 h-4 rounded bg-gray-700 border-gray-600"
                  />
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleStar(order.id)}
                    className="text-gray-400 hover:text-yellow-400 transition"
                  >
                    <Star
                      size={18}
                      fill={order.starred ? "currentColor" : "none"}
                      className={order.starred ? "text-yellow-400" : ""}
                    />
                  </button>
                </td>
                <td className="p-4">
                  <span className="text-blue-400 hover:underline cursor-pointer">
                    {order.reference}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-blue-400 hover:underline cursor-pointer">
                    {order.vendor}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded flex items-center justify-center text-white text-sm font-medium ${
                        order.buyer.initial === "Z"
                          ? "bg-orange-600"
                          : "bg-red-600"
                      }`}
                    >
                      {order.buyer.initial}
                    </div>
                    <span>{order.buyer.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={getDeadlineColor(order.orderDeadline)}>
                    {order.orderDeadline}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-gray-400 hover:text-gray-300">
                    <Clock size={18} />
                  </button>
                </td>
                <td className="p-4 text-right">{order.total}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button className="text-gray-400 hover:text-gray-300">
                    <Menu size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
