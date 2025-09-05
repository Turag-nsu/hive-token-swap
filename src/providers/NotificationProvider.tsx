'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import { CheckCircle, XCircle, AlertTriangle, Info, Loader2 } from 'lucide-react';

interface NotificationOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  id?: string | number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  dismissible?: boolean;
}

interface NotificationContextValue {
  success: (message: string, options?: NotificationOptions) => string | number;
  error: (message: string, options?: NotificationOptions) => string | number;
  warning: (message: string, options?: NotificationOptions) => string | number;
  info: (message: string, options?: NotificationOptions) => string | number;
  loading: (message: string, options?: Omit<NotificationOptions, 'duration'>) => string | number;
  promise: <T>(promise: Promise<T>, options: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  }) => Promise<T>;
  dismiss: (id?: string | number) => void;
  dismissAll: () => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: React.ReactNode;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  duration?: number;
  visibleToasts?: number;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ 
  children,
  position = 'top-right',
  duration = 4000,
  visibleToasts = 5,
}) => {

  const success = useCallback((message: string, options?: NotificationOptions) => {
    const toastOptions: any = {
      description: options?.description,
      duration: options?.duration || duration,
      dismissible: options?.dismissible ?? true,
      icon: <CheckCircle className="h-4 w-4" />,
      className: 'group toast toast-success',
      descriptionClassName: 'group-[.toast]:text-muted-foreground',
    };

    if (options?.id !== undefined) {
      toastOptions.id = options.id;
    }

    if (options?.action) {
      toastOptions.action = {
        label: options.action.label,
        onClick: options.action.onClick,
      };
    }

    return toast.success(message, toastOptions);
  }, [duration]);

  const error = useCallback((message: string, options?: NotificationOptions) => {
    const toastOptions: any = {
      description: options?.description,
      duration: options?.duration || (duration * 1.5), // Errors stay longer
      dismissible: options?.dismissible ?? true,
      icon: <XCircle className="h-4 w-4" />,
      className: 'group toast toast-error',
      descriptionClassName: 'group-[.toast]:text-muted-foreground',
    };

    if (options?.id !== undefined) {
      toastOptions.id = options.id;
    }

    if (options?.action) {
      toastOptions.action = {
        label: options.action.label,
        onClick: options.action.onClick,
      };
    }

    return toast.error(message, toastOptions);
  }, [duration]);

  const warning = useCallback((message: string, options?: NotificationOptions) => {
    const toastOptions: any = {
      description: options?.description,
      duration: options?.duration || duration,
      dismissible: options?.dismissible ?? true,
      icon: <AlertTriangle className="h-4 w-4" />,
      className: 'group toast toast-warning',
      descriptionClassName: 'group-[.toast]:text-muted-foreground',
    };

    if (options?.id !== undefined) {
      toastOptions.id = options.id;
    }

    if (options?.action) {
      toastOptions.action = {
        label: options.action.label,
        onClick: options.action.onClick,
      };
    }

    return toast.warning(message, toastOptions);
  }, [duration]);

  const info = useCallback((message: string, options?: NotificationOptions) => {
    const toastOptions: any = {
      description: options?.description,
      duration: options?.duration || duration,
      dismissible: options?.dismissible ?? true,
      icon: <Info className="h-4 w-4" />,
      className: 'group toast toast-info',
      descriptionClassName: 'group-[.toast]:text-muted-foreground',
    };

    if (options?.id !== undefined) {
      toastOptions.id = options.id;
    }

    if (options?.action) {
      toastOptions.action = {
        label: options.action.label,
        onClick: options.action.onClick,
      };
    }

    return toast.info(message, toastOptions);
  }, [duration]);

  const loading = useCallback((message: string, options?: Omit<NotificationOptions, 'duration'>) => {
    const toastOptions: any = {
      description: options?.description,
      dismissible: options?.dismissible ?? false,
      icon: <Loader2 className="h-4 w-4 animate-spin" />,
      className: 'group toast toast-loading',
      descriptionClassName: 'group-[.toast]:text-muted-foreground',
    };

    if (options?.id !== undefined) {
      toastOptions.id = options.id;
    }

    if (options?.action) {
      toastOptions.action = {
        label: options.action.label,
        onClick: options.action.onClick,
      };
    }

    return toast.loading(message, toastOptions);
  }, []);

  const promiseToast = useCallback(<T,>(
    promise: Promise<T>, 
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ): Promise<T> => {
    return toast.promise<T>(promise, {
      loading: options.loading,
      success: options.success,
      error: options.error,
      className: 'group toast',
      descriptionClassName: 'group-[.toast]:text-muted-foreground',
    }) as unknown as Promise<T>;
  }, []);

  const dismiss = useCallback((id?: string | number) => {
    if (id) {
      toast.dismiss(id);
    } else {
      toast.dismiss();
    }
  }, []);

  const dismissAll = useCallback(() => {
    toast.dismiss();
  }, []);

  const value: NotificationContextValue = {
    success,
    error,
    warning,
    info,
    loading,
    promise: promiseToast,
    dismiss,
    dismissAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toaster 
        position={position}
        richColors
        closeButton
        visibleToasts={visibleToasts}
        duration={duration}
        theme="system"
        className="toaster group"
        toastOptions={{
          className: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          descriptionClassName: 'group-[.toast]:text-muted-foreground',
          style: {
            fontFamily: 'var(--font-sans)',
          },
        }}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Convenience hooks for specific notification types
export const useSuccessNotification = () => {
  const { success } = useNotification();
  return success;
};

export const useErrorNotification = () => {
  const { error } = useNotification();
  return error;
};

export const useWarningNotification = () => {
  const { warning } = useNotification();
  return warning;
};

export const useInfoNotification = () => {
  const { info } = useNotification();
  return info;
};

export const useLoadingNotification = () => {
  const { loading, dismiss } = useNotification();
  
  return {
    show: loading,
    hide: dismiss,
  };
};

export const usePromiseNotification = () => {
  const { promise } = useNotification();
  return promise;
};