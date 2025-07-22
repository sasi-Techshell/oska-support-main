export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileImage?: string;
  tokens: number;
  profileCompletion: number;
  joinedAt: Date;
  isVerified: boolean;
  mobile?: string;
  location?: string;
  interests?: string[];
  socialAccounts?: SocialAccounts;
  bankAccount?: BankAccount;
  bio?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  website?: string;
  portfolioPublic?: boolean;
}

export type UserRole = 'end-user' | 'architect' | 'super-admin';

export interface SocialAccounts {
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export interface BankAccount {
  accountNumber: string;
  routingNumber: string;
  bankName: string;
  accountHolderName: string;
  isVerified: boolean;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  authorId: string;
  author: User;
  bounty: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  deadline?: Date;
  answers: Answer[];
  views: number;
  isPrivate: boolean;
  isDraft: boolean;
  votes: QuestionVote[];
  totalVotes: number;
  status: QuestionStatus;
}

export type QuestionStatus = 'open' | 'in-progress' | 'answered' | 'escalated';

export interface QuestionVote {
  id: string;
  questionId: string;
  userId: string;
  voteType: 'up' | 'down';
  createdAt: Date;
}

export interface Answer {
  id: string;
  questionId: string;
  authorId: string;
  author: User;
  content: string;
  isAccepted: boolean;
  votes: AnswerVote[];
  totalVotes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnswerVote {
  id: string;
  answerId: string;
  userId: string;
  voteType: 'up' | 'down';
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  authorId: string;
  author: User;
  assignedArchitectId?: string;
  assignedArchitect?: User;
  tokenValue: number;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
  deadline: Date;
  deliverables: string[];
  submissions: TaskSubmission[];
}

export type TaskStatus = 'pending' | 'assigned' | 'in-progress' | 'completed' | 'approved' | 'rejected' | 'escalated';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TaskSubmission {
  id: string;
  taskId: string;
  architectId: string;
  content: string;
  attachments: string[];
  submittedAt: Date;
  feedback?: string;
}

export interface TokenTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  relatedId?: string; // Question ID, Task ID, etc.
  status: TransactionStatus;
  createdAt: Date;
}

export type TransactionType = 'earned' | 'spent' | 'purchased' | 'redeemed' | 'bonus';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface WithdrawalRequest {
  id: string;
  userId: string;
  user: User;
  amount: number;
  bankAccountId: string;
  status: WithdrawalStatus;
  requestedAt: Date;
  processedAt?: Date;
  processedBy?: string;
  notes?: string;
}

export type WithdrawalStatus = 'pending' | 'approved' | 'rejected' | 'processed';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export type NotificationType = 'task-assigned' | 'question-answered' | 'tokens-earned' | 'deadline-reminder' | 'system' | 'achievement';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  tokenReward: number;
  requirement: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  achievement: Achievement;
  earnedAt: Date;
}