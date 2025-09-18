'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserAuth } from '@/lib/firebaseConfig';
import { User } from 'firebase/auth';
import { getUserData, getUserSubscription, getUserTickets } from '@/lib/database';
import { UserData, Subscription, MaintenanceTicket } from '@/lib/types';
import styles from './Dashboard.module.css';
import WelcomeCard from './components/WelcomeCard';
import SubscriptionCard from './components/SubscriptionCard';
import HoursCounterCard from './components/HoursCounterCard';
import AnalyticsCard from './components/AnalyticsCard';
import ScheduleSessionCard from './components/ScheduleSessionCard';
import SupportTicketsCard from './components/SupportTicketsCard';
import ReportsCard from './components/ReportsCard';
import BlogCard from './components/BlogCard';

const DashboardPage = () => {
  const router = useRouter();
  const auth = getBrowserAuth();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
  const [loading, setLoading] = useState(true);

  // Placeholder data
  const maintenanceHours = 10;
  const supportHours = 5;
  const siteTraffic = null; // or a number

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await getUserData(user.uid);
        if (userData && userData.userType === 'admin') {
          router.push('/admin'); // Redirect admins
          return;
        }

        setUser(user);
        setUserData(userData);

        const [userSubscription, userTickets] = await Promise.all([
          getUserSubscription(user.uid),
          getUserTickets(user.uid),
        ]);
        setSubscription(userSubscription);
        setTickets(userTickets);
      } else {
        router.push('/signin');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {userData && <h1 className={styles.title}>Welcome, {userData.name}!</h1>}
      <div className={styles.grid}>
        {user && userData && <WelcomeCard user={user} userData={userData} />}
        {subscription && <SubscriptionCard subscription={subscription} />}
        <HoursCounterCard maintenanceHours={maintenanceHours} supportHours={supportHours} />
        <AnalyticsCard siteTraffic={siteTraffic} />
        <ScheduleSessionCard />
        <ReportsCard />
        <SupportTicketsCard tickets={tickets} />
        <BlogCard />
      </div>
    </div>
  );
};

export default DashboardPage;
