'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
  className?: string;
}

export default function LoginForm({ 
  onSuccess, 
  redirectTo = '/dashboard', 
  className = '' 
}: LoginFormProps) {
  const intl = useIntl();
  const router = useRouter();
  const { login, error, isLoading, clearError } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }
    
    const success = await login(email, password);
    
    if (success) {
      if (onSuccess) {
        onSuccess();
      } else if (redirectTo) {
        router.push(redirectTo);
      }
    }
  };
  
  return (
    <div className={`w-full max-w-md space-y-6 ${className}`}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
            <div className="flex">
              <div className="text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {intl.formatMessage({ id: 'login.email' })}
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError();
                }}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 pl-10 pr-3 text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder={intl.formatMessage({ id: 'login.emailPlaceholder' })}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {intl.formatMessage({ id: 'login.password' })}
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError();
                }}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 pl-10 pr-3 text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder={intl.formatMessage({ id: 'login.passwordPlaceholder' })}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              {intl.formatMessage({ id: 'login.rememberMe' })}
            </label>
          </div>
          
          <div className="text-sm">
            <Link
              href="/forgot-password"
              className="font-medium text-primary hover:text-primary/80"
            >
              {intl.formatMessage({ id: 'login.forgotPassword' })}
            </Link>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-md bg-primary py-2 px-3 text-sm font-semibold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-primary/70"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSignInAlt className="h-5 w-5 text-primary-light group-hover:text-white" />
            </span>
            {isLoading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
            ) : (
              intl.formatMessage({ id: 'login.signIn' })
            )}
          </button>
        </div>
        
        <div className="text-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {intl.formatMessage({ id: 'login.noAccount' })}{' '}
          </span>
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary/80"
          >
            {intl.formatMessage({ id: 'login.signUp' })}
          </Link>
        </div>
      </form>
    </div>
  );
}
