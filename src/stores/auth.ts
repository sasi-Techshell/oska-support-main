import { defineStore } from 'pinia';
import { ref, computed, readonly } from 'vue';
import type { User, UserRole } from '@/types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isLoading = ref(false);

  const isAuthenticated = computed(() => !!user.value);
  const userRole = computed(() => user.value?.role);
  const isEndUser = computed(() => user.value?.role === 'end-user');
  const isArchitect = computed(() => user.value?.role === 'architect');
  const isSuperAdmin = computed(() => user.value?.role === 'super-admin');

  // Mock login function
  const login = async (email: string, _password: string, role: UserRole = 'end-user') => {
    isLoading.value = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock user data based on role
    const mockUsers = {
      'end-user': {
        id: '1',
        email,
        name: 'John Doe',
        role: 'end-user' as UserRole,
        tokens: 150,
        profileCompletion: 75,
        joinedAt: new Date('2024-01-15'),
        isVerified: true,
        mobile: '+1234567890',
        location: 'New York, USA',
        interests: ['Web Development', 'AI/ML', 'Mobile Apps'],
        profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      'architect': {
        id: '2',
        email,
        name: 'Jane Smith',
        role: 'architect' as UserRole,
        tokens: 850,
        profileCompletion: 95,
        joinedAt: new Date('2023-08-10'),
        isVerified: true,
        mobile: '+1234567891',
        location: 'San Francisco, USA',
        interests: ['Full Stack Development', 'System Architecture', 'DevOps'],
        profileImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      'super-admin': {
        id: '3',
        email,
        name: 'Admin User',
        role: 'super-admin' as UserRole,
        tokens: 2500,
        profileCompletion: 100,
        joinedAt: new Date('2023-01-01'),
        isVerified: true,
        mobile: '+1234567892',
        location: 'Seattle, USA',
        interests: ['Platform Management', 'Community Building', 'Analytics'],
        profileImage: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      }
    };

    user.value = mockUsers[role];
    isLoading.value = false;
    
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(user.value));
    
    return user.value;
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
  }) => {
    isLoading.value = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role || 'end-user',
      tokens: 50, // Welcome bonus
      profileCompletion: 25,
      joinedAt: new Date(),
      isVerified: false,
      profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    };

    user.value = newUser;
    isLoading.value = false;
    
    localStorage.setItem('user', JSON.stringify(user.value));
    
    return newUser;
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
  };

  const initializeAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...updates };
      localStorage.setItem('user', JSON.stringify(user.value));
    }
  };

  return {
    user: readonly(user),
    isLoading: readonly(isLoading),
    isAuthenticated,
    userRole,
    isEndUser,
    isArchitect,
    isSuperAdmin,
    login,
    register,
    logout,
    initializeAuth,
    updateProfile
  };
});