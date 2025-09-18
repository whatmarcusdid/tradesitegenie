// lib/types.ts

// A simplified type for Notion's rich text object
export interface RichText {
  plain_text: string;
  href?: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
}

// A simplified type for a Notion block
export interface Block {
  id: string;
  type:
    | 'paragraph'
    | 'heading_1'
    | 'heading_2'
    | 'heading_3'
    | 'bulleted_list_item'
    | 'numbered_list_item'
    | 'image';
  paragraph?: { rich_text: RichText[] };
  heading_1?: { rich_text: RichText[] };
  heading_2?: { rich_text: RichText[] };
  heading_3?: { rich_text: RichText[] };
  bulleted_list_item?: { rich_text: RichText[] };
  numbered_list_item?: { rich_text: RichText[] };
  image?: { external: { url: string } };
}

// A simplified type for a blog post (Notion Page)
export interface Post {
  id: string;
  cover?: {
    external?: {
      url: string;
    };
  } | null;
  properties: {
    Name: {
      title: RichText[];
    };
    Summary: {
      rich_text: RichText[];
    };
    Author: {
      rich_text: RichText[];
    };
    Date: {
      date: {
        start: string;
      };
    };
  };
}
