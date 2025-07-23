import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import { Order } from './types';
import { mockNotifications } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [notifications, setNotifications] = useState(mockNotifications);

  // Simulate receiving new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random new order notification
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const newNotification = {
          id: Date.now().toString(),
          type: 'new-order' as const,
          title: 'سفارش جدید',
          message: 'سفارش نظافت جدیدی در نزدیکی شما ثبت شده است',
          isRead: false,
          createdAt: new Date().toLocaleString('fa-IR'),
          orderId: 'new-' + Date.now()
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleBackFromOrder = () => {
    setSelectedOrder(null);
  };

  const handleViewOrders = () => {
    setActiveTab('orders');
    setSelectedOrder(null);
  };

  const renderContent = () => {
    if (selectedOrder) {
      return <OrderDetail order={selectedOrder} onBack={handleBackFromOrder} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onViewOrders={handleViewOrders} />;
      case 'orders':
        return <OrderList onOrderSelect={handleOrderSelect} />;
      case 'profile':
        return <Profile />;
      case 'notifications':
        return <Notifications onBack={() => setActiveTab('dashboard')} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onViewOrders={handleViewOrders} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      notificationCount={unreadNotifications}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;