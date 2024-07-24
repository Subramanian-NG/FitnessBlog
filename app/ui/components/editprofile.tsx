'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Profile = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

const EditProfile = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);

    useEffect(() => {
        setIsMounted(true);
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        const response = await fetch('/api/profile');
        const data: Profile[] = await response.json();
        setProfiles(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = selectedProfileId ? 'PUT' : 'POST';
        const response = await fetch('/api/profile', {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: selectedProfileId, firstName, lastName, email }),
        });
        const data = await response.json();
        fetchProfiles();
        setFirstName('');
        setLastName('');
        setEmail('');
        setSelectedProfileId(null);
        toast.success('Profile updated successfully!');
    };

    const handleCancel = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setSelectedProfileId(null);
    };

    const handleEdit = (profile: Profile) => {
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setEmail(profile.email);
        setSelectedProfileId(profile.id);
    };

    const handleDelete = async (id: number) => {
        await fetch('/api/profile', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        fetchProfiles();
        toast.success('Profile deleted successfully!');
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="container mx-auto p-4" style={{ backgroundColor: '#ffffff' }}>
            <ToastContainer />
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Edit Profile</h1>
                <div className="mb-4 form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4 form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4 form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-1/2 py-2 px-4 mr-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-1/2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
