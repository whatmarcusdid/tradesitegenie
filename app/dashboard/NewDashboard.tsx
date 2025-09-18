'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';
import { UserData, Subscription, MaintenanceTicket } from '@/lib/types';
import { FiUser, FiBarChart2, FiRss, FiClock, FiFileText, FiCalendar, FiCreditCard, FiHelpCircle } from 'react-icons/fi';

const NewDashboardPage = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/signin');
        }
    }, [user, loading, router]);

    if (loading) {
        return <p className="text-center text-lg">Loading...</p>;
    }

    if (!user) {
        return null;
    }

    // Dummy data for demonstration
    const userData: UserData = {
        name: user.displayName || 'User',
        email: user.email || 'No email',
        subscriptionStatus: 'Active',
    };

    const siteTraffic = 12345;

    const maintenanceHours = 10;
    const supportHours = 5;

    const subscription: Subscription = {
        plan: 'Pro',
        status: 'Active',
        amount: '$99/month',
        currency: 'USD',
    };

    const tickets: MaintenanceTicket[] = [
        { ticketId: 'TICK-001', subject: 'Website down', status: 'Open', lastUpdated: new Date().toISOString() },
        { ticketId: 'TICK-002', subject: 'Plugin issue', status: 'In Progress', lastUpdated: new Date().toISOString() },
        { ticketId: 'TICK-003', subject: 'Billing question', status: 'Closed', lastUpdated: new Date().toISOString() },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Welcome to your command center.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Welcome Card */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 bg-white p-6 rounded-lg shadow-md flex items-center">
                        <FiUser className="text-4xl text-blue-500 mr-4" />
                        <div>
                            <h2 className="text-2xl font-semibold">Welcome, {userData.name}!</h2>
                            <p className="text-gray-500">{userData.email}</p>
                        </div>
                    </div>

                    {/* Analytics Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <FiBarChart2 className="text-3xl text-green-500 mr-3" />
                            <h3 className="text-xl font-semibold">Site Traffic</h3>
                        </div>
                        <p className="text-4xl font-bold">{siteTraffic.toLocaleString()}</p>
                        <p className="text-gray-500">Unique Visitors</p>
                    </div>

                    {/* Hours Counter Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <FiClock className="text-3xl text-yellow-500 mr-3" />
                            <h3 className="text-xl font-semibold">Hours Overview</h3>
                        </div>
                        <div className="flex justify-around">
                            <div className="text-center">
                                <p className="text-4xl font-bold">{maintenanceHours}</p>
                                <p className="text-gray-500">Maintenance</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold">{supportHours}</p>
                                <p className="text-gray-500">Support</p>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <FiCreditCard className="text-3xl text-purple-500 mr-3" />
                            <h3 className="text-xl font-semibold">Subscription</h3>
                        </div>
                        <p className="text-lg"><span className="font-semibold">Plan:</span> {subscription.plan}</p>
                        <p className="text-lg"><span className="font-semibold">Status:</span> {subscription.status}</p>
                        <p className="text-lg"><span className="font-semibold">Amount:</span> {subscription.amount}</p>
                    </div>

                    {/* Schedule Session Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <FiCalendar className="text-3xl text-red-500 mr-3" />
                            <h3 className="text-xl font-semibold">Schedule Welcome Session</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Get a personalized walkthrough of your new dashboard.</p>
                        <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                            Schedule Now
                        </button>
                    </div>

                    {/* Reports Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <FiFileText className="text-3xl text-indigo-500 mr-3" />
                            <h3 className="text-xl font-semibold">Monthly Reports</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Download your latest performance and analytics reports.</p>
                        <button className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                            Download Reports
                        </button>
                    </div>

                    {/* Support Tickets Card */}
                    <div className="md:col-span-2 lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <FiHelpCircle className="text-3xl text-orange-500 mr-3" />
                            <h3 className="text-xl font-semibold">Support Tickets</h3>
                        </div>
                        <ul className="space-y-4">
                            {tickets.map(ticket => (
                                <li key={ticket.ticketId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-semibold">{ticket.subject}</p>
                                        <p className="text-sm text-gray-500">{ticket.ticketId}</p>
                                    </div>
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                        ticket.status === 'Open' ? 'bg-green-100 text-green-800' :
                                        ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {ticket.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <button className="mt-4 w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300">
                            Create New Ticket
                        </button>
                    </div>

                    {/* Blog Card */}
                    <div className="md:col-span-2 lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <FiRss className="text-3xl text-teal-500 mr-3" />
                            <h3 className="text-xl font-semibold">From the Blog</h3>
                        </div>
                        <ul className="space-y-3">
                            <li className="hover:text-blue-500 transition duration-300"><a href="#">The Importance of a Strong Online Presence</a></li>
                            <li className="hover:text-blue-500 transition duration-300"><a href="#">5 Tips for Improving Your Site&apos;s SEO</a></li>
                            <li className="hover:text-blue-500 transition duration-300"><a href="#">How to Use Social Media to Drive Traffic</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewDashboardPage;
