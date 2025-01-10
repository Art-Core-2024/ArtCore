import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/orders`);
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders based on the search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = orders.filter(
      (order) =>
        order.userId?.name?.toLowerCase().includes(lowercasedQuery) || // Handle userId safely
        order.address.toLowerCase().includes(lowercasedQuery) ||
        order.status.toLowerCase().includes(lowercasedQuery) ||
        order.quantity.toString().includes(lowercasedQuery)
    );
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  // Handle status change for an order
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success('Order status updated successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update order status');
    }
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <ToastContainer />
      <div className="flex items-center justify-center flex-col w-full">
        <div className="w-full flex items-center justify-between pb-5">
          <div className="flex items-center justify-between w-full">
            <p className="text-2xl font-bold">Manage Orders</p>
          </div>
          <div className="relative flex items-center px-2 pr-4 py-2 rounded-full justify-between gap-2 bg-black border-2 border-green-500">
            <MagnifyingGlassIcon className="size-6 text-green-500" />
            <input
              type="text"
              className="bg-black border-none text-white px-2 rounded-full focus:outline-none"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <hr className="w-full h-[1px] border-none bg-white mb-5" />
      </div>
      <div className="w-full h-[25.5rem] pb-4 flex gap-6 flex-col items-center justify-start pt-7 px-3 overflow-hidden overflow-y-auto">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="w-full bg-black border-2 border-green-500 rounded-md flex items-center justify-between px-4 py-2"
            >
              <div className="flex items-start justify-center flex-col gap-2">
                <div className="text-2xl font-bold">
                  {order.userId?.name || 'Unknown User'} {/* Fallback for null */}
                </div>
                <div className="text-base font-normal italic">{order.address}</div>
                <div className="text-base font-bold">
                  Quantity: {order.quantity}
                </div>
              </div>
              <div className="flex items-center justify-center flex-col gap-2">
                <div className="text-base font-semibold">Status:</div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="bg-black text-white border border-green-500 px-2 py-1 rounded-md"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="text-red-500 font-bold">No orders found</div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;