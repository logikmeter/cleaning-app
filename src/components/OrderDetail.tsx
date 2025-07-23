import React, { useState } from 'react';
import { ArrowRight, MapPin, Clock, DollarSign, Phone, MessageSquare, Camera, CheckCircle, Navigation, User } from 'lucide-react';
import { Order } from '../types';

interface OrderDetailProps {
  order: Order;
  onBack: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onBack }) => {
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>(order.paymentMethod);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const updateStatus = (newStatus: string) => {
    setCurrentStatus(newStatus as any);
    // In a real app, this would make an API call
    console.log('Updating order status to:', newStatus);
  };

  const sendSMS = (message: string) => {
    // In a real app, this would send an SMS
    console.log(`Sending SMS to ${order.customerPhone}: ${message}`);
    alert(`پیامک ارسال شد: ${message}`);
  };

  const processPayment = () => {
    if (paymentMethod === 'online') {
      // Generate payment link
      const paymentLink = `https://payment.gateway.com/pay?amount=${order.amount}&order=${order.id}`;
      sendSMS(`لینک پرداخت: ${paymentLink}`);
    } else {
      // Mark as cash payment received
      alert('پرداخت نقدی ثبت شد');
    }
    setShowPaymentModal(false);
  };

  const getStatusOptions = () => {
    switch (currentStatus) {
      case 'pending':
        return [
          { value: 'accepted', label: 'پذیرش سفارش', color: 'btn-success' },
          { value: 'cancelled', label: 'رد سفارش', color: 'btn-danger' }
        ];
      case 'accepted':
        return [
          { value: 'in-progress', label: 'شروع کار', color: 'btn-primary' }
        ];
      case 'in-progress':
        return [
          { value: 'completed', label: 'اتمام کار', color: 'btn-success' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowRight size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-900">جزئیات سفارش #{order.id}</h2>
      </div>

      {/* Customer Info */}
      <div className="card p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={24} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{order.customerName}</h3>
            <p className="text-gray-600">{order.customerPhone}</p>
          </div>
          <div className="flex gap-2">
            <a 
              href={`tel:${order.customerPhone}`}
              className="btn-primary flex items-center gap-2"
            >
              <Phone size={16} />
              تماس
            </a>
            <button className="btn-secondary flex items-center gap-2">
              <MessageSquare size={16} />
              پیامک
            </button>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">جزئیات سفارش</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">{order.serviceType}</p>
              <p className="text-gray-600 text-sm">{order.address}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-gray-500" />
            <p className="text-gray-700">{order.requestedTime}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <DollarSign size={20} className="text-gray-500" />
            <p className="text-gray-700">
              {(order.amount / 1000).toFixed(0)}K تومان - 
              <span className="mr-2">
                {order.paymentMethod === 'cash' ? 'پرداخت نقدی' : 'پرداخت آنلاین'}
              </span>
            </p>
          </div>

          {order.description && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{order.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Status Update */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">وضعیت سفارش</h3>
        <div className="flex items-center gap-4 mb-4">
          <span className={`px-3 py-2 rounded-full text-sm font-medium border status-${currentStatus}`}>
            {currentStatus === 'pending' && 'در انتظار پذیرش'}
            {currentStatus === 'accepted' && 'پذیرفته شده'}
            {currentStatus === 'in-progress' && 'در حال انجام'}
            {currentStatus === 'completed' && 'تکمیل شده'}
            {currentStatus === 'cancelled' && 'لغو شده'}
          </span>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {getStatusOptions().map((option) => (
            <button
              key={option.value}
              onClick={() => updateStatus(option.value)}
              className={`${option.color} flex items-center gap-2`}
            >
              <CheckCircle size={16} />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">اقدامات سریع</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => sendSMS('نیروی نظافتی در راه شما است')}
            className="btn-primary flex items-center justify-center gap-2 py-3"
          >
            <MessageSquare size={20} />
            ارسال پیامک "در راه هستم"
          </button>
          
          <button 
            onClick={() => sendSMS('کار به اتمام رسید')}
            className="btn-success flex items-center justify-center gap-2 py-3"
          >
            <MessageSquare size={20} />
            ارسال پیامک "اتمام کار"
          </button>
          
          <button className="btn-secondary flex items-center justify-center gap-2 py-3">
            <Navigation size={20} />
            مسیریابی با نقشه
          </button>
          
          <button 
            onClick={() => setShowPaymentModal(true)}
            className="btn-warning flex items-center justify-center gap-2 py-3"
          >
            <DollarSign size={20} />
            مدیریت پرداخت
          </button>
        </div>
      </div>

      {/* Evidence Upload */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">ثبت مدارک</h3>
        <div className="space-y-4">
          <button className="w-full btn-secondary flex items-center justify-center gap-2 py-3">
            <Camera size={20} />
            ثبت عکس قبل از کار
          </button>
          <button className="w-full btn-secondary flex items-center justify-center gap-2 py-3">
            <Camera size={20} />
            ثبت عکس بعد از کار
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">مدیریت پرداخت</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع پرداخت
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'online')}
                      className="text-blue-600"
                    />
                    <span>پرداخت نقدی در محل</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'online')}
                      className="text-blue-600"
                    />
                    <span>ارسال لینک پرداخت آنلاین</span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={processPayment}
                  className="btn-primary flex-1"
                >
                  {paymentMethod === 'cash' ? 'ثبت پرداخت نقدی' : 'ارسال لینک پرداخت'}
                </button>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="btn-secondary"
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;