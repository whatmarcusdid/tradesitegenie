import { Subscription } from '@/lib/types';
import styles from '../Dashboard.module.css';

interface SubscriptionCardProps {
    subscription: Subscription;
}

const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
    return (
        <div className={styles.card}>
            <h2>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Subscription Details
            </h2>
            <p>Plan: {subscription.plan}</p>
            <p>Status: {subscription.status}</p>
            <p>Amount: {subscription.amount} {subscription.currency.toUpperCase()}</p>
        </div>
    );
};

export default SubscriptionCard;
