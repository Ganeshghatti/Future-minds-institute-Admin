'use client';

import { 
  BellIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useSidebar } from '../../context/SidebarContext';

export default function Header() {
  const { openSidebar } = useSidebar();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden -ml-2 mr-2 h-8 w-8 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              onClick={openSidebar}
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              Admin Panel
            </h1>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">

            <button
              type="button"
              className="hidden sm:block bg-white p-1.5 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <BellIcon className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <UserCircleIcon className="h-7 w-7 sm:h-8 sm:w-8 text-gray-400" />
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                Admin
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

