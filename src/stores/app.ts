import { defineStore } from 'pinia';
import { ref, computed, readonly } from 'vue';
import type { Question, Task, TokenTransaction, Notification } from '@/types';

export const useAppStore = defineStore('app', () => {
  const questions = ref<Question[]>([]);
  const tasks = ref<Task[]>([]);
  const transactions = ref<TokenTransaction[]>([]);
  const notifications = ref<Notification[]>([]);
  const isLoading = ref(false);

  // Mock data initialization
  const initializeMockData = () => {
    // Mock questions with voting data
    questions.value = [
      {
        id: '1',
        title: 'How to implement JWT authentication in Vue.js?',
        description: 'I need help implementing JWT authentication in my Vue.js application. What are the best practices?',
        authorId: '1',
        author: {
          id: '1',
          name: 'Alex Johnson',
          email: 'alex@example.com',
          role: 'end-user',
          tokens: 120,
          profileCompletion: 80,
          joinedAt: new Date(),
          isVerified: true,
          profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
        },
        bounty: 25,
        tags: ['vue.js', 'authentication', 'jwt'],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        answers: [],
        views: 45,
        isPrivate: false,
        isDraft: false,
        votes: [
          { id: '1', questionId: '1', userId: '2', voteType: 'up', createdAt: new Date() },
          { id: '2', questionId: '1', userId: '3', voteType: 'up', createdAt: new Date() }
        ],
        totalVotes: 2,
        status: 'open'
      },
      {
        id: '2',
        title: 'Best practices for React component optimization',
        description: 'Looking for advanced optimization techniques for React components to improve performance.',
        authorId: '2',
        author: {
          id: '2',
          name: 'Sarah Wilson',
          email: 'sarah@example.com',
          role: 'end-user',
          tokens: 200,
          profileCompletion: 90,
          joinedAt: new Date(),
          isVerified: true,
          profileImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
        },
        bounty: 50,
        tags: ['react', 'performance', 'optimization'],
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        answers: [],
        views: 78,
        isPrivate: false,
        isDraft: false,
        votes: [
          { id: '3', questionId: '2', userId: '1', voteType: 'up', createdAt: new Date() },
          { id: '4', questionId: '2', userId: '4', voteType: 'up', createdAt: new Date() },
          { id: '5', questionId: '2', userId: '5', voteType: 'up', createdAt: new Date() }
        ],
        totalVotes: 3,
        status: 'in-progress'
      },
      {
        id: '3',
        title: 'How to handle state management in large Vue.js applications?',
        description: 'I\'m working on a large Vue.js application and struggling with state management. Should I use Pinia or Vuex? What are the best patterns?',
        authorId: '3',
        author: {
          id: '3',
          name: 'Mike Chen',
          email: 'mike@example.com',
          role: 'end-user',
          tokens: 150,
          profileCompletion: 75,
          joinedAt: new Date(),
          isVerified: true,
          profileImage: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
        },
        bounty: 30,
        tags: ['vue.js', 'pinia', 'vuex', 'state-management'],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        answers: [],
        views: 62,
        isPrivate: false,
        isDraft: false,
        votes: [
          { id: '6', questionId: '3', userId: '1', voteType: 'up', createdAt: new Date() }
        ],
        totalVotes: 1,
        status: 'open'
      },
      {
        id: '4',
        title: 'TypeScript generics with React hooks - best practices?',
        description: 'I\'m trying to create reusable React hooks with TypeScript generics but running into type inference issues. What are the best practices?',
        authorId: '4',
        author: {
          id: '4',
          name: 'Emily Rodriguez',
          email: 'emily@example.com',
          role: 'end-user',
          tokens: 180,
          profileCompletion: 85,
          joinedAt: new Date(),
          isVerified: true,
          profileImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
        },
        bounty: 40,
        tags: ['typescript', 'react', 'hooks', 'generics'],
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        answers: [],
        views: 89,
        isPrivate: false,
        isDraft: false,
        votes: [
          { id: '7', questionId: '4', userId: '2', voteType: 'up', createdAt: new Date() },
          { id: '8', questionId: '4', userId: '3', voteType: 'up', createdAt: new Date() }
        ],
        totalVotes: 2,
        status: 'open'
      },
      {
        id: '5',
        title: 'Database design for multi-tenant SaaS application',
        description: 'I need advice on database design patterns for a multi-tenant SaaS application. Should I use separate databases, schemas, or row-level security?',
        authorId: '5',
        author: {
          id: '5',
          name: 'David Kim',
          email: 'david@example.com',
          role: 'end-user',
          tokens: 220,
          profileCompletion: 95,
          joinedAt: new Date(),
          isVerified: true,
          profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
        },
        bounty: 75,
        tags: ['database', 'saas', 'multi-tenant', 'postgresql'],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        answers: [],
        views: 134,
        isPrivate: false,
        isDraft: false,
        votes: [
          { id: '9', questionId: '5', userId: '1', voteType: 'up', createdAt: new Date() },
          { id: '10', questionId: '5', userId: '2', voteType: 'up', createdAt: new Date() },
          { id: '11', questionId: '5', userId: '4', voteType: 'up', createdAt: new Date() }
        ],
        totalVotes: 3,
        status: 'open'
      }
    ];

    // Mock tasks
    tasks.value = [
      {
        id: '1',
        title: 'Build a Todo App with React and Node.js',
        description: 'Create a full-stack todo application with user authentication, CRUD operations, and real-time updates.',
        requirements: [
          'React frontend with modern hooks',
          'Node.js/Express backend',
          'MongoDB database',
          'JWT authentication',
          'Real-time updates with Socket.io'
        ],
        authorId: '1',
        author: {
          id: '1',
          name: 'Tech Startup',
          email: 'startup@example.com',
          role: 'end-user',
          tokens: 500,
          profileCompletion: 85,
          joinedAt: new Date(),
          isVerified: true
        },
        tokenValue: 200,
        status: 'assigned',
        priority: 'high',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        deliverables: ['Source code', 'Documentation', 'Deployment guide'],
        submissions: []
      },
      {
        id: '2',
        title: 'API Integration for E-commerce Platform',
        description: 'Integrate payment gateway and shipping APIs for an existing e-commerce platform.',
        requirements: [
          'Payment gateway integration (Stripe/PayPal)',
          'Shipping API integration',
          'Order tracking system',
          'Error handling and validation'
        ],
        authorId: '2',
        author: {
          id: '2',
          name: 'E-commerce Store',
          email: 'store@example.com',
          role: 'end-user',
          tokens: 800,
          profileCompletion: 95,
          joinedAt: new Date(),
          isVerified: true
        },
        tokenValue: 350,
        status: 'pending',
        priority: 'medium',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        deliverables: ['Integration code', 'Testing documentation', 'Admin guide'],
        submissions: []
      },
      {
        id: '3',
        title: 'Mobile App UI/UX Design with React Native',
        description: 'Design and develop a mobile application interface for a fitness tracking app using React Native.',
        requirements: [
          'React Native development',
          'Modern UI/UX design',
          'Cross-platform compatibility (iOS/Android)',
          'Integration with fitness APIs',
          'Offline data synchronization'
        ],
        authorId: '3',
        author: {
          id: '3',
          name: 'Fitness Startup',
          email: 'fitness@example.com',
          role: 'end-user',
          tokens: 600,
          profileCompletion: 80,
          joinedAt: new Date(),
          isVerified: true
        },
        tokenValue: 450,
        status: 'pending',
        priority: 'high',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        deliverables: ['Mobile app source code', 'Design assets', 'User guide', 'App store submission'],
        submissions: []
      },
      {
        id: '4',
        title: 'DevOps Pipeline Setup with Docker and AWS',
        description: 'Set up a complete CI/CD pipeline for a microservices architecture using Docker containers and AWS services.',
        requirements: [
          'Docker containerization',
          'AWS ECS/EKS deployment',
          'CI/CD pipeline with GitHub Actions',
          'Monitoring and logging setup',
          'Auto-scaling configuration'
        ],
        authorId: '4',
        author: {
          id: '4',
          name: 'Cloud Solutions Inc',
          email: 'cloud@example.com',
          role: 'end-user',
          tokens: 750,
          profileCompletion: 90,
          joinedAt: new Date(),
          isVerified: true
        },
        tokenValue: 500,
        status: 'in-progress',
        priority: 'urgent',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        deliverables: ['Docker configurations', 'AWS infrastructure code', 'CI/CD pipeline', 'Documentation'],
        submissions: []
      },
      {
        id: '5',
        title: 'Machine Learning Model for Recommendation System',
        description: 'Develop a machine learning model for product recommendations in an e-commerce platform.',
        requirements: [
          'Python/TensorFlow or PyTorch',
          'Collaborative filtering algorithm',
          'Data preprocessing pipeline',
          'Model evaluation and testing',
          'API endpoint for predictions'
        ],
        authorId: '5',
        author: {
          id: '5',
          name: 'AI Research Lab',
          email: 'ai@example.com',
          role: 'end-user',
          tokens: 900,
          profileCompletion: 95,
          joinedAt: new Date(),
          isVerified: true
        },
        tokenValue: 600,
        status: 'pending',
        priority: 'medium',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        deliverables: ['Trained ML model', 'Python code', 'API documentation', 'Performance metrics'],
        submissions: []
      },
      {
        id: '6',
        title: 'Blockchain Smart Contract Development',
        description: 'Create smart contracts for a decentralized marketplace using Solidity and deploy on Ethereum.',
        requirements: [
          'Solidity smart contract development',
          'Web3.js integration',
          'Smart contract testing',
          'Gas optimization',
          'Security audit'
        ],
        authorId: '6',
        author: {
          id: '6',
          name: 'Crypto Marketplace',
          email: 'crypto@example.com',
          role: 'end-user',
          tokens: 1000,
          profileCompletion: 85,
          joinedAt: new Date(),
          isVerified: true
        },
        tokenValue: 700,
        status: 'pending',
        priority: 'high',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        deliverables: ['Smart contracts', 'Frontend integration', 'Test suite', 'Security report'],
        submissions: []
      }
    ];

    // Mock notifications
    notifications.value = [
      {
        id: '1',
        userId: '1',
        title: 'New Task Assigned',
        message: 'You have been assigned a new task: "Build a Todo App with React and Node.js"',
        type: 'task-assigned',
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        actionUrl: '/tasks/1'
      },
      {
        id: '2',
        userId: '1',
        title: 'Tokens Earned',
        message: 'You earned 50 tokens for answering a bounty question!',
        type: 'tokens-earned',
        isRead: false,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: '3',
        userId: '1',
        title: 'Profile Completion Bonus',
        message: 'Complete your profile to earn 25 bonus tokens!',
        type: 'achievement',
        isRead: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        actionUrl: '/profile'
      }
    ];
  };

  const addQuestion = (question: Omit<Question, 'id' | 'createdAt' | 'updatedAt' | 'answers' | 'views' | 'votes' | 'totalVotes' | 'status'>) => {
    const newQuestion: Question = {
      ...question,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      answers: [],
      views: 0,
      votes: [],
      totalVotes: 0,
      isDraft: false,
      status: 'open'
    };
    questions.value.unshift(newQuestion);
    return newQuestion;
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'submissions'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      submissions: []
    };
    tasks.value.unshift(newTask);
    return newTask;
  };

  const markNotificationAsRead = (notificationId: string) => {
    const notification = notifications.value.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
    }
  };

  const unreadNotificationsCount = computed(() => {
    return notifications.value.filter(n => !n.isRead).length;
  });

  return {
    questions: readonly(questions),
    tasks: readonly(tasks),
    transactions: readonly(transactions),
    notifications: readonly(notifications),
    isLoading: readonly(isLoading),
    unreadNotificationsCount,
    initializeMockData,
    addQuestion,
    addTask,
    markNotificationAsRead
  };
});