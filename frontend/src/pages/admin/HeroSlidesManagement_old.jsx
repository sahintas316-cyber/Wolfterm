import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/adminApi';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';
import { Edit, Trash2, Plus, MoveUp, MoveDown } from 'lucide-react';

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
      const data = await adminApi.getHeroSlides();
      setSlides(data);
    } catch (error) {
      console.error('Error fetching slides:', error);
      toast.error('Slaylar yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (slide) => {
    setEditingSlide(slide);
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

  const handleSave = async () => {
    try {
      if (editingSlide.id && slides.find(s => s.id === editingSlide.id)) {
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

  if (loading) {
    return <div className="p-8 text-center">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Hero Slider Yönetimi</h1>
          <p className="text-gray-600">Toplam {slides.length} slay</p>
        </div>
        <Button 
          onClick={() => {
            setEditingSlide({
              title: '',
              subtitle: '',
              image: '',
              link: '',
              order: slides.length
            });
            setIsDialogOpen(true);
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Slay
        </Button>
      </div>

      {/* Slides List */}
      <div className="grid grid-cols-1 gap-6">
        {slides.map((slide) => (
          <Card key={slide.id} className="overflow-hidden">
            <div className="flex">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-64 h-48 object-cover"
              />
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                    <p className="text-gray-600 mb-2">{slide.subtitle}</p>
                    <p className="text-sm text-gray-500">Link: {slide.link}</p>
                    <p className="text-sm text-gray-500">Sıra: {slide.order}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(slide)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(slide.id)}
                    >
                      <Trash2 className="w-4 h-4" />
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingSlide?.id && slides.find(s => s.id === editingSlide.id) ? 'Slay Düzenle' : 'Yeni Slay Ekle'}
            </DialogTitle>
            <DialogDescription>
              Hero slider için slay bilgilerini girin.
            </DialogDescription>
          </DialogHeader>
          {editingSlide && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Başlık</Label>
                <Input
                  id="title"
                  value={editingSlide.title}
                  onChange={(e) => setEditingSlide({...editingSlide, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subtitle">Alt Başlık</Label>
                <Input
                  id="subtitle"
                  value={editingSlide.subtitle}
                  onChange={(e) => setEditingSlide({...editingSlide, subtitle: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Görsel URL</Label>
                <Input
                  id="image"
                  value={editingSlide.image}
                  onChange={(e) => setEditingSlide({...editingSlide, image: e.target.value})}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  value={editingSlide.link}
                  onChange={(e) => setEditingSlide({...editingSlide, link: e.target.value})}
                  placeholder="/catalog/gas-boilers"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="order">Sıralama</Label>
                <Input
                  id="order"
                  type="number"
                  value={editingSlide.order}
                  onChange={(e) => setEditingSlide({...editingSlide, order: parseInt(e.target.value)})}
                />
              </div>
            </div>
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