import Link from 'next/link';
import styles from '../Dashboard.module.css';

const ScheduleSessionCard = () => {
    return (
        <div className={styles.card}>
            <h2>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule Your Welcome Session
            </h2>
            <p>Get a personalized walkthrough of your new dashboard and services.</p>
            <Link href="/scheduling" passHref>
                <button className={styles.button}>Schedule Now</button>
            </Link>
        </div>
    );
};

export default ScheduleSessionCard;
