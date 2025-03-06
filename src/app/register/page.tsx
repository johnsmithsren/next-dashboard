'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { FaUser, FaLock, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const intl = useIntl();
  const router = useRouter();
  const { register, error, isLoading, clearError } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const validateForm = () => {
    clearError();
    setPasswordError('');
    
    if (!name || !email || !password || !confirmPassword) {
      return false;
    }
    
    if (password !== confirmPassword) {
      setPasswordError(intl.formatMessage({ id: 'register.passwordMismatch' }));
      return false;
    }
    
    if (password.length < 8) {
      setPasswordError(intl.formatMessage({ id: 'register.passwordTooShort' }));
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const success = await register(name, email, password);
    if (success) {
      router.push('/dashboard');
    }
  };
  
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {intl.formatMessage({ id: 'register.title' })}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {intl.formatMessage({ id: 'register.subtitle' })}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(error || passwordError) && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 mb-4">
              <div className="flex">
                <div className="text-sm text-red-700 dark:text-red-400">
                  {error || passwordError}
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                {intl.formatMessage({ id: 'register.name' })}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearError();
                  }}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 pl-10 pr-3 text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder={intl.formatMessage({ id: 'register.namePlaceholder' })}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="sr-only">
                {intl.formatMessage({ id: 'register.email' })}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
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
                  placeholder={intl.formatMessage({ id: 'register.emailPlaceholder' })}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">
                {intl.formatMessage({ id: 'register.password' })}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 pl-10 pr-3 text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder={intl.formatMessage({ id: 'register.passwordPlaceholder' })}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                {intl.formatMessage({ id: 'register.confirmPassword' })}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError('');
                  }}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 pl-10 pr-3 text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder={intl.formatMessage({ id: 'register.confirmPasswordPlaceholder' })}
                />
              </div>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-primary py-2 px-3 text-sm font-semibold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-primary/70"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUserPlus className="h-5 w-5 text-primary-light group-hover:text-white" />
              </span>
              {isLoading ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
              ) : (
                intl.formatMessage({ id: 'register.signUp' })
              )}
            </button>
          </div>
          
          <div className="text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {intl.formatMessage({ id: 'register.haveAccount' })}{' '}
            </span>
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              {intl.formatMessage({ id: 'register.signIn' })}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
