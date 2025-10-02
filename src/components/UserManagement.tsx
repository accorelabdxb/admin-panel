import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  User,
  Shield,
  Eye,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  UserPlus
} from 'lucide-react';

// Mock data for users
const mockUsers = [
  {
    id: 'USR-001',
    name: 'John Smith',
    email: 'john.smith@mediainc.com',
    role: 'Creative',
    status: 'active',
    lastLogin: '2024-01-15 10:30 AM',
    permissions: ['view_requests', 'approve_creative'],
    joinDate: '2023-06-15',
    requestsHandled: 45
  },
  {
    id: 'USR-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@mediainc.com',
    role: 'Legal',
    status: 'active',
    lastLogin: '2024-01-15 09:15 AM',
    permissions: ['view_requests', 'approve_legal'],
    joinDate: '2023-04-20',
    requestsHandled: 62
  },
  {
    id: 'USR-003',
    name: 'Mike Wilson',
    email: 'mike.wilson@mediainc.com',
    role: 'Finance',
    status: 'active',
    lastLogin: '2024-01-14 04:45 PM',
    permissions: ['view_requests', 'approve_finance'],
    joinDate: '2023-08-10',
    requestsHandled: 38
  },
  {
    id: 'USR-004',
    name: 'Emily Davis',
    email: 'emily.davis@mediainc.com',
    role: 'Super Admin',
    status: 'active',
    lastLogin: '2024-01-15 11:20 AM',
    permissions: ['view_all', 'edit_all', 'approve_all', 'configure_all'],
    joinDate: '2023-01-05',
    requestsHandled: 150
  },
  {
    id: 'USR-005',
    name: 'Alex Brown',
    email: 'alex.brown@mediainc.com',
    role: 'Creative',
    status: 'inactive',
    lastLogin: '2024-01-10 02:30 PM',
    permissions: ['view_requests', 'approve_creative'],
    joinDate: '2023-11-22',
    requestsHandled: 12
  }
];

// Mock data for roles and permissions
const rolePermissions = {
  'Creative': {
    description: 'Reviews creative content and materials',
    permissions: ['view_requests', 'approve_creative', 'reject_creative'],
    color: 'blue'
  },
  'Legal': {
    description: 'Reviews legal compliance and content standards',
    permissions: ['view_requests', 'approve_legal', 'reject_legal'],
    color: 'green'
  },
  'Finance': {
    description: 'Reviews financial aspects and pricing',
    permissions: ['view_requests', 'approve_finance', 'reject_finance', 'view_pricing'],
    color: 'orange'
  },
  'Super Admin': {
    description: 'Full system access and configuration',
    permissions: ['view_all', 'edit_all', 'approve_all', 'reject_all', 'configure_all', 'manage_users'],
    color: 'purple'
  }
};

const allPermissions = [
  { id: 'view_requests', label: 'View Requests', category: 'Requests' },
  { id: 'approve_creative', label: 'Approve Creative', category: 'Approvals' },
  { id: 'approve_legal', label: 'Approve Legal', category: 'Approvals' },
  { id: 'approve_finance', label: 'Approve Finance', category: 'Approvals' },
  { id: 'reject_creative', label: 'Reject Creative', category: 'Approvals' },
  { id: 'reject_legal', label: 'Reject Legal', category: 'Approvals' },
  { id: 'reject_finance', label: 'Reject Finance', category: 'Approvals' },
  { id: 'view_pricing', label: 'View Pricing', category: 'Configuration' },
  { id: 'edit_programs', label: 'Edit Programs', category: 'Configuration' },
  { id: 'edit_pricing', label: 'Edit Pricing', category: 'Configuration' },
  { id: 'manage_users', label: 'Manage Users', category: 'Administration' },
  { id: 'view_all', label: 'View All', category: 'Administration' },
  { id: 'edit_all', label: 'Edit All', category: 'Administration' },
  { id: 'approve_all', label: 'Approve All', category: 'Administration' },
  { id: 'reject_all', label: 'Reject All', category: 'Administration' },
  { id: 'configure_all', label: 'Configure All', category: 'Administration' }
];

export function UserManagement() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'active',
    permissions: []
  });

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <Badge variant="default">Active</Badge>
      : <Badge variant="secondary">Inactive</Badge>;
  };

  const getRoleBadge = (role) => {
    const config = rolePermissions[role];
    return (
      <Badge 
        variant="outline" 
        className={`border-${config?.color}-200 text-${config?.color}-700 bg-${config?.color}-50`}
      >
        {role}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    setUserFormData({
      name: '',
      email: '',
      role: '',
      status: 'active',
      permissions: []
    });
    setEditingUser(null);
    setShowAddUserModal(true);
  };

  const handleEditUser = (user) => {
    setUserFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      permissions: user.permissions
    });
    setEditingUser(user);
    setShowAddUserModal(true);
  };

  const handleSaveUser = () => {
    const newUser = {
      id: editingUser ? editingUser.id : `USR-${Date.now()}`,
      name: userFormData.name,
      email: userFormData.email,
      role: userFormData.role,
      status: userFormData.status,
      permissions: userFormData.permissions,
      lastLogin: editingUser ? editingUser.lastLogin : 'Never',
      joinDate: editingUser ? editingUser.joinDate : new Date().toISOString().split('T')[0],
      requestsHandled: editingUser ? editingUser.requestsHandled : 0
    };

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? newUser : u));
    } else {
      setUsers([...users, newUser]);
    }

    setShowAddUserModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ));
  };

  const handleRoleSelect = (role) => {
    setUserFormData({
      ...userFormData,
      role: role,
      permissions: rolePermissions[role]?.permissions || []
    });
  };

  const handlePermissionToggle = (permissionId) => {
    const updatedPermissions = userFormData.permissions.includes(permissionId)
      ? userFormData.permissions.filter(p => p !== permissionId)
      : [...userFormData.permissions, permissionId];
    
    setUserFormData({ ...userFormData, permissions: updatedPermissions });
  };

  const viewRoleDetails = (role) => {
    setSelectedRole(role);
    setShowRoleModal(true);
  };

  const groupedPermissions = allPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>إدارة المستخدمين</h1>
          <p className="text-muted-foreground">
            إدارة حسابات المستخدمين والأدوار والصلاحيات
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">المستخدمون</TabsTrigger>
          <TabsTrigger value="roles">الأدوار والصلاحيات</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث في المستخدمين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="تصفية حسب الدور" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأدوار</SelectItem>
                      {Object.keys(rolePermissions).map(role => (
                        <SelectItem key={role} value={role}>{role === 'Creative' ? 'إبداعي' : role === 'Legal' ? 'قانوني' : role === 'Finance' ? 'مالي' : 'مدير عام'}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="تصفية حسب الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="active">نشط</SelectItem>
                      <SelectItem value="inactive">غير نشط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddUser}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  إضافة مستخدم
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    {getRoleBadge(user.role)}
                    <Switch
                      checked={user.status === 'active'}
                      onCheckedChange={() => toggleUserStatus(user.id)}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{user.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Status</span>
                      <div className="mt-1">{getStatusBadge(user.status)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Requests</span>
                      <p className="font-medium mt-1">{user.requestsHandled}</p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="text-muted-foreground">Last Login</span>
                    <p className="font-medium mt-1">{user.lastLogin}</p>
                  </div>

                  <div className="text-sm">
                    <span className="text-muted-foreground">Permissions</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {user.permissions.slice(0, 3).map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))}
                      {user.permissions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.permissions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEditUser(user)}
                      className="flex-1"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          {/* Roles Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(rolePermissions).map(([role, config]) => (
              <Card key={role} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => viewRoleDetails(role)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Shield className="w-6 h-6 text-muted-foreground" />
                    {getRoleBadge(role)}
                  </div>
                  <CardTitle className="text-lg">{role}</CardTitle>
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Permissions</span>
                      <span className="font-medium">{config.permissions.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Users</span>
                      <span className="font-medium">
                        {users.filter(u => u.role === role).length}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-4">
                    <Eye className="w-3 h-3 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Role Hierarchy Visual */}
          <Card>
            <CardHeader>
              <CardTitle>Role Hierarchy & Workflow</CardTitle>
              <p className="text-sm text-muted-foreground">
                Visual representation of approval workflow and role relationships
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  {/* Creative */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-medium">Creative</h4>
                    <p className="text-xs text-muted-foreground">Content Review</p>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-px bg-border"></div>
                    <div className="w-2 h-2 bg-primary rounded-full mx-2"></div>
                    <div className="w-8 h-px bg-border"></div>
                  </div>

                  {/* Legal */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-3">
                      <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-medium">Legal</h4>
                    <p className="text-xs text-muted-foreground">Compliance Review</p>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-px bg-border"></div>
                    <div className="w-2 h-2 bg-primary rounded-full mx-2"></div>
                    <div className="w-8 h-px bg-border"></div>
                  </div>

                  {/* Finance */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                      <Settings className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-medium">Finance</h4>
                    <p className="text-xs text-muted-foreground">Final Approval</p>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-px bg-border"></div>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>

                  {/* Approved */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-medium">Approved</h4>
                    <p className="text-xs text-muted-foreground">Ready to Air</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit User Modal */}
      <Dialog open={showAddUserModal} onOpenChange={setShowAddUserModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
            </DialogTitle>
            <DialogDescription>
              إعداد حساب المستخدم والصلاحيات
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userName">Full Name</Label>
                <Input
                  id="userName"
                  value={userFormData.name}
                  onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                  placeholder="أدخل الاسم الكامل"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userEmail">Email Address</Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  placeholder="أدخل عنوان البريد الإلكتروني"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userRole">Role</Label>
              <Select value={userFormData.role} onValueChange={handleRoleSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر دور المستخدم" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(rolePermissions).map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                  <div key={category} className="mb-4">
                    <h4 className="font-medium text-sm mb-2">{category}</h4>
                    <div className="space-y-2">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={userFormData.permissions.includes(permission.id)}
                            onCheckedChange={() => handlePermissionToggle(permission.id)}
                          />
                          <Label htmlFor={permission.id} className="text-sm">
                            {permission.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="userStatus"
                checked={userFormData.status === 'active'}
                onCheckedChange={(checked) => setUserFormData({ ...userFormData, status: checked ? 'active' : 'inactive' })}
              />
              <Label htmlFor="userStatus">User is active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUserModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveUser}
              disabled={!userFormData.name || !userFormData.email || !userFormData.role}
            >
              {editingUser ? 'Update User' : 'Add User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role Details Modal */}
      <Dialog open={showRoleModal} onOpenChange={setShowRoleModal}>
        <DialogContent className="max-w-lg">
          {selectedRole && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {getRoleBadge(selectedRole)}
                  <span>{selectedRole} Role</span>
                </DialogTitle>
                <DialogDescription>
                  {rolePermissions[selectedRole]?.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Permissions</Label>
                  <div className="mt-2 space-y-2">
                    {rolePermissions[selectedRole]?.permissions.map((permission) => (
                      <div key={permission} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{permission.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Users with this Role</Label>
                  <div className="mt-2 space-y-2">
                    {users.filter(u => u.role === selectedRole).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{user.name}</span>
                        {getStatusBadge(user.status)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowRoleModal(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}