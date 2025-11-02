import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { adminApi } from '../../services/adminApi';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { toast } from 'sonner';
import { Edit, Trash2, Plus } from 'lucide-react';

const HeroSlidesManagement = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const data = await api.getHeroSlides();
      setSlides(data);
    } catch (error) {
      console.error('Error fetching slides:', error);
      toast.error('Slaylar yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const getSlideTitle = (slide) => {
    if (typeof slide.title === 'string') return slide.title;
    return slide.title?.tr || slide.title?.en || 'Başlık Yok';
  };

  const getSlideSubtitle = (slide) => {
    if (typeof slide.subtitle === 'string') return slide.subtitle;
    return slide.subtitle?.tr || slide.subtitle?.en || 'Alt Başlık Yok';
  };

  const handleEdit = (slide) => {
    setEditingSlide({ ...slide });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Slayı silmek istediğinizden emin misiniz?')) return;

    try {
      await adminApi.deleteHeroSlide(id);
      setSlides(slides.filter(s => s.id !== id));
      toast.success('Slay silindi');
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast.error('Slay silinemedi');
    }
  };

  const handleAddNew = () => {
    setEditingSlide({
      title: { tr: '', en: '', ru: '', it: '' },
      subtitle: { tr: '', en: '', ru: '', it: '' },
      image: '',
      link: '',
      order: slides.length + 1
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingSlide.id) {
        await adminApi.updateHeroSlide(editingSlide.id, editingSlide);
        setSlides(slides.map(s => s.id === editingSlide.id ? editingSlide : s));
        toast.success('Slay güncellendi');
      } else {
        const newSlide = await adminApi.createHeroSlide(editingSlide);
        setSlides([...slides, newSlide]);
        toast.success('Slay eklendi');
      }
      setIsDialogOpen(false);
      setEditingSlide(null);
    } catch (error) {
      console.error('Error saving slide:', error);
      toast.error('Slay kaydedilemedi');
    }
  };

  const updateSlideField = (field, value) => {
    setEditingSlide(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateSlideTitleLang = (lang, value) => {
    setEditingSlide(prev => ({
      ...prev,
      title: {
        ...prev.title,
        [lang]: value
      }
    }));
  };

  const updateSlideSubtitleLang = (lang, value) => {
    setEditingSlide(prev => ({
      ...prev,
      subtitle: {
        ...prev.subtitle,
        [lang]: value
      }
    }));
  };

  if (loading) {
    return <div className="p-8 text-center">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Hero Slider Yönetimi</h1>
          <p className="text-gray-600">Ana sayfa slider görselleri - Toplam {slides.length} slay</p>
        </div>
        <Button onClick={handleAddNew} className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Slay
        </Button>
      </div>

      {/* Slides List */}
      <div className="grid grid-cols-1 gap-6">
        {slides
          .sort((a, b) => a.order - b.order)
          .map((slide) => (
            <Card key={slide.id} className="overflow-hidden">
              <div className="flex">
                <img 
                  src={slide.image} 
                  alt={getSlideTitle(slide)}
                  className="w-64 h-48 object-cover"
                />
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{getSlideTitle(slide)}</h3>
                      <p className="text-gray-600 mb-2">{getSlideSubtitle(slide)}</p>
                      <p className="text-sm text-gray-500">Link: {slide.link}</p>
                      <p className="text-sm text-gray-500">Sıra: {slide.order}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(slide)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Düzenle
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(slide.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Sil
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSlide?.id ? 'Slayı Düzenle' : 'Yeni Slay Ekle'}
            </DialogTitle>
          </DialogHeader>

          {editingSlide && (
            <Tabs defaultValue="title" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="title">Başlık</TabsTrigger>
                <TabsTrigger value="subtitle">Alt Başlık</TabsTrigger>
                <TabsTrigger value="details">Detaylar</TabsTrigger>
              </TabsList>

              <TabsContent value="title" className="space-y-4">
                <div className="space-y-2">
                  <Label>Başlık (Çoklu Dil)</Label>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-gray-500">Türkçe</Label>
                      <Input
                        value={editingSlide.title?.tr || ''}
                        onChange={(e) => updateSlideTitleLang('tr', e.target.value)}
                        placeholder="Türkçe başlık"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">English</Label>
                      <Input
                        value={editingSlide.title?.en || ''}
                        onChange={(e) => updateSlideTitleLang('en', e.target.value)}
                        placeholder="English title"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Русский</Label>
                      <Input
                        value={editingSlide.title?.ru || ''}
                        onChange={(e) => updateSlideTitleLang('ru', e.target.value)}
                        placeholder="Заголовок"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Italiano</Label>
                      <Input
                        value={editingSlide.title?.it || ''}
                        onChange={(e) => updateSlideTitleLang('it', e.target.value)}
                        placeholder="Titolo"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="subtitle" className="space-y-4">
                <div className="space-y-2">
                  <Label>Alt Başlık (Çoklu Dil)</Label>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-gray-500">Türkçe</Label>
                      <Textarea
                        value={editingSlide.subtitle?.tr || ''}
                        onChange={(e) => updateSlideSubtitleLang('tr', e.target.value)}
                        placeholder="Türkçe alt başlık"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">English</Label>
                      <Textarea
                        value={editingSlide.subtitle?.en || ''}
                        onChange={(e) => updateSlideSubtitleLang('en', e.target.value)}
                        placeholder="English subtitle"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Русский</Label>
                      <Textarea
                        value={editingSlide.subtitle?.ru || ''}
                        onChange={(e) => updateSlideSubtitleLang('ru', e.target.value)}
                        placeholder="Подзаголовок"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Italiano</Label>
                      <Textarea
                        value={editingSlide.subtitle?.it || ''}
                        onChange={(e) => updateSlideSubtitleLang('it', e.target.value)}
                        placeholder="Sottotitolo"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div>
                  <Label>Görsel</Label>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          // Convert to base64
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            updateSlideField('image', reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="cursor-pointer"
                    />
                    <div className="text-xs text-gray-500">
                      Veya görsel URL'si girin:
                    </div>
                    <Input
                      value={editingSlide.image || ''}
                      onChange={(e) => updateSlideField('image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div>
                  <Label>Link (Tıklandığında gidilecek sayfa)</Label>
                  <Input
                    value={editingSlide.link || ''}
                    onChange={(e) => updateSlideField('link', e.target.value)}
                    placeholder="/catalog"
                  />
                </div>

                <div>
                  <Label>Sıralama (Küçük numara önce gösterilir)</Label>
                  <Input
                    type="number"
                    value={editingSlide.order || 0}
                    onChange={(e) => updateSlideField('order', parseInt(e.target.value) || 0)}
                    placeholder="1"
                  />
                </div>

                {editingSlide.image && (
                  <div>
                    <Label>Görsel Önizleme</Label>
                    <div className="mt-2 border rounded overflow-hidden">
                      <img 
                        src={editingSlide.image} 
                        alt="Preview" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroSlidesManagement;
