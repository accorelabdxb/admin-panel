import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  FileText, 
  CheckCircle,
  XCircle,
  Clock,
  Monitor,
  Radio,
  Newspaper,
  Smartphone
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Mock data for charts
const requestsByMedia = [
  { name: 'TV', value: 45, color: '#3b82f6' },
  { name: 'Radio', value: 30, color: '#10b981' },
  { name: 'Print', value: 15, color: '#f59e0b' },
  { name: 'Digital', value: 10, color: '#ef4444' },
];

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

const weeklyRequests = [
  { day: 'Mon', requests: 12 },
  { day: 'Tue', requests: 19 },
  { day: 'Wed', requests: 15 },
  { day: 'Thu', requests: 22 },
  { day: 'Fri', requests: 18 },
  { day: 'Sat', requests: 8 },
  { day: 'Sun', requests: 5 },
];

const recentActivities = [
  { id: 1, action: 'تم اعتماد الطلب #A1234 من قبل فريق الشؤون القانونية', time: 'منذ دقيقتين', type: 'approval' },
  { id: 2, action: 'حجز جديد لفترة تلفزيونية في الوقت الذهبي', time: 'منذ 5 دقائق', type: 'booking' },
  { id: 3, action: 'تم رفض الطلب #A1231 من قبل الشؤون المالية', time: 'منذ 10 دقائق', type: 'rejection' },
  { id: 4, action: 'تم إضافة مستخدم جديد جون دو إلى الفريق الإبداعي', time: 'منذ 15 دقيقة', type: 'user' },
  { id: 5, action: 'تم تحديث السعر لفترة الإذاعة الصباحية', time: 'منذ ساعة', type: 'config' },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1>لوحة التحكم</h1>
        <p className="text-muted-foreground">
          نظرة عامة على أداء نظام حجز الإعلانات الخاص بك
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلبات اليوم</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3" /> +12% من أمس
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الموافقات المعلقة</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              4 في القانونية، 3 في المالية، 1 في الإبداعية
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل الموافقة</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3" /> +5% من الأسبوع الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إيرادات اليوم</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45.2K</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3" /> -2% من أمس
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>الإيرادات الشهرية</CardTitle>
            <CardDescription>اتجاهات الإيرادات خلال الـ 6 أشهر الماضية</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Media Type Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>الطلبات حسب نوع الوسائط</CardTitle>
            <CardDescription>توزيع طلبات الإعلانات هذا الشهر</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={requestsByMedia}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {requestsByMedia.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Requests */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>حجم الطلبات الأسبوعي</CardTitle>
            <CardDescription>عدد الطلبات المستلمة كل يوم هذا الأسبوع</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyRequests}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>الأنشطة الأخيرة</CardTitle>
            <CardDescription>أحدث أنشطة النظام والإشعارات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === 'approval' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {activity.type === 'rejection' && <XCircle className="h-4 w-4 text-red-500" />}
                    {activity.type === 'booking' && <FileText className="h-4 w-4 text-blue-500" />}
                    {activity.type === 'user' && <Users className="h-4 w-4 text-purple-500" />}
                    {activity.type === 'config' && <DollarSign className="h-4 w-4 text-orange-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Program Performance */}
      <Card>
        <CardHeader>
          <CardTitle>أفضل البرامج أداءً</CardTitle>
          <CardDescription>البرامج الأكثر طلباً هذا الشهر</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'أخبار الوقت الذهبي', type: 'TV', requests: 45, revenue: '$12,300', growth: '+15%' },
              { name: 'برنامج القيادة الصباحي', type: 'Radio', requests: 32, revenue: '$8,900', growth: '+8%' },
              { name: 'رياضة عطلة نهاية الأسبوع', type: 'TV', requests: 28, revenue: '$9,200', growth: '+22%' },
              { name: 'أخبار يومية', type: 'Print', requests: 18, revenue: '$4,500', growth: '-5%' },
            ].map((program, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {program.type === 'TV' && <Monitor className="h-8 w-8 text-blue-500" />}
                    {program.type === 'Radio' && <Radio className="h-8 w-8 text-green-500" />}
                    {program.type === 'Print' && <Newspaper className="h-8 w-8 text-orange-500" />}
                    {program.type === 'Digital' && <Smartphone className="h-8 w-8 text-purple-500" />}
                  </div>
                  <div>
                    <h4 className="font-medium">{program.name}</h4>
                    <p className="text-sm text-muted-foreground">{program.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-medium">{program.requests} طلب</p>
                      <p className="text-sm text-muted-foreground">{program.revenue}</p>
                    </div>
                    <Badge variant={program.growth.startsWith('+') ? 'default' : 'destructive'}>
                      {program.growth}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}