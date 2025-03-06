'use client';

import React from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-heyzack-black">
      <Sidebar />
      <div className="flex-1 ml-80">
        <header className="h-16 border-b border-heyzack-light-gray flex items-center px-6">
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-heyzack-purple to-heyzack-magenta flex items-center justify-center text-white font-medium">
              HZ
            </div>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
