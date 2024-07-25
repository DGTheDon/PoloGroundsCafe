import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const getMenuItems = async () => {
  const menuSnapshot = await getDocs(collection(db, 'menuItems'));
  return menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const placeOrder = async (orderData) => {
  return await addDoc(collection(db, 'orders'), orderData);
};