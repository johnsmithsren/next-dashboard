'use client';

import Sidebar, { MobileSidebar } from '@/components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64 pt-4 px-4 pb-20 md:pb-4">
        {children}
      </div>
      <MobileSidebar />
    </div>
  );
}
