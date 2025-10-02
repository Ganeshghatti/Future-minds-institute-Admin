'use client';

import { useState, useEffect } from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import CourseTable from '../../../components/dashboard/CourseTable';
import CategoryTable from '../../../components/dashboard/CategoryTable';
import apiClient from '../../../lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalCategories: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [courses, categories] = await Promise.all([
        apiClient.getCourses(),
        apiClient.getCategories(),
      ]);

      setStats({
        totalCourses: courses.length,
        totalCategories: categories.length,
        activeUsers: 0, // You'll need to implement this
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Future Minds Institute Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Courses"
          value={stats.totalCourses}
          icon="📚"
        />
        <StatsCard
          title="Total Categories"
          value={stats.totalCategories}
          icon="📁"
        />
        <StatsCard
          title="Active Users"
          value={stats.activeUsers}
          icon="👥"
        />
      </div>

      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CourseTable />
        <CategoryTable />
      </div>
    </div>
  );
}