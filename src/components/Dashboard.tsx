import React from 'react';
import { Clock, CheckCircle, DollarSign, Star, TrendingUp, MapPin } from 'lucide-react';
import { currentStaff, mockOrders } from '../data/mockData';
import { Performance } from '../types';

interface DashboardProps {
  onViewOrders: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewOrders }) => {
  const todayOrders = mockOrders.filter(order => 
    order.createdAt.includes('1403/01/19') || order.createdAt.includes('1403/01/20')
  );
  
  const pendingOrders = mockOrders.filter(order => order.status === 'pending');
  const inProgressOrders = mockOrders.filter(order => order.status === 'accepted' || order.status === 'in-progress');
  const completedToday = mockOrders.filter(order => 
    order.status === 'completed' && order.completedAt?.includes('1403/01/19')
  );

  const performance: Performance = {
    totalOrders: currentStaff.totalOrders,
    completedOrders: currentStaff.completedOrders,
    cancelledOrders: 14,
    totalEarnings: 15600000,
    averageRating: currentStaff.rating,
    thisMonthOrders: 28,
    thisMonthEarnings: 4200000
  };

  const stats = [
    {
      title: 'سفارش‌های امروز',
      value: todayOrders.length.toString(),
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'تکمیل شده امروز',
      value: completedToday.length.toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'درآمد این ماه',
      value: `${(performance.thisMonthEarnings / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'امتیاز میانگین',
      value: performance.averageRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src={currentStaff.avatar} 
              alt={currentStaff.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">سلام {currentStaff.name}</h2>
            <p className="text-gray-600">امروز {todayOrders.length} سفارش جدید داری</p>
            <div className="flex items-center gap-2 mt-2">
              <div className={`w-3 h-3 rounded-full ${currentStaff.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600">
                {currentStaff.isOnline ? 'آنلاین' : 'آفلاین'}
              </span>
            </div>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <MapPin size={16} />
            بروزرسانی موقعیت
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon size={20} className={stat.color} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">اقدامات سریع</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={onViewOrders}
            className="btn-primary flex items-center justify-center gap-2 py-3"
          >
            <Clock size={20} />
            مشاهده سفارش‌های در انتظار ({pendingOrders.length})
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2 py-3">
            <TrendingUp size={20} />
            گزارش عملکرد
          </button>
          <button className="btn-warning flex items-center justify-center gap-2 py-3">
            <MapPin size={20} />
            سفارش‌های در حال انجام ({inProgressOrders.length})
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">آخرین سفارش‌ها</h3>
          <button 
            onClick={onViewOrders}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            مشاهده همه
          </button>
        </div>
        <div className="space-y-3">
          {todayOrders.slice(0, 3).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{order.customerName}</p>
                <p className="text-sm text-gray-600">{order.serviceType}</p>
                <p className="text-xs text-gray-500">{order.requestedTime}</p>
              </div>
              <div className="text-left">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border status-${order.status}`}>
                  {order.status === 'pending' && 'در انتظار'}
                  {order.status === 'accepted' && 'پذیرفته شده'}
                  {order.status === 'in-progress' && 'در حال انجام'}
                  {order.status === 'completed' && 'تکمیل شده'}
                </span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {(order.amount / 1000).toFixed(0)}K تومان
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;