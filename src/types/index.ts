export interface Staff {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  isOnline: boolean;
  currentLocation: {
    lat: number;
    lng: number;
  };
  totalOrders: number;
  completedOrders: number;
  rating: number;
  joinDate: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  serviceType: string;
  description?: string;
  requestedTime: string;
  assignedStaffId?: string;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  location: {
    lat: number;
    lng: number;
  };
  paymentMethod: 'cash' | 'online';
  paymentStatus: 'pending' | 'paid';
  amount: number;
  createdAt: string;
  completedAt?: string;
}

export interface Notification {
  id: string;
  type: 'new-order' | 'order-update' | 'payment' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  orderId?: string;
}

export interface Performance {
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalEarnings: number;
  averageRating: number;
  thisMonthOrders: number;
  thisMonthEarnings: number;
}