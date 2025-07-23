import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Phone, MessageSquare, Navigation, CheckCircle, X } from 'lucide-react';
import { mockOrders } from '../data/mockData';
import { Order } from '../types';

interface OrderListProps {
  onOrderSelect: (order: Order) => void;
}

const OrderList: React.FC<OrderListProps> = ({ onOrderSelect }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'in-progress' | 'completed'>('all');
  
  const filteredOrders = mockOrders.filter(order => 
    filter === 'all' || order.status === filter
  );

  const handleAcceptOrder = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would make an API call
    console.log('Accepting order:', order.id);
  };

  const handleRejectOrder = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would make an API call
    console.log('Rejecting order:', order.id);
  };

  const sendSMS = (order: Order, message: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would send an SMS
    console.log(`Sending SMS to ${order.customerPhone}: ${message}`);
    alert(`پیامک ارسال شد: ${message}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'accepted': return 'status-in-progress';
      case 'in-progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'در انتظار پذیرش';
      case 'accepted': return 'پذیرفته شده';
      case 'in-progress': return 'در حال انجام';
      case 'completed': return 'تکمیل شده';
      case 'cancelled': return 'لغو شده';
      default: return status;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'همه', count: mockOrders.length },
          { key: 'pending', label: 'در انتظار', count: mockOrders.filter(o => o.status === 'pending').length },
          { key: 'accepted', label: 'پذیرفته شده', count: mockOrders.filter(o => o.status === 'accepted').length },
          { key: 'in-progress', label: 'در حال انجام', count: mockOrders.filter(o => o.status === 'in-progress').length },
          { key: 'completed', label: 'تکمیل شده', count: mockOrders.filter(o => o.status === 'completed').length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              filter === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
            <span className={`px-2 py-1 rounded-full text-xs ${
              filter === tab.key ? 'bg-blue-500' : 'bg-gray-300'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div 
            key={order.id} 
            className="card hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onOrderSelect(order)}
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-900">{order.customerName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">{(order.amount / 1000).toFixed(0)}K تومان</p>
                  <p className="text-xs text-gray-500">{order.paymentMethod === 'cash' ? 'نقدی' : 'آنلاین'}</p>
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={16} />
                  <span className="text-sm">{order.serviceType}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <span className="text-sm">{order.requestedTime}</span>
                </div>
                <p className="text-sm text-gray-600 mr-6">{order.address}</p>
                {order.description && (
                  <p className="text-sm text-gray-600 mr-6 bg-gray-50 p-2 rounded">
                    {order.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-wrap">
                {order.status === 'pending' && (
                  <>
                    <button 
                      onClick={(e) => handleAcceptOrder(order, e)}
                      className="btn-success flex items-center gap-1 text-sm"
                    >
                      <CheckCircle size={16} />
                      پذیرش
                    </button>
                    <button 
                      onClick={(e) => handleRejectOrder(order, e)}
                      className="btn-danger flex items-center gap-1 text-sm"
                    >
                      <X size={16} />
                      رد
                    </button>
                  </>
                )}
                
                <a 
                  href={`tel:${order.customerPhone}`}
                  className="btn-secondary flex items-center gap-1 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone size={16} />
                  تماس
                </a>
                
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="btn-secondary flex items-center gap-1 text-sm"
                >
                  <Navigation size={16} />
                  مسیریابی
                </button>

                {/* SMS Actions */}
                {order.status === 'accepted' && (
                  <button 
                    onClick={(e) => sendSMS(order, 'نیروی نظافتی در راه شما است', e)}
                    className="btn-primary flex items-center gap-1 text-sm"
                  >
                    <MessageSquare size={16} />
                    در راه هستم
                  </button>
                )}
                
                {order.status === 'in-progress' && (
                  <button 
                    onClick={(e) => sendSMS(order, 'کار به اتمام رسید', e)}
                    className="btn-success flex items-center gap-1 text-sm"
                  >
                    <MessageSquare size={16} />
                    اتمام کار
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Clock size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">سفارشی وجود ندارد</h3>
          <p className="text-gray-600">در حال حاضر سفارشی با این فیلتر وجود ندارد</p>
        </div>
      )}
    </div>
  );
};

export default OrderList;