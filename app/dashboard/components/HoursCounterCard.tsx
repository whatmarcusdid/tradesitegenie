import styles from '../Dashboard.module.css';

interface HoursCounterCardProps {
    maintenanceHours: number;
    supportHours: number;
}

const HoursCounterCard = ({ maintenanceHours, supportHours }: HoursCounterCardProps) => {
    return (
        <div className={styles.card}>
            <h2>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hours Overview
            </h2>
            <div className={styles.hoursContainer}>
                <div className={styles.hoursBlock}>
                    <span className={styles.hoursNumber}>{maintenanceHours}</span>
                    <span className={styles.hoursLabel}>Maintenance Hours Remaining</span>
                </div>
                <div className={styles.hoursBlock}>
                    <span className={styles.hoursNumber}>{supportHours}</span>
                    <span className={styles.hoursLabel}>Support Hours Remaining</span>
                </div>
            </div>
        </div>
    );
};

export default HoursCounterCard;
