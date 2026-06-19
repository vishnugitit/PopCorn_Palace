import React, { useEffect, useState } from "react";

import "./AdminDashboard.css";
import { toast } from "react-toastify";
import api from "../services/api";
import { FaSignOutAlt } from "react-icons/fa";
function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const fetchOrders = async () => {
    try {
      //   const res = await api.get(`/admin/orders?search=${search}`);
      const res = await api.get(`/admin/orders`, {
        params: {
          search,
          fromDate,
          toDate,
        },
      });
      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     fetchOrders();

  //     const interval = setInterval(fetchOrders, 5000);

  //     return () => clearInterval(interval);
  //   }, [search]);

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, [search, fromDate, toDate]);
  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total_amount),
    0,
  );
  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status });

      toast.success("Status Updated");

      fetchOrders();
    } catch (err) {
      console.log(err);

      toast.error("Failed to update status");
    }
  };
  const logout = () => {
  localStorage.removeItem("adminToken");

  sessionStorage.clear();

  window.location.href = "/admin";
};
  return (
    <div className="admin-page">
      {/* <h1>🍿 Popcorn Admin Dashboard</h1>
      <button
    className="logout-btn"
    onClick={logout}
  >
    <FaSignOutAlt />
    Logout
  </button> */}<div className="dashboard-header">

  <h1>
    🍿 Popcorn Admin Dashboard
  </h1>

  <button
    className="logout-btn"
    onClick={logout}
  >
    <FaSignOutAlt />
    <span>Logout</span>
  </button>

</div>
      <div className="filter-row">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button
          className="clear-filter"
          onClick={() => {
            setFromDate("");
            setToDate("");
          }}
        >
          Clear
        </button>
{/* <button
  className="logout-btn"
  onClick={logout}
>
  Logout
</button> */}
        
      </div>
      <div className="stats">
        <div className="card">
          Orders
          <h2>{orders.length}</h2>
        </div>

        <div className="card">
          Revenue
          <h2>₹{totalRevenue}</h2>
        </div>
      </div>

      <input
        className="search"
        placeholder="
   Search customer,
   city,
   payment..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Items</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="9">No Orders Found</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>

                    <td>{order.name}</td>

                    <td>{order.phone}</td>

                    <td>{order.email}</td>

                    <td>
                      {order.address}

                      <br />

                      {order.city}

                      <br />

                      {order.pincode}
                    </td>

                    <td>{order.items}</td>

                    <td>{order.payment_method}</td>

                    {/* <td>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                    </td> */}
                    <td>
                      <select
                        className={`status-select ${order.status}`}
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                      >
                        <option value="PENDING">Pending</option>

                        <option value="PREPARING">Preparing</option>

                        <option value="OUT_FOR_DELIVERY">
                          Out For Delivery
                        </option>

                        <option value="DELIVERED">Delivered</option>

                        <option value="FAILED">Failed</option>
                      </select>
                    </td>

                    <td className="amount">₹{order.total_amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
