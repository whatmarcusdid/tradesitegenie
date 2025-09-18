import styles from '../Dashboard.module.css';

interface AnalyticsCardProps {
    siteTraffic: number | null;
}

const AnalyticsCard = ({ siteTraffic }: AnalyticsCardProps) => {
    return (
        <div className={styles.card}>
            <h2>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Site Traffic
            </h2>
            <div className={styles.analyticsContainer}>
                {siteTraffic !== null ? (
                    <>
                        <span className={styles.analyticsNumber}>{siteTraffic}</span>
                        <span className={styles.analyticsLabel}>Unique Visitors</span>
                    </>
                ) : (
                    <span className={styles.notAvailable}>N/A</span>
                )}
            </div>
        </div>
    );
};

export default AnalyticsCard;
