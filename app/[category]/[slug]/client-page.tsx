'use client';

import ClientMarkdownRenderer from "@/components/ClientMarkdownRenderer";
import ClientDashboardLayout from "@/components/ClientDashboardLayout";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DocumentData {
  content: string;
  displayName: string;
}

export default function ClientDocumentPage({ 
  category, 
  slug, 
  initialDocument 
}: { 
  category: string; 
  slug: string;
  initialDocument: DocumentData | null;
}) {
  const [document, setDocument] = useState<DocumentData | null>(initialDocument);
  const [loading, setLoading] = useState(!initialDocument);
  const [error, setError] = useState(false);
  const displayName = category.replace(/^\d+-/, '').replace(/-/g, ' ');
  
  useEffect(() => {
    if (initialDocument) return;
    
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
  }, [category, slug, displayName, initialDocument]);
  
  if (loading) {
    return (
      <ClientDashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="card bg-heyzack-dark p-8 rounded-lg border border-heyzack-light-gray">
            <p className="text-gray-300">Loading document...</p>
          </div>
        </div>
      </ClientDashboardLayout>
    );
  }
  
  if (error || !document) {
    return (
      <ClientDashboardLayout>
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
            <p className="text-gray-300">The document you&apos;re looking for doesn&apos;t exist or couldn&apos;t be loaded.</p>
          </div>
        </div>
      </ClientDashboardLayout>
    );
  }
  
  return (
    <ClientDashboardLayout>
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
          <ClientMarkdownRenderer content={document.content} />
        </div>
      </div>
    </ClientDashboardLayout>
  );
}
