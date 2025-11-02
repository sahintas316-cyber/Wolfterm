import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { adminApi } from '../../services/adminApi';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';
import { Edit, Trash2, Plus } from 'lucide-react';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Kategoriler yÃ¼klenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Kategoriyi silmek istediÄŸinizden emin misiniz?')) return;

    try {
      await adminApi.deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
      toast.success('Kategori silindi');
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Kategori silinemedi');
    }
  };

  const handleSave = async () => {
    try {
      if (editingCategory.id && categories.find(c => c.id === editingCategory.id)) {
        await adminApi.updateCategory(editingCategory.id, editingCategory);
        setCategories(categories.map(c => c.id === editingCategory.id ? editingCategory : c));
        toast.success('Kategori gÃ¼ncellendi');
      } else {
        await adminApi.createCategory(editingCategory);
        setCategories([...categories, editingCategory]);
        toast.success('Kategori eklendi');
      }
      setIsDialogOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Kategori kaydedilemedi');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">YÃ¼kleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Kategori YÃ¶netimi</h1>
          <p className="text-gray-600">Toplam {categories.length} kategori</p>
        </div>
        <Button 
          onClick={() => {
            setEditingCategory({
              id: '',
              name: '',
              nameEn: '',
              nameIt: '',
              nameTr: '',
              icon: '',
              image: ''
            });
            setIsDialogOpen(true);
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Kategori
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <img 
              src={category.image} 
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4 text-sm">
                <p><strong>EN:</strong> {category.nameEn}</p>
                <p><strong>IT:</strong> {category.nameIt}</p>
                <p><strong>TR:</strong> {category.nameTr}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(category)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  DÃ¼zenle
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingCategory?.id && categories.find(c => c.id === editingCategory.id) ? 'Kategori DÃ¼zenle' : 'Yeni Kategori Ekle'}
            </DialogTitle>
            <DialogDescription>
              Kategori bilgilerini girin ve kaydedin.
            </DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="id">Kategori ID</Label>
                <Input
                  id="id"
                  value={editingCategory.id}
                  onChange={(e) => setEditingCategory({...editingCategory, id: e.target.value})}
                  placeholder="gas-boilers"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Ad (RU)</Label>
                  <Input
                    id="name"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nameEn">Ad (EN)</Label>
                  <Input
                    id="nameEn"
                    value={editingCategory.nameEn}
                    onChange={(e) => setEditingCategory({...editingCategory, nameEn: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nameIt">Ad (IT)</Label>
                  <Input
                    id="nameIt"
                    value={editingCategory.nameIt}
                    onChange={(e) => setEditingCategory({...editingCategory, nameIt: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nameTr">Ad (TR)</Label>
                  <Input
                    id="nameTr"
                    value={editingCategory.nameTr}
                    onChange={(e) => setEditingCategory({...editingCategory, nameTr: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="icon">Ä°kon</Label>
                  <Input
                    id="icon"
                    value={editingCategory.icon}
                    onChange={(e) => setEditingCategory({...editingCategory, icon: e.target.value})}
                    placeholder="ğŸ”¥"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">GÃ¶rsel URL</Label>
                  <Input
                    id="image"
                    value={editingCategory.image}
                    onChange={(e) => setEditingCategory({...editingCategory, image: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Ä°ptal
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

export default CategoriesManagement;
