import { useEffect } from 'react';
import { cn } from '../../lib/utils';
import Button from './Button';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  className = '' 
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm sm:max-w-md',
    md: 'max-w-sm sm:max-w-lg',
    lg: 'max-w-sm sm:max-w-2xl lg:max-w-4xl',
    xl: 'max-w-sm sm:max-w-3xl lg:max-w-5xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-opacity-10 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={cn(
        'relative bg-white rounded-lg sm:rounded-xl shadow-xl w-full max-h-[98vh] sm:max-h-[95vh] overflow-hidden',
        sizes[size],
        className
      )}>
        {/* Header */}
        {title && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-2">
                {title}
              </h3>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 transition-colors flex-shrink-0"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Body */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-6 overflow-y-auto max-h-[calc(98vh-80px)] sm:max-h-[calc(95vh-120px)] overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

