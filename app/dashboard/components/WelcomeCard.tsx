import { UserData } from '@/lib/types';
import styles from '../Dashboard.module.css';

interface WelcomeCardProps {
    userData: UserData;
}

const WelcomeCard = ({ userData }: WelcomeCardProps) => {
    return (
        <div className={styles.card}>
            <h2>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Welcome, {userData.name}!
            </h2>
            <p>Email: {userData.email}</p>
            <p>Subscription: {userData.subscriptionStatus}</p>
        </div>
    );
};

export default WelcomeCard;
