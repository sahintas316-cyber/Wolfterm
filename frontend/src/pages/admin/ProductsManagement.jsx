import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { adminApi } from '../../services/adminApi';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { toast } from 'sonner';
import { Edit, Trash2, Plus, Search, X } from 'lucide-react';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        api.getProducts(),
        api.getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Veriler yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (product) => {
    if (typeof product.name === 'string') return product.name;
    return product.name?.tr || product.name?.en || 'İsimsiz Ürün';
  };

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ürünü silmek istediğinizden emin misiniz?')) return;

    try {
      await adminApi.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      toast.success('Ürün silindi');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Ürün silinemedi');
    }
  };

  const handleAddNew = () => {
    setEditingProduct({
      name: { tr: '', en: '', ru: '', it: '' },
      description: { tr: '', en: '', ru: '', it: '' },
      category: '',
      images: [],
      models: []
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingProduct.id) {
        await adminApi.updateProduct(editingProduct.id, editingProduct);
        setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
        toast.success('Ürün güncellendi');
      } else {
        const newProduct = await adminApi.createProduct(editingProduct);
        setProducts([...products, newProduct]);
        toast.success('Ürün eklendi');
      }
      setIsDialogOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Ürün kaydedilemedi: ' + error.message);
    }
  };

  const updateProductField = (field, value) => {
    setEditingProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateProductNameLang = (lang, value) => {
    setEditingProduct(prev => ({
      ...prev,
      name: {
        ...prev.name,
        [lang]: value
      }
    }));
  };

  const updateProductDescLang = (lang, value) => {
    setEditingProduct(prev => ({
      ...prev,
      description: {
        ...prev.description,
        [lang]: value
      }
    }));
  };

  const addModel = () => {
    const newModel = {
      model_name: '',
      technical_specs: {},
      components: {}
    };
    setEditingProduct(prev => ({
      ...prev,
      models: [...(prev.models || []), newModel]
    }));
  };

  const removeModel = (index) => {
    setEditingProduct(prev => ({
      ...prev,
      models: prev.models.filter((_, i) => i !== index)
    }));
  };

  const updateModel = (index, field, value) => {
    setEditingProduct(prev => ({
      ...prev,
      models: prev.models.map((model, i) => 
        i === index ? { ...model, [field]: value } : model
      )
    }));
  };

  const addImage = () => {
    const url = prompt('Görsel URL\'si girin:');
    if (url) {
      setEditingProduct(prev => ({
        ...prev,
        images: [...(prev.images || []), url]
      }));
    }
  };

  const removeImage = (index) => {
    setEditingProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const filteredProducts = products.filter(product => {
    const productName = getProductName(product);
    return productName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return <div className="p-8 text-center">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ürün Yönetimi</h1>
          <p className="text-gray-600">Ürünleri ekleyin, düzenleyin ve silin</p>
        </div>
        <Button onClick={handleAddNew} className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Ürün
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Ürün ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const firstImage = Array.isArray(product.images) ? product.images[0] : product.image;
          const modelCount = product.models?.length || 0;
          
          return (
            <Card key={product.id}>
              <CardHeader>
                <div className="relative h-48 mb-4 rounded overflow-hidden bg-gray-100">
                  {firstImage ? (
                    <img src={firstImage} alt={getProductName(product)} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Görsel Yok
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg">{getProductName(product)}</CardTitle>
                <div className="text-sm text-gray-600">
                  {modelCount} Model • {product.category}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(product)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Düzenle
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(product.id)}
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Sil
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct?.id ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
            </DialogTitle>
          </DialogHeader>

          {editingProduct && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Temel Bilgiler</TabsTrigger>
                <TabsTrigger value="content">İçerik</TabsTrigger>
                <TabsTrigger value="models">Modeller</TabsTrigger>
                <TabsTrigger value="images">Görseller</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div>
                  <Label>Kategori</Label>
                  <Select
                    value={editingProduct.category}
                    onValueChange={(value) => updateProductField('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name || cat.nameTr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ürün Adı (Çoklu Dil)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-gray-500">Türkçe</Label>
                      <Input
                        value={editingProduct.name?.tr || ''}
                        onChange={(e) => updateProductNameLang('tr', e.target.value)}
                        placeholder="Türkçe isim"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">English</Label>
                      <Input
                        value={editingProduct.name?.en || ''}
                        onChange={(e) => updateProductNameLang('en', e.target.value)}
                        placeholder="English name"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Русский</Label>
                      <Input
                        value={editingProduct.name?.ru || ''}
                        onChange={(e) => updateProductNameLang('ru', e.target.value)}
                        placeholder="Название"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Italiano</Label>
                      <Input
                        value={editingProduct.name?.it || ''}
                        onChange={(e) => updateProductNameLang('it', e.target.value)}
                        placeholder="Nome italiano"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div className="space-y-2">
                  <Label>Açıklama (Çoklu Dil)</Label>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-gray-500">Türkçe</Label>
                      <Textarea
                        value={editingProduct.description?.tr || ''}
                        onChange={(e) => updateProductDescLang('tr', e.target.value)}
                        placeholder="Türkçe açıklama"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">English</Label>
                      <Textarea
                        value={editingProduct.description?.en || ''}
                        onChange={(e) => updateProductDescLang('en', e.target.value)}
                        placeholder="English description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Русский</Label>
                      <Textarea
                        value={editingProduct.description?.ru || ''}
                        onChange={(e) => updateProductDescLang('ru', e.target.value)}
                        placeholder="Описание"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Italiano</Label>
                      <Textarea
                        value={editingProduct.description?.it || ''}
                        onChange={(e) => updateProductDescLang('it', e.target.value)}
                        placeholder="Descrizione"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="models" className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Ürün Modelleri</Label>
                  <Button size="sm" onClick={addModel} variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Model Ekle
                  </Button>
                </div>

                {editingProduct.models?.map((model, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <Label className="font-semibold">Model {index + 1}</Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeModel(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Input
                        value={model.model_name || ''}
                        onChange={(e) => updateModel(index, 'model_name', e.target.value)}
                        placeholder="Model adı (örn: 24kW)"
                      />
                      <div className="text-xs text-gray-500 mt-2">
                        Teknik özellikler ve komponentler için gelişmiş düzenleme gerekiyor.
                        Şimdilik MongoDB veya seed script kullanın.
                      </div>
                    </div>
                  </Card>
                ))}

                {(!editingProduct.models || editingProduct.models.length === 0) && (
                  <div className="text-center py-8 text-gray-400">
                    Henüz model eklenmedi
                  </div>
                )}
              </TabsContent>

              <TabsContent value="images" className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Ürün Görselleri</Label>
                  <div className="flex gap-2">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Button type="button" size="sm" variant="outline" asChild>
                        <span>
                          <Plus className="w-4 h-4 mr-1" />
                          Dosyadan Seç
                        </span>
                      </Button>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditingProduct(prev => ({
                              ...prev,
                              images: [...(prev.images || []), reader.result]
                            }));
                            toast.success('Görsel eklendi');
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <Button size="sm" onClick={addImage} variant="outline">
                      <Plus className="w-4 h-4 mr-1" />
                      URL Ekle
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {editingProduct.images?.map((img, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded overflow-hidden bg-gray-100">
                        <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-contain" />
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {(!editingProduct.images || editingProduct.images.length === 0) && (
                  <div className="text-center py-8 text-gray-400">
                    Henüz görsel eklenmedi
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

export default ProductsManagement;
