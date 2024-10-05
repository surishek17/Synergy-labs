import React, { useEffect, useState } from 'react';
import { fetchUserById } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner'; // Import the spinner

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user details
    const getUser = async () => {
      try {
        const data = await fetchUserById(id);
        setUser(data);
      } catch (error) {
        toast.error('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>User not found.</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Users
      </Link>
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <p><span className="font-semibold">ID:</span> {user.id}</p>
        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Username:</span> {user.username}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Phone:</span> {user.phone}</p>
        <p><span className="font-semibold">Website:</span> {user.website}</p>
        <p className="mt-4"><span className="font-semibold">Address:</span></p>
        <ul className="list-disc list-inside">
          <li>Street: {user.address.street}</li>
          <li>City: {user.address.city}</li>
        </ul>
        <p className="mt-4"><span className="font-semibold">Company:</span> {user.company.name}</p>
      </div>
    </div>
  );
}

export default UserDetail;
