import React from 'react';
import styles from './blog.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/notion';
import { Post } from '@/lib/types';

const BlogPage = async () => {
  const blogPosts = await getBlogPosts();

  return (
    <div className={styles.blogContainer}>
      <header className={styles.blogHeader}>
        <h1 className={styles.blogTitle}>The Genie’s Guide to Growing Your Trade Business</h1>
        <p className={styles.blogIntro}>
          Welcome to our blog! Here, you’ll find valuable insights, tips, and resources to help you succeed in the trades.
        </p>
      </header>

      <main className={styles.blogList}>
        {blogPosts.map((post: Post) => (
          <div key={post.id} className={styles.blogCard}>
             <Image src={post.cover?.external?.url || '/placeholder-image.jpg'} alt={post.properties.Name.title[0].plain_text} className={styles.blogImage} width={800} height={600} />
            <div className={styles.blogCardContent}>
              <Link href={`/blog/${post.id}`}>
                <h2 className={styles.blogCardTitle}>{post.properties.Name.title[0].plain_text}</h2>
              </Link>
              <p className={styles.blogSummary}>{post.properties.Summary.rich_text[0].plain_text}</p>
            </div>
          </div>
        ))}
      </main>

      <div className={styles.blogPagination}>
        {/* Add pagination or infinite scroll component here */}
        <p>Pagination coming soon...</p>
      </div>
    </div>
  );
};

export default BlogPage;
