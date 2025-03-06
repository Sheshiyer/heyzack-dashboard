'use client';

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Document {
  slug: string;
  category: string;
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const category = params.category;
  const displayName = category.replace(/^\d+-/, '').replace(/-/g, ' ');
  
  useEffect(() => {
    async function fetchDocuments() {
      setLoading(true);
      try {
        const response = await fetch(`/api/documents?category=${category}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }
        const data = await response.json();
        setDocuments(data.documents || []);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDocuments();
  }, [category]);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 capitalize gradient-text">{displayName}</h1>
        
        {documents.length > 0 ? (
          <div className="grid gap-4">
            {documents.map((doc) => (
              <Link 
                key={doc.slug} 
                href={`/${params.category}/${doc.slug}`}
                className="card bg-heyzack-dark p-6 rounded-lg hover:shadow-lg transition-all border border-heyzack-light-gray hover:border-heyzack-purple"
              >
                <h2 className="text-xl font-semibold mb-2 capitalize text-white flex items-center">
                  <span className="text-heyzack-purple mr-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                    </svg>
                  </span>
                  {doc.slug.replace(/-/g, ' ')}
                </h2>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">View document</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-heyzack-purple" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card bg-heyzack-dark p-6 rounded-lg border border-heyzack-light-gray">
            <p className="text-gray-400">No documents found in this category.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
