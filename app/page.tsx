'use client';

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Icons
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
  </svg>
);

const ChecklistIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
  </svg>
);

// Pre-campaign planning data
const campaignMetrics = {
  goal: "$1,000,000",
  current: "$0",
  backers: {
    target: 2000,
    current: 0
  },
  daysLeft: "Not started"
};

const quickLinks = [
  { name: "Ideal Customer Profile", href: "/1-Brand/icp" },
  { name: "Product Specifications", href: "/2-Product-Tech/product-details/specifications" },
  { name: "Campaign Budget", href: "/4-Finance/campaign-budget" },
  { name: "Marketing Calendar", href: "/6-Marketing/social-media-calendar" },
  { name: "Stretch Goal Plan", href: "/10-Stretch-Goals/stretch-goal-plan" }
];

const milestones = [
  { name: "Define Brand Identity", completed: false },
  { name: "Finalize Product Specs", completed: false },
  { name: "Create Marketing Assets", completed: false },
  { name: "Set Up Logistics", completed: false },
  { name: "Prepare Launch Strategy", completed: false }
];

export default function Home() {
  // Documents being worked on
  const [loading] = useState(false);
  const recentDocuments = [
    {
      category: '1-Brand',
      slug: 'brand-story',
      lastUpdated: 'In progress'
    },
    {
      category: '2-Product-Tech',
      slug: 'product-roadmap',
      lastUpdated: 'In progress'
    },
    {
      category: '6-Marketing',
      slug: 'social-media-calendar',
      lastUpdated: 'In progress'
    }
  ];
  
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 gradient-text">HeyZack Kickstarter Dashboard</h1>
        
        {/* Campaign Planning */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
            <span className="text-heyzack-purple mr-2"><ChartIcon /></span>
            Campaign Planning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Funding Goal */}
            <div className="card bg-heyzack-dark p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-heyzack-light-gray">
              <h3 className="text-lg font-semibold mb-3 text-white">Funding Goal</h3>
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Target: {campaignMetrics.goal}</span>
                  <span className="text-gray-300">0%</span>
                </div>
                <div className="w-full bg-heyzack-gray rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-heyzack-purple to-heyzack-magenta h-2.5 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-2">Campaign not yet launched</p>
            </div>
            
            {/* Backers Target */}
            <div className="card bg-heyzack-dark p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-heyzack-light-gray">
              <h3 className="text-lg font-semibold mb-3 text-white">Backers Target</h3>
              <p className="text-2xl font-bold text-white">{campaignMetrics.backers.target}</p>
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Current: {campaignMetrics.backers.current}</span>
                  <span className="text-gray-300">0%</span>
                </div>
                <div className="w-full bg-heyzack-gray rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-heyzack-purple to-heyzack-magenta h-2.5 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
            
            {/* Target Avg. Pledge */}
            <div className="card bg-heyzack-dark p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-heyzack-light-gray">
              <h3 className="text-lg font-semibold mb-3 text-white">Target Avg. Pledge</h3>
              <p className="text-2xl font-bold text-white">$500</p>
              <p className="text-gray-400 text-sm">Projected</p>
            </div>
            
            {/* Target Conversion */}
            <div className="card bg-heyzack-dark p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-heyzack-light-gray">
              <h3 className="text-lg font-semibold mb-3 text-white">Target Conversion</h3>
              <p className="text-2xl font-bold text-white">4.0%</p>
              <p className="text-gray-400 text-sm">Projected</p>
            </div>
          </div>
        </div>
        
        {/* Middle Section: 2 columns on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Pre-Launch Checklist */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <span className="text-heyzack-purple mr-2"><ChecklistIcon /></span>
              Pre-Launch Checklist
            </h2>
            <div className="card bg-heyzack-dark p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-heyzack-light-gray">
              <ul className="space-y-3">
                {milestones.map((milestone, index) => (
                  <li key={index} className="flex items-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full ${milestone.completed ? 'bg-heyzack-purple' : 'bg-heyzack-gray'}`}>
                      {milestone.completed ? (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      ) : (
                        <span className="text-xs text-white">{index + 1}</span>
                      )}
                    </span>
                    <span className={`${milestone.completed ? 'text-gray-300 line-through' : 'text-white'}`}>
                      {milestone.name}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-heyzack-light-gray">
                <Link href="/todos" className="text-heyzack-purple hover:text-heyzack-magenta transition-colors flex items-center justify-center">
                  <span className="mr-2">View All Tasks</span>
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Essential Resources */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <span className="text-heyzack-purple mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
              </span>
              Essential Resources
            </h2>
            <div className="card bg-heyzack-dark p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-heyzack-light-gray">
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-heyzack-purple hover:text-heyzack-magenta transition-colors flex items-center p-2 rounded-md hover:bg-heyzack-gray">
                      <ArrowRightIcon />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-heyzack-light-gray">
                <button className="text-heyzack-purple hover:text-heyzack-magenta transition-colors flex items-center justify-center w-full">
                  <span className="mr-2">Customize Quick Links</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Documents */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
            <span className="text-heyzack-purple mr-2"><DocumentIcon /></span>
            Key Documents
          </h2>
          
          {loading ? (
            <div className="card bg-heyzack-dark p-6 rounded-lg shadow-lg border border-heyzack-light-gray">
              <p className="text-gray-400">Loading documents...</p>
            </div>
          ) : recentDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentDocuments.map((doc, index) => (
                <Link 
                  key={index} 
                  href={`/${doc.category}/${doc.slug}`}
                  className="card bg-heyzack-dark p-6 rounded-lg hover:shadow-lg transition-all border border-heyzack-light-gray hover:border-heyzack-purple"
                >
                  <h3 className="text-lg font-semibold mb-2 capitalize text-white flex items-center">
                    <span className="text-heyzack-purple mr-2">
                      <DocumentIcon />
                    </span>
                    {doc.slug.replace(/-/g, ' ')}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{doc.lastUpdated}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{doc.category.replace(/-/g, ' ')}</span>
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
            <div className="card bg-heyzack-dark p-6 rounded-lg shadow-lg border border-heyzack-light-gray">
              <p className="text-gray-400">No documents found.</p>
            </div>
          )}
        </div>
        
        {/* Resource Spotlight */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
            <span className="text-heyzack-purple mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
            </span>
            Resource Spotlight
          </h2>
          <div className="card bg-gradient-to-br from-heyzack-dark to-heyzack-gray p-6 rounded-lg shadow-lg border border-heyzack-light-gray">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                <h3 className="text-xl font-bold mb-3 text-white">Brand Guidelines</h3>
                <p className="text-gray-300 mb-4">
                  Our comprehensive brand guidelines ensure consistency across all marketing materials and communications. 
                  Review the latest version to understand our visual identity, voice, and messaging.
                </p>
                <Link 
                  href="/1-Brand/brand-story" 
                  className="inline-flex items-center px-4 py-2 bg-heyzack-purple text-white rounded-md hover:bg-heyzack-magenta transition-colors"
                >
                  <span>View Brand Story</span>
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              <div className="md:w-1/3">
                <div className="bg-heyzack-black p-4 rounded-lg border border-heyzack-light-gray">
                  <Image 
                    src="/file.svg" 
                    alt="HeyZack Logo" 
                    className="w-full h-auto rounded"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
