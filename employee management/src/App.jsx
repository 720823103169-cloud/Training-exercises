import { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Building2,
  CalendarClock,
  CircleDollarSign,
  Award,
  Moon,
  Sun,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Check,
  X,
  Filter,
  Grid,
  List,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import {
  INITIAL_DEPARTMENTS,
  INITIAL_EMPLOYEES,
  INITIAL_LEAVES,
  INITIAL_TASKS,
  INITIAL_PAYROLL
} from './data/mockData';
import './App.css';

// --- Initials and Gradient Avatar Generators (Removing all local/external images) ---
const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const getAvatarGradient = (name) => {
  const gradients = [
    'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', // Indigo to Purple
    'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)', // Teal to Cyan
    'linear-gradient(135deg, #f43f5e 0%, #ef4444 100%)', // Rose to Red
    'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)', // Amber to Orange
    'linear-gradient(135deg, #10b981 0%, #059669 100%)'  // Emerald to Green
  ];
  if (!name) return gradients[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};

const Avatar = ({ name, size = '38px', fontSize = '13px', border = 'none', marginTop = '0px', zIndex = 'auto' }) => {
  const initials = getInitials(name);
  const gradient = getAvatarGradient(name);
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: gradient,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      fontSize: fontSize,
      fontFamily: 'var(--font-heading)',
      boxShadow: 'var(--shadow-sm)',
      flexShrink: 0,
      border: border,
      marginTop: marginTop,
      zIndex: zIndex,
      userSelect: 'none'
    }}>
      {initials}
    </div>
  );
};

function App() {
  // --- Core State ---
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('company_employees');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem('company_departments');
    return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
  });

  const [leaves, setLeaves] = useState(() => {
    const saved = localStorage.getItem('company_leaves');
    return saved ? JSON.parse(saved) : INITIAL_LEAVES;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('company_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [payroll, setPayroll] = useState(() => {
    const saved = localStorage.getItem('company_payroll');
    return saved ? JSON.parse(saved) : INITIAL_PAYROLL;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('company_activities');
    return saved ? JSON.parse(saved) : [
      { id: 'act-1', text: 'Sarah Jenkins created the engineering department roadmap', time: '1 hour ago', type: 'task' },
      { id: 'act-2', text: 'Maya Lin leave request for Sick Leave was approved', time: '3 hours ago', type: 'leave' },
      { id: 'act-3', text: 'New employee Olivia Martinez joined the Design team', time: '1 day ago', type: 'employee' }
    ];
  });

  // Navigation and Theme
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme_dark');
    return saved === 'true';
  });

  // Employee filters and view
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [employeeDeptFilter, setEmployeeDeptFilter] = useState('All');
  const [employeeStatusFilter, setEmployeeStatusFilter] = useState('All');
  const [employeeViewMode, setEmployeeViewMode] = useState('grid');

  // Modal control states
  const [employeeModal, setEmployeeModal] = useState({ open: false, mode: 'view', data: null });
  const [deptModal, setDeptModal] = useState({ open: false, mode: 'add', data: null });
  const [taskModal, setTaskModal] = useState({ open: false, mode: 'add', data: null });
  const [leaveModal, setLeaveModal] = useState({ open: false });
  const [payrollModal, setPayrollModal] = useState({ open: false, data: null });
  const [payslipModal, setPayslipModal] = useState({ open: false, data: null });
  const [reviewModal, setReviewModal] = useState({ open: false, employeeId: '', name: '', rating: 5, comment: '' });

  // --- LocalStorage Synchronization ---
  useEffect(() => {
    localStorage.setItem('company_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('company_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('company_leaves', JSON.stringify(leaves));
  }, [leaves]);

  useEffect(() => {
    localStorage.setItem('company_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('company_payroll', JSON.stringify(payroll));
  }, [payroll]);

  useEffect(() => {
    localStorage.setItem('company_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('theme_dark', darkMode.toString());
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  // --- Activity Logger ---
  const logActivity = (text, type = 'info') => {
    const newAct = {
      id: `act-${Date.now()}`,
      text,
      time: 'Just now',
      type
    };
    setActivities(prev => [newAct, ...prev.slice(0, 14)]);
  };

  // --- Calculation Helpers ---
  const dashboardStats = useMemo(() => {
    const totalEmp = employees.length;
    const totalDepts = departments.length;
    const activeTasks = tasks.filter(t => t.status !== 'Completed').length;
    
    // Count employees on leave today
    const onLeaveTodayCount = employees.filter(e => e.status === 'On Leave').length;
    
    // Total monthly payroll expenditure
    const totalPayroll = payroll.reduce((sum, item) => sum + item.netPay, 0);

    // Task stats
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const taskCompletionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

    return {
      totalEmp,
      totalDepts,
      activeTasks,
      onLeaveTodayCount,
      totalPayroll,
      taskCompletionRate
    };
  }, [employees, departments, tasks, payroll]);

  // --- Filtered Lists ---
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchSearch = emp.name.toLowerCase().includes(employeeSearch.toLowerCase()) || 
                          emp.email.toLowerCase().includes(employeeSearch.toLowerCase()) ||
                          emp.role.toLowerCase().includes(employeeSearch.toLowerCase());
      const matchDept = employeeDeptFilter === 'All' || emp.department === employeeDeptFilter;
      const matchStatus = employeeStatusFilter === 'All' || emp.status === employeeStatusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [employees, employeeSearch, employeeDeptFilter, employeeStatusFilter]);

  // --- Action Handlers ---
  
  // 1. Employee CRUD
  const handleSaveEmployee = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const skillsArray = formData.get('skills')
      ? formData.get('skills').split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const employeeData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      role: formData.get('role'),
      department: formData.get('department'),
      salary: Number(formData.get('salary')),
      joiningDate: formData.get('joiningDate'),
      status: formData.get('status'),
      skills: skillsArray,
      bio: formData.get('bio')
    };

    if (employeeModal.mode === 'add') {
      const newEmp = {
        ...employeeData,
        id: `emp-${Date.now()}`,
        performanceRating: 5
      };
      setEmployees(prev => [...prev, newEmp]);
      logActivity(`Added new employee: ${newEmp.name}`, 'employee');
      
      // Auto-create initial payroll entry
      const basic = Math.round(newEmp.salary / 12);
      const allow = Math.round(basic * 0.1);
      const deduct = Math.round(basic * 0.2);
      const newPay = {
        id: `pay-${Date.now()}`,
        employeeId: newEmp.id,
        employeeName: newEmp.name,
        month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
        basicSalary: basic,
        allowances: allow,
        deductions: deduct,
        netPay: basic + allow - deduct,
        status: 'Pending'
      };
      setPayroll(prev => [newPay, ...prev]);

    } else if (employeeModal.mode === 'edit') {
      setEmployees(prev => prev.map(emp => emp.id === employeeModal.data.id ? { ...emp, ...employeeData } : emp));
      // Update assignee names in tasks as well
      setTasks(prev => prev.map(t => t.assigneeId === employeeModal.data.id ? { ...t, assigneeName: employeeData.name } : t));
      // Update payroll names as well
      setPayroll(prev => prev.map(p => p.employeeId === employeeModal.data.id ? { ...p, employeeName: employeeData.name } : p));
      logActivity(`Updated details for employee: ${employeeData.name}`, 'employee');
    }

    setEmployeeModal({ open: false, mode: 'view', data: null });
  };

  const handleDeleteEmployee = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the company records?`)) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      setTasks(prev => prev.filter(t => t.assigneeId !== id));
      setPayroll(prev => prev.filter(p => p.employeeId !== id));
      setLeaves(prev => prev.filter(l => l.employeeId !== id));
      logActivity(`Removed employee record: ${name}`, 'danger');
    }
  };

  // 2. Department CRUD
  const handleSaveDept = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const deptData = {
      name: formData.get('name'),
      manager: formData.get('manager'),
      description: formData.get('description'),
      budget: Number(formData.get('budget'))
    };

    if (deptModal.mode === 'add') {
      const newDept = {
        ...deptData,
        id: `dept-${Date.now()}`
      };
      setDepartments(prev => [...prev, newDept]);
      logActivity(`Created new department: ${newDept.name}`, 'department');
    } else {
      setDepartments(prev => prev.map(d => d.id === deptModal.data.id ? { ...d, ...deptData } : d));
      logActivity(`Updated department details: ${deptData.name}`, 'department');
    }
    setDeptModal({ open: false, mode: 'add', data: null });
  };

  const handleDeleteDept = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the ${name} department? This won't delete employees but will unassign their department.`)) {
      setDepartments(prev => prev.filter(d => d.id !== id));
      setEmployees(prev => prev.map(emp => emp.department === name ? { ...emp, department: 'Unassigned' } : emp));
      logActivity(`Deleted department: ${name}`, 'danger');
    }
  };

  // 3. Task Management (Kanban Board actions)
  const handleSaveTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const assigneeId = formData.get('assigneeId');
    const assignee = employees.find(emp => emp.id === assigneeId);

    const taskData = {
      title: formData.get('title'),
      description: formData.get('description'),
      assigneeId,
      assigneeName: assignee ? assignee.name : 'Unassigned',
      priority: formData.get('priority'),
      status: formData.get('status'),
      dueDate: formData.get('dueDate')
    };

    if (taskModal.mode === 'add') {
      const newTask = {
        ...taskData,
        id: `task-${Date.now()}`
      };
      setTasks(prev => [...prev, newTask]);
      logActivity(`Assigned new task: "${newTask.title}" to ${newTask.assigneeName}`, 'task');
    } else {
      setTasks(prev => prev.map(t => t.id === taskModal.data.id ? { ...t, ...taskData } : t));
      logActivity(`Updated task details for: "${taskData.title}"`, 'task');
    }
    setTaskModal({ open: false, mode: 'add', data: null });
  };

  const handleMoveTaskStatus = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        logActivity(`Moved task "${t.title}" to ${newStatus}`, 'task');
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id, title) => {
    if (window.confirm(`Delete task: "${title}"?`)) {
      setTasks(prev => prev.filter(t => t.id !== id));
      logActivity(`Deleted task: "${title}"`, 'danger');
    }
  };

  // 4. Leave & Attendance actions
  const handleSaveLeaveRequest = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const employeeId = formData.get('employeeId');
    const employee = employees.find(emp => emp.id === employeeId);

    const newLeave = {
      id: `leave-${Date.now()}`,
      employeeId,
      employeeName: employee ? employee.name : 'Unknown Employee',
      leaveType: formData.get('leaveType'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      status: 'Pending',
      reason: formData.get('reason')
    };

    setLeaves(prev => [newLeave, ...prev]);
    logActivity(`Submitted leave request for ${newLeave.employeeName}`, 'leave');
    setLeaveModal({ open: false });
  };

  const handleUpdateLeaveStatus = (leaveId, newStatus) => {
    setLeaves(prev => prev.map(l => {
      if (l.id === leaveId) {
        // Update employee status automatically to On Leave if approved
        if (newStatus === 'Approved') {
          setEmployees(empPrev => empPrev.map(e => e.id === l.employeeId ? { ...e, status: 'On Leave' } : e));
        } else if (l.status === 'Approved' && newStatus !== 'Approved') {
          setEmployees(empPrev => empPrev.map(e => e.id === l.employeeId ? { ...e, status: 'Active' } : e));
        }
        logActivity(`Leave request for ${l.employeeName} was ${newStatus}`, newStatus === 'Approved' ? 'success' : 'danger');
        return { ...l, status: newStatus };
      }
      return l;
    }));
  };

  // 5. Payroll Management actions
  const handleSavePayroll = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const employeeId = formData.get('employeeId');
    const employee = employees.find(emp => emp.id === employeeId);

    const basic = Number(formData.get('basicSalary'));
    const allowances = Number(formData.get('allowances'));
    const deductions = Number(formData.get('deductions'));
    const netPay = basic + allowances - deductions;

    const payrollData = {
      employeeId,
      employeeName: employee ? employee.name : 'Unknown Employee',
      month: formData.get('month'),
      basicSalary: basic,
      allowances,
      deductions,
      netPay,
      status: formData.get('status')
    };

    if (payrollModal.mode === 'add') {
      const newPay = {
        ...payrollData,
        id: `pay-${Date.now()}`
      };
      setPayroll(prev => [newPay, ...prev]);
      logActivity(`Created payroll record for ${payrollData.employeeName} (${payrollData.month})`, 'payroll');
    } else {
      setPayroll(prev => prev.map(p => p.id === payrollModal.data.id ? { ...p, ...payrollData } : p));
      logActivity(`Updated payroll for ${payrollData.employeeName} (${payrollData.month})`, 'payroll');
    }
    setPayrollModal({ open: false, mode: 'add', data: null });
  };

  const handleTogglePayStatus = (payId) => {
    setPayroll(prev => prev.map(p => {
      if (p.id === payId) {
        const nextStatus = p.status === 'Paid' ? 'Pending' : 'Paid';
        logActivity(`Marked payroll of ${p.employeeName} for ${p.month} as ${nextStatus}`, 'payroll');
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const handleDeletePayroll = (id, employeeName) => {
    if (window.confirm(`Delete payroll record for ${employeeName}?`)) {
      setPayroll(prev => prev.filter(p => p.id !== id));
      logActivity(`Deleted payroll record of ${employeeName}`, 'danger');
    }
  };

  // 6. Performance review actions
  const handleOpenReview = (empId, empName) => {
    const currentReview = employees.find(e => e.id === empId);
    setReviewModal({
      open: true,
      employeeId: empId,
      name: empName,
      rating: currentReview ? currentReview.performanceRating : 5,
      comment: ''
    });
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    setEmployees(prev => prev.map(emp => {
      if (emp.id === reviewModal.employeeId) {
        return { ...emp, performanceRating: reviewModal.rating };
      }
      return emp;
    }));
    logActivity(`Added Performance Review for ${reviewModal.name} (${reviewModal.rating} Stars)`, 'success');
    setReviewModal({ open: false, employeeId: '', name: '', rating: 5, comment: '' });
  };

  const resetToDefault = () => {
    if (window.confirm("Reset all data to default mock records? Any custom additions will be lost.")) {
      localStorage.removeItem('company_employees');
      localStorage.removeItem('company_departments');
      localStorage.removeItem('company_leaves');
      localStorage.removeItem('company_tasks');
      localStorage.removeItem('company_payroll');
      localStorage.removeItem('company_activities');
      setEmployees(INITIAL_EMPLOYEES);
      setDepartments(INITIAL_DEPARTMENTS);
      setLeaves(INITIAL_LEAVES);
      setTasks(INITIAL_TASKS);
      setPayroll(INITIAL_PAYROLL);
      setActivities([
        { id: 'act-1', text: 'Sarah Jenkins created the engineering department roadmap', time: '1 hour ago', type: 'task' },
        { id: 'act-2', text: 'Maya Lin leave request for Sick Leave was approved', time: '3 hours ago', type: 'leave' },
        { id: 'act-3', text: 'New employee Olivia Martinez joined the Design team', time: '1 day ago', type: 'employee' }
      ]);
      logActivity("Reset database to defaults", "warning");
    }
  };

  return (
    <div className="app-container">
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="brand-section">
          <div className="brand-logo">
            <Users size={22} color="white" />
          </div>
          <span className="brand-name">Pulse HR</span>
        </div>

        <nav className="nav-list">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'employees' ? 'active' : ''}`}
              onClick={() => setActiveTab('employees')}
            >
              <Users size={18} />
              <span>Employees</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'departments' ? 'active' : ''}`}
              onClick={() => setActiveTab('departments')}
            >
              <Building2 size={18} />
              <span>Departments</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'leaves' ? 'active' : ''}`}
              onClick={() => setActiveTab('leaves')}
            >
              <CalendarClock size={18} />
              <span>Leaves</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <FolderKanban size={18} />
              <span>Tasks Board</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'payroll' ? 'active' : ''}`}
              onClick={() => setActiveTab('payroll')}
            >
              <CircleDollarSign size={18} />
              <span>Payroll</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <Award size={18} />
              <span>Performance</span>
            </button>
          </li>
        </nav>

        <div className="sidebar-footer">
          <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button className="btn btn-secondary" onClick={resetToDefault} style={{ padding: '8px' }}>
            Reset Data
          </button>
          <div className="user-profile-sm">
            <Avatar name="Administrator" size="40px" />
            <div className="profile-info-sm">
              <span className="profile-name-sm">Administrator</span>
              <span className="profile-role-sm">HR Manager</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN MAIN CONTENT CONTAINER */}
      <main className="main-content">
        
        {/* --- 1. DASHBOARD VIEW --- */}
        {activeTab === 'dashboard' && (
          <>
            <header className="content-header">
              <div className="header-title-section">
                <h1>Overview Dashboard</h1>
                <p>Welcome back! Here is a summary of the company state today.</p>
              </div>
              <div className="header-actions">
                <button className="btn btn-primary" onClick={() => setEmployeeModal({ open: true, mode: 'add', data: null })}>
                  <Plus size={16} />
                  <span>Onboard Employee</span>
                </button>
              </div>
            </header>

            {/* Analytics Stats Grid */}
            <div className="analytics-grid">
              <div className="card stat-card">
                <div className="stat-info">
                  <span className="stat-value">{dashboardStats.totalEmp}</span>
                  <span className="stat-label">Total Employees</span>
                </div>
                <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--primary-glow)', color: 'var(--primary)' }}>
                  <Users size={24} />
                </div>
              </div>
              
              <div className="card stat-card">
                <div className="stat-info">
                  <span className="stat-value">{dashboardStats.totalDepts}</span>
                  <span className="stat-label">Active Departments</span>
                </div>
                <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--info-glow)', color: 'var(--info)' }}>
                  <Building2 size={24} />
                </div>
              </div>

              <div className="card stat-card">
                <div className="stat-info">
                  <span className="stat-value">{dashboardStats.activeTasks}</span>
                  <span className="stat-label">Pending Tasks</span>
                </div>
                <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--warning-glow)', color: 'var(--warning)' }}>
                  <FolderKanban size={24} />
                </div>
              </div>

              <div className="card stat-card">
                <div className="stat-info">
                  <span className="stat-value">{dashboardStats.onLeaveTodayCount}</span>
                  <span className="stat-label">On Leave Today</span>
                </div>
                <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--danger-glow)', color: 'var(--danger)' }}>
                  <CalendarClock size={24} />
                </div>
              </div>

              <div className="card stat-card">
                <div className="stat-info">
                  <span className="stat-value">${dashboardStats.totalPayroll.toLocaleString()}</span>
                  <span className="stat-label">Monthly Net Payroll</span>
                </div>
                <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--success-glow)', color: 'var(--success)' }}>
                  <CircleDollarSign size={24} />
                </div>
              </div>
            </div>

            {/* Dashboard Visual Layout */}
            <div className="dashboard-sections">
              
              {/* Left Widget: Department Budgets and details */}
              <div className="card">
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '16px' }}>
                  Department Resource Allocation
                </h3>
                <div className="dept-chart-list">
                  {departments.map(dept => {
                    const deptEmployees = employees.filter(e => e.department === dept.name);
                    const percentage = Math.min(100, Math.max(10, Math.round((dept.budget / 1500000) * 100)));
                    return (
                      <div key={dept.id} className="dept-chart-item">
                        <div className="dept-chart-header">
                          <span style={{ color: 'var(--text-heading)' }}>{dept.name}</span>
                          <span style={{ color: 'var(--text-muted)' }}>
                            {deptEmployees.length} staff | Budget: ${dept.budget.toLocaleString()}
                          </span>
                        </div>
                        <div className="dept-chart-bar-bg">
                          <div className="dept-chart-bar-fill" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Widget: Activities Log */}
              <div className="card">
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '12px' }}>
                  Recent Activities
                </h3>
                <div className="recent-activity-list">
                  {activities.slice(0, 5).map(act => (
                    <div key={act.id} className="activity-item">
                      <div className="activity-badge" style={{ 
                        backgroundColor: act.type === 'leave' ? 'var(--danger-glow)' : 
                                         act.type === 'employee' ? 'var(--success-glow)' : 
                                         act.type === 'task' ? 'var(--primary-glow)' : 'var(--info-glow)',
                        color: act.type === 'leave' ? 'var(--danger)' : 
                               act.type === 'employee' ? 'var(--success)' : 
                               act.type === 'task' ? 'var(--primary)' : 'var(--info)'
                      }}>
                        {act.type === 'leave' ? <CalendarClock size={16} /> : 
                         act.type === 'employee' ? <Users size={16} /> : 
                         act.type === 'task' ? <FolderKanban size={16} /> : <AlertCircle size={16} />}
                      </div>
                      <div className="activity-details">
                        <span className="activity-desc">{act.text}</span>
                        <span className="activity-time">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Task Progress Widget */}
              <div className="card" style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', justifycontent: 'space-between', alignitems: 'center', marginbottom: '20px' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}>Tasks Operations Overview</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Current workflow completion statistics</p>
                  </div>
                  <div style={{ display: 'flex', gap: '24px', float: 'right' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Completion Rate</div>
                      <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--success)' }}>
                        {dashboardStats.taskCompletionRate}%
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Assignments</div>
                      <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-heading)' }}>
                        {tasks.length}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', height: '12px', borderRadius: '999px', overflow: 'hidden', backgroundColor: 'var(--bg-input)', clear: 'both', marginTop: '16px' }}>
                  {['To Do', 'In Progress', 'Review', 'Completed'].map((status, index) => {
                    const count = tasks.filter(t => t.status === status).length;
                    const percent = tasks.length > 0 ? (count / tasks.length) * 100 : 0;
                    const color = index === 0 ? 'var(--text-muted)' : index === 1 ? 'var(--primary)' : index === 2 ? 'var(--warning)' : 'var(--success)';
                    return (
                      <div key={status} style={{ width: `${percent}%`, backgroundColor: color, height: '100%' }} title={`${status}: ${count}`}></div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px', fontSize: '12px', fontWeight: '600' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-muted)' }}></span>
                    <span>To Do ({tasks.filter(t => t.status === 'To Do').length})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
                    <span>In Progress ({tasks.filter(t => t.status === 'In Progress').length})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--warning)' }}></span>
                    <span>Review ({tasks.filter(t => t.status === 'Review').length})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
                    <span>Completed ({tasks.filter(t => t.status === 'Completed').length})</span>
                  </div>
                </div>
              </div>

            </div>
          </>
        )}

        {/* --- 2. EMPLOYEES TAB (DIRECTORY & CRUD) --- */}
        {activeTab === 'employees' && (
          <>
            <header className="content-header">
              <div className="header-title-section">
                <h1>Employees Registry</h1>
                <p>Manage employee records, filter details, and monitor corporate profiles.</p>
              </div>
              <div className="header-actions">
                <div className="view-toggle-container">
                  <button
                    className={`view-toggle-btn ${employeeViewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setEmployeeViewMode('grid')}
                  >
                    <Grid size={14} />
                    <span>Grid</span>
                  </button>
                  <button
                    className={`view-toggle-btn ${employeeViewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setEmployeeViewMode('list')}
                  >
                    <List size={14} />
                    <span>List</span>
                  </button>
                </div>

                <button className="btn btn-primary" onClick={() => setEmployeeModal({ open: true, mode: 'add', data: null })}>
                  <Plus size={16} />
                  <span>Add Employee</span>
                </button>
              </div>
            </header>

            {/* Filter and Search Bar */}
            <div className="card search-filter-bar">
              <div className="search-input-container">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search name, job title, email..."
                  className="form-input"
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Filter size={14} color="var(--text-muted)" />
                  <select
                    className="filter-select"
                    value={employeeDeptFilter}
                    onChange={(e) => setEmployeeDeptFilter(e.target.value)}
                  >
                    <option value="All">All Departments</option>
                    {departments.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <select
                  className="filter-select"
                  value={employeeStatusFilter}
                  onChange={(e) => setEmployeeStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            {/* Employee Directory Display */}
            {filteredEmployees.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
                <Users size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                <h3>No employees match your filters</h3>
                <p style={{ fontSize: '13px', marginTop: '4px' }}>Try adjusting your search criteria or resetting filters.</p>
              </div>
            ) : employeeViewMode === 'grid' ? (
              <div className="employees-grid">
                {filteredEmployees.map(emp => (
                  <div key={emp.id} className="card employee-card">
                    <div className="employee-card-banner"></div>
                    <Avatar name={emp.name} size="90px" fontSize="26px" border="4px solid var(--bg-sidebar)" marginTop="30px" zIndex="2" />
                    <h3 className="employee-card-name">{emp.name}</h3>
                    <span className="employee-card-role">{emp.role}</span>
                    <span className="employee-card-dept">{emp.department}</span>

                    <div className="employee-card-stats">
                      <div className="employee-card-stat">
                        <span className="employee-card-stat-label">Salary</span>
                        <span className="employee-card-stat-value">${emp.salary.toLocaleString()}/yr</span>
                      </div>
                      <div className="employee-card-stat">
                        <span className="employee-card-stat-label">Status</span>
                        <span className={`badge ${
                          emp.status === 'Active' ? 'badge-success' :
                          emp.status === 'On Leave' ? 'badge-warning' : 'badge-danger'
                        }`} style={{ padding: '2px 8px', marginTop: '2px', display: 'inline-block' }}>
                          {emp.status}
                        </span>
                      </div>
                    </div>

                    <div className="employee-card-actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEmployeeModal({ open: true, mode: 'view', data: emp })}
                      >
                        <Eye size={14} />
                        <span>Profile</span>
                      </button>
                      <button
                        className="btn btn-icon-only"
                        onClick={() => setEmployeeModal({ open: true, mode: 'edit', data: emp })}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="btn btn-icon-only danger-hover"
                        onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View Table */
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Salary</th>
                      <th>Date Joined</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map(emp => (
                      <tr key={emp.id}>
                        <td>
                          <div className="avatar-cell">
                            <Avatar name={emp.name} size="38px" />
                            <div className="profile-info-sm">
                              <span className="employee-meta-name">{emp.name}</span>
                              <span className="employee-meta-email">{emp.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-info">{emp.department}</span>
                        </td>
                        <td>{emp.role}</td>
                        <td style={{ fontWeight: 600 }}>${emp.salary.toLocaleString()}/yr</td>
                        <td>{emp.joiningDate}</td>
                        <td>
                          <span className={`badge ${
                            emp.status === 'Active' ? 'badge-success' :
                            emp.status === 'On Leave' ? 'badge-warning' : 'badge-danger'
                          }`}>
                            {emp.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="action-cell-buttons" style={{ justifyContent: 'flex-end' }}>
                            <button
                              className="btn btn-icon-only"
                              onClick={() => setEmployeeModal({ open: true, mode: 'view', data: emp })}
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              className="btn btn-icon-only"
                              onClick={() => setEmployeeModal({ open: true, mode: 'edit', data: emp })}
                              title="Edit"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              className="btn btn-icon-only danger-hover"
                              onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* --- 3. DEPARTMENTS TAB --- */}
        {activeTab === 'departments' && (
          <>
            <header className="content-header">
              <div className="header-title-section">
                <h1>Departments Directory</h1>
                <p>Manage corporate departments, track budgets, and designate organizational heads.</p>
              </div>
              <div className="header-actions">
                <button className="btn btn-primary" onClick={() => setDeptModal({ open: true, mode: 'add', data: null })}>
                  <Plus size={16} />
                  <span>New Department</span>
                </button>
              </div>
            </header>

            <div className="departments-grid">
              {departments.map(dept => {
                const deptEmployees = employees.filter(e => e.department === dept.name);
                const avgSalary = deptEmployees.length > 0 
                  ? Math.round(deptEmployees.reduce((sum, e) => sum + e.salary, 0) / deptEmployees.length)
                  : 0;

                return (
                  <div key={dept.id} className="card dept-card">
                    <div className="dept-card-header">
                      <h3 className="dept-card-title">{dept.name}</h3>
                      <div className="action-cell-buttons">
                        <button
                          className="btn btn-icon-only"
                          onClick={() => setDeptModal({ open: true, mode: 'edit', data: dept })}
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          className="btn btn-icon-only danger-hover"
                          onClick={() => handleDeleteDept(dept.id, dept.name)}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    <p className="dept-card-desc">{dept.description}</p>

                    <div className="dept-card-metrics">
                      <div>
                        <div className="dept-metric-label">Staff Count</div>
                        <div className="dept-metric-value">{deptEmployees.length}</div>
                      </div>
                      <div>
                        <div className="dept-metric-label">Budget allocation</div>
                        <div className="dept-metric-value">${dept.budget.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="dept-metric-label">Avg Salary</div>
                        <div className="dept-metric-value">${avgSalary.toLocaleString()}/yr</div>
                      </div>
                    </div>

                    <div className="dept-card-footer">
                      <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Department Manager:</span>
                      <div className="dept-manager">
                        <Avatar name={dept.manager} size="24px" fontSize="10px" />
                        <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{dept.manager}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* --- 4. LEAVE & ATTENDANCE MANAGEMENT --- */}
        {activeTab === 'leaves' && (
          <>
            <header className="content-header">
              <div className="header-title-section">
                <h1>Leave & Attendance</h1>
                <p>Approve time off, check leave timelines, and audit employee attendance status.</p>
              </div>
              <div className="header-actions">
                <button className="btn btn-primary" onClick={() => setLeaveModal({ open: true })}>
                  <Plus size={16} />
                  <span>Request Leave</span>
                </button>
              </div>
            </header>

            {/* Current Daily Attendance Snapshot */}
            <div className="card">
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '16px' }}>
                Today's Attendance Status
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {employees.map(emp => (
                  <div key={emp.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 14px',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-card)'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: emp.status === 'Active' ? 'var(--success)' : 
                                      emp.status === 'On Leave' ? 'var(--warning)' : 'var(--danger)'
                    }}></span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)' }}>{emp.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({emp.status})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leave Requests Table */}
            <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}>Leave Applications</h3>
              </div>
              <div className="table-container" style={{ border: 'none' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Leave Type</th>
                      <th>Timeline</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaves.map(l => (
                      <tr key={l.id}>
                        <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{l.employeeName}</td>
                        <td>
                          <span className={`badge ${
                            l.leaveType === 'Sick Leave' ? 'badge-danger' : 
                            l.leaveType === 'Casual Leave' ? 'badge-warning' : 'badge-primary'
                          }`}>
                            {l.leaveType}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: '13px', display: 'flex', flexDirection: 'column' }}>
                            <span><strong>From:</strong> {l.startDate}</span>
                            <span><strong>To:</strong> {l.endDate}</span>
                          </span>
                        </td>
                        <td style={{ maxWidth: '250px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {l.reason}
                        </td>
                        <td>
                          <span className={`badge ${
                            l.status === 'Approved' ? 'badge-success' : 
                            l.status === 'Pending' ? 'badge-warning' : 'badge-danger'
                          }`}>
                            {l.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {l.status === 'Pending' ? (
                            <div className="action-cell-buttons" style={{ justifyContent: 'flex-end' }}>
                              <button 
                                className="btn btn-success" 
                                style={{ padding: '6px 12px', fontSize: '12px' }}
                                onClick={() => handleUpdateLeaveStatus(l.id, 'Approved')}
                              >
                                <Check size={12} />
                                <span>Approve</span>
                              </button>
                              <button 
                                className="btn btn-danger" 
                                style={{ padding: '6px 12px', fontSize: '12px' }}
                                onClick={() => handleUpdateLeaveStatus(l.id, 'Rejected')}
                              >
                                <X size={12} />
                                <span>Reject</span>
                              </button>
                            </div>
                          ) : (
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Reviewed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* --- 5. TASKS / KANBAN BOARD --- */}
        {activeTab === 'tasks' && (
          <>
            <header className="content-header">
              <div className="header-title-section">
                <h1>Task Management Board</h1>
                <p>Assign tasks, organize priorities, and track ongoing operations via Kanban workflows.</p>
              </div>
              <div className="header-actions">
                <button className="btn btn-primary" onClick={() => setTaskModal({ open: true, mode: 'add', data: null })}>
                  <Plus size={16} />
                  <span>Assign Task</span>
                </button>
              </div>
            </header>

            {/* Kanban columns */}
            <div className="kanban-board">
              {['To Do', 'In Progress', 'Review', 'Completed'].map(colStatus => {
                const colTasks = tasks.filter(t => t.status === colStatus);
                return (
                  <div key={colStatus} className="kanban-column">
                    <div className="kanban-column-header">
                      <h3 className="kanban-column-title">
                        <span>{colStatus}</span>
                      </h3>
                      <span className="kanban-column-count">{colTasks.length}</span>
                    </div>

                    <div className="kanban-cards-container">
                      {colTasks.length === 0 ? (
                        <div style={{
                          padding: '30px 10px',
                          textAlign: 'center',
                          border: '2px dashed var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text-muted)',
                          fontSize: '12px'
                        }}>
                          No tasks in {colStatus}
                        </div>
                      ) : (
                        colTasks.map(task => {
                          return (
                            <div key={task.id} className="kanban-card">
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                <span className={`badge ${
                                  task.priority === 'High' ? 'badge-danger' : 
                                  task.priority === 'Medium' ? 'badge-warning' : 'badge-primary'
                                }`} style={{ fontSize: '9px', padding: '2px 6px' }}>
                                  {task.priority} Priority
                                </span>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  <button 
                                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                                    onClick={() => setTaskModal({ open: true, mode: 'edit', data: task })}
                                  >
                                    <Edit2 size={11} />
                                  </button>
                                  <button 
                                    style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}
                                    onClick={() => handleDeleteTask(task.id, task.title)}
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                </div>
                              </div>

                              <h4 className="kanban-card-title">{task.title}</h4>
                              <p className="kanban-card-desc">{task.description}</p>
                              
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '10px' }}>
                                <span>Due: {task.dueDate}</span>
                              </div>

                              <div className="kanban-card-tags">
                                <div className="kanban-card-assignee">
                                  <Avatar name={task.assigneeName} size="20px" fontSize="9px" />
                                  <span>{task.assigneeName}</span>
                                </div>
                              </div>

                              {/* Task Status Transitions */}
                              <div className="kanban-card-actions">
                                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Move:</span>
                                <div className="kanban-status-controls">
                                  {colStatus !== 'To Do' && (
                                    <button 
                                      className="kanban-status-btn"
                                      onClick={() => {
                                        const prevStatuses = ['To Do', 'In Progress', 'Review', 'Completed'];
                                        const prevIdx = prevStatuses.indexOf(colStatus) - 1;
                                        handleMoveTaskStatus(task.id, prevStatuses[prevIdx]);
                                      }}
                                    >
                                      &larr;
                                    </button>
                                  )}
                                  {colStatus !== 'Completed' && (
                                    <button 
                                      className="kanban-status-btn"
                                      onClick={() => {
                                        const nextStatuses = ['To Do', 'In Progress', 'Review', 'Completed'];
                                        const nextIdx = nextStatuses.indexOf(colStatus) + 1;
                                        handleMoveTaskStatus(task.id, nextStatuses[nextIdx]);
                                      }}
                                    >
                                      &rarr;
                                    </button>
                                  )}
                                </div>
                              </div>

                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* --- 6. PAYROLL MANAGEMENT --- */}
        {activeTab === 'payroll' && (
          <>
            <header className="content-header">
              <div className="header-title-section">
                <h1>Payroll Management</h1>
                <p>Manage monthly compensations, allowances, deductions, and print payslips.</p>
              </div>
              <div className="header-actions">
                <button className="btn btn-primary" onClick={() => setPayrollModal({ open: true, mode: 'add', data: null })}>
                  <Plus size={16} />
                  <span>Create Payroll Record</span>
                </button>
              </div>
            </header>

            <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}>Monthly payroll sheets</h3>
              </div>

              <div className="table-container" style={{ border: 'none' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Month</th>
                      <th>Basic Salary</th>
                      <th>Allowances</th>
                      <th>Deductions</th>
                      <th>Net pay</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payroll.map(p => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{p.employeeName}</td>
                        <td style={{ fontWeight: 500 }}>{p.month}</td>
                        <td>${p.basicSalary.toLocaleString()}</td>
                        <td style={{ color: 'var(--success)' }}>+${p.allowances.toLocaleString()}</td>
                        <td style={{ color: 'var(--danger)' }}>-${p.deductions.toLocaleString()}</td>
                        <td style={{ fontWeight: 700, color: 'var(--text-heading)' }}>${p.netPay.toLocaleString()}</td>
                        <td>
                          <button 
                            className={`badge ${p.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}
                            onClick={() => handleTogglePayStatus(p.id)}
                            style={{ border: 'none', cursor: 'pointer' }}
                            title="Click to toggle status"
                          >
                            {p.status}
                          </button>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="action-cell-buttons" style={{ justifyContent: 'flex-end' }}>
                            <button
                              className="btn btn-success"
                              style={{ padding: '6px 10px', fontSize: '11px' }}
                              onClick={() => setPayslipModal({ open: true, data: p })}
                            >
                              <Eye size={12} />
                              <span>Payslip</span>
                            </button>
                            <button
                              className="btn btn-icon-only"
                              onClick={() => setPayrollModal({ open: true, mode: 'edit', data: p })}
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              className="btn btn-icon-only danger-hover"
                              onClick={() => handleDeletePayroll(p.id, p.employeeName)}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* --- 7. PERFORMANCE REVIEW --- */}
        {activeTab === 'reviews' && (
          <>
            <header className="content-header">
              <div className="header-title-section">
                <h1>Performance reviews</h1>
                <p>Track team rating scores, write administrative reviews, and set organizational performance goals.</p>
              </div>
            </header>

            <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}>Staff Ratings & Reviews</h3>
              </div>

              <div className="table-container" style={{ border: 'none' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Rating Score</th>
                      <th>Bio summary</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(emp => (
                      <tr key={emp.id}>
                        <td>
                          <div className="avatar-cell">
                            <Avatar name={emp.name} size="38px" />
                            <div className="profile-info-sm">
                              <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{emp.name}</span>
                              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{emp.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>{emp.department}</td>
                        <td>{emp.role}</td>
                        <td>
                          <div className="star-rating-container">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`star-icon ${star <= emp.performanceRating ? 'filled' : ''}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </td>
                        <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '13px' }}>
                          {emp.bio || 'No bio comments added.'}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="btn btn-primary"
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                            onClick={() => handleOpenReview(emp.id, emp.name)}
                          >
                            <Award size={12} />
                            <span>Log Review</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </main>

      {/* --- ALL SYSTEM MODALS --- */}

      {/* 1. EMPLOYEE PROFILE / ADD / EDIT MODAL */}
      {employeeModal.open && (
        <div className="modal-backdrop" onClick={() => setEmployeeModal({ open: false, mode: 'view', data: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: employeeModal.mode === 'view' ? '700px' : '650px' }}>
            <div className="modal-header">
              <h2 className="modal-title">
                {employeeModal.mode === 'view' && 'Employee Profile Detail'}
                {employeeModal.mode === 'add' && 'Onboard New Employee'}
                {employeeModal.mode === 'edit' && 'Edit Employee Details'}
              </h2>
              <button className="btn-icon-only" onClick={() => setEmployeeModal({ open: false, mode: 'view', data: null })}>
                <X size={16} />
              </button>
            </div>
            
            {employeeModal.mode === 'view' ? (
              // PROFILE DETAILS VIEW
              <div className="modal-body">
                <div className="profile-modal-grid">
                  <div className="profile-sidebar">
                    <Avatar name={employeeModal.data.name} size="120px" fontSize="36px" border="4px solid var(--primary-glow)" />
                    <h3 style={{ marginTop: '12px', fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}>
                      {employeeModal.data.name}
                    </h3>
                    <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '13.5px' }}>
                      {employeeModal.data.role}
                    </p>
                    <span className="badge badge-info" style={{ marginTop: '6px' }}>
                      {employeeModal.data.department}
                    </span>

                    <div className="profile-skills-section">
                      <span className="info-label" style={{ textAlign: 'center' }}>Skills Directory</span>
                      <div className="skill-tag-container" style={{ justifyContent: 'center' }}>
                        {employeeModal.data.skills.map((skill, i) => (
                          <span key={i} className="skill-tag">{skill}</span>
                        ))}
                        {employeeModal.data.skills.length === 0 && (
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>None listed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="profile-details-column">
                    <div className="detail-info-block">
                      <div className="info-item">
                        <span className="info-label">Email Address</span>
                        <span className="info-value">{employeeModal.data.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Phone Number</span>
                        <span className="info-value">{employeeModal.data.phone}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Salary compensation</span>
                        <span className="info-value">${employeeModal.data.salary.toLocaleString()}/year</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Joining Date</span>
                        <span className="info-value">{employeeModal.data.joiningDate}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Account Status</span>
                        <span className={`badge ${
                          employeeModal.data.status === 'Active' ? 'badge-success' :
                          employeeModal.data.status === 'On Leave' ? 'badge-warning' : 'badge-danger'
                        }`} style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
                          {employeeModal.data.status}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Performance Rating</span>
                        <div className="star-rating-container" style={{ marginTop: '4px' }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`star-icon ${star <= employeeModal.data.performanceRating ? 'filled' : ''}`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              style={{ width: '15px', height: '15px' }}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span className="info-label">Professional Summary</span>
                      <p className="profile-bio">{employeeModal.data.bio || "No professional biography has been provided for this employee record."}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // FORM ADD / EDIT VIEW
              <form onSubmit={handleSaveEmployee}>
                <div className="modal-body">
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="form-input"
                        placeholder="e.g. John Doe"
                        defaultValue={employeeModal.mode === 'edit' ? employeeModal.data.name : ''}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="form-input"
                        placeholder="e.g. john.d@company.com"
                        defaultValue={employeeModal.mode === 'edit' ? employeeModal.data.email : ''}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        required
                        className="form-input"
                        placeholder="e.g. +1 (555) 123-4567"
                        defaultValue={employeeModal.mode === 'edit' ? employeeModal.data.phone : ''}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Job Designation</label>
                      <input
                        type="text"
                        name="role"
                        required
                        className="form-input"
                        placeholder="e.g. Senior Developer"
                        defaultValue={employeeModal.mode === 'edit' ? employeeModal.data.role : ''}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Department</label>
                      <select
                        name="department"
                        required
                        className="form-input"
                        defaultValue={employeeModal.mode === 'edit' ? employeeModal.data.department : departments[0]?.name || ''}
                      >
                        {departments.map(d => (
                          <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Annual Salary ($)</label>
                      <input
                        type="number"
                        name="salary"
                        required
                        min="1000"
                        className="form-input"
                        placeholder="e.g. 85000"
                        defaultValue={employeeModal.mode === 'edit' ? employeeModal.data.salary : ''}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Date of Joining</label>
                      <input
                        type="date"
                        name="joiningDate"
                        required
                        className="form-input"
                        defaultValue={employeeModal.mode === 'edit' ? employeeModal.data.joiningDate : new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Employment Status</label>
                      <select
                        name="status"
                        required
                        className="form-input"
                        defaultValue={employeeModal.mode === 'edit' ? employeeModal.data.status : 'Active'}
                      >
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>

                    <div className="form-group form-group-full">
                      <label className="form-label">Skills directory (Comma-separated)</label>
                      <input
                        type="text"
                        name="skills"
                        className="form-input"
                        placeholder="React, Javascript, Figma, CSS"
                        defaultValue={employeeModal.mode === 'edit' ? employeeModal.data.skills.join(', ') : ''}
                      />
                    </div>

                    <div className="form-group form-group-full">
                      <label className="form-label">Short Biography / Review</label>
                      <textarea
                        name="bio"
                        rows="3"
                        className="form-input"
                        placeholder="Write details about experience, performance, background..."
                        defaultValue={employeeModal.mode === 'edit' ? employeeModal.data.bio : ''}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setEmployeeModal({ open: false, mode: 'view', data: null })}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Record
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. DEPARTMENT ADD / EDIT MODAL */}
      {deptModal.open && (
        <div className="modal-backdrop" onClick={() => setDeptModal({ open: false, mode: 'add', data: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h2 className="modal-title">
                {deptModal.mode === 'add' ? 'Create New Department' : 'Edit Department Details'}
              </h2>
              <button className="btn-icon-only" onClick={() => setDeptModal({ open: false, mode: 'add', data: null })}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSaveDept}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Department Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-input"
                    placeholder="e.g. Sales"
                    defaultValue={deptModal.mode === 'edit' ? deptModal.data.name : ''}
                  />
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label">Department Manager</label>
                  <select
                    name="manager"
                    required
                    className="form-input"
                    defaultValue={deptModal.mode === 'edit' ? deptModal.data.manager : employees[0]?.name || ''}
                  >
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.name}>{emp.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label">Annual Budget allocation ($)</label>
                  <input
                    type="number"
                    name="budget"
                    required
                    min="0"
                    className="form-input"
                    placeholder="e.g. 500000"
                    defaultValue={deptModal.mode === 'edit' ? deptModal.data.budget : ''}
                  />
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    required
                    className="form-input"
                    placeholder="Provide description of departmental responsibilities..."
                    defaultValue={deptModal.mode === 'edit' ? deptModal.data.description : ''}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setDeptModal({ open: false, mode: 'add', data: null })}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. TASK ADD / EDIT MODAL */}
      {taskModal.open && (
        <div className="modal-backdrop" onClick={() => setTaskModal({ open: false, mode: 'add', data: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h2 className="modal-title">
                {taskModal.mode === 'add' ? 'Assign New Task' : 'Edit Task Details'}
              </h2>
              <button className="btn-icon-only" onClick={() => setTaskModal({ open: false, mode: 'add', data: null })}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSaveTask}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Task Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="form-input"
                    placeholder="e.g. Update SSL Certificate"
                    defaultValue={taskModal.mode === 'edit' ? taskModal.data.title : ''}
                  />
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label">Task Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    required
                    className="form-input"
                    placeholder="Detailed explanation of requirements..."
                    defaultValue={taskModal.mode === 'edit' ? taskModal.data.description : ''}
                  ></textarea>
                </div>

                <div className="form-grid" style={{ marginTop: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Assignee</label>
                    <select
                      name="assigneeId"
                      required
                      className="form-input"
                      defaultValue={taskModal.mode === 'edit' ? taskModal.data.assigneeId : employees[0]?.id || ''}
                    >
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select
                      name="priority"
                      required
                      className="form-input"
                      defaultValue={taskModal.mode === 'edit' ? taskModal.data.priority : 'Medium'}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                      name="status"
                      required
                      className="form-input"
                      defaultValue={taskModal.mode === 'edit' ? taskModal.data.status : 'To Do'}
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      required
                      className="form-input"
                      defaultValue={taskModal.mode === 'edit' ? taskModal.data.dueDate : new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setTaskModal({ open: false, mode: 'add', data: null })}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. REQUEST LEAVE MODAL */}
      {leaveModal.open && (
        <div className="modal-backdrop" onClick={() => setLeaveModal({ open: false })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Submit Leave Request</h2>
              <button className="btn-icon-only" onClick={() => setLeaveModal({ open: false })}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSaveLeaveRequest}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Select Employee</label>
                  <select
                    name="employeeId"
                    required
                    className="form-input"
                    defaultValue={employees[0]?.id || ''}
                  >
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label">Leave Type</label>
                  <select
                    name="leaveType"
                    required
                    className="form-input"
                  >
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Paid Leave">Paid Leave</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                  </select>
                </div>

                <div className="form-grid" style={{ marginTop: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      required
                      className="form-input"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      required
                      className="form-input"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label">Reason / Comments</label>
                  <textarea
                    name="reason"
                    rows="3"
                    required
                    className="form-input"
                    placeholder="Provide details about why you need time off..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setLeaveModal({ open: false })}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. CREATE / EDIT PAYROLL RECORD MODAL */}
      {payrollModal.open && (
        <div className="modal-backdrop" onClick={() => setPayrollModal({ open: false, mode: 'add', data: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h2 className="modal-title">
                {payrollModal.mode === 'add' ? 'Create Monthly Payroll Record' : 'Edit Payroll Record'}
              </h2>
              <button className="btn-icon-only" onClick={() => setPayrollModal({ open: false, mode: 'add', data: null })}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSavePayroll}>
              <div className="modal-body">
                {payrollModal.mode === 'add' ? (
                  <div className="form-group">
                    <label className="form-label">Select Employee</label>
                    <select
                      name="employeeId"
                      required
                      className="form-input"
                      defaultValue={employees[0]?.id || ''}
                    >
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <input type="hidden" name="employeeId" defaultValue={payrollModal.data.employeeId} />
                )}

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label">Payroll Cycle Month</label>
                  <input
                    type="text"
                    name="month"
                    required
                    className="form-input"
                    placeholder="e.g. July 2026"
                    defaultValue={payrollModal.mode === 'edit' ? payrollModal.data.month : new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                  />
                </div>

                <div className="form-grid" style={{ marginTop: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Basic Salary ($)</label>
                    <input
                      type="number"
                      name="basicSalary"
                      required
                      min="0"
                      className="form-input"
                      placeholder="e.g. 5000"
                      defaultValue={payrollModal.mode === 'edit' ? payrollModal.data.basicSalary : ''}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Allowances / Bonuses ($)</label>
                    <input
                      type="number"
                      name="allowances"
                      required
                      min="0"
                      className="form-input"
                      placeholder="e.g. 500"
                      defaultValue={payrollModal.mode === 'edit' ? payrollModal.data.allowances : 0}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Deductions (Tax, Ins.) ($)</label>
                    <input
                      type="number"
                      name="deductions"
                      required
                      min="0"
                      className="form-input"
                      placeholder="e.g. 1000"
                      defaultValue={payrollModal.mode === 'edit' ? payrollModal.data.deductions : 0}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Payment Status</label>
                    <select
                      name="status"
                      required
                      className="form-input"
                      defaultValue={payrollModal.mode === 'edit' ? payrollModal.data.status : 'Pending'}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setPayrollModal({ open: false, mode: 'add', data: null })}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. PAYSLIP PRINTER / PREVIEW MODAL */}
      {payslipModal.open && (
        <div className="modal-backdrop" onClick={() => setPayslipModal({ open: false, data: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px', backgroundColor: '#f8fafc' }}>
            <div className="modal-header">
              <h2 className="modal-title" style={{ color: '#0f172a' }}>Statement of Earnings</h2>
              <button className="btn-icon-only" onClick={() => setPayslipModal({ open: false, data: null })}>
                <X size={16} />
              </button>
            </div>
            <div className="modal-body" style={{ padding: '20px' }}>
              <div className="payslip-card" id="printable-payslip">
                <div className="payslip-header">
                  <div>
                    <h3 className="payslip-title">Pulse HR Corp</h3>
                    <p style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>100 Pine Street, San Francisco, CA 94111</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="payslip-company">PAYSLIP SHEET</div>
                    <div style={{ fontSize: '12px', fontWeight: 600, marginTop: '4px' }}>Period: {payslipModal.data.month}</div>
                  </div>
                </div>

                <div className="payslip-details-row">
                  <div>
                    <div style={{ color: '#64748b', fontSize: '11px' }}>EMPLOYEE NAME</div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{payslipModal.data.employeeName}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '11px' }}>EMPLOYEE ID</div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{payslipModal.data.employeeId}</div>
                  </div>
                </div>

                <table className="payslip-table">
                  <thead>
                    <tr>
                      <th>Earnings breakdown</th>
                      <th style={{ textAlign: 'right' }}>Amount ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Basic Salary (Calculated Monthly rate)</td>
                      <td style={{ textAlign: 'right', fontWeight: 500 }}>${payslipModal.data.basicSalary.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Allowances, Travel and Bonuses</td>
                      <td style={{ textAlign: 'right', fontWeight: 500 }}>+${payslipModal.data.allowances.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style={{ color: '#f43f5e' }}>Tax & Insurance Deductions</td>
                      <td style={{ textAlign: 'right', fontWeight: 500, color: '#f43f5e' }}>-${payslipModal.data.deductions.toLocaleString()}</td>
                    </tr>
                    <tr className="payslip-total-row">
                      <td>NET TAKE-HOME EARNINGS</td>
                      <td style={{ textAlign: 'right', fontSize: '16px', color: '#0f172a' }}>
                        ${payslipModal.data.netPay.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="payslip-footer">
                  <div>
                    <span>Payment Status: </span>
                    <strong style={{ color: payslipModal.data.status === 'Paid' ? '#10b981' : '#f59e0b' }}>
                      {payslipModal.data.status}
                    </strong>
                  </div>
                  <div style={{ fontSize: '11px' }}>Generated electronically by Pulse HR management platform.</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '20px' }}>
                  <div className="payslip-signature" style={{ fontSize: '11px' }}>Employee Signature</div>
                  <div className="payslip-signature" style={{ fontSize: '11px' }}>Authorized Officer</div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setPayslipModal({ open: false, data: null })}>
                Close Preview
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  window.print();
                }}
              >
                Print Slip Statement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. PERFORMANCE REVIEW / RATING MODAL */}
      {reviewModal.open && (
        <div className="modal-backdrop" onClick={() => setReviewModal(prev => ({ ...prev, open: false }))}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Record Review: {reviewModal.name}</h2>
              <button className="btn-icon-only" onClick={() => setReviewModal(prev => ({ ...prev, open: false }))}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSaveReview}>
              <div className="modal-body">
                <div className="form-group" style={{ alignItems: 'center' }}>
                  <label className="form-label" style={{ marginBottom: '8px' }}>Assign Performance Rating</label>
                  <div className="star-rating-container" style={{ gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`star-icon star-interactive ${star <= reviewModal.rating ? 'filled' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => setReviewModal(prev => ({ ...prev, rating: star }))}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label className="form-label">Review Assessment Comments</label>
                  <textarea
                    name="comment"
                    rows="4"
                    required
                    className="form-input"
                    placeholder="Write details about current objectives met, areas of improvement, technical goals..."
                    value={reviewModal.comment}
                    onChange={(e) => setReviewModal(prev => ({ ...prev, comment: e.target.value }))}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setReviewModal(prev => ({ ...prev, open: false }))}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
