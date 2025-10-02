import { cn } from '../../lib/utils';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={cn('bg-white overflow-hidden shadow rounded-lg', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={cn('px-4 py-5 sm:px-6', className)}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = '' }) => {
  return (
    <h3 className={cn('text-lg leading-6 font-medium text-gray-900', className)}>
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className = '' }) => {
  return (
    <p className={cn('mt-1 text-sm text-gray-500', className)}>
      {children}
    </p>
  );
};

const CardContent = ({ children, className = '' }) => {
  return (
    <div className={cn('px-4 py-5 sm:p-6', className)}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={cn('px-4 py-4 sm:px-6', className)}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };

