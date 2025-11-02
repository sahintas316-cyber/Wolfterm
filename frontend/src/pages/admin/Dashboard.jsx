import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Package, MessageSquare, Grid3X3, Image } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_products: 0,
    total_reviews: 0,
    total_categories: 0,
    total_hero_slides: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [products, reviews, categories, heroSlides] = await Promise.all([
        api.getProducts(),
        api.getReviews(),
        api.getCategories(),
        api.getHeroSlides()
      ]);
      
      setStats({
        total_products: products.length,
        total_reviews: reviews.length,
        total_categories: categories.length,
        total_hero_slides: heroSlides.length
      });
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      toast.error('Dashboard verileri yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Hoş geldiniz! İşte sistemin genel durumu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ürün</CardTitle>
            <Package className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total_products}</div>
            <p className="text-xs text-gray-500 mt-1">Aktif ürünler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Yorum</CardTitle>
            <MessageSquare className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total_reviews}</div>
            <p className="text-xs text-gray-500 mt-1">Müşteri yorumları</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kategoriler</CardTitle>
            <Grid3X3 className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total_categories}</div>
            <p className="text-xs text-gray-500 mt-1">Ürün kategorileri</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hero Slides</CardTitle>
            <Image className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total_hero_slides}</div>
            <p className="text-xs text-gray-500 mt-1">Ana sayfa sliderları</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sistem Bilgisi</CardTitle>
          <CardDescription>WolfTerm Admin Paneli v2.0</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>✅ Çoklu dil desteği (TR, EN, RU, IT)</p>
            <p>✅ Model bazlı ürün yönetimi</p>
            <p>✅ Teknik özellikler ve komponentler</p>
            <p>✅ Görsel yönetimi</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
