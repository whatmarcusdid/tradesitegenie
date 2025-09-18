import { MaintenanceTicket } from '@/lib/types';
import styles from '../Dashboard.module.css';

interface TicketsCardProps {
    tickets: MaintenanceTicket[];
}

const TicketsCard = ({ tickets }: TicketsCardProps) => {
    return (
        <div className={styles.card}>
            <h2>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Maintenance Tickets
            </h2>
            {tickets.length > 0 ? (
                <ul className={styles.ticketList}>
                    {tickets.map((ticket) => (
                        <li key={ticket.ticketId} className={styles.ticketItem}>
                            <span>{ticket.subject}</span>
                            <span className={`${styles.status} ${styles[ticket.status]}`}>
                                {ticket.status}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No maintenance tickets found.</p>
            )}
            <button className={styles.button} onClick={() => alert('Redirect to create ticket page')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Ticket
            </button>
        </div>
    );
};

export default TicketsCard;
