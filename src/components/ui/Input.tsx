import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { useTheme } from '@/providers/ThemeProvider';

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 futuristic-input',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-9 px-3 py-2 text-sm',
        lg: 'h-11 px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size,
    type = 'text',
    label,
    error,
    helperText,
    startIcon,
    endIcon,
    startAdornment,
    endAdornment,
    id,
    ...props 
  }, ref) => {
    const { computedTheme } = useTheme();
    // Always call useId at the top level
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = !!error;
    const effectiveVariant = hasError ? 'error' : variant;
    
    const inputElement = (
  <input
    aria-label={label}
    type={type}
    className={cn(
      inputVariants({ variant: effectiveVariant, size }),
      {
        'pl-10': startIcon || startAdornment,
        'pr-10': endIcon || endAdornment,
      },
      computedTheme === 'dark' ? 'border-border/30 bg-background/60' : 'border-border/60 bg-background/80',
      className
    )}
    ref={ref}
    id={inputId}
    {...(hasError ? { 'aria-invalid': 'true' } : {})}
    aria-describedby={
      error ? `${inputId}-error` : 
      helperText ? `${inputId}-helper` : 
      undefined
    }
    {...props}
  />
    );
    
    const wrappedInput = (startIcon || endIcon || startAdornment || endAdornment) ? (
      <div className="relative">
        {(startIcon || startAdornment) && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {startIcon && (
              <span className="text-muted-foreground">
                {startIcon}
              </span>
            )}
            {startAdornment}
          </div>
        )}
        {inputElement}
        {(endIcon || endAdornment) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endAdornment}
            {endIcon && (
              <span className="text-muted-foreground">
                {endIcon}
              </span>
            )}
          </div>
        )}
      </div>
    ) : inputElement;
    
    if (label || error || helperText) {
      return (
        <div className="space-y-2">
          {label && (
            <label 
              htmlFor={inputId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-futuristic"
            >
              {label}
            </label>
          )}
          {wrappedInput}
          {(error || helperText) && (
            <p 
              id={error ? `${inputId}-error` : `${inputId}-helper`}
              className={cn(
                'text-sm',
                error ? 'text-destructive' : 'text-muted-foreground'
              )}
            >
              {error || helperText}
            </p>
          )}
        </div>
      );
    }
    
    return wrappedInput;
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };

// Specialized input components
export interface NumberInputProps extends Omit<InputProps, 'type' | 'onChange' | 'size'> {
  value?: number | string;
  onChange?: (value: string, numericValue: number) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  size?: React.ComponentProps<typeof Input>['size'];
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onChange, min, max, step, precision, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const stringValue = e.target.value;
      const numericValue = parseFloat(stringValue) || 0;
      
      // Apply constraints
      let constrainedValue = numericValue;
      if (min !== undefined && constrainedValue < min) {
        constrainedValue = min;
      }
      if (max !== undefined && constrainedValue > max) {
        constrainedValue = max;
      }
      
      // Apply precision
      if (precision !== undefined && precision >= 0) {
        constrainedValue = parseFloat(constrainedValue.toFixed(precision));
      }
      
      onChange?.(stringValue, constrainedValue);
    };
    
    return (
      <Input
        {...props}
        ref={ref}
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
    );
  }
);

NumberInput.displayName = 'NumberInput';

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'endIcon'> {
  showToggle?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    
    const togglePassword = () => setShowPassword(!showPassword);
    
    return (
      <Input
        {...props}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        endIcon={
          showToggle ? (
            <button
              type="button"
              onClick={togglePassword}
              className="hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L8.464 11.293M18.536 8.464l-1.414 1.414M18.536 8.464L17.121 10.293" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          ) : undefined
        }
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';