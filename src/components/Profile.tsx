import React, { useState } from 'react';
import { User, Phone, Mail, Calendar, Star, Award, TrendingUp, Camera, Edit, Save } from 'lucide-react';
import { currentStaff } from '../data/mockData';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentStaff.name,
    phone: currentStaff.phone,
    email: currentStaff.email
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const stats = [
    { label: 'کل سفارش‌ها', value: currentStaff.totalOrders, icon: Award },
    { label: 'تکمیل شده', value: currentStaff.completedOrders, icon: TrendingUp },
    { label: 'امتیاز میانگین', value: currentStaff.rating, icon: Star },
    { label: 'نرخ موفقیت', value: `${((currentStaff.completedOrders / currentStaff.totalOrders) * 100).toFixed(0)}%`, icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="card p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img 
                src={currentStaff.avatar} 
                alt={currentStaff.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-1 -left-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
              <Camera size={16} />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{currentStaff.name}</h2>
              <div className={`w-3 h-3 rounded-full ${currentStaff.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            </div>
            <p className="text-gray-600 mb-1">عضو از {currentStaff.joinDate}</p>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="text-gray-700 font-medium">{currentStaff.rating}</span>
              <span className="text-gray-500 text-sm">از 5</span>
            </div>
          </div>
          
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="btn-primary flex items-center gap-2"
          >
            {isEditing ? <Save size={16} /> : <Edit size={16} />}
            {isEditing ? 'ذخیره' : 'ویرایش'}
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">اطلاعات تماس</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User size={20} className="text-gray-500" />
            {isEditing ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                className="input-field flex-1"
                placeholder="نام و نام خانوادگی"
              />
            ) : (
              <p className="text-gray-700">{profileData.name}</p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-gray-500" />
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                className="input-field flex-1"
                placeholder="شماره تلفن"
              />
            ) : (
              <p className="text-gray-700">{profileData.phone}</p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-gray-500" />
            {isEditing ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="input-field flex-1"
                placeholder="آدرس ایمیل"
              />
            ) : (
              <p className="text-gray-700">{profileData.email}</p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-gray-500" />
            <p className="text-gray-700">عضو از {currentStaff.joinDate}</p>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">آمار عملکرد</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                <Icon size={24} className="mx-auto text-blue-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">عملکرد این ماه</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">سفارش‌های انجام شده</span>
            <span className="font-semibold">28</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">درآمد کل</span>
            <span className="font-semibold">4,200,000 تومان</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">میانگین درآمد روزانه</span>
            <span className="font-semibold">140,000 تومان</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-sm text-gray-600 text-center">75% از هدف ماهانه</p>
        </div>
      </div>

      {/* Settings */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">تنظیمات</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">اعلان‌های فوری</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700">ردیابی موقعیت</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700">حالت تاریک</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;