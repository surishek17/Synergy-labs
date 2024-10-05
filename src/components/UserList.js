import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../services/api'; // API service functions
import UserForm from './UserForm'; // Form component for creating/editing users
import ConfirmModal from './ConfirmModal'; // Confirmation modal component for deletions
import { toast } from 'react-toastify'; // Toast notifications
import { Link } from 'react-router-dom'; // Routing for user detail view
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi'; // Icons for UI

/**
 * UserList Component
 *
 * Displays a list of users with functionalities to create, edit, delete, and search users.
 * Enhanced with colorful styling for better visual distinction of each field.
 */
function UserList() {
  // State to store the list of users
  const [users, setUsers] = useState([]);

  // State to control the visibility of the UserForm modal
  const [isFormOpen, setIsFormOpen] = useState(false);

  // State to hold the user data being edited (null if creating a new user)
  const [editingUser, setEditingUser] = useState(null);

  // State to control the visibility of the delete confirmation modal
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // State to hold the user data being deleted
  const [deletingUser, setDeletingUser] = useState(null);

  // State for the search query input
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * useEffect Hook
   *
   * Fetches the list of users from the API when the component mounts.
   */
  useEffect(() => {
    loadUsers();
  }, []);

  /**
   * loadUsers Function
   *
   * Fetches users from the API and updates the state.
   */
  const loadUsers = async () => {
    try {
      const data = await fetchUsers(); // Fetch users from API
      setUsers(data); // Update state with fetched users
    } catch (error) {
      toast.error('Failed to fetch users'); // Display error notification
    }
  };

  /**
   * handleCreate Function
   *
   * Opens the UserForm modal for creating a new user.
   */
  const handleCreate = () => {
    setEditingUser(null); // Ensure no user is being edited
    setIsFormOpen(true); // Open the UserForm modal
  };

  /**
   * handleEdit Function
   *
   * Opens the UserForm modal with pre-filled data for editing an existing user.
   *
   * @param {Object} user - The user object to be edited.
   */
  const handleEdit = (user) => {
    setEditingUser(user); // Set the user to be edited
    setIsFormOpen(true); // Open the UserForm modal
  };

  /**
   * handleDelete Function
   *
   * Opens the confirmation modal for deleting a user.
   *
   * @param {Object} user - The user object to be deleted.
   */
  const handleDelete = (user) => {
    setDeletingUser(user); // Set the user to be deleted
    setIsConfirmOpen(true); // Open the confirmation modal
  };

  /**
   * confirmDelete Function
   *
   * Performs the delete operation by calling the API and updating the UI.
   */
  const confirmDelete = async () => {
    try {
      await deleteUser(deletingUser.id); // Call API to delete user
      // Remove the deleted user from the state to update the UI
      setUsers(users.filter((user) => user.id !== deletingUser.id));
      toast.success('User deleted successfully'); // Display success notification
    } catch (error) {
      toast.error('Failed to delete user'); // Display error notification
    } finally {
      setIsConfirmOpen(false); // Close the confirmation modal
      setDeletingUser(null); // Reset the deleting user state
    }
  };

  /**
   * handleFormSubmit Function
   *
   * Handles the submission of the UserForm modal for both creating and updating users.
   *
   * @param {Object} newUser - The user data returned from the API after creation/update.
   */
  const handleFormSubmit = (newUser) => {
    if (editingUser) {
      // If editing, update the existing user in the state
      setUsers(users.map((user) => (user.id === newUser.id ? newUser : user)));
      toast.success('User updated successfully'); // Display success notification
    } else {
      // If creating, add the new user to the beginning of the state array
      setUsers([newUser, ...users]);
      toast.success('User created successfully'); // Display success notification
    }
    setIsFormOpen(false); // Close the UserForm modal
  };

  /**
   * filteredUsers Variable
   *
   * Filters the users based on the search query entered by the user.
   */
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">User Management</h1>

      {/* Search Bar and Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        {/* Search Input */}
        <div className="flex items-center mb-4 sm:mb-0">
          <FiSearch className="mr-2 text-gray-600" /> {/* Search Icon */}
          <input
            type="text"
            placeholder="Search by name..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
        </div>

        {/* Create User Button */}
        <button
          onClick={handleCreate} // Open UserForm modal
          className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
        >
          <FiPlus className="mr-2" /> {/* Plus Icon */}
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          {/* Table Header */}
          <thead>
            <tr>
              <th className="py-3 px-6 bg-blue-100 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                ID
              </th>
              <th className="py-3 px-6 bg-blue-100 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-6 bg-blue-100 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-6 bg-blue-100 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Phone
              </th>
              <th className="py-3 px-6 bg-blue-100 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-green-50'} // Alternating row colors
              >
                {/* User ID */}
                <td className="py-4 px-6 border-b border-gray-200 text-sm text-gray-700">
                  <span className="font-medium text-indigo-600">{user.id}</span>
                </td>
                {/* User Name with Link to Detail View */}
                <td className="py-4 px-6 border-b border-gray-200 text-sm text-green-600">
                  <Link to={`/users/${user.id}`} className="hover:underline">
                    {user.name}
                  </Link>
                </td>
                {/* User Email */}
                <td className="py-4 px-6 border-b border-gray-200 text-sm text-blue-600">
                  <a href={`mailto:${user.email}`} className="hover:underline">
                    {user.email}
                  </a>
                </td>
                {/* User Phone */}
                <td className="py-4 px-6 border-b border-gray-200 text-sm text-purple-600">
                  <a href={`tel:${user.phone}`} className="hover:underline">
                    {user.phone}
                  </a>
                </td>
                {/* Action Buttons: Edit and Delete */}
                <td className="py-4 px-6 border-b border-gray-200 text-sm text-gray-700">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(user)} // Open UserForm modal with user data
                    className="text-green-500 hover:text-green-700 mr-4"
                    title="Edit User"
                  >
                    <FiEdit size={18} />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(user)} // Open confirmation modal
                    className="text-red-500 hover:text-red-700"
                    title="Delete User"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {/* Display message if no users found */}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* UserForm Modal for Creating/Editing Users */}
      {isFormOpen && (
        <UserForm
          onClose={() => setIsFormOpen(false)} // Function to close the modal
          onSubmit={handleFormSubmit} // Function to handle form submission
          user={editingUser} // Pass the user data if editing
        />
      )}

      {/* Confirmation Modal for Deleting Users */}
      {isConfirmOpen && (
        <ConfirmModal
          title="Delete User" // Modal title
          message={`Are you sure you want to delete ${deletingUser.name}?`} // Confirmation message
          onConfirm={confirmDelete} // Function to confirm deletion
          onCancel={() => setIsConfirmOpen(false)} // Function to cancel deletion
        />
      )}
    </div>
  );
}

export default UserList;
