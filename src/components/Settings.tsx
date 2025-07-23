import React, { useState } from 'react';
import { 
  Bell, 
  MapPin, 
  Moon, 
  Shield, 
  HelpCircle, 
  LogOut, 
  Smartphone,
  Globe,
  AlertTriangle,
  Camera,
  FileText
} from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    locationTracking: true,
    darkMode: false,
    autoAcceptOrders: false,
    soundAlerts: true,
    vibrationAlerts: true
  });

  const updateSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const [showViolationModal, setShowViolationModal] = useState(false);
  const [violationData, setViolationData] = useState({
    type: '',
    description: '',
    evidence: null as File | null
  });

  const submitViolationReport = () => {
    // In a real app, this would submit to backend
    console.log('Submitting violation report:', violationData);
    alert('گزارش تخلف با موفقیت ارسال شد');
    setShowViolationModal(false);
    setViolationData({ type: '', description: '', evidence: null });
  };

  const settingsGroups = [
    {
      title: 'اعلان‌ها',
      icon: Bell,
      items: [
        {
          key: 'notifications' as keyof typeof settings,
          label: 'اعلان‌های فوری',
          description: 'دریافت اعلان برای سفارش‌های جدید'
        },
        {
          key: 'soundAlerts' as keyof typeof settings,
          label: 'هشدار صوتی',
          description: 'پخش صدا هنگام دریافت اعلان'
        },
        {
          key: 'vibrationAlerts' as keyof typeof settings,
          label: 'لرزش گوشی',
          description: 'لرزش گوشی هنگام دریافت اعلان'
        }
      ]
    },
    {
      title: 'موقعیت و نقشه',
      icon: MapPin,
      items: [
        {
          key: 'locationTracking' as keyof typeof settings,
          label: 'ردیابی موقعیت',
          description: 'اشتراک‌گذاری موقعیت با تیم مدیریت'
        }
      ]
    },
    {
      title: 'تنظیمات کلی',
      icon: Smartphone,
      items: [
        {
          key: 'darkMode' as keyof typeof settings,
          label: 'حالت تاریک',
          description: 'استفاده از تم تاریک اپلیکیشن'
        },
        {
          key: 'autoAcceptOrders' as keyof typeof settings,
          label: 'پذیرش خودکار',
          description: 'پذیرش خودکار سفارش‌ها در شعاع 2 کیلومتری'
        }
      ]
    }
  ];

  const actionItems = [
    {
      icon: AlertTriangle,
      label: 'گزارش تخلف',
      description: 'گزارش تخلفات سایر کارکنان',
      action: () => setShowViolationModal(true),
      color: 'text-red-600'
    },
    {
      icon: HelpCircle,
      label: 'راهنما و پشتیبانی',
      description: 'دسترسی به راهنمای کاربری',
      action: () => alert('راهنمای کاربری در حال توسعه است'),
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      label: 'حریم خصوصی',
      description: 'مدیریت تنظیمات حریم خصوصی',
      action: () => alert('تنظیمات حریم خصوصی'),
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">تنظیمات</h2>

      {/* Settings Groups */}
      {settingsGroups.map((group, groupIndex) => {
        const GroupIcon = group.icon;
        return (
          <div key={groupIndex} className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <GroupIcon size={20} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">{group.title}</h3>
            </div>
            
            <div className="space-y-4">
              {group.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings[item.key]}
                      onChange={() => updateSetting(item.key)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Action Items */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">اقدامات</h3>
        <div className="space-y-3">
          {actionItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-4 p-3 text-right hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Icon size={20} className={item.color} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="card p-6">
        <button className="w-full btn-danger flex items-center justify-center gap-2 py-3">
          <LogOut size={20} />
          خروج از حساب کاربری
        </button>
      </div>

      {/* App Info */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">اطلاعات اپلیکیشن</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>نسخه: 1.0.0</p>
          <p>آخرین به‌روزرسانی: 1403/01/20</p>
          <p>پشتیبانی: support@cleaningservice.com</p>
        </div>
      </div>

      {/* Violation Report Modal */}
      {showViolationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">گزارش تخلف</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع تخلف
                </label>
                <select 
                  value={violationData.type}
                  onChange={(e) => setViolationData({...violationData, type: e.target.value})}
                  className="input-field"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="late">تأخیر در انجام کار</option>
                  <option value="quality">کیفیت پایین کار</option>
                  <option value="behavior">رفتار نامناسب</option>
                  <option value="safety">عدم رعایت نکات ایمنی</option>
                  <option value="other">سایر موارد</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات
                </label>
                <textarea
                  value={violationData.description}
                  onChange={(e) => setViolationData({...violationData, description: e.target.value})}
                  className="input-field h-24 resize-none"
                  placeholder="توضیحات کاملی از تخلف ارائه دهید..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مدارک (اختیاری)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">برای آپلود مدارک کلیک کنید</p>
                  <input type="file" className="hidden" accept="image/*,video/*" />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={submitViolationReport}
                  disabled={!violationData.type || !violationData.description}
                  className="btn-danger flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ارسال گزارش
                </button>
                <button 
                  onClick={() => setShowViolationModal(false)}
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

export default Settings;