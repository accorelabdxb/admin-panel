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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  TrendingUp,
  Clock,
  Calendar,
  Percent,
  DollarSign,
  Package
} from 'lucide-react';

// Mock data for pricing rules
const mockPricingRules = [
  {
    id: 'RULE-001',
    program: 'أخبار الوقت الذهبي',
    mediaType: 'TV',
    timeSlot: 'Peak Hours (18:00-22:00)',
    basePrice: 5000,
    multiplier: 1.5,
    finalPrice: 7500,
    isActive: true,
    effectiveFrom: '2024-01-01',
    effectiveTo: '2024-12-31'
  },
  {
    id: 'RULE-002',
    program: 'برنامج الصباح الإذاعي',
    mediaType: 'Radio',
    timeSlot: 'Peak Hours (07:00-09:00)',
    basePrice: 1200,
    multiplier: 1.3,
    finalPrice: 1560,
    isActive: true,
    effectiveFrom: '2024-01-01',
    effectiveTo: '2024-12-31'
  },
  {
    id: 'RULE-003',
    program: 'رياضة نهاية الأسبوع',
    mediaType: 'TV',
    timeSlot: 'نهاية أسبوع مميزة',
    basePrice: 3500,
    multiplier: 1.2,
    finalPrice: 4200,
    isActive: true,
    effectiveFrom: '2024-01-01',
    effectiveTo: '2024-12-31'
  },
  {
    id: 'RULE-004',
    program: 'النشرة اليومية',
    mediaType: 'Print',
    timeSlot: 'الصفحة الأولى',
    basePrice: 800,
    multiplier: 2.0,
    finalPrice: 1600,
    isActive: true,
    effectiveFrom: '2024-01-01',
    effectiveTo: '2024-12-31'
  }
];

// Mock data for packages
const mockPackages = [
  {
    id: 'PKG-001',
    name: 'حزمة الوقت الذهبي',
    description: 'حزمة تلفزيون وإذاعة الوقت الذهبي',
    programs: ['أخبار الوقت الذهبي', 'برنامج الصباح الإذاعي'],
    basePrice: 8000,
    discountPercent: 15,
    finalPrice: 6800,
    validFrom: '2024-01-01',
    validTo: '2024-03-31',
    isActive: true,
    minDuration: 7, // days
    bookings: 12
  },
  {
    id: 'PKG-002',
    name: 'عرض نهاية الأسبوع',
    description: 'حزمة برامج نهاية الأسبوع',
    programs: ['رياضة نهاية الأسبوع', 'برنامج صباح السبت'],
    basePrice: 5000,
    discountPercent: 20,
    finalPrice: 4000,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    isActive: true,
    minDuration: 3,
    bookings: 8
  },
  {
    id: 'PKG-003',
    name: 'Digital + Print Combo',
    description: 'Cross-platform digital and print advertising',
    programs: ['حزمة وسائل التواصل الاجتماعي', 'النشرة اليومية'],
    basePrice: 3500,
    discountPercent: 25,
    finalPrice: 2625,
    validFrom: '2024-02-01',
    validTo: '2024-06-30',
    isActive: false,
    minDuration: 14,
    bookings: 5
  }
];

const timeSlotOptions = [
  'Peak Hours (18:00-22:00)',
  'Peak Hours (07:00-09:00)',
  'نهاية أسبوع مميزة',
  'Late Night (22:00-02:00)',
  'Mid-day (10:00-16:00)',
  'الصفحة الأولى',
  'الصفحة الأخيرة',
  'قسم الرياضة',
  'قسم الأعمال'
];

export function PriceConfiguration() {
  const [activeTab, setActiveTab] = useState('pricing-rules');
  const [pricingRules, setPricingRules] = useState(mockPricingRules);
  const [packages, setPackages] = useState(mockPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaFilter, setMediaFilter] = useState('all');
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [showAddPackageModal, setShowAddPackageModal] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);
  
  const [ruleFormData, setRuleFormData] = useState({
    program: '',
    mediaType: '',
    timeSlot: '',
    basePrice: '',
    multiplier: '',
    effectiveFrom: '',
    effectiveTo: '',
    isActive: true
  });

  const [packageFormData, setPackageFormData] = useState({
    name: '',
    description: '',
    programs: [],
    basePrice: '',
    discountPercent: '',
    validFrom: '',
    validTo: '',
    minDuration: '',
    isActive: true
  });

  const filteredRules = pricingRules.filter(rule => {
    const matchesSearch = rule.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.timeSlot.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMedia = mediaFilter === 'all' || rule.mediaType === mediaFilter;
    return matchesSearch && matchesMedia;
  });

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleAddRule = () => {
    setRuleFormData({
      program: '',
      mediaType: '',
      timeSlot: '',
      basePrice: '',
      multiplier: '',
      effectiveFrom: '',
      effectiveTo: '',
      isActive: true
    });
    setEditingRule(null);
    setShowAddRuleModal(true);
  };

  const handleEditRule = (rule) => {
    setRuleFormData({
      program: rule.program,
      mediaType: rule.mediaType,
      timeSlot: rule.timeSlot,
      basePrice: rule.basePrice.toString(),
      multiplier: rule.multiplier.toString(),
      effectiveFrom: rule.effectiveFrom,
      effectiveTo: rule.effectiveTo,
      isActive: rule.isActive
    });
    setEditingRule(rule);
    setShowAddRuleModal(true);
  };

  const handleSaveRule = () => {
    const basePrice = parseFloat(ruleFormData.basePrice) || 0;
    const multiplier = parseFloat(ruleFormData.multiplier) || 1;
    
    const newRule = {
      id: editingRule ? editingRule.id : `RULE-${Date.now()}`,
      program: ruleFormData.program,
      mediaType: ruleFormData.mediaType,
      timeSlot: ruleFormData.timeSlot,
      basePrice: basePrice,
      multiplier: multiplier,
      finalPrice: basePrice * multiplier,
      effectiveFrom: ruleFormData.effectiveFrom,
      effectiveTo: ruleFormData.effectiveTo,
      isActive: ruleFormData.isActive
    };

    if (editingRule) {
      setPricingRules(pricingRules.map(r => r.id === editingRule.id ? newRule : r));
    } else {
      setPricingRules([...pricingRules, newRule]);
    }

    setShowAddRuleModal(false);
    setEditingRule(null);
  };

  const handleAddPackage = () => {
    setPackageFormData({
      name: '',
      description: '',
      programs: [],
      basePrice: '',
      discountPercent: '',
      validFrom: '',
      validTo: '',
      minDuration: '',
      isActive: true
    });
    setEditingPackage(null);
    setShowAddPackageModal(true);
  };

  const handleEditPackage = (pkg) => {
    setPackageFormData({
      name: pkg.name,
      description: pkg.description,
      programs: pkg.programs,
      basePrice: pkg.basePrice.toString(),
      discountPercent: pkg.discountPercent.toString(),
      validFrom: pkg.validFrom,
      validTo: pkg.validTo,
      minDuration: pkg.minDuration.toString(),
      isActive: pkg.isActive
    });
    setEditingPackage(pkg);
    setShowAddPackageModal(true);
  };

  const handleSavePackage = () => {
    const basePrice = parseFloat(packageFormData.basePrice) || 0;
    const discountPercent = parseFloat(packageFormData.discountPercent) || 0;
    const finalPrice = basePrice * (1 - discountPercent / 100);
    
    const newPackage = {
      id: editingPackage ? editingPackage.id : `PKG-${Date.now()}`,
      name: packageFormData.name,
      description: packageFormData.description,
      programs: packageFormData.programs,
      basePrice: basePrice,
      discountPercent: discountPercent,
      finalPrice: finalPrice,
      validFrom: packageFormData.validFrom,
      validTo: packageFormData.validTo,
      minDuration: parseInt(packageFormData.minDuration) || 1,
      isActive: packageFormData.isActive,
      bookings: editingPackage ? editingPackage.bookings : 0
    };

    if (editingPackage) {
      setPackages(packages.map(p => p.id === editingPackage.id ? newPackage : p));
    } else {
      setPackages([...packages, newPackage]);
    }

    setShowAddPackageModal(false);
    setEditingPackage(null);
  };

  const handleDeleteRule = (ruleId) => {
    setPricingRules(pricingRules.filter(r => r.id !== ruleId));
  };

  const handleDeletePackage = (packageId) => {
    setPackages(packages.filter(p => p.id !== packageId));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>إعداد الأسعار</h1>
          <p className="text-muted-foreground">
            إدارة قواعد التسعير والمضاعفات والباقات الموسمية
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pricing-rules">قواعد التسعير</TabsTrigger>
          <TabsTrigger value="packages">الباقات</TabsTrigger>
        </TabsList>

        <TabsContent value="pricing-rules" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث في البرامج أو الفترات الزمنية..."
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
                      <SelectItem value="TV">تلفزيون</SelectItem>
                      <SelectItem value="Radio">إذاعة</SelectItem>
                      <SelectItem value="Print">طباعة</SelectItem>
                      <SelectItem value="Digital">رقمي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddRule}>
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة قاعدة تسعير
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Rules List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRules.map((rule) => (
              <Card key={rule.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{rule.mediaType}</Badge>
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => {
                        setPricingRules(pricingRules.map(r => 
                          r.id === rule.id ? { ...r, isActive: !r.isActive } : r
                        ));
                      }}
                    />
                  </div>
                  <CardTitle className="text-lg">{rule.program}</CardTitle>
                  <p className="text-sm text-muted-foreground">{rule.timeSlot}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        <DollarSign className="w-3 h-3" />
                        <span className="text-xs">السعر الأساسي</span>
                      </div>
                      <p className="font-medium">${rule.basePrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs">المضاعف</span>
                      </div>
                      <p className="font-medium">{rule.multiplier}x</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">السعر النهائي</span>
                      <span className="text-lg font-bold text-green-600">${rule.finalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="w-3 h-3" />
                      <span>ساري: {rule.effectiveFrom} إلى {rule.effectiveTo}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEditRule(rule)}
                      className="flex-1"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      تعديل
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="packages" className="space-y-6">
          {/* Package Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث في الباقات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleAddPackage}>
                  <Plus className="w-4 h-4 mr-2" />
                  إنشاء باقة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Packages List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={pkg.isActive ? "default" : "secondary"}>
                      {pkg.isActive ? "نشط" : "غير نشط"}
                    </Badge>
                    <Switch
                      checked={pkg.isActive}
                      onCheckedChange={() => {
                        setPackages(packages.map(p => 
                          p.id === pkg.id ? { ...p, isActive: !p.isActive } : p
                        ));
                      }}
                    />
                  </div>
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <Package className="w-3 h-3" />
                      <span className="text-xs">البرامج المتضمنة</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {pkg.programs.map((program, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        <DollarSign className="w-3 h-3" />
                        <span className="text-xs">السعر الأساسي</span>
                      </div>
                      <p className="font-medium">${pkg.basePrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        <Percent className="w-3 h-3" />
                        <span className="text-xs">الخصم</span>
                      </div>
                      <p className="font-medium text-green-600">{pkg.discountPercent}%</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">سعر الباقة</span>
                      <span className="text-lg font-bold text-blue-600">${pkg.finalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>فترة الصلاحية</span>
                      </div>
                      <p>{pkg.validFrom} إلى {pkg.validTo}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="w-3 h-3" />
                        <span>الحد الأدنى للمدة</span>
                      </div>
                      <p>{pkg.minDuration} أيام</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">{pkg.bookings}</span> حجز حتى الآن
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEditPackage(pkg)}
                      className="flex-1"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleDeletePackage(pkg.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Pricing Rule Modal */}
      <Dialog open={showAddRuleModal} onOpenChange={setShowAddRuleModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingRule ? 'تعديل قاعدة التسعير' : 'إضافة قاعدة تسعير جديدة'}
            </DialogTitle>
            <DialogDescription>
              إعداد مضاعفات الأسعار للفترات الزمنية والبرامج المختلفة
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Input
                  id="program"
                  value={ruleFormData.program}
                  onChange={(e) => setRuleFormData({ ...ruleFormData, program: e.target.value })}
                  placeholder="أدخل اسم البرنامج"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mediaType">Media Type</Label>
                <Select value={ruleFormData.mediaType} onValueChange={(value) => setRuleFormData({ ...ruleFormData, mediaType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الوسائط" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TV">TV</SelectItem>
                    <SelectItem value="Radio">Radio</SelectItem>
                    <SelectItem value="Print">Print</SelectItem>
                    <SelectItem value="Digital">Digital</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeSlot">Time Slot</Label>
              <Select value={ruleFormData.timeSlot} onValueChange={(value) => setRuleFormData({ ...ruleFormData, timeSlot: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفترة الزمنية" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlotOptions.map(slot => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Price ($)</Label>
                <Input
                  id="basePrice"
                  type="number"
                  value={ruleFormData.basePrice}
                  onChange={(e) => setRuleFormData({ ...ruleFormData, basePrice: e.target.value })}
                  placeholder="5000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="multiplier">Price Multiplier</Label>
                <Input
                  id="multiplier"
                  type="number"
                  step="0.1"
                  value={ruleFormData.multiplier}
                  onChange={(e) => setRuleFormData({ ...ruleFormData, multiplier: e.target.value })}
                  placeholder="1.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="effectiveFrom">Effective From</Label>
                <Input
                  id="effectiveFrom"
                  type="date"
                  value={ruleFormData.effectiveFrom}
                  onChange={(e) => setRuleFormData({ ...ruleFormData, effectiveFrom: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="effectiveTo">Effective To</Label>
                <Input
                  id="effectiveTo"
                  type="date"
                  value={ruleFormData.effectiveTo}
                  onChange={(e) => setRuleFormData({ ...ruleFormData, effectiveTo: e.target.value })}
                />
              </div>
            </div>

            {ruleFormData.basePrice && ruleFormData.multiplier && (
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Final Price Preview</span>
                  <span className="text-lg font-bold text-green-600">
                    ${(parseFloat(ruleFormData.basePrice) * parseFloat(ruleFormData.multiplier)).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={ruleFormData.isActive}
                onCheckedChange={(checked) => setRuleFormData({ ...ruleFormData, isActive: checked })}
              />
              <Label htmlFor="isActive">Rule is active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddRuleModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveRule}
              disabled={!ruleFormData.program || !ruleFormData.mediaType || !ruleFormData.basePrice || !ruleFormData.multiplier}
            >
              {editingRule ? 'Update Rule' : 'Add Rule'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Package Modal */}
      <Dialog open={showAddPackageModal} onOpenChange={setShowAddPackageModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPackage ? 'Edit Package' : 'Create New Package'}
            </DialogTitle>
            <DialogDescription>
              Create discount packages combining multiple programs
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="packageName">Package Name</Label>
              <Input
                id="packageName"
                value={packageFormData.name}
                onChange={(e) => setPackageFormData({ ...packageFormData, name: e.target.value })}
                placeholder="أدخل اسم الحزمة"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="packageDescription">Description</Label>
              <Textarea
                id="packageDescription"
                value={packageFormData.description}
                onChange={(e) => setPackageFormData({ ...packageFormData, description: e.target.value })}
                placeholder="Package description..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Included Programs</Label>
              <Input
                placeholder="أدخل أسماء البرامج مفصولة بفواصل"
                value={packageFormData.programs.join(', ')}
                onChange={(e) => setPackageFormData({ ...packageFormData, programs: e.target.value.split(',').map(p => p.trim()).filter(p => p) })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="packageBasePrice">Base Price ($)</Label>
                <Input
                  id="packageBasePrice"
                  type="number"
                  value={packageFormData.basePrice}
                  onChange={(e) => setPackageFormData({ ...packageFormData, basePrice: e.target.value })}
                  placeholder="8000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountPercent">Discount (%)</Label>
                <Input
                  id="discountPercent"
                  type="number"
                  value={packageFormData.discountPercent}
                  onChange={(e) => setPackageFormData({ ...packageFormData, discountPercent: e.target.value })}
                  placeholder="15"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="validFrom">Valid From</Label>
                <Input
                  id="validFrom"
                  type="date"
                  value={packageFormData.validFrom}
                  onChange={(e) => setPackageFormData({ ...packageFormData, validFrom: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="validTo">Valid To</Label>
                <Input
                  id="validTo"
                  type="date"
                  value={packageFormData.validTo}
                  onChange={(e) => setPackageFormData({ ...packageFormData, validTo: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minDuration">Minimum Duration (days)</Label>
              <Input
                id="minDuration"
                type="number"
                value={packageFormData.minDuration}
                onChange={(e) => setPackageFormData({ ...packageFormData, minDuration: e.target.value })}
                placeholder="7"
              />
            </div>

            {packageFormData.basePrice && packageFormData.discountPercent && (
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Package Price Preview</span>
                  <span className="text-lg font-bold text-blue-600">
                    ${(parseFloat(packageFormData.basePrice) * (1 - parseFloat(packageFormData.discountPercent) / 100)).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="packageIsActive"
                checked={packageFormData.isActive}
                onCheckedChange={(checked) => setPackageFormData({ ...packageFormData, isActive: checked })}
              />
              <Label htmlFor="packageIsActive">Package is active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPackageModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSavePackage}
              disabled={!packageFormData.name || !packageFormData.basePrice || !packageFormData.discountPercent}
            >
              {editingPackage ? 'Update Package' : 'Create Package'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}