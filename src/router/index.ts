import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type { UserRole } from '@/types';
import BuyTokens from '@/views/BuyTokens.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/token-system',
      name: 'token-system',
      component: () => import('@/views/TokenSystemView.vue')
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('@/views/LeaderboardView.vue')
    },
    {
      path: '/community-guidelines',
      name: 'community-guidelines',
      component: () => import('@/views/CommunityGuidelinesView.vue')
    },
    {
      path: '/help-center',
      name: 'help-center',
      component: () => import('@/views/HelpCenterView.vue')
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('@/views/PrivacyPolicyView.vue')
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: () => import('@/views/TermsOfServiceView.vue')
    },
    {
      path: '/cookie-policy',
      name: 'cookie-policy',
      component: () => import('@/views/CookiePolicyView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',  
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard/tasks',
      name: 'dashboard-tasks',
      component: () => import('@/views/DashboardTasksView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('@/views/QuestionsView.vue')
    },
    {
      path: '/questions/new',
      name: 'new-question',
      component: () => import('@/views/NewQuestionView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/questions/:id',
      name: 'question-detail',
      component: () => import('@/views/QuestionDetailView.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/views/TasksView.vue')
    },
    {
      path: '/tasks/new',
      name: 'new-task',
      component: () => import('@/views/NewTaskView.vue'),
      meta: { requiresAuth: true, roles: ['end-user'] }
    },
    {
      path: '/tasks/:id',
      name: 'task-detail',
      component: () => import('@/views/TaskDetailView.vue')
    },
    {
      path: '/tasks/:id/apply',
      name: 'apply-task',
      component: () => import('@/views/ApplyTaskView.vue'),
      meta: { requiresAuth: true, roles: ['architect'] }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/portfolio/:userId',
      name: 'portfolio',
      component: () => import('@/views/PortfolioView.vue')
    },
    {
      path: '/portfolio/:userId/edit',
      name: 'edit-portfolio',
      component: () => import('@/views/EditPortfolioView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/tokens',
      name: 'tokens',
      component: () => import('@/views/TokensView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminDashboard.vue'),
      meta: { requiresAuth: true, roles: ['super-admin'] }
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('@/views/admin/UsersManagement.vue'),
      meta: { requiresAuth: true, roles: ['super-admin'] }
    },
    {
      path: '/admin/tasks',
      name: 'admin-tasks',
      component: () => import('@/views/admin/TasksManagement.vue'),
      meta: { requiresAuth: true, roles: ['super-admin'] }
    },
    {
      path: '/admin/questions',
      name: 'admin-questions',
      component: () => import('@/views/admin/QuestionsManagement.vue'),
      meta: { requiresAuth: true, roles: ['super-admin'] }
    },
    {
    path: '/buy-tokens',
    name: 'BuyTokens',
    component:() =>import('@/views/BuyTokens.vue'),
  }
    
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Check authentication requirements
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
    return;
  }
  
  // Check guest requirements (login/register pages)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard');
    return;
  }
  
  // Check role requirements
  if (to.meta.roles && authStore.user) {
    const userRole = authStore.user.role;
    const allowedRoles = to.meta.roles as UserRole[];
    
    if (!allowedRoles.includes(userRole)) {
      next('/dashboard');
      return;
    }
  }
  
  next();
});

export default router;