import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Upload,
  Download,
  Monitor,
  Radio,
  Newspaper,
  Smartphone,
  Clock,
  Calendar,
  Users
} from 'lucide-react';

// Mock data for programs
const mockPrograms = [
  {
    id: 'PRG-001',
    name: 'أخبار الوقت الذهبي',
    channel: 'Channel 1',
    mediaType: 'TV',
    slotDuration: 30,
    timeSlot: '20:00-21:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    isActive: true,
    basePrice: 5000,
    audienceSize: '2.5M',
    description: 'برنامج أخبار مسائي مع نسبة مشاهدة عالية'
  },
  {
    id: 'PRG-002',
    name: 'برنامج الصباح الإذاعي',
    channel: 'Radio FM 95.5',
    mediaType: 'Radio',
    slotDuration: 15,
    timeSlot: '07:00-09:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    isActive: true,
    basePrice: 1200,
    audienceSize: '800K',
    description: 'برنامج إذاعي صباحي شائع خلال ساعات التنقل'
  },
  {
    id: 'PRG-003',
    name: 'رياضة نهاية الأسبوع',
    channel: 'شبكة الرياضة',
    mediaType: 'TV',
    slotDuration: 60,
    timeSlot: '15:00-18:00',
    days: ['Saturday', 'Sunday'],
    isActive: true,
    basePrice: 3500,
    audienceSize: '1.8M',
    description: 'تغطية وتحليل رياضي نهاية الأسبوع'
  },
  {
    id: 'PRG-004',
    name: 'النشرة اليومية',
    channel: 'الإعلام المطبوع',
    mediaType: 'Print',
    slotDuration: 0, // Not applicable for print
    timeSlot: 'طوال اليوم',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    isActive: true,
    basePrice: 800,
    audienceSize: '150K',
    description: 'Daily newspaper with city-wide circulation'
  },
  {
    id: 'PRG-005',
    name: 'حزمة وسائل التواصل الاجتماعي',
    channel: 'المنصات الرقمية',
    mediaType: 'Digital',
    slotDuration: 0, // Not applicable for digital
    timeSlot: '24/7',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    isActive: false,
    basePrice: 2000,
    audienceSize: '500K',
    description: 'Cross-platform digital advertising package'
  }
];

const mediaTypes = ['TV', 'Radio', 'Print', 'Digital'];
const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function ProgramConfiguration() {
  const [programs, setPrograms] = useState(mockPrograms);
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaFilter, setMediaFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    channel: '',
    mediaType: '',
    slotDuration: '',
    timeSlot: '',
    days: [],
    isActive: true,
    basePrice: '',
    audienceSize: '',
    description: ''
  });

  const getMediaIcon = (mediaType) => {
    const icons = {
      TV: <Monitor className="h-4 w-4" />,
      Radio: <Radio className="h-4 w-4" />,
      Print: <Newspaper className="h-4 w-4" />,
      Digital: <Smartphone className="h-4 w-4" />
    };
    return icons[mediaType] || <Monitor className="h-4 w-4" />;
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.channel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMedia = mediaFilter === 'all' || program.mediaType === mediaFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && program.isActive) ||
                         (statusFilter === 'inactive' && !program.isActive);
    
    return matchesSearch && matchesMedia && matchesStatus;
  });

  const handleAddProgram = () => {
    setFormData({
      name: '',
      channel: '',
      mediaType: '',
      slotDuration: '',
      timeSlot: '',
      days: [],
      isActive: true,
      basePrice: '',
      audienceSize: '',
      description: ''
    });
    setEditingProgram(null);
    setShowAddModal(true);
  };

  const handleEditProgram = (program) => {
    setFormData({
      name: program.name,
      channel: program.channel,
      mediaType: program.mediaType,
      slotDuration: program.slotDuration.toString(),
      timeSlot: program.timeSlot,
      days: program.days,
      isActive: program.isActive,
      basePrice: program.basePrice.toString(),
      audienceSize: program.audienceSize,
      description: program.description
    });
    setEditingProgram(program);
    setShowAddModal(true);
  };

  const handleSaveProgram = () => {
    const newProgram = {
      id: editingProgram ? editingProgram.id : `PRG-${Date.now()}`,
      name: formData.name,
      channel: formData.channel,
      mediaType: formData.mediaType,
      slotDuration: parseInt(formData.slotDuration) || 0,
      timeSlot: formData.timeSlot,
      days: formData.days,
      isActive: formData.isActive,
      basePrice: parseInt(formData.basePrice) || 0,
      audienceSize: formData.audienceSize,
      description: formData.description
    };

    if (editingProgram) {
      setPrograms(programs.map(p => p.id === editingProgram.id ? newProgram : p));
    } else {
      setPrograms([...programs, newProgram]);
    }

    setShowAddModal(false);
    setEditingProgram(null);
  };

  const handleDeleteProgram = (programId) => {
    setPrograms(programs.filter(p => p.id !== programId));
  };

  const toggleProgramStatus = (programId) => {
    setPrograms(programs.map(p => 
      p.id === programId ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const handleDayToggle = (day) => {
    const updatedDays = formData.days.includes(day)
      ? formData.days.filter(d => d !== day)
      : [...formData.days, day];
    setFormData({ ...formData, days: updatedDays });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>إعداد البرامج</h1>
          <p className="text-muted-foreground">
            إدارة برامج التلفزيون والإذاعة والطباعة والرقمية
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            تحميل جماعي
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            تصدير
          </Button>
          <Button onClick={handleAddProgram}>
            <Plus className="w-4 h-4 mr-2" />
            إضافة برنامج
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث في البرامج أو القنوات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={mediaFilter} onValueChange={setMediaFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="تصفية حسب نوع الوسيلة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع أنواع الوسائل</SelectItem>
                {mediaTypes.map(type => (
                  <SelectItem key={type} value={type}>{type === 'TV' ? 'تلفزيون' : type === 'Radio' ? 'إذاعة' : type === 'Print' ? 'طباعة' : 'رقمي'}</SelectItem>
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
        </CardContent>
      </Card>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getMediaIcon(program.mediaType)}
                  <Badge variant="secondary">{program.mediaType}</Badge>
                </div>
                <Switch
                  checked={program.isActive}
                  onCheckedChange={() => toggleProgramStatus(program.id)}
                />
              </div>
              <CardTitle className="text-lg">{program.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{program.channel}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <Clock className="w-3 h-3" />
                    <span>الفترة الزمنية</span>
                  </div>
                  <p className="font-medium">{program.timeSlot}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <Users className="w-3 h-3" />
                    <span>الجمهور</span>
                  </div>
                  <p className="font-medium">{program.audienceSize}</p>
                </div>
              </div>

              {program.slotDuration > 0 && (
                <div className="text-sm">
                  <span className="text-muted-foreground">المدة: </span>
                  <span className="font-medium">{program.slotDuration} ثانية</span>
                </div>
              )}

              <div className="text-sm">
                <span className="text-muted-foreground">السعر الأساسي: </span>
                <span className="font-medium text-green-600">${program.basePrice.toLocaleString()}</span>
              </div>

              <div className="text-sm">
                <span className="text-muted-foreground">الأيام: </span>
                <span className="font-medium">{program.days.length === 7 ? 'يومياً' : program.days.join(', ')}</span>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">
                {program.description}
              </p>

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleEditProgram(program)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  تعديل
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => handleDeleteProgram(program.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Program Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProgram ? 'تعديل البرنامج' : 'إضافة برنامج جديد'}
            </DialogTitle>
            <DialogDescription>
              إعداد تفاصيل البرنامج ومعلومات الجدولة
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم البرنامج</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="أدخل اسم البرنامج"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="channel">القناة/المنصة</Label>
                <Input
                  id="channel"
                  value={formData.channel}
                  onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                  placeholder="أدخل اسم القناة أو المنصة"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mediaType">نوع الوسيلة</Label>
                <Select value={formData.mediaType} onValueChange={(value) => setFormData({ ...formData, mediaType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الوسيلة" />
                  </SelectTrigger>
                  <SelectContent>
                    {mediaTypes.map(type => (
                      <SelectItem key={type} value={type}>{type === 'TV' ? 'تلفزيون' : type === 'Radio' ? 'إذاعة' : type === 'Print' ? 'طباعة' : 'رقمي'}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slotDuration">مدة الفترة (ثانية)</Label>
                <Input
                  id="slotDuration"
                  type="number"
                  value={formData.slotDuration}
                  onChange={(e) => setFormData({ ...formData, slotDuration: e.target.value })}
                  placeholder="30"
                  disabled={['Print', 'Digital'].includes(formData.mediaType)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeSlot">الفترة الزمنية</Label>
                <Input
                  id="timeSlot"
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  placeholder="مثال: 20:00-21:00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="basePrice">السعر الأساسي ($)</Label>
                <Input
                  id="basePrice"
                  type="number"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                  placeholder="5000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>أيام البث</Label>
              <div className="grid grid-cols-4 gap-2">
                {dayOptions.map(day => (
                  <div key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={day}
                      checked={formData.days.includes(day)}
                      onChange={() => handleDayToggle(day)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={day} className="text-sm">{day === 'Monday' ? 'الاثنين' : day === 'Tuesday' ? 'الثلاثاء' : day === 'Wednesday' ? 'الأربعاء' : day === 'Thursday' ? 'الخميس' : day === 'Friday' ? 'الجمعة' : day === 'Saturday' ? 'السبت' : 'الأحد'}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audienceSize">حجم الجمهور</Label>
              <Input
                id="audienceSize"
                value={formData.audienceSize}
                onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                placeholder="مثال: 2.5M"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="وصف البرنامج..."
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">البرنامج نشط</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              إلغاء
            </Button>
            <Button 
              onClick={handleSaveProgram}
              disabled={!formData.name || !formData.channel || !formData.mediaType}
            >
              {editingProgram ? 'تحديث البرنامج' : 'إضافة برنامج'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}