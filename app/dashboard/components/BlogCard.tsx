import styles from '../Dashboard.module.css';

const BlogCard = () => {
    // Placeholder data
    const blogPosts = [
        { id: 1, title: 'The Importance of a Strong Online Presence', link: '#' },
        { id: 2, title: '5 Tips for Improving Your Site\'s SEO', link: '#' },
        { id: 3, title: 'How to Use Social Media to Drive Traffic', link: '#' },
    ];

    return (
        <div className={`${styles.card} ${styles.fullWidth}`}>
            <h2>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 11a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2v11a2 2 0 01-2 2h-2z" />
                </svg>
                From the Blog
            </h2>
            <ul className={styles.blogList}>
                {blogPosts.map((post) => (
                    <li key={post.id} className={styles.blogItem}>
                        <a href={post.link}>{post.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogCard;
