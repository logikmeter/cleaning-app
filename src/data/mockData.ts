import { Staff, Order, Notification } from '../types';

export const currentStaff: Staff = {
  id: '1',
  name: 'احمد محمدی',
  phone: '09123456789',
  email: 'ahmad@example.com',
  avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
  isOnline: true,
  currentLocation: {
    lat: 35.7219,
    lng: 51.3347
  },
  totalOrders: 156,
  completedOrders: 142,
  rating: 4.8,
  joinDate: '1402/03/15'
};

export const mockOrders: Order[] = [
  {
    id: '1',
    customerId: 'c1',
    customerName: 'مریم احمدی',
    customerPhone: '09121234567',
    address: 'تهران، خیابان ولیعصر، پلاک 123، واحد 4',
    serviceType: 'نظافت منزل',
    description: 'نظافت کامل آپارتمان 80 متری، شامل تمیز کردن آشپزخانه و حمام',
    requestedTime: '1403/01/20 - 14:00',
    status: 'pending',
    location: {
      lat: 35.7219,
      lng: 51.3347
    },
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    amount: 500000,
    createdAt: '1403/01/19 - 10:30'
  },
  {
    id: '2',
    customerId: 'c2',
    customerName: 'علی رضایی',
    customerPhone: '09129876543',
    address: 'تهران، خیابان انقلاب، پلاک 456، طبقه 2',
    serviceType: 'نظافت اداری',
    description: 'تمیز کردن دفتر کار 150 متری',
    requestedTime: '1403/01/20 - 16:00',
    assignedStaffId: '1',
    status: 'accepted',
    location: {
      lat: 35.7000,
      lng: 51.4000
    },
    paymentMethod: 'online',
    paymentStatus: 'pending',
    amount: 800000,
    createdAt: '1403/01/19 - 08:15'
  },
  {
    id: '3',
    customerId: 'c3',
    customerName: 'فاطمه کریمی',
    customerPhone: '09125555555',
    address: 'تهران، خیابان شریعتی، پلاک 789',
    serviceType: 'نظافت منزل',
    requestedTime: '1403/01/19 - 09:00',
    assignedStaffId: '1',
    status: 'completed',
    location: {
      lat: 35.7500,
      lng: 51.4200
    },
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    amount: 600000,
    createdAt: '1403/01/18 - 14:20',
    completedAt: '1403/01/19 - 12:30'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'new-order',
    title: 'سفارش جدید',
    message: 'سفارش نظافت منزل جدیدی در نزدیکی شما ثبت شده است',
    isRead: false,
    createdAt: '1403/01/19 - 10:30',
    orderId: '1'
  },
  {
    id: '2',
    type: 'payment',
    title: 'پرداخت انجام شد',
    message: 'مبلغ 600,000 تومان بابت سفارش فاطمه کریمی پرداخت شد',
    isRead: false,
    createdAt: '1403/01/19 - 12:35'
  },
  {
    id: '3',
    type: 'system',
    title: 'به‌روزرسانی سامانه',
    message: 'نسخه جدید اپلیکیشن در دسترس است',
    isRead: true,
    createdAt: '1403/01/18 - 09:00'
  }
];