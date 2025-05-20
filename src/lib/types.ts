
import type { Timestamp } from "firebase/firestore";

export interface Service {
  id: string;
  name: string;
  price: string;
  section: string;
  description?: string;
}

export interface Appointment {
  id?: string; // Firestore document ID
  userId?: string; // Firebase Auth UID, if booked by a logged-in user
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  date: Timestamp; // Firestore Timestamp
  selectedServiceId: string;
  serviceName: string;
  servicePrice: string;
  status: 'confirmed' | 'pending_approval' | 'cancelled_by_client' | 'cancelled_by_admin' | 'completed';
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  notes?: string; // Optional notes for the booking
}
