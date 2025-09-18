import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID || '';

export const getBlogPosts = async () => {
  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID environment variable is not set');
  }
  
  try {
    const response = await notion.databases.query({ 
      database_id: databaseId 
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts from Notion');
  }
};

export const getBlogPost = async (pageId: string) => {
  if (!pageId) {
    throw new Error('Page ID is required');
  }
  
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw new Error(`Failed to fetch blog post with ID: ${pageId}`);
  }
};

export const getPageContent = async (blockId: string) => {
  if (!blockId) {
    throw new Error('Block ID is required');
  }
  
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100, // Increased from 50 for better content retrieval
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching page content:', error);
    throw new Error(`Failed to fetch content for block ID: ${blockId}`);
  }
};
