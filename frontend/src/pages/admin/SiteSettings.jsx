import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { adminApi } from '../../services/adminApi';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { toast } from 'sonner';
import { Save, Globe, Mail, Share2, Search, FileText, Home, Palette } from 'lucide-react';

const SiteSettingsNew = () => {
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
      toast.error('Ayarlar yÃ¼klenemedi');
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
      toast.error('Bir hata oluÅŸtu');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const updateMultiLangField = (field, lang, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value
      }
    }));
  };

  if (loading) {
    return <div className="p-8 text-center">YÃ¼kleniyor...</div>;
  }

  if (!settings) {
    return <div className="p-8 text-center text-red-600">Ayarlar yÃ¼klenemedi</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Site AyarlarÄ±</h1>
          <p className="text-gray-600">TÃ¼m web sitesini buradan yÃ¶netin</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-red-600 hover:bg-red-700"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general">
            <Palette className="w-4 h-4 mr-2" />
            Genel
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="w-4 h-4 mr-2" />
            Ä°letiÅŸim
          </TabsTrigger>
          <TabsTrigger value="social">
            <Share2 className="w-4 h-4 mr-2" />
            Sosyal Medya
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Search className="w-4 h-4 mr-2" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="footer">
            <FileText className="w-4 h-4 mr-2" />
            Footer
          </TabsTrigger>
          <TabsTrigger value="about">
            <Globe className="w-4 h-4 mr-2" />
            HakkÄ±mÄ±zda
          </TabsTrigger>
          <TabsTrigger value="homepage">
            <Home className="w-4 h-4 mr-2" />
            Ana Sayfa
          </TabsTrigger>
        </TabsList>

        {/* GENERAL SETTINGS */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Genel Ayarlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Site AdÄ± (Ã‡oklu Dil)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['tr', 'en', 'ru', 'it'].map(lang => (
                    <div key={lang}>
                      <Label className="text-xs text-gray-500 capitalize">{lang}</Label>
                      <Input
                        value={settings.site_name?.[lang] || ''}
                        onChange={(e) => updateMultiLangField('site_name', lang, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Logo</Label>
                <div className="flex items-center gap-2">
                  <label htmlFor="site-logo-upload" className="cursor-pointer">
                    <Button type="button" size="sm" variant="outline" asChild>
                      <span>Dosyadan Seç</span>
                    </Button>
                  </label>
                  <input
                    id="site-logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const res = await adminApi.uploadImage(file);
                        updateField('logo_url', res.url);
                        toast.success('Logo yüklendi');
                      } catch (err) {
                        console.error(err);
                        toast.error('Logo yüklenemedi');
                      }
                    }}
                  />
                  <Input
                    value={settings.logo_url || ''}
                    onChange={(e) => updateField('logo_url', e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                {settings.logo_url && (
                  <img src={settings.logo_url} alt="Logo" className="mt-2 h-16 object-contain" />
                )}
              </div>

              <div>
                <Label>Favicon</Label>
                <div className="flex items-center gap-2">
                  <label htmlFor="site-favicon-upload" className="cursor-pointer">
                    <Button type="button" size="sm" variant="outline" asChild>
                      <span>Dosyadan Seç</span>
                    </Button>
                  </label>
                  <input
                    id="site-favicon-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const res = await adminApi.uploadImage(file);
                        updateField('favicon_url', res.url);
                        toast.success('Favicon yüklendi');
                      } catch (err) {
                        console.error(err);
                        toast.error('Favicon yüklenemedi');
                      }
                    }}
                  />
                  <Input
                    value={settings.favicon_url || ''}
                    onChange={(e) => updateField('favicon_url', e.target.value)}
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Ana Renk (Primary Color)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.primary_color || '#dc2626'}
                      onChange={(e) => updateField('primary_color', e.target.value)}
                      className="w-20"
                    />
                    <Input
                      value={settings.primary_color || '#dc2626'}
                      onChange={(e) => updateField('primary_color', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Ä°kincil Renk (Secondary Color)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.secondary_color || '#1f2937'}
                      onChange={(e) => updateField('secondary_color', e.target.value)}
                      className="w-20"
                    />
                    <Input
                      value={settings.secondary_color || '#1f2937'}
                      onChange={(e) => updateField('secondary_color', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CONTACT INFO */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ä°letiÅŸim Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={settings.contact_email || ''}
                  onChange={(e) => updateField('contact_email', e.target.value)}
                  placeholder="info@wolfterm.com"
                />
              </div>

              <div>
                <Label>Telefon</Label>
                <Input
                  value={settings.contact_phone || ''}
                  onChange={(e) => updateField('contact_phone', e.target.value)}
                  placeholder="+90 XXX XXX XX XX"
                />
              </div>

              <div className="space-y-2">
                <Label>Adres (Ã‡oklu Dil)</Label>
                <div className="space-y-2">
                  {['tr', 'en', 'ru', 'it'].map(lang => (
                    <div key={lang}>
                      <Label className="text-xs text-gray-500 capitalize">{lang}</Label>
                      <Textarea
                        value={typeof settings.contact_address === 'object' ? settings.contact_address?.[lang] : settings.contact_address}
                        onChange={(e) => updateMultiLangField('contact_address', lang, e.target.value)}
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Google Maps URL (Embed)</Label>
                <Input
                  value={settings.contact_map_url || ''}
                  onChange={(e) => updateField('contact_map_url', e.target.value)}
                  placeholder="https://www.google.com/maps/embed?..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SOCIAL MEDIA */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sosyal Medya Linkleri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'social_facebook', label: 'Facebook', placeholder: 'https://facebook.com/...' },
                { key: 'social_instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
                { key: 'social_twitter', label: 'Twitter/X', placeholder: 'https://twitter.com/...' },
                { key: 'social_linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/...' },
                { key: 'social_youtube', label: 'YouTube', placeholder: 'https://youtube.com/...' },
                { key: 'social_vk', label: 'VKontakte', placeholder: 'https://vk.com/...' },
                { key: 'social_whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/...' }
              ].map(social => (
                <div key={social.key}>
                  <Label>{social.label}</Label>
                  <Input
                    value={settings[social.key] || ''}
                    onChange={(e) => updateField(social.key, e.target.value)}
                    placeholder={social.placeholder}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO SETTINGS */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO AyarlarÄ±</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Title (Ã‡oklu Dil)</Label>
                {['tr', 'en', 'ru', 'it'].map(lang => (
                  <div key={lang}>
                    <Label className="text-xs text-gray-500 capitalize">{lang}</Label>
                    <Input
                      value={typeof settings.meta_title === 'object' ? settings.meta_title?.[lang] : settings.meta_title}
                      onChange={(e) => updateMultiLangField('meta_title', lang, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Meta Description (Ã‡oklu Dil)</Label>
                {['tr', 'en', 'ru', 'it'].map(lang => (
                  <div key={lang}>
                    <Label className="text-xs text-gray-500 capitalize">{lang}</Label>
                    <Textarea
                      value={typeof settings.meta_description === 'object' ? settings.meta_description?.[lang] : settings.meta_description}
                      onChange={(e) => updateMultiLangField('meta_description', lang, e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
              </div>

              <div>
                <Label>Google Analytics ID</Label>
                <Input
                  value={settings.google_analytics_id || ''}
                  onChange={(e) => updateField('google_analytics_id', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FOOTER SETTINGS */}
        <TabsContent value="footer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Footer AyarlarÄ±</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Footer Metni (Ã‡oklu Dil)</Label>
                {['tr', 'en', 'ru', 'it'].map(lang => (
                  <div key={lang}>
                    <Label className="text-xs text-gray-500 capitalize">{lang}</Label>
                    <Textarea
                      value={typeof settings.footer_text === 'object' ? settings.footer_text?.[lang] : settings.footer_text}
                      onChange={(e) => updateMultiLangField('footer_text', lang, e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Copyright Metni (Ã‡oklu Dil)</Label>
                {['tr', 'en', 'ru', 'it'].map(lang => (
                  <div key={lang}>
                    <Label className="text-xs text-gray-500 capitalize">{lang}</Label>
                    <Input
                      value={typeof settings.footer_copyright === 'object' ? settings.footer_copyright?.[lang] : settings.footer_copyright}
                      onChange={(e) => updateMultiLangField('footer_copyright', lang, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABOUT PAGE */}
        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>HakkÄ±mÄ±zda SayfasÄ±</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>BaÅŸlÄ±k (Ã‡oklu Dil)</Label>
                {['tr', 'en', 'ru', 'it'].map(lang => (
                  <div key={lang}>
                    <Label className="text-xs text-gray-500 capitalize">{lang}</Label>
                    <Input
                      value={typeof settings.about_title === 'object' ? settings.about_title?.[lang] : settings.about_title}
                      onChange={(e) => updateMultiLangField('about_title', lang, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Ä°Ã§erik (Ã‡oklu Dil)</Label>
                {['tr', 'en', 'ru', 'it'].map(lang => (
                  <div key={lang}>
                    <Label className="text-xs text-gray-500 capitalize">{lang}</Label>
                    <Textarea
                      value={typeof settings.about_content === 'object' ? settings.about_content?.[lang] : settings.about_content}
                      onChange={(e) => updateMultiLangField('about_content', lang, e.target.value)}
                      rows={6}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HOMEPAGE */}
        <TabsContent value="homepage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ana Sayfa AyarlarÄ±</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <p className="font-medium">Ã–zellikler BÃ¶lÃ¼mÃ¼</p>
                    <p className="text-sm text-gray-500">Hero altÄ±ndaki Ã¶zellikler bÃ¶lÃ¼mÃ¼nÃ¼ gÃ¶ster/gizle</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.features_section_visible !== false}
                    onChange={(e) => updateField('features_section_visible', e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <p className="font-medium">ÃœrÃ¼nler BÃ¶lÃ¼mÃ¼</p>
                    <p className="text-sm text-gray-500">Ã–ne Ã§Ä±kan Ã¼rÃ¼nler bÃ¶lÃ¼mÃ¼nÃ¼ gÃ¶ster/gizle</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.products_section_visible !== false}
                    onChange={(e) => updateField('products_section_visible', e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <p className="font-medium">Yorumlar BÃ¶lÃ¼mÃ¼</p>
                    <p className="text-sm text-gray-500">MÃ¼ÅŸteri yorumlarÄ± bÃ¶lÃ¼mÃ¼nÃ¼ gÃ¶ster/gizle</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.reviews_section_visible !== false}
                    onChange={(e) => updateField('reviews_section_visible', e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-red-600 hover:bg-red-700"
          size="lg"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Kaydediliyor...' : 'TÃ¼m AyarlarÄ± Kaydet'}
        </Button>
      </div>
    </div>
  );
};

export default SiteSettingsNew;


