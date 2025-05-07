import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helpText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    className = '', 
    labelClassName = '', 
    wrapperClassName = '',
    leftIcon,
    rightIcon,
    helpText,
    id,
    placeholder,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const baseInputClasses = 'block w-full min-w-[240px] bg-gray-700 border rounded-md shadow-sm py-2.5 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none focus:ring-blue-500 sm:text-sm';
    const stateInputClasses = error
      ? 'border-red-500 text-red-900 placeholder-red-300'
      : 'border-gray-600 text-white placeholder-gray-400';
      
    const paddingClasses = leftIcon && rightIcon
      ? 'pl-10 pr-10'
      : leftIcon
      ? 'pl-10 pr-4'
      : rightIcon
      ? 'pl-4 pr-10'
      : 'px-4';
    
    return (
      <div className={wrapperClassName}>
        {label && (
          <label 
            htmlFor={inputId} 
            className={`block text-sm font-medium text-gray-300 mb-1.5 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 sm:text-sm">{leftIcon}</span>
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={`
              ${baseInputClasses} 
              ${stateInputClasses} 
              ${paddingClasses} 
              ${className}
            `}
            placeholder={placeholder}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-400 sm:text-sm">{rightIcon}</span>
            </div>
          )}
        </div>
        
        {error ? (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        ) : helpText ? (
          <p className="mt-1.5 text-sm text-gray-400">{helpText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;