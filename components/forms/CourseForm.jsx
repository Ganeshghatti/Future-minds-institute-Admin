'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import apiClient from '../../lib/api';

const courseSchema = z.object({
  name: z.string().min(1, 'Course name is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.string().min(1, 'Duration is required'),
  courseTotalDuration: z.number().min(1, 'Total duration must be at least 1'),
  features: z.string().min(1, 'Features are required'),
  price: z.number().min(0, 'Price must be positive'),
  discountPrice: z.number().min(0, 'Discount price must be positive'),
  earlyBirdTitle: z.string().min(1, 'Early bird title is required'),
  isActive: z.boolean().default(true),
  categories: z.array(z.string()).optional(),
});

const CourseForm = ({ isOpen, onClose, course = null, onSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: course || {
      name: '',
      description: '',
      duration: '',
      courseTotalDuration: 1,
      features: '',
      price: 0,
      discountPrice: 0,
      earlyBirdTitle: '',
      isActive: true,
      categories: [],
    },
  });

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      if (course) {
        reset(course);
      } else {
        reset({
          name: '',
          description: '',
          duration: '',
          courseTotalDuration: 1,
          features: '',
          price: 0,
          discountPrice: 0,
          earlyBirdTitle: '',
          isActive: true,
          categories: [],
        });
      }
    }
  }, [isOpen, course, reset]);

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories for course form...');
      const data = await apiClient.getCategories();
      console.log('Categories fetched:', data);
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Convert features string to array for backend
      const courseData = {
        ...data,
        features: data.features.split(',').map(f => f.trim()).filter(f => f.length > 0),
        // Ensure categories is always an array
        categories: Array.isArray(data.categories) ? data.categories : []
      };
      
      console.log('Submitting course data:', courseData);
      
      if (course) {
        await apiClient.updateCourse(course._id, courseData);
      } else {
        await apiClient.createCourse(courseData);
      }
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error saving course:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={course ? 'Edit Course' : 'Create New Course'} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            label="Course Name"
            placeholder="Enter course name"
            error={errors.name?.message}
            required
            {...register('name')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-400"
            placeholder="Enter course description"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Duration Title"
              placeholder="e.g., 6 months, 12 weeks"
              error={errors.duration?.message}
              required
              {...register('duration')}
            />
          </div>

          <div>
            <Input
              label="Total Course Duration (Days)"
              type="number"
              min="1"
              placeholder="1"
              error={errors.courseTotalDuration?.message}
              required
              {...register('courseTotalDuration', { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Price (₹)"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              error={errors.price?.message}
              required
              {...register('price', { valueAsNumber: true })}
            />
          </div>

          <div>
            <Input
              label="Discount Price (₹)"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              error={errors.discountPrice?.message}
              required
              {...register('discountPrice', { valueAsNumber: true })}
            />
          </div>
        </div>

        <div>
          <Input
            label="Early Bird Title"
            placeholder="e.g., Early Bird Special"
            error={errors.earlyBirdTitle?.message}
            required
            {...register('earlyBirdTitle')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Features <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-400"
            placeholder="Enter features separated by commas (e.g., Feature 1, Feature 2, Feature 3)"
            {...register('features')}
          />
          {errors.features && (
            <p className="text-sm text-red-600 mt-1">{errors.features.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Categories
          </label>
          
          <div className="border border-gray-300 rounded-md p-3 max-h-32 overflow-y-auto">
            
            {categories.length > 0 ? (
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category._id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={(e) => {
                        const currentValues = watch('categories') || [];
                        if (e.target.checked) {
                          setValue('categories', [...currentValues, category._id]);
                        } else {
                          setValue('categories', currentValues.filter(id => id !== category._id));
                        }
                      }}
                      checked={watch('categories')?.includes(category._id) || false}
                    />
                    <span className="text-sm text-gray-900">{category.name}</span>
                    <span className="text-xs text-gray-500">({category.description})</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">No categories available. Create categories first.</p>
            )}
          </div>
          {errors.categories && (
            <p className="text-sm text-red-600 mt-1">{errors.categories.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              {...register('isActive')}
            />
            <span className="text-sm font-medium text-gray-700">Active Course</span>
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg sticky -bottom-5">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {course ? 'Update Course' : 'Create Course'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CourseForm;

