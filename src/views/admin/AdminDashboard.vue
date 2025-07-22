<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      <p class="text-gray-600 mt-1">Platform overview and management</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Users</p>
            <p class="text-2xl font-bold text-gray-900">2,547</p>
          </div>
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <UsersIcon class="w-6 h-6 text-primary-600" />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Active Tasks</p>
            <p class="text-2xl font-bold text-gray-900">156</p>
          </div>
          <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
            <ClipboardDocumentListIcon class="w-6 h-6 text-secondary-600" />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Pending Questions</p>
            <p class="text-2xl font-bold text-gray-900">43</p>
          </div>
          <div class="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
            <QuestionMarkCircleIcon class="w-6 h-6 text-warning-600" />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Token Circulation</p>
            <p class="text-2xl font-bold text-gray-900">125K</p>
          </div>
          <div class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
            <CurrencyDollarIcon class="w-6 h-6 text-success-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <router-link to="/admin/users" class="card p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <UsersIcon class="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Manage Users</h3>
            <p class="text-sm text-gray-600">View and manage user accounts</p>
          </div>
        </div>
      </router-link>

      <router-link to="/admin/tasks" class="card p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
            <ClipboardDocumentListIcon class="w-6 h-6 text-secondary-600" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Task Management</h3>
            <p class="text-sm text-gray-600">Assign and review tasks</p>
          </div>
        </div>
      </router-link>

      <div class="card p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
            <ExclamationTriangleIcon class="w-6 h-6 text-warning-600" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Escalation Queue</h3>
            <p class="text-sm text-gray-600">Handle overdue items</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900">Recent Platform Activity</h2>
      </div>
      <div class="divide-y divide-gray-100">
        <div class="p-6">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
              <CheckIcon class="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p class="font-medium text-gray-900">Task completed by John Architect</p>
              <p class="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
        </div>
        <div class="p-6">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <UserPlusIcon class="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p class="font-medium text-gray-900">New user registered: Sarah Developer</p>
              <p class="text-sm text-gray-500">4 hours ago</p>
            </div>
          </div>
        </div>
        <div class="p-6">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center">
              <ClockIcon class="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <p class="font-medium text-gray-900">Question escalated to admin queue</p>
              <p class="text-sm text-gray-500">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UsersIcon,
  ClipboardDocumentListIcon,
  QuestionMarkCircleIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CheckIcon,
  UserPlusIcon,
  ClockIcon
} from '@heroicons/vue/24/outline';
</script>