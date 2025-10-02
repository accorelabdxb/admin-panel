import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  Download,
  User,
  Calendar,
  DollarSign,
  Monitor,
  Radio,
  Newspaper,
  Smartphone
} from 'lucide-react';

// Mock data for requests
const mockRequests = [
  {
    id: 'REQ-001',
    advertiser: 'شركة كوكا كولا',
    mediaType: 'TV',
    program: 'أخبار الوقت الذهبي',
    status: 'pending_creative',
    submissionDate: '2024-01-15',
    value: '$5,200',
    workflowStage: 'مراجعة إبداعية',
    materials: ['video.mp4', 'script.pdf'],
    description: 'إعلان 30 ثانية لحملة كوك زيرو الجديدة',
    submittedBy: 'جون سميث',
    priority: 'high'
  },
  {
    id: 'REQ-002',
    advertiser: 'نايكي للرياضة',
    mediaType: 'Radio',
    program: 'برنامج القيادة الصباحي',
    status: 'pending_legal',
    submissionDate: '2024-01-14',
    value: '$2,800',
    workflowStage: 'مراجعة قانونية',
    materials: ['audio.mp3', 'legal_docs.pdf'],
    description: 'إعلان صوتي لترويج نايكي إير ماكس',
    submittedBy: 'سارة جونسون',
    priority: 'medium'
  },
  {
    id: 'REQ-003',
    advertiser: 'مطعم محلي',
    mediaType: 'Print',
    program: 'أخبار يومية',
    status: 'pending_finance',
    submissionDate: '2024-01-13',
    value: '$450',
    workflowStage: 'مراجعة مالية',
    materials: ['design.jpg', 'copy.doc'],
    description: 'إعلان نصف صفحة لعرض عطلة نهاية الأسبوع',
    submittedBy: 'مايك ويلسون',
    priority: 'low'
  },
  {
    id: 'REQ-004',
    advertiser: 'شركة تقنية ناشئة',
    mediaType: 'Digital',
    program: 'باقة وسائل التواصل',
    status: 'approved',
    submissionDate: '2024-01-12',
    value: '$1,200',
    workflowStage: 'مكتمل',
    materials: ['banner.png', 'video.mp4'],
    description: 'حملة رقمية لإطلاق تطبيق',
    submittedBy: 'إيميلي ديفيس',
    priority: 'high'
  },
  {
    id: 'REQ-005',
    advertiser: 'علامة أزياء',
    mediaType: 'TV',
    program: 'برنامج مسائي',
    status: 'rejected',
    submissionDate: '2024-01-11',
    value: '$3,600',
    workflowStage: 'مرفوض',
    materials: ['video.mp4'],
    description: 'إعلان أزياء بمحتوى مثير للجدل',
    submittedBy: 'أليكس براون',
    priority: 'medium',
    rejectionReason: 'المحتوى لا يتفق مع معايير البث'
  }
];

export function RequestsManagement() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionComment, setRejectionComment] = useState('');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [mediaFilter, setMediaFilter] = useState('all');

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending_creative: { label: 'مراجعة إبداعية', variant: 'secondary' },
      pending_legal: { label: 'مراجعة قانونية', variant: 'default' },
      pending_finance: { label: 'مراجعة مالية', variant: 'outline' },
      approved: { label: 'معتمد', variant: 'default' },
      rejected: { label: 'مرفوض', variant: 'destructive' }
    };
    
    const config = statusConfig[status] || { label: status, variant: 'secondary' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { label: 'عالية', variant: 'destructive' },
      medium: { label: 'متوسطة', variant: 'default' },
      low: { label: 'منخفضة', variant: 'secondary' }
    };
    
    const config = priorityConfig[priority] || { label: priority, variant: 'secondary' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getMediaIcon = (mediaType) => {
    const icons = {
      TV: <Monitor className="h-4 w-4" />,
      Radio: <Radio className="h-4 w-4" />,
      Print: <Newspaper className="h-4 w-4" />,
      Digital: <Smartphone className="h-4 w-4" />
    };
    return icons[mediaType] || <FileText className="h-4 w-4" />;
  };

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.advertiser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesMedia = mediaFilter === 'all' || request.mediaType === mediaFilter;
    
    return matchesSearch && matchesStatus && matchesMedia;
  });

  const handleApprove = (requestId) => {
    console.log('Approving request:', requestId);
    // In real app, this would call an API
  };

  const handleReject = (requestId) => {
    setSelectedRequest(requestId);
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    console.log('Rejecting request:', selectedRequest, 'with comment:', rejectionComment);
    setShowRejectModal(false);
    setRejectionComment('');
    setSelectedRequest(null);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for requests:`, selectedRequests);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>إدارة الطلبات</h1>
          <p className="text-muted-foreground">
            إدارة طلبات حجز الإعلانات وموافقات سير العمل
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          تصدير التقرير
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث باسم المعلن أو رقم الطلب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="تصفية حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending_creative">مراجعة إبداعية</SelectItem>
                <SelectItem value="pending_legal">مراجعة قانونية</SelectItem>
                <SelectItem value="pending_finance">مراجعة مالية</SelectItem>
                <SelectItem value="approved">معتمد</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
            <Select value={mediaFilter} onValueChange={setMediaFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="تصفية حسب الوسيطة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الوسائط</SelectItem>
                <SelectItem value="TV">تلفزيون</SelectItem>
                <SelectItem value="Radio">إذاعة</SelectItem>
                <SelectItem value="Print">طباعة</SelectItem>
                <SelectItem value="Digital">رقمي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedRequests.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <span className="text-sm">{selectedRequests.length} طلب محدد</span>
              <Button 
                size="sm" 
                onClick={() => handleBulkAction('approve')}
                className="gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                اعتماد جماعي
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleBulkAction('reject')}
                className="gap-2"
              >
                <XCircle className="w-4 h-4" />
                رفض جماعي
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>طلبات الإعلانات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={selectedRequests.includes(request.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRequests([...selectedRequests, request.id]);
                      } else {
                        setSelectedRequests(selectedRequests.filter(id => id !== request.id));
                      }
                    }}
                  />
                  
                  <div className="flex-1 space-y-3">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{request.id}</h4>
                        {getMediaIcon(request.mediaType)}
                        <span className="text-sm text-muted-foreground">{request.mediaType}</span>
                        {getStatusBadge(request.status)}
                        {getPriorityBadge(request.priority)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          عرض التفاصيل
                        </Button>
                        {(request.status.startsWith('pending_')) && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(request.id)}
                              className="gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              اعتماد
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(request.id)}
                              className="gap-2"
                            >
                              <XCircle className="w-4 h-4" />
                              رفض
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Content Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">المعلن</p>
                        <p className="font-medium">{request.advertiser}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">البرنامج</p>
                        <p>{request.program}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">القيمة</p>
                        <p className="font-medium text-green-600">{request.value}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">{request.description}</p>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {request.submittedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {request.submissionDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>المرحلة: {request.workflowStage}</span>
                        <span>المواد: {request.materials.length}</span>
                      </div>
                    </div>

                    {/* Rejection Reason (if applicable) */}
                    {request.status === 'rejected' && request.rejectionReason && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded p-3">
                        <p className="text-sm text-destructive">
                          <strong>سبب الرفض:</strong> {request.rejectionReason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Request Details Modal */}
      <Dialog open={!!selectedRequest && typeof selectedRequest === 'object'} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedRequest && typeof selectedRequest === 'object' && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {selectedRequest.id} - {selectedRequest.advertiser}
                  {getStatusBadge(selectedRequest.status)}
                </DialogTitle>
                <DialogDescription>
                  Request details and workflow tracking
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">التفاصيل</TabsTrigger>
                  <TabsTrigger value="materials">المواد</TabsTrigger>
                  <TabsTrigger value="workflow">سير العمل</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">المعلن</label>
                      <p className="text-sm text-muted-foreground">{selectedRequest.advertiser}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">نوع الوسيطة</label>
                      <p className="text-sm text-muted-foreground">{selectedRequest.mediaType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">البرنامج</label>
                      <p className="text-sm text-muted-foreground">{selectedRequest.program}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">القيمة</label>
                      <p className="text-sm text-muted-foreground">{selectedRequest.value}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">مقدم الطلب</label>
                      <p className="text-sm text-muted-foreground">{selectedRequest.submittedBy}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">تاريخ التقديم</label>
                      <p className="text-sm text-muted-foreground">{selectedRequest.submissionDate}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">الوصف</label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedRequest.description}</p>
                  </div>
                </TabsContent>

                <TabsContent value="materials" className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {selectedRequest.materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4" />
                          <span>{material}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          تحميل
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="workflow" className="space-y-4">
                  <div className="space-y-4">
                    {/* Workflow Timeline */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">مُقدَّم</span>
                        <span className="text-xs text-muted-foreground">{selectedRequest.submissionDate}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${selectedRequest.status === 'pending_creative' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                        <span className="text-sm font-medium">مراجعة إبداعية</span>
                        <span className="text-xs text-muted-foreground">
                          {selectedRequest.status === 'pending_creative' ? 'جاري' : 'مكتمل'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          selectedRequest.status === 'pending_legal' ? 'bg-blue-500' : 
                          ['pending_finance', 'approved'].includes(selectedRequest.status) ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        <span className="text-sm font-medium">مراجعة قانونية</span>
                        <span className="text-xs text-muted-foreground">
                          {selectedRequest.status === 'pending_legal' ? 'جاري' : 
                           ['pending_finance', 'approved'].includes(selectedRequest.status) ? 'مكتمل' : 'معلّق'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          selectedRequest.status === 'pending_finance' ? 'bg-blue-500' : 
                          selectedRequest.status === 'approved' ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        <span className="text-sm font-medium">مراجعة مالية</span>
                        <span className="text-xs text-muted-foreground">
                          {selectedRequest.status === 'pending_finance' ? 'جاري' : 
                           selectedRequest.status === 'approved' ? 'مكتمل' : 'معلّق'}
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>رفض الطلب</DialogTitle>
            <DialogDescription>
              يرجى توضيح سبب رفض هذا الطلب. سيتم توصيل هذا إلى المعلن.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="أدخل سبب الرفض..."
              value={rejectionComment}
              onChange={(e) => setRejectionComment(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectModal(false)}>
              إلغاء
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmReject}
              disabled={!rejectionComment.trim()}
            >
              تأكيد الرفض
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}