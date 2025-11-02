import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products as mockProducts, categories as mockCategories } from '../mock/data';
import { api } from '../services/api';
import { Filter, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useLanguage } from '../context/LanguageContext';

const Catalog = () => {
  const { categoryId } = useParams();
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [products, setProducts] = useState(mockProducts);
  const [categories, setCategories] = useState(mockCategories);
  const [loading, setLoading] = useState(true);

  // Translation helper
  const t = (key) => {
    const translations = {
      home: { tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', it: 'Home' },
      catalog: { tr: 'Katalog', en: 'Catalog', ru: 'Каталог', it: 'Catalogo' },
      allProducts: { tr: 'Tüm Ürünler', en: 'All Products', ru: 'Все товары', it: 'Tutti i Prodotti' },
      found: { tr: 'Bulundu', en: 'Found', ru: 'Найдено', it: 'Trovato' },
      products: { tr: 'ürün', en: 'products', ru: 'товаров', it: 'prodotti' },
      sortBy: { tr: 'Sıralama', en: 'Sort by', ru: 'Сортировка', it: 'Ordina per' },
      popular: { tr: 'Popülerliğe göre', en: 'By popularity', ru: 'По популярности', it: 'Per popolarità' },
      name: { tr: 'İsme göre', en: 'By name', ru: 'По названию', it: 'Per nome' },
      details: { tr: 'Detaylar', en: 'Details', ru: 'Подробнее', it: 'Dettagli' },
      models: { tr: 'Modeller', en: 'Models', ru: 'Модели', it: 'Modelli' }
    };
    return translations[key]?.[language] || key;
  };

  // Get localized name
  const getLocalizedName = (obj) => {
    if (typeof obj === 'string') return obj;
    const langMap = { tr: 'nameTr', en: 'nameEn', ru: 'name', it: 'nameIt' };
    return obj[langMap[language]] || obj.name || obj.tr || '';
  };

  const getLocalizedText = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.tr || obj.en || '';
  };

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          categoryId ? api.getProducts(categoryId) : api.getProducts(),
          api.getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Keep using mock data on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const filteredProducts = categoryId
    ? products.filter(p => p.category === categoryId)
    : products;

  const currentCategory = categories.find(c => c.id === categoryId);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8 text-gray-600">
          <Link to="/" className="hover:text-red-600 transition-colors">{t('home')}</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-red-600 transition-colors">{t('catalog')}</Link>
          {currentCategory && (
            <>
              <span>/</span>
              <span className="text-red-600">{getLocalizedName(currentCategory)}</span>
            </>
          )}
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            {currentCategory ? getLocalizedName(currentCategory) : t('allProducts')}
          </h1>
        </div>

        {/* Categories Grid */}
        {!categoryId && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/catalog/${category.id}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <h3 className="text-xl font-semibold">{getLocalizedName(category)}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Toolbar */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-600">
              {t('found')}: {filteredProducts.length} {t('products')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('sortBy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">{t('popular')}</SelectItem>
                <SelectItem value="name">{t('name')}</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => {
            const productName = getLocalizedText(product.name);
            const productDesc = getLocalizedText(product.description);
            const firstImage = Array.isArray(product.images) ? product.images[0] : product.image;
            const modelCount = product.models?.length || 0;
            
            return (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className={`relative overflow-hidden ${
                  viewMode === 'grid' ? 'h-64' : 'h-48 md:w-64 md:float-left md:mr-6'
                }`}>
                  <img
                    src={firstImage}
                    alt={productName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {modelCount > 0 && (
                    <Badge className="absolute top-4 right-4 bg-red-600">
                      {modelCount} {t('models')}
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{productName}</CardTitle>
                  <CardDescription className="line-clamp-2">{productDesc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.models && product.models.length > 0 && (
                      <Badge variant="secondary">
                        {product.models.map(m => m.model_name).join(', ')}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/product/${product.id}`} className="w-full">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      {t('details')}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Catalog;