import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products as mockProducts } from '../mock/data';
import { api } from '../services/api';
import { ShoppingCart, Heart, Share2, Phone, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        // Try to find in mock data
        const mockProduct = mockProducts.find(p => p.id === parseInt(id));
        setProduct(mockProduct);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Товар не найден</h2>
          <Link to="/catalog">
            <Button className="bg-red-600 hover:bg-red-700">
              Вернуться в каталог
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8 text-gray-600">
          <Link to="/" className="hover:text-red-600 transition-colors">Главная</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-red-600 transition-colors">Каталог</Link>
          <span>/</span>
          <span className="text-red-600">{product.name}</span>
        </div>

        {/* Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.warranty && (
                <Badge className="absolute top-4 right-4 bg-red-600 text-lg py-2 px-4">
                  Гарантия {product.warranty}
                </Badge>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{product.description}</p>

            {/* Specifications */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Характеристики</h3>
              <div className="space-y-3">
                {product.power && (
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Мощность:</span>
                    <span className="font-semibold">{product.power}</span>
                  </div>
                )}
                {product.efficiency && (
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-600">КПД:</span>
                    <span className="font-semibold">{product.efficiency}</span>
                  </div>
                )}
                {product.warranty && (
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Гарантия:</span>
                    <span className="font-semibold">{product.warranty}</span>
                  </div>
                )}
                {product.volume && (
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Объем:</span>
                    <span className="font-semibold">{product.volume}</span>
                  </div>
                )}
                {product.material && (
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Материал:</span>
                    <span className="font-semibold">{product.material}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price & Actions */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Цена:</p>
                  <p className="text-5xl font-bold text-red-600">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <Button size="lg" className="flex-1 bg-red-600 hover:bg-red-700 text-lg py-6">
                  <ShoppingCart className="mr-2" />
                  Заказать
                </Button>
                <Button size="lg" variant="outline" className="px-6">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-6">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">Бесплатная консультация</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Позвоните нашему специалисту для подбора оптимального решения
                  </p>
                  <a href="tel:88007006201" className="text-lg font-bold text-green-600">
                    8 800 700 62 01
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="description">Описание</TabsTrigger>
            <TabsTrigger value="specs">Характеристики</TabsTrigger>
            <TabsTrigger value="delivery">Доставка</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Описание товара</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Высокое европейское качество сборки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Надежность и долговечность</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Простота установки и обслуживания</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Экономичное энергопотребление</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="specs" className="mt-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Технические характеристики</h3>
                <div className="space-y-3">
                  {product.power && (
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-600">Мощность:</span>
                      <span className="font-semibold">{product.power}</span>
                    </div>
                  )}
                  {product.efficiency && (
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-600">КПД:</span>
                      <span className="font-semibold">{product.efficiency}</span>
                    </div>
                  )}
                  {product.warranty && (
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-gray-600">Гарантия:</span>
                      <span className="font-semibold">{product.warranty}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="delivery" className="mt-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Доставка и оплата</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Мы осуществляем доставку по всей России. Сроки доставки зависят от вашего местоположения.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Бесплатная доставка при заказе от 50 000 ₽</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Оплата наличными или безналичным расчетом</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Профессиональный монтаж</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;