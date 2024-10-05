import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createUser, updateUser } from '../services/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { userValidationSchema } from '../utils/validations'; // Import the updated validation schema
import { toast } from 'react-toastify';

function UserForm({ onClose, onSubmit, user }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidationSchema), // Use the updated schema
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('phone', user.phone);
      setValue('username', `USER-${user.username}`); // Auto-filled format
      setValue('address.street', user.address.street);
      setValue('address.city', user.address.city);
      setValue('company.name', user.company.name);
      setValue('website', user.website);
    } else {
      // Initialize username for new user
      setValue('username', 'USER-');
    }
  }, [user, setValue]);

  // Handle form submission
  const onFormSubmit = async (data) => {
    try {
      let response;
      if (user) {
        // Update existing user
        response = await updateUser(user.id, data);
      } else {
        // Create new user
        response = await createUser(data);
      }
      onSubmit(response);
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">{user ? 'Edit User' : 'Add New User'}</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Name *</label>
            <input
              type="text"
              {...register('name')}
              className={`w-full px-3 py-2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email *</label>
            <input
              type="email"
              {...register('email')}
              className={`w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700">Phone *</label>
            <input
              type="text"
              {...register('phone')}
              className={`w-full px-3 py-2 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="10-digit number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700">Username *</label>
            <input
              type="text"
              {...register('username')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              readOnly
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700">Address *</label>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              {/* Street */}
              <div className="mb-2 sm:mb-0">
                <input
                  type="text"
                  {...register('address.street')}
                  placeholder="Street"
                  className={`w-full px-3 py-2 border ${
                    errors.address?.street ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.address?.street && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.street.message}</p>
                )}
              </div>

              {/* City */}
              <div>
                <input
                  type="text"
                  {...register('address.city')}
                  placeholder="City"
                  className={`w-full px-3 py-2 border ${
                    errors.address?.city ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.address?.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              {...register('company.name')}
              className={`w-full px-3 py-2 border ${
                errors.company?.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.company?.name && (
              <p className="text-red-500 text-sm mt-1">{errors.company.name.message}</p>
            )}
          </div>

          {/* Website */}
          <div className="mb-4">
            <label className="block text-gray-700">Website</label>
            <input
              type="text"
              {...register('website')}
              className={`w-full px-3 py-2 border ${
                errors.website ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="https://example.com"
            />
            {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
