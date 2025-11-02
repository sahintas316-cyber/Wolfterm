import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { heroSlides, products as mockProducts, reviews as mockReviews, categories as mockCategories } from '../mock/data';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Home = () => {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState([]);
  const [products, setProducts] = useState(mockProducts);
  const [reviews, setReviews] = useState(mockReviews);
  const [categories, setCategories] = useState(mockCategories);
  const [loading, setLoading] = useState(true);

  // Helper function to get localized text
  const getLocalizedText = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.tr || obj.en || '';
  };

  const getLocalizedName = (obj) => {
    if (typeof obj === 'string') return obj;
    const langMap = { tr: 'nameTr', en: 'nameEn', ru: 'name', it: 'nameIt' };
    return obj[langMap[language]] || obj.name || obj.tr || '';
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, reviewsData, categoriesData, heroData] = await Promise.all([
          api.getProducts(),
          api.getReviews(),
          api.getCategories(),
          api.getHeroSlides()
        ]);
        setProducts(productsData);
        setReviews(reviewsData);
        setCategories(categoriesData);
        setHeroSlides(heroData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Keep using mock data on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-advance slider
  useEffect(() => {
    if (!heroSlides || heroSlides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides]);

  const nextSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides && heroSlides.length > 0 ? (
          <>
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`
                  }}
                />
                <div className="relative container mx-auto px-4 h-full flex items-center">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-5xl font-bold mb-4 animate-fade-in">{getLocalizedText(slide.title)}</h1>
                    <p className="text-xl mb-8 opacity-90">{getLocalizedText(slide.subtitle)}</p>
                    <Link to={slide.link}>
                      <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6">
                        {t('viewMore')} <ArrowRight className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Slider Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-red-600 w-8' : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">WolfTerm Solutions</h1>
              <p className="text-xl mb-8">Avrupa kalitesinde ısıtma sistemleri</p>
              <Link to="/catalog">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6">
                  {t('viewMore')} <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t('productCatalog')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                      alt={getLocalizedName(category)}
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
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">{t('featuredProducts')}</h2>
            <Link to="/catalog">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                {t('viewAll')} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => {
              const productName = getLocalizedText(product.name);
              const productDesc = getLocalizedText(product.description);
              const firstImage = Array.isArray(product.images) ? product.images[0] : product.image;
              const modelCount = product.models?.length || 0;
              
              return (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
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
                    <div className="flex flex-wrap gap-2">
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
      </section>

      {/* Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t('reviews')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.city}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/reviews">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                {t('readAll')} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* VK Widget Placeholder */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-[#4a76a8] text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Присоединяйтесь к нам ВКонтакте</CardTitle>
                <CardDescription className="text-white/80">
                  Новости, акции и полезная информация об отоплении
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <span className="text-4xl">VK</span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Отопление || Газовые котлы WolfTerm</p>
                    <p className="text-sm opacity-80">563 подписчиков</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-white text-[#4a76a8] hover:bg-gray-100">
                  Подписаться
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;