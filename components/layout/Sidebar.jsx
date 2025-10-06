'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { useSidebar } from '../../context/SidebarContext';
import { 
  HomeIcon, 
  BookOpenIcon, 
  FolderIcon, 
  UsersIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Courses', href: '/courses', icon: BookOpenIcon },
  { name: 'Categories', href: '/categories', icon: FolderIcon },
  // { name: 'Users', href: '/users', icon: UsersIcon },
  // { name: 'Settings', href: '/settings', icon: CogIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { sidebarOpen, closeSidebar } = useSidebar();

  const handleLogout = () => {
    logout();
    closeSidebar();
  };

  const handleLinkClick = () => {
    closeSidebar();
  };

  const SidebarContent = () => (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700 lg:border-b-0">
        <h1 className="text-white text-lg sm:text-xl font-bold">Future Minds Admin</h1>
        <button
          onClick={closeSidebar}
          className="lg:hidden text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md p-1"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col pt-4 lg:pt-5 pb-4 overflow-y-auto">
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={`${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:scale-[1.02]`}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="px-2 pb-4">
          <button
            onClick={handleLogout}
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 w-full"
          >
            <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 flex-shrink-0" />
            <span className="truncate">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar*/}
      <div className={`lg:hidden fixed inset-0 z-50 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div 
          className="absolute inset-0 bg-opacity-10 backdrop-blur-sm"
          onClick={closeSidebar}
        />
        
        {/* Sidebar Panel */}
        <div className="relative flex flex-col w-64 h-full bg-gray-900 shadow-xl transform transition-transform">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}

