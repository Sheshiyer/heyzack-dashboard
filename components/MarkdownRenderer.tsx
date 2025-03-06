'use client';

import React, { useEffect, useRef } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import mermaid from 'mermaid';

interface MarkdownRendererProps {
  content: string;
}

async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(markdown);
  return result.toString();
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [contentHtml, setContentHtml] = React.useState<string>('');
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const processMarkdown = async () => {
      if (!content) return;
      
      try {
        const html = await markdownToHtml(content);
        setContentHtml(html);
      } catch (error) {
        console.error('Error processing markdown:', error);
        setContentHtml('<p>Error rendering content</p>');
      }
    };
    
    processMarkdown();
  }, [content]);

  useEffect(() => {
    if (contentHtml && mermaidRef.current) {
      // Initialize mermaid
      mermaid.initialize({
        startOnLoad: true,
        theme: 'dark',
        securityLevel: 'loose',
        themeVariables: {
          primaryColor: '#9333ea', // heyzack-purple
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#9333ea',
          lineColor: '#9333ea',
          secondaryColor: '#ec4899', // heyzack-magenta
          tertiaryColor: '#1e1e1e', // dark background
        }
      });
      
      // Find all mermaid code blocks and render them
      const mermaidDivs = mermaidRef.current.querySelectorAll('.language-mermaid');
      mermaidDivs.forEach((element, index) => {
        const mermaidCode = element.textContent || '';
        try {
          mermaid.render(`mermaid-${index}`, mermaidCode).then(({ svg }) => {
            // Replace the code block with the rendered SVG
            const container = document.createElement('div');
            container.innerHTML = svg;
            container.className = 'my-4 overflow-auto';
            element.parentNode?.replaceChild(container, element);
          });
        } catch (error) {
          console.error('Mermaid rendering error:', error);
        }
      });
      
      // Add syntax highlighting to code blocks
      const codeBlocks = mermaidRef.current.querySelectorAll('pre code:not(.language-mermaid)');
      codeBlocks.forEach((block) => {
        const language = block.className.replace('language-', '') || 'text';
        const code = block.textContent || '';
        
        // Create a new syntax highlighted element
        const highlightedBlock = document.createElement('div');
        highlightedBlock.className = 'my-4 rounded-md overflow-auto max-h-96';
        
        // Use React to render the syntax highlighter
        const syntaxHighlighter = document.createElement('div');
        syntaxHighlighter.className = 'syntax-highlighter';
        syntaxHighlighter.setAttribute('data-language', language);
        syntaxHighlighter.setAttribute('data-code', code);
        
        highlightedBlock.appendChild(syntaxHighlighter);
        block.parentNode?.replaceChild(highlightedBlock, block);
      });
      
      // Add scrolling to tables
      const tables = mermaidRef.current.querySelectorAll('table');
      tables.forEach((table) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'overflow-auto my-4';
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      });
    }
  }, [contentHtml]);

  return (
    <div 
      ref={mermaidRef}
      className="prose prose-invert prose-sm sm:prose lg:prose-lg max-w-none bg-heyzack-dark p-8 rounded-lg shadow-lg markdown-content"
    >
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      
      <style jsx global>{`
        .markdown-content {
          color: #f8f8f8;
        }
        
        .markdown-content h1, 
        .markdown-content h2, 
        .markdown-content h3, 
        .markdown-content h4 {
          color: white;
          border-bottom: 1px solid #333;
          padding-bottom: 0.5rem;
          margin-top: 2rem;
        }
        
        .markdown-content h1 {
          background: linear-gradient(90deg, #9333ea, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        
        .markdown-content a {
          color: #ec4899;
          text-decoration: none;
        }
        
        .markdown-content a:hover {
          text-decoration: underline;
        }
        
        .markdown-content blockquote {
          border-left: 4px solid #9333ea;
          padding-left: 1rem;
          font-style: italic;
          color: #d1d1d1;
        }
        
        .markdown-content pre {
          background-color: #1a1a1a;
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
        }
        
        .markdown-content code {
          background-color: #2d2d2d;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }
        
        .markdown-content pre code {
          background-color: transparent;
          padding: 0;
        }
        
        .markdown-content table {
          border-collapse: collapse;
          width: 100%;
        }
        
        .markdown-content th {
          background-color: #2d2d2d;
          padding: 0.75rem;
          text-align: left;
        }
        
        .markdown-content td {
          padding: 0.75rem;
          border-top: 1px solid #333;
        }
        
        .markdown-content tr:nth-child(even) {
          background-color: #1a1a1a;
        }
        
        .markdown-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }
        
        .markdown-content ul, 
        .markdown-content ol {
          padding-left: 1.5rem;
        }
        
        .markdown-content li {
          margin-bottom: 0.5rem;
        }
        
        .markdown-content hr {
          border: 0;
          height: 1px;
          background: #333;
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
}
