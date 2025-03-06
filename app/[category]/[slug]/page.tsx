'use client';

import MarkdownRenderer from "@/components/MarkdownRenderer";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DocumentData {
  content: string;
  displayName: string;
}

export default function DocumentPage({ params }: { params: { category: string; slug: string } }) {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const category = params.category;
  const slug = params.slug;
  const displayName = category.replace(/^\d+-/, '').replace(/-/g, ' ');
  
  useEffect(() => {
    async function fetchDocument() {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(`/api/document?category=${category}&slug=${slug}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch document');
        }
        const data = await response.json();
        if (data.document) {
          setDocument({
            content: data.document.content,
            displayName: data.document.displayName || displayName
          });
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching document:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDocument();
  }, [category, slug, displayName]);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="card bg-heyzack-dark p-8 rounded-lg border border-heyzack-light-gray">
            <p className="text-gray-300">Loading document...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link 
              href={`/${category}`} 
              className="text-heyzack-purple hover:text-heyzack-magenta transition-colors flex items-center"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              Back to {displayName}
            </Link>
          </div>
          
          <div className="card bg-heyzack-dark p-8 rounded-lg border border-heyzack-light-gray">
            <h1 className="text-2xl font-bold mb-4 text-white">Document Not Found</h1>
            <p className="text-gray-300">The document you're looking for doesn't exist or couldn't be loaded.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link 
            href={`/${category}`} 
            className="text-heyzack-purple hover:text-heyzack-magenta transition-colors flex items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to {displayName}
          </Link>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold capitalize gradient-text">{slug.replace(/-/g, ' ')}</h1>
        </div>
        
        <div className="prose prose-invert prose-lg max-w-none">
          {document && <MarkdownRenderer content={document.content} />}
        </div>
      </div>
    </DashboardLayout>
  );
}
