import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  Save, 
  Upload, 
  Globe, 
  Mail, 
  CreditCard, 
  FileImage, 
  Palette,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Download,
  Trash2
} from 'lucide-react';

export function Settings() {
  const [settings, setSettings] = useState({
    // General Settings
    platformName: 'Media Incorporated',
    platformLogo: '',
    supportEmail: 'support@mediainc.com',
    timezone: 'UTC',
    currency: 'USD',
    language: 'en',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    browserNotifications: true,
    approvalNotifications: true,
    rejectionNotifications: true,
    dailyDigest: true,
    
    // File Upload Settings
    maxFileSize: 50, // MB
    allowedFormats: ['jpg', 'png', 'gif', 'pdf', 'mp4', 'mp3'],
    autoDeleteDays: 90,
    virusScan: true,
    
    // Payment Gateway Settings
    stripePublicKey: '',
    stripeSecretKey: '',
    paypalClientId: '',
    paypalSecret: '',
    paymentMethods: ['stripe', 'paypal'],
    
    // Branding Settings
    primaryColor: '#030213',
    secondaryColor: '#e9ebef',
    accentColor: '#3b82f6',
    fontFamily: 'Inter',
    
    // Security Settings
    passwordPolicy: 'medium',
    sessionTimeout: 30, // minutes
    twoFactorAuth: false,
    ipWhitelist: '',
    auditLog: true,
    
    // Email Templates
    approvalTemplate: 'Your advertisement request has been approved.',
    rejectionTemplate: 'Your advertisement request has been rejected.',
    welcomeTemplate: 'Welcome to Media Incorporated.',
    reminderTemplate: 'Reminder: You have pending requests to review.'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // In a real app, this would save to backend
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, this would upload to server
      console.log('Uploading logo:', file.name);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>الإعدادات</h1>
          <p className="text-muted-foreground">
            إعداد إعدادات النظام والعلامة التجارية والتكاملات
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          حفظ التغييرات
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="files">رفع الملفات</TabsTrigger>
          <TabsTrigger value="payments">المدفوعات</TabsTrigger>
          <TabsTrigger value="branding">العلامة التجارية</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input
                    id="platformName"
                    value={settings.platformName}
                    onChange={(e) => handleSettingChange('platformName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platformLogo">Platform Logo</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="platformLogo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('platformLogo').click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                  {settings.platformLogo && (
                    <img src={settings.platformLogo} alt="الشعار" className="h-10 w-auto" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="AED">AED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية (Arabic)</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Multi-Language Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Multi-Language Support</Label>
                  <p className="text-sm text-muted-foreground">Allow users to switch between languages</p>
                </div>
                <Switch
                  checked={settings.multiLanguage}
                  onCheckedChange={(checked) => handleSettingChange('multiLanguage', checked)}
                />
              </div>
              <Separator />
              <div className="space-y-3">
                <Label>Available Languages</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['English', 'العربية (Arabic)', 'Español', 'Français'].map((lang) => (
                    <div key={lang} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked={lang === 'English'} />
                      <span className="text-sm">{lang}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Browser Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show desktop notifications</p>
                  </div>
                  <Switch
                    checked={settings.browserNotifications}
                    onCheckedChange={(checked) => handleSettingChange('browserNotifications', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Notification Types</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Approval Notifications</span>
                    <Switch
                      checked={settings.approvalNotifications}
                      onCheckedChange={(checked) => handleSettingChange('approvalNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rejection Notifications</span>
                    <Switch
                      checked={settings.rejectionNotifications}
                      onCheckedChange={(checked) => handleSettingChange('rejectionNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Daily Digest</span>
                    <Switch
                      checked={settings.dailyDigest}
                      onCheckedChange={(checked) => handleSettingChange('dailyDigest', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="approvalTemplate">Approval Email Template</Label>
                <Textarea
                  id="approvalTemplate"
                  value={settings.approvalTemplate}
                  onChange={(e) => handleSettingChange('approvalTemplate', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rejectionTemplate">Rejection Email Template</Label>
                <Textarea
                  id="rejectionTemplate"
                  value={settings.rejectionTemplate}
                  onChange={(e) => handleSettingChange('rejectionTemplate', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcomeTemplate">Welcome Email Template</Label>
                <Textarea
                  id="welcomeTemplate"
                  value={settings.welcomeTemplate}
                  onChange={(e) => handleSettingChange('welcomeTemplate', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileImage className="w-5 h-5" />
                File Upload Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autoDeleteDays">Auto-delete after (days)</Label>
                  <Input
                    id="autoDeleteDays"
                    type="number"
                    value={settings.autoDeleteDays}
                    onChange={(e) => handleSettingChange('autoDeleteDays', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Allowed File Formats</Label>
                <div className="grid grid-cols-4 gap-3">
                  {['jpg', 'png', 'gif', 'pdf', 'mp4', 'mp3', 'mov', 'avi'].map((format) => (
                    <div key={format} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id={format}
                        defaultChecked={settings.allowedFormats.includes(format)}
                        onChange={(e) => {
                          const updatedFormats = e.target.checked
                            ? [...settings.allowedFormats, format]
                            : settings.allowedFormats.filter(f => f !== format);
                          handleSettingChange('allowedFormats', updatedFormats);
                        }}
                      />
                      <Label htmlFor={format} className="text-sm uppercase">{format}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Virus Scanning</Label>
                  <p className="text-sm text-muted-foreground">Scan uploaded files for malware</p>
                </div>
                <Switch
                  checked={settings.virusScan}
                  onCheckedChange={(checked) => handleSettingChange('virusScan', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Gateway Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Stripe Configuration</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="stripePublicKey">Public Key</Label>
                      <Input
                        id="stripePublicKey"
                        type="password"
                        value={settings.stripePublicKey}
                        onChange={(e) => handleSettingChange('stripePublicKey', e.target.value)}
                        placeholder="pk_live_..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stripeSecretKey">Secret Key</Label>
                      <Input
                        id="stripeSecretKey"
                        type="password"
                        value={settings.stripeSecretKey}
                        onChange={(e) => handleSettingChange('stripeSecretKey', e.target.value)}
                        placeholder="sk_live_..."
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-base">PayPal Configuration</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="paypalClientId">Client ID</Label>
                      <Input
                        id="paypalClientId"
                        type="password"
                        value={settings.paypalClientId}
                        onChange={(e) => handleSettingChange('paypalClientId', e.target.value)}
                        placeholder="معرف العميل"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypalSecret">Client Secret</Label>
                      <Input
                        id="paypalSecret"
                        type="password"
                        value={settings.paypalSecret}
                        onChange={(e) => handleSettingChange('paypalSecret', e.target.value)}
                        placeholder="سر العميل"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Enabled Payment Methods</Label>
                  <div className="space-y-2">
                    {['stripe', 'paypal', 'bank_transfer'].map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id={method}
                          defaultChecked={settings.paymentMethods.includes(method)}
                          onChange={(e) => {
                            const updatedMethods = e.target.checked
                              ? [...settings.paymentMethods, method]
                              : settings.paymentMethods.filter(m => m !== method);
                            handleSettingChange('paymentMethods', updatedMethods);
                          }}
                        />
                        <Label htmlFor={method} className="text-sm capitalize">
                          {method.replace('_', ' ')}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Brand Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.accentColor}
                      onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select value={settings.fontFamily} onValueChange={(value) => handleSettingChange('fontFamily', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Lato">Lato</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 border rounded-lg bg-muted/50">
                <Label className="text-sm font-medium">Preview</Label>
                <div className="mt-2 p-4 rounded" style={{ backgroundColor: settings.primaryColor, color: 'white' }}>
                  <h4 className="font-medium">Media Incorporated</h4>
                  <p className="text-sm opacity-90">Admin Panel</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select value={settings.passwordPolicy} onValueChange={(value) => handleSettingChange('passwordPolicy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weak">Weak (6+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, numbers)</SelectItem>
                      <SelectItem value="strong">Strong (12+ chars, mixed case, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">Log all user actions</p>
                </div>
                <Switch
                  checked={settings.auditLog}
                  onCheckedChange={(checked) => handleSettingChange('auditLog', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                <Textarea
                  id="ipWhitelist"
                  value={settings.ipWhitelist}
                  onChange={(e) => handleSettingChange('ipWhitelist', e.target.value)}
                  placeholder="Enter IP addresses separated by commas..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to allow access from any IP address
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export System Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="w-4 h-4 mr-2" />
                  Import System Data
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Old Audit Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}