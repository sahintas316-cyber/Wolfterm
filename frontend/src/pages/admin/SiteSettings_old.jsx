import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/adminApi';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

const SiteSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await adminApi.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Ayarlar yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.updateSettings(settings);
      toast.success('Ayarlar kaydedildi');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Ayarlar kaydedilemedi');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold mb-2">Site Ayarları</h1>
        <p className="text-gray-600">Genel site ayarlarını yönetin</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Şirket Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="company_name">Şirket Adı</Label>
              <Input
                id="company_name"
                value={settings?.company_name || ''}
                onChange={(e) => setSettings({...settings, company_name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company_tagline">Slogan</Label>
              <Input
                id="company_tagline"
                value={settings?.company_tagline || ''}
                onChange={(e) => setSettings({...settings, company_tagline: e.target.value})}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input
              id="logo_url"
              value={settings?.logo_url || ''}
              onChange={(e) => setSettings({...settings, logo_url: e.target.value})}
              placeholder="https://..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>İletişim Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              value={settings?.phone || ''}
              onChange={(e) => setSettings({...settings, phone: e.target.value})}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              type="email"
              value={settings?.email || ''}
              onChange={(e) => setSettings({...settings, email: e.target.value})}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Adres</Label>
            <Input
              id="address"
              value={settings?.address || ''}
              onChange={(e) => setSettings({...settings, address: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Footer Metni</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="footer_text">Footer Açıklaması</Label>
            <Textarea
              id="footer_text"
              rows={4}
              value={settings?.footer_text || ''}
              onChange={(e) => setSettings({...settings, footer_text: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={saving}
          className="bg-red-600 hover:bg-red-700"
          size="lg"
        >
          <Save className="w-5 h-5 mr-2" />
          {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
        </Button>
      </div>
    </div>
  );
};

export default SiteSettings;