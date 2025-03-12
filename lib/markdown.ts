import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked options
marked.use({
    gfm: true,
    breaks: true,
    pedantic: false,
    smartLists: true,
    smartypants: true,
});

/**
 * Renders markdown content to sanitized HTML
 */
export const renderMarkdown = async (content: string): Promise<string> => {
    // Parse markdown to HTML
    const html = marked(content);

    // Sanitize HTML to prevent XSS attacks
    const sanitized = typeof window !== 'undefined' ? DOMPurify.sanitize(html) : html;

    return sanitized;
};
