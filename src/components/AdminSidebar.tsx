import React from 'react';
import { cn } from './ui/utils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  LayoutDashboard, 
  Monitor, 
  DollarSign, 
  FileText, 
  Settings, 
  Users,
  Globe,
  Bell
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  pendingRequests: number;
}

const sidebarItems = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { id: 'programs', label: 'البرامج', icon: Monitor },
  { id: 'pricing', label: 'التسعير', icon: DollarSign },
  { id: 'requests', label: 'الطلبات', icon: FileText, hasBadge: true },
  { id: 'users', label: 'المستخدمون والأدوار', icon: Users },
  { id: 'settings', label: 'الإعدادات', icon: Settings },
];

export function AdminSidebar({ activeTab, onTabChange, pendingRequests }: AdminSidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Monitor className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-medium">شركة الإعلام</h2>
            <p className="text-sm text-muted-foreground">لوحة الإدارة</p>
          </div>
        </div>
      </div>

      {/* Language Toggle */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <select className="bg-transparent text-sm border-none outline-none">
            <option value="en">الإنجليزية</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  isActive && "bg-accent"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.hasBadge && pendingRequests > 0 && (
                  <Badge variant="destructive" className="h-5 px-2 text-xs">
                    {pendingRequests}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-border">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">نشاط اليوم</span>
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>طلبات جديدة</span>
              <span>12</span>
            </div>
            <div className="flex justify-between">
              <span>معتمد</span>
              <span>8</span>
            </div>
            <div className="flex justify-between">
              <span>الإيرادات</span>
              <span>$45.2K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}