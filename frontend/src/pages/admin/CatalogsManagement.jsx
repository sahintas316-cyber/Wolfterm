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
import { Edit, Trash2, Plus, FileText, Download } from 'lucide-react';

const CatalogsManagement = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCatalog, setEditingCatalog] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const data = await api.getCatalogs();
      setCatalogs(data);
    } catch (error) {
      console.error('Error fetching catalogs:', error);
      toast.error('Kataloglar yÃ¼klenemedi');
    } finally {
      setLoading(false);
    }
  };

  const getCatalogName = (catalog) => {
    if (typeof catalog.name === 'string') return catalog.name;
    return catalog.name?.tr || catalog.name?.en || 'Ä°simsiz Katalog';
  };

  const getCatalogDesc = (catalog) => {
    if (typeof catalog.description === 'string') return catalog.description;
    return catalog.description?.tr || catalog.description?.en || '';
  };

  const handleEdit = (catalog) => {
    setEditingCatalog({ ...catalog });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Katalogu silmek istediÄŸinizden emin misiniz?')) return;

    try {
      await adminApi.deleteCatalog(id);
      setCatalogs(catalogs.filter(c => c.id !== id));
      toast.success('Katalog silindi');
    } catch (error) {
      console.error('Error deleting catalog:', error);
      toast.error('Katalog silinemedi');
    }
  };

  const handleAddNew = () => {
    setEditingCatalog({
      name: { tr: '', en: '', ru: '', it: '' },
      description: { tr: '', en: '', ru: '', it: '' },
      file_url: '',
      thumbnail: '',
      file_size: '',
      order: catalogs.length + 1
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingCatalog.id) {
        const data = await adminApi.updateCatalog(editingCatalog.id, editingCatalog);
        setCatalogs(catalogs.map(c => c.id === editingCatalog.id ? data : c));
        toast.success('Katalog gÃ¼ncellendi');
      } else {
        const data = await adminApi.createCatalog(editingCatalog);
        setCatalogs([...catalogs, data]);
        toast.success('Katalog eklendi');
      }
      setIsDialogOpen(false);
      setEditingCatalog(null);
    } catch (error) {
      console.error('Error saving catalog:', error);
      toast.error('Katalog kaydedilemedi');
    }
  };

  const updateField = (field, value) => {
    setEditingCatalog(prev => ({ ...prev, [field]: value }));
  };

  const updateNameLang = (lang, value) => {
    setEditingCatalog(prev => ({
      ...prev,
      name: { ...prev.name, [lang]: value }
    }));
  };

  const updateDescLang = (lang, value) => {
    setEditingCatalog(prev => ({
      ...prev,
      description: { ...prev.description, [lang]: value }
    }));
  };

  if (loading) {
    return <div className="p-8 text-center">YÃ¼kleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Katalog YÃ¶netimi</h1>
          <p className="text-gray-600">Ä°ndirilebilir PDF kataloglar</p>
        </div>
        <Button onClick={handleAddNew} className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Katalog
        </Button>
      </div>

      {/* Catalogs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalogs.map((catalog) => (
          <Card key={catalog.id}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                {catalog.thumbnail ? (
                  <img src={catalog.thumbnail} alt={getCatalogName(catalog)} className="w-20 h-20 object-cover rounded" />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                    <FileText className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <CardTitle className="text-lg">{getCatalogName(catalog)}</CardTitle>
                  <p className="text-sm text-gray-500">{catalog.file_size || 'PDF'}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{getCatalogDesc(catalog)}</p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEdit(catalog)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  DÃ¼zenle
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.open(catalog.file_url, '_blank')}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Ä°ndir
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete(catalog.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {catalogs.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          HenÃ¼z katalog eklenmedi
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCatalog?.id ? 'Katalogu DÃ¼zenle' : 'Yeni Katalog Ekle'}
            </DialogTitle>
          </DialogHeader>

          {editingCatalog && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Temel Bilgiler</TabsTrigger>
                <TabsTrigger value="content">Ä°Ã§erik</TabsTrigger>
                <TabsTrigger value="file">Dosya</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <Label>Katalog AdÄ± (Ã‡oklu Dil)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-gray-500">TÃ¼rkÃ§e</Label>
                      <Input
                        value={editingCatalog.name?.tr || ''}
                        onChange={(e) => updateNameLang('tr', e.target.value)}
                        placeholder="TÃ¼rkÃ§e ad"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">English</Label>
                      <Input
                        value={editingCatalog.name?.en || ''}
                        onChange={(e) => updateNameLang('en', e.target.value)}
                        placeholder="English name"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Ğ ÑƒÑÑĞºĞ¸Ğ¹</Label>
                      <Input
                        value={editingCatalog.name?.ru || ''}
                        onChange={(e) => updateNameLang('ru', e.target.value)}
                        placeholder="ĞĞ°Ğ·Ğ²Ğ°Ğ½Ğ¸Ğµ"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Italiano</Label>
                      <Input
                        value={editingCatalog.name?.it || ''}
                        onChange={(e) => updateNameLang('it', e.target.value)}
                        placeholder="Nome"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Dosya Boyutu (opsiyonel)</Label>
                  <Input
                    value={editingCatalog.file_size || ''}
                    onChange={(e) => updateField('file_size', e.target.value)}
                    placeholder="Ã¶rn: 2.5 MB"
                  />
                </div>

                <div>
                  <Label>SÄ±ralama</Label>
                  <Input
                    type="number"
                    value={editingCatalog.order || 0}
                    onChange={(e) => updateField('order', parseInt(e.target.value) || 0)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div className="space-y-2">
                  <Label>AÃ§Ä±klama (Ã‡oklu Dil)</Label>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-gray-500">TÃ¼rkÃ§e</Label>
                      <Textarea
                        value={editingCatalog.description?.tr || ''}
                        onChange={(e) => updateDescLang('tr', e.target.value)}
                        placeholder="TÃ¼rkÃ§e aÃ§Ä±klama"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">English</Label>
                      <Textarea
                        value={editingCatalog.description?.en || ''}
                        onChange={(e) => updateDescLang('en', e.target.value)}
                        placeholder="English description"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Ğ ÑƒÑÑĞºĞ¸Ğ¹</Label>
                      <Textarea
                        value={editingCatalog.description?.ru || ''}
                        onChange={(e) => updateDescLang('ru', e.target.value)}
                        placeholder="ĞĞ¿Ğ¸ÑĞ°Ğ½Ğ¸Ğµ"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Italiano</Label>
                      <Textarea
                        value={editingCatalog.description?.it || ''}
                        onChange={(e) => updateDescLang('it', e.target.value)}
                        placeholder="Descrizione"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="file" className="space-y-4">
                <div>
                  <Label>PDF Dosya URL</Label>
                  <Input
                    value={editingCatalog.file_url || ''}
                    onChange={(e) => updateField('file_url', e.target.value)}
                    placeholder="https://example.com/catalog.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    PDF dosyanÄ±zÄ± bir hosting servise yÃ¼kleyip URL'sini buraya girin
                  </p>
                </div>

                <div>
                  <Label>Thumbnail</Label>
                  <div className="flex items-center gap-2">
                    <label htmlFor="catalog-thumb-upload" className="cursor-pointer">
                      <Button type="button" size="sm" variant="outline" asChild>
                        <span>Dosyadan Seç</span>
                      </Button>
                    </label>
                    <input
                      id="catalog-thumb-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const res = await adminApi.uploadImage(file);
                          updateField('thumbnail', res.url);
                          toast.success('Thumbnail yüklendi');
                        } catch (err) {
                          console.error(err);
                          toast.error('Thumbnail yüklenemedi');
                        }
                      }}
                    />
                    <Input
                      value={editingCatalog.thumbnail || ''}
                      onChange={(e) => updateField('thumbnail', e.target.value)}
                      placeholder="https://example.com/thumbnail.jpg"
                    />
                  </div>
                </div>

                {editingCatalog.thumbnail && (
                  <div>
                    <Label>Thumbnail Ã–nizleme</Label>
                    <div className="mt-2 border rounded overflow-hidden w-32 h-32">
                      <img 
                        src={editingCatalog.thumbnail} 
                        alt="Thumbnail" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
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

export default CatalogsManagement;


