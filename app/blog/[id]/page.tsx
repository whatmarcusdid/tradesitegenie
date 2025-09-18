
import React from 'react';
import styles from './post.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPost, getPageContent } from '@/lib/notion';
import { Post } from '@/lib/types';
import { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const renderBlock = (block: BlockObjectResponse | PartialBlockObjectResponse) => {
  // Partial blocks don't have a 'type'. We can safely ignore them.
  if (!('type' in block)) {
    return null;
  }

  switch (block.type) {
    case 'paragraph':
      return <p className={styles.postParagraph}>{block.paragraph.rich_text.map((rt) => rt.plain_text).join('')}</p>;
    case 'heading_1':
      return <h1 className={styles.postHeading}>{block.heading_1.rich_text.map((rt) => rt.plain_text).join('')}</h1>;
    case 'heading_2':
      return <h2 className={styles.postHeading}>{block.heading_2.rich_text.map((rt) => rt.plain_text).join('')}</h2>;
    case 'heading_3':
      return <h3 className={styles.postHeading}>{block.heading_3.rich_text.map((rt) => rt.plain_text).join('')}</h3>;
    case 'bulleted_list_item':
      return <li>{block.bulleted_list_item.rich_text.map((rt) => rt.plain_text).join('')}</li>;
    case 'numbered_list_item':
      return <li>{block.numbered_list_item.rich_text.map((rt) => rt.plain_text).join('')}</li>;
    case 'image':
      const src = block.image.type === 'external' ? block.image.external.url : block.image.file.url;
      const alt = block.image.caption.map((rt) => rt.plain_text).join('') || 'Post image';
      return <Image src={src} alt={alt} width={800} height={400} className={styles.postImage} />;
    default:
      // For simplicity, we'll ignore unsupported block types.
      // In a real app, you might want to log this for debugging.
      return null;
  }
};

interface PageProps {
  params: Promise<{ id: string }>;
}

const BlogPostPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const post = (await getBlogPost(id)) as unknown as Post;
  const pageContent = await getPageContent(id);

  return (
    <div className={styles.postContainer}>
      <main>
        <header className={styles.postHeader}>
          <h1 className={styles.postTitle}>{post.properties.Name.title[0].plain_text}</h1>
          <p className={styles.postMeta}>
            By {post.properties.Author.rich_text[0].plain_text} on {post.properties.Date.date.start}
          </p>
          <Image
            src={post.cover?.external?.url || '/placeholder-image.jpg'}
            alt={post.properties.Name.title[0].plain_text}
            width={800}
            height={400}
            className={styles.postImage}
          />
        </header>
        <div className={styles.postContent}>
          {pageContent.map((block) => (
            <React.Fragment key={block.id}>{renderBlock(block)}</React.Fragment>
          ))}
        </div>
        <div className={styles.postShare}>
          <button>Share on Twitter</button>
          <button>Share on Facebook</button>
          <button>Share on LinkedIn</button>
        </div>
        <Link href="/blog" className={styles.postBack}>
          Back to Blog
        </Link>
      </main>
      <aside className={styles.postSidebar}>
        <h3>Related Posts</h3>
        {/* You would map over related posts here */}
        <ul>
          <li>Related Post 1</li>
          <li>Related Post 2</li>
          <li>Related Post 3</li>
        </ul>
      </aside>
    </div>
  );
};

export default BlogPostPage;
