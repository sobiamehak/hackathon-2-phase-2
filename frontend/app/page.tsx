'use client';

import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 animate-fade-in">
              <span className="block">Welcome to</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Todo App</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto animate-fade-in">
              A secure, multi-user todo application designed to boost your productivity with seamless task management.
            </p>

            {user ? (
              <div className="animate-fade-in">
                <p className="text-lg text-gray-600 mb-8">
                  Welcome back! You're logged in as <span className="font-semibold text-blue-600">{user.email || user.name || 'User'}</span>.
                </p>
                <Link
                  href="/dashboard"
                  className="btn-primary inline-flex items-center px-8 py-3 text-lg font-medium rounded-full"
                >
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <div className="animate-fade-in">
                <p className="text-lg text-gray-600 mb-8">
                  Manage your tasks efficiently with our secure and user-friendly platform.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/login"
                    className="btn-primary inline-flex items-center px-8 py-3 text-lg font-medium rounded-full"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="btn-secondary inline-flex items-center px-8 py-3 text-lg font-medium rounded-full"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to stay organized and productive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Authentication</h3>
              <p className="text-gray-600">
                Enterprise-grade security with JWT-based authentication to keep your data safe.
              </p>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Task Management</h3>
              <p className="text-gray-600">
                Create, update, and manage your tasks with our intuitive interface.
              </p>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy Focused</h3>
              <p className="text-gray-600">
                Your tasks are private and only accessible to you with strict data isolation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Ready to boost your productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join thousands of users who trust our platform to manage their daily tasks.
          </p>
          {!user && (
            <Link
              href="/signup"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition duration-300"
            >
              Get Started Today
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}