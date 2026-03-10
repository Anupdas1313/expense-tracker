import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, Wallet, PieChart, MessageSquareText, Calculator, Menu, X, MoreHorizontal, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { name: 'Home', path: '/', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: ListOrdered },
    { name: 'Accounts', path: '/accounts', icon: Wallet },
    { name: 'Summary', path: '/summary', icon: PieChart },
  ];

  const moreNavItems = [
    { name: 'Accounting', path: '/accounting', icon: Calculator },
    { name: 'Parse SMS', path: '/parse', icon: MessageSquareText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const allNavItems = [...mainNavItems, ...moreNavItems];

  return (
    <div className="flex h-screen bg-[#F7F7F7] flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 border-b border-[#EBEBEB] shrink-0 z-20 relative">
        <h1 className="text-xl font-bold text-[#222222] flex items-center gap-2">
          <Wallet className="text-[#222222]" />
          SMS Tracker
        </h1>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex bg-white border-r border-[#EBEBEB] flex-col w-64 shrink-0 z-20">
        <div className="p-6 border-b border-[#EBEBEB]">
          <h1 className="text-xl font-bold text-[#222222] flex items-center gap-2">
            <Wallet className="text-[#222222]" />
            SMS Tracker
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {allNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-neutral-100 text-[#222222]'
                    : 'text-[#717171] hover:bg-neutral-50 hover:text-[#222222]'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive ? 'text-[#222222]' : 'text-[#B0B0B0]')} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full relative z-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8 pb-24 md:pb-8 min-h-full">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EBEBEB] pb-safe z-50">
        <nav className="flex items-center justify-around px-2 h-16">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'flex flex-col items-center justify-center w-full h-full space-y-1',
                  isActive ? 'text-[#222222]' : 'text-[#717171] hover:text-[#222222]'
                )}
              >
                <Icon className={cn('w-6 h-6', isActive ? 'text-[#222222]' : 'text-[#B0B0B0]')} />
                <span className="text-[10px] font-semibold">{item.name}</span>
              </Link>
            );
          })}
          
          {/* More Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'flex flex-col items-center justify-center w-full h-full space-y-1',
              isMobileMenuOpen || moreNavItems.some(item => location.pathname === item.path)
                ? 'text-[#222222]' 
                : 'text-[#717171] hover:text-[#222222]'
            )}
          >
            <MoreHorizontal className={cn('w-6 h-6', isMobileMenuOpen || moreNavItems.some(item => location.pathname === item.path) ? 'text-[#222222]' : 'text-[#B0B0B0]')} />
            <span className="text-[10px] font-semibold">More</span>
          </button>
        </nav>
      </div>

      {/* Mobile More Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="absolute bottom-16 left-0 right-0 bg-white rounded-t-[24px] p-4 shadow-xl transform transition-transform"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-[#EBEBEB] rounded-full mx-auto mb-4" />
            <h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider mb-3 px-2">More Options</h3>
            <div className="space-y-1">
              {moreNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-neutral-100 text-[#222222]'
                        : 'text-[#717171] hover:bg-neutral-50 hover:text-[#222222]'
                    )}
                  >
                    <Icon className={cn('w-5 h-5', isActive ? 'text-[#222222]' : 'text-[#B0B0B0]')} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
