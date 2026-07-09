export const INITIAL_DEPARTMENTS = [
  {
    id: 'dept-1',
    name: 'Engineering',
    manager: 'Sarah Jenkins',
    description: 'Software development, QA, DevOps, and systems architecture.',
    budget: 1500000
  },
  {
    id: 'dept-2',
    name: 'Design',
    manager: 'Alex Rivera',
    description: 'Product design, UI/UX research, and brand identity.',
    budget: 450000
  },
  {
    id: 'dept-3',
    name: 'Marketing',
    manager: 'Elena Rostova',
    description: 'Digital marketing, growth hacking, SEO, and public relations.',
    budget: 350000
  },
  {
    id: 'dept-4',
    name: 'Human Resources',
    manager: 'Marcus Vance',
    description: 'Recruitment, employee engagement, payroll, and company culture.',
    budget: 200000
  },
  {
    id: 'dept-5',
    name: 'Finance',
    manager: 'David Chen',
    description: 'Accounting, auditing, financial planning, and tax operations.',
    budget: 500000
  }
];

export const INITIAL_EMPLOYEES = [
  {
    id: 'emp-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@company.com',
    phone: '+1 (555) 234-5678',
    role: 'Engineering Manager',
    department: 'Engineering',
    salary: 135000,
    joiningDate: '2022-03-15',
    status: 'Active',
    performanceRating: 5,
    skills: ['React', 'Node.js', 'System Architecture', 'Agile', 'Team Leadership'],
    bio: 'Sarah has 10+ years of experience leading engineering teams. She is passionate about scalable systems and developer growth.'
  },
  {
    id: 'emp-2',
    name: 'Alex Rivera',
    email: 'alex.r@company.com',
    phone: '+1 (555) 345-6789',
    role: 'Lead UI/UX Designer',
    department: 'Design',
    salary: 110000,
    joiningDate: '2022-09-01',
    status: 'Active',
    performanceRating: 4,
    skills: ['Figma', 'UI Design', 'Design Systems', 'User Research', 'Prototyping'],
    bio: 'Alex is a design systems nerd. He believes in creating products that are both beautiful and highly functional.'
  },
  {
    id: 'emp-3',
    name: 'Elena Rostova',
    email: 'elena.r@company.com',
    phone: '+1 (555) 456-7890',
    role: 'Marketing Director',
    department: 'Marketing',
    salary: 105000,
    joiningDate: '2023-01-10',
    status: 'Active',
    performanceRating: 4,
    skills: ['Growth Marketing', 'SEO', 'Brand Strategy', 'Analytics', 'Copywriting'],
    bio: 'Elena specializes in SaaS growth. She loves digging into marketing analytics and crafting viral content campaigns.'
  },
  {
    id: 'emp-4',
    name: 'David Chen',
    email: 'david.c@company.com',
    phone: '+1 (555) 567-8901',
    role: 'Financial Controller',
    department: 'Finance',
    salary: 98000,
    joiningDate: '2023-06-20',
    status: 'Active',
    performanceRating: 5,
    skills: ['Financial Analysis', 'Auditing', 'Excel', 'Tax Planning', 'Risk Assessment'],
    bio: 'David manages financial compliance. He has an eagle eye for expense optimization and budgeting.'
  },
  {
    id: 'emp-5',
    name: 'Marcus Vance',
    email: 'marcus.v@company.com',
    phone: '+1 (555) 678-9012',
    role: 'HR Specialist',
    department: 'Human Resources',
    salary: 82000,
    joiningDate: '2023-11-05',
    status: 'Active',
    performanceRating: 4,
    skills: ['Recruiting', 'Employee Relations', 'Conflict Resolution', 'Onboarding', 'HRIS'],
    bio: 'Marcus makes sure the workplace is positive and inclusive. He heads recruitment and organizes monthly social activities.'
  },
  {
    id: 'emp-6',
    name: 'Liam Peterson',
    email: 'liam.p@company.com',
    phone: '+1 (555) 789-0123',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    salary: 120000,
    joiningDate: '2023-04-12',
    status: 'Active',
    performanceRating: 5,
    skills: ['TypeScript', 'GraphQL', 'Next.js', 'PostgreSQL', 'Docker'],
    bio: 'Liam is a full-stack enthusiast. He loves solving complex data fetching challenges and mentoring junior engineers.'
  },
  {
    id: 'emp-7',
    name: 'Maya Lin',
    email: 'maya.l@company.com',
    phone: '+1 (555) 890-1234',
    role: 'Frontend Engineer',
    department: 'Engineering',
    salary: 95000,
    joiningDate: '2024-02-01',
    status: 'On Leave',
    performanceRating: 3,
    skills: ['HTML/CSS', 'Tailwind', 'React', 'Javascript', 'Web Accessibility'],
    bio: 'Maya is a frontend engineer focused on building highly accessible, semantic, and responsive interfaces.'
  },
  {
    id: 'emp-8',
    name: 'Olivia Martinez',
    email: 'olivia.m@company.com',
    phone: '+1 (555) 901-2345',
    role: 'UI Designer',
    department: 'Design',
    salary: 80000,
    joiningDate: '2024-05-15',
    status: 'Active',
    performanceRating: 4,
    skills: ['Figma', 'Illustrator', 'Motion Graphics', 'Typography', 'Mockups'],
    bio: 'Olivia is a visual designer with a background in fine arts. She creates delightful assets and animations for our web portal.'
  }
];

export const INITIAL_LEAVES = [
  {
    id: 'leave-1',
    employeeId: 'emp-7',
    employeeName: 'Maya Lin',
    leaveType: 'Sick Leave',
    startDate: '2026-07-06',
    endDate: '2026-07-10',
    status: 'Approved',
    reason: 'Recovering from minor throat surgery.'
  },
  {
    id: 'leave-2',
    employeeId: 'emp-3',
    employeeName: 'Elena Rostova',
    leaveType: 'Casual Leave',
    startDate: '2026-07-12',
    endDate: '2026-07-14',
    status: 'Pending',
    reason: 'Family gathering out of town.'
  },
  {
    id: 'leave-3',
    employeeId: 'emp-6',
    employeeName: 'Liam Peterson',
    leaveType: 'Paid Leave',
    startDate: '2026-07-20',
    endDate: '2026-07-27',
    status: 'Pending',
    reason: 'Summer vacation trip.'
  },
  {
    id: 'leave-4',
    employeeId: 'emp-2',
    employeeName: 'Alex Rivera',
    leaveType: 'Casual Leave',
    startDate: '2026-07-01',
    endDate: '2026-07-02',
    status: 'Approved',
    reason: 'Car repairs and personal errands.'
  }
];

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Migrate DB to RDS PostgreSQL',
    description: 'Plan, test, and execute migration of production DB to AWS RDS instance. Coordinate downtime window.',
    assigneeId: 'emp-6',
    assigneeName: 'Liam Peterson',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-07-15'
  },
  {
    id: 'task-2',
    title: 'Design Dashboard Redesign v2',
    description: 'Create high-fidelity interactive wireframes for the new customer dashboard based on user testing reviews.',
    assigneeId: 'emp-2',
    assigneeName: 'Alex Rivera',
    priority: 'High',
    status: 'Review',
    dueDate: '2026-07-09'
  },
  {
    id: 'task-3',
    title: 'Launch Q3 Growth Campaign',
    description: 'Execute paid ad spend campaigns across LinkedIn and Google. Monitor acquisition cost and conversion rates.',
    assigneeId: 'emp-3',
    assigneeName: 'Elena Rostova',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '2026-07-20'
  },
  {
    id: 'task-4',
    title: 'Update Employee Handbook',
    description: 'Revise remote work allowances and update insurance coverage policy details for 2026.',
    assigneeId: 'emp-5',
    assigneeName: 'Marcus Vance',
    priority: 'Low',
    status: 'Completed',
    dueDate: '2026-07-05'
  },
  {
    id: 'task-5',
    title: 'Audit Q2 Budget vs Actuals',
    description: 'Review departmental expenditures and compile variance reports for the executive board review meeting.',
    assigneeId: 'emp-4',
    assigneeName: 'David Chen',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-07-12'
  },
  {
    id: 'task-6',
    title: 'Fix Checkout Page Form Validation',
    description: 'Fix visual bug on email field validation. Ensure credit card input masks are functioning properly.',
    assigneeId: 'emp-7',
    assigneeName: 'Maya Lin',
    priority: 'High',
    status: 'To Do',
    dueDate: '2026-07-11'
  }
];

export const INITIAL_PAYROLL = [
  {
    id: 'pay-1',
    employeeId: 'emp-1',
    employeeName: 'Sarah Jenkins',
    month: 'June 2026',
    basicSalary: 11250,
    allowances: 1200,
    deductions: 2500,
    netPay: 9950,
    status: 'Paid'
  },
  {
    id: 'pay-2',
    employeeId: 'emp-2',
    employeeName: 'Alex Rivera',
    month: 'June 2026',
    basicSalary: 9166,
    allowances: 800,
    deductions: 1900,
    netPay: 8066,
    status: 'Paid'
  },
  {
    id: 'pay-3',
    employeeId: 'emp-3',
    employeeName: 'Elena Rostova',
    month: 'June 2026',
    basicSalary: 8750,
    allowances: 750,
    deductions: 1800,
    netPay: 7700,
    status: 'Paid'
  },
  {
    id: 'pay-4',
    employeeId: 'emp-4',
    employeeName: 'David Chen',
    month: 'June 2026',
    basicSalary: 8166,
    allowances: 500,
    deductions: 1700,
    netPay: 6966,
    status: 'Paid'
  },
  {
    id: 'pay-5',
    employeeId: 'emp-5',
    employeeName: 'Marcus Vance',
    month: 'June 2026',
    basicSalary: 6833,
    allowances: 400,
    deductions: 1300,
    netPay: 5933,
    status: 'Paid'
  },
  {
    id: 'pay-6',
    employeeId: 'emp-6',
    employeeName: 'Liam Peterson',
    month: 'June 2026',
    basicSalary: 10000,
    allowances: 1000,
    deductions: 2200,
    netPay: 8800,
    status: 'Paid'
  },
  {
    id: 'pay-7',
    employeeId: 'emp-7',
    employeeName: 'Maya Lin',
    month: 'June 2026',
    basicSalary: 7916,
    allowances: 0,
    deductions: 1400,
    netPay: 6516,
    status: 'Paid'
  },
  {
    id: 'pay-8',
    employeeId: 'emp-8',
    employeeName: 'Olivia Martinez',
    month: 'June 2026',
    basicSalary: 6666,
    allowances: 300,
    deductions: 1100,
    netPay: 5866,
    status: 'Paid'
  }
];
