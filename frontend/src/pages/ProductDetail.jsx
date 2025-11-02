import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products as mockProducts } from '../mock/data';
import { api } from '../services/api';
import { Heart, Share2, Phone, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useLanguage } from '../context/LanguageContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const [product, setProduct] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Translation helper
  const t = (key) => {
    const translations = {
      home: { tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', it: 'Home' },
      catalog: { tr: 'Katalog', en: 'Catalog', ru: 'Каталог', it: 'Catalogo' },
      notFound: { tr: 'Ürün bulunamadı', en: 'Product not found', ru: 'Товар не найден', it: 'Prodotto non trovato' },
      backToCatalog: { tr: 'Kataloğa Dön', en: 'Back to Catalog', ru: 'Вернуться в каталог', it: 'Torna al Catalogo' },
      selectModel: { tr: 'Model Seçin', en: 'Select Model', ru: 'Выберите модель', it: 'Seleziona Modello' },
      description: { tr: 'Açıklama', en: 'Description', ru: 'Описание', it: 'Descrizione' },
      technicalSpecs: { tr: 'Teknik Özellikler', en: 'Technical Specifications', ru: 'Технические характеристики', it: 'Specifiche Tecniche' },
      components: { tr: 'Kullanılan Komponentler', en: 'Components Used', ru: 'Используемые компоненты', it: 'Componenti Utilizzati' },
      contactUs: { tr: 'Bize Ulaşın', en: 'Contact Us', ru: 'Свяжитесь с нами', it: 'Contattaci' },
      
      // Technical specs translations
      rated_output_min: { tr: 'Min Çıkış Gücü', en: 'Min Rated Output', ru: 'Мин. номинальная мощность', it: 'Potenza nominale min' },
      rated_output_max: { tr: 'Max Çıkış Gücü', en: 'Max Rated Output', ru: 'Макс. номинальная мощность', it: 'Potenza nominale max' },
      heating_output_min: { tr: 'Min Isıtma Gücü', en: 'Min Heating Output', ru: 'Мин. мощность нагрева', it: 'Potenza riscaldamento min' },
      heating_output_max: { tr: 'Max Isıtma Gücü', en: 'Max Heating Output', ru: 'Макс. мощность нагрева', it: 'Potenza riscaldamento max' },
      efficiency: { tr: 'Verimlilik', en: 'Efficiency', ru: 'КПД', it: 'Efficienza' },
      nox_class: { tr: 'NOx Sınıfı', en: 'NOx Class', ru: 'Класс NOx', it: 'Classe NOx' },
      flue_gas_temp: { tr: 'Baca Gazı Sıcaklığı', en: 'Flue Gas Temperature', ru: 'Температура дымовых газов', it: 'Temperatura gas di scarico' },
      gas_flow_min: { tr: 'Min Gaz Akışı', en: 'Min Gas Flow', ru: 'Мин. расход газа', it: 'Flusso gas min' },
      gas_flow_max: { tr: 'Max Gaz Akışı', en: 'Max Gas Flow', ru: 'Макс. расход газа', it: 'Flusso gas max' },
      energy_class: { tr: 'Enerji Sınıfı', en: 'Energy Class', ru: 'Энергетический класс', it: 'Classe energetica' },
      net_weight: { tr: 'Net Ağırlık', en: 'Net Weight', ru: 'Вес нетто', it: 'Peso netto' },
      dimensions: { tr: 'Boyutlar', en: 'Dimensions', ru: 'Размеры', it: 'Dimensioni' },
      hot_water_temp_min: { tr: 'Min Sıcak Su Sıcaklığı', en: 'Min Hot Water Temp', ru: 'Мин. температура ГВС', it: 'Temp acqua calda min' },
      hot_water_temp_max: { tr: 'Max Sıcak Su Sıcaklığı', en: 'Max Hot Water Temp', ru: 'Макс. температура ГВС', it: 'Temp acqua calda max' },
      hot_water_flow: { tr: 'Sıcak Su Akışı', en: 'Hot Water Flow', ru: 'Расход ГВС', it: 'Flusso acqua calda' },
      water_pressure_min: { tr: 'Min Su Basıncı', en: 'Min Water Pressure', ru: 'Мин. давление воды', it: 'Pressione acqua min' },
      water_pressure_max: { tr: 'Max Su Basıncı', en: 'Max Water Pressure', ru: 'Макс. давление воды', it: 'Pressione acqua max' },
      operating_pressure_min: { tr: 'Min Çalışma Basıncı', en: 'Min Operating Pressure', ru: 'Мин. рабочее давление', it: 'Pressione esercizio min' },
      operating_pressure_max: { tr: 'Max Çalışma Basıncı', en: 'Max Operating Pressure', ru: 'Макс. рабочее давление', it: 'Pressione esercizio max' },
      expansion_vessel: { tr: 'Genleşme Tankı', en: 'Expansion Vessel', ru: 'Расширительный бак', it: 'Vaso espansione' },
      pump_head: { tr: 'Pompa Basıncı', en: 'Pump Head', ru: 'Напор насоса', it: 'Prevalenza pompa' },
      voltage: { tr: 'Voltaj', en: 'Voltage', ru: 'Напряжение', it: 'Tensione' },
      power_consumption: { tr: 'Güç Tüketimi', en: 'Power Consumption', ru: 'Потребляемая мощность', it: 'Consumo energia' },
      protection_class: { tr: 'Koruma Sınıfı', en: 'Protection Class', ru: 'Класс защиты', it: 'Classe protezione' },
      gas_pressure_min: { tr: 'Min Gaz Basıncı', en: 'Min Gas Pressure', ru: 'Мин. давление газа', it: 'Pressione gas min' },
      gas_pressure_max: { tr: 'Max Gaz Basıncı', en: 'Max Gas Pressure', ru: 'Макс. давление газа', it: 'Pressione gas max' },
      
      // Components translations
      gas_valve: { tr: 'Gaz Valfi', en: 'Gas Valve', ru: 'Газовый клапан', it: 'Valvola gas' },
      three_way_valve: { tr: '3 Yollu Valf', en: 'Three-way Valve', ru: 'Трехходовой клапан', it: 'Valvola a 3 vie' },
      heat_exchanger: { tr: 'Isı Eşanjörü', en: 'Heat Exchanger', ru: 'Теплообменник', it: 'Scambiatore calore' },
      fan: { tr: 'Fan', en: 'Fan', ru: 'Вентилятор', it: 'Ventilatore' },
      pump: { tr: 'Pompa', en: 'Pump', ru: 'Насос', it: 'Pompa' },
      expansion_tank: { tr: 'Genleşme Tankı', en: 'Expansion Tank', ru: 'Расширительный бак', it: 'Vaso espansione' },
      air_pressure_switch: { tr: 'Hava Basınç Anahtarı', en: 'Air Pressure Switch', ru: 'Реле давления воздуха', it: 'Pressostato aria' },
      hydraulic_assembly: { tr: 'Hidrolik Grup', en: 'Hydraulic Assembly', ru: 'Гидравлический узел', it: 'Gruppo idraulico' },
      control_panel: { tr: 'Kontrol Paneli', en: 'Control Panel', ru: 'Панель управления', it: 'Pannello controllo' },
      burner: { tr: 'Brülör', en: 'Burner', ru: 'Горелка', it: 'Bruciatore' },
      flue_thermostat: { tr: 'Baca Termostatı', en: 'Flue Thermostat', ru: 'Термостат дымохода', it: 'Termostato canna fumaria' }
    };
    return translations[key]?.[language] || key;
  };

  const getLocalizedText = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.tr || obj.en || '';
  };

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProduct(id);
        setProduct(data);
        if (data.models && data.models.length > 0) {
          setSelectedModel(data.models[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        const mockProduct = mockProducts.find(p => p.id === id);
        setProduct(mockProduct);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{t('notFound')}</h2>
          <Link to="/catalog">
            <Button className="bg-red-600 hover:bg-red-700">
              {t('backToCatalog')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const productName = getLocalizedText(product.name);
  const productDesc = getLocalizedText(product.description);
  const productImages = Array.isArray(product.images) ? product.images : [product.image];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8 text-gray-600">
          <Link to="/" className="hover:text-red-600 transition-colors">{t('home')}</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-red-600 transition-colors">{t('catalog')}</Link>
          <span>/</span>
          <span className="text-red-600">{productName}</span>
        </div>

        {/* Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
              <img
                src={productImages[selectedImageIndex]}
                alt={productName}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-red-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`${productName} ${index + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{productName}</h1>
            <p className="text-xl text-gray-600 mb-6">{productDesc}</p>

            {/* Model Selection */}
            {product.models && product.models.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">{t('selectModel')}</label>
                <Select 
                  value={selectedModel?.model_name} 
                  onValueChange={(value) => {
                    const model = product.models.find(m => m.model_name === value);
                    setSelectedModel(model);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('selectModel')} />
                  </SelectTrigger>
                  <SelectContent>
                    {product.models.map((model) => (
                      <SelectItem key={model.model_name} value={model.model_name}>
                        {model.model_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quick Specs */}
            {selectedModel && selectedModel.technical_specs && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{selectedModel.model_name} - {t('technicalSpecs')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedModel.technical_specs.efficiency && (
                      <div>
                        <p className="text-sm text-gray-600">{t('efficiency')}</p>
                        <p className="text-lg font-semibold">{selectedModel.technical_specs.efficiency}</p>
                      </div>
                    )}
                    {selectedModel.technical_specs.energy_class && (
                      <div>
                        <p className="text-sm text-gray-600">{t('energy_class')}</p>
                        <p className="text-lg font-semibold">{selectedModel.technical_specs.energy_class}</p>
                      </div>
                    )}
                    {selectedModel.technical_specs.net_weight && (
                      <div>
                        <p className="text-sm text-gray-600">{t('net_weight')}</p>
                        <p className="text-lg font-semibold">{selectedModel.technical_specs.net_weight}</p>
                      </div>
                    )}
                    {selectedModel.technical_specs.dimensions && (
                      <div>
                        <p className="text-sm text-gray-600">{t('dimensions')}</p>
                        <p className="text-lg font-semibold">{selectedModel.technical_specs.dimensions}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact CTA */}
            <div className="space-y-4">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-6">
                <Phone className="w-5 h-5 mr-2" />
                {t('contactUs')}
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">{t('description')}</TabsTrigger>
            {selectedModel && <TabsTrigger value="specs">{t('technicalSpecs')}</TabsTrigger>}
            {selectedModel && selectedModel.components && <TabsTrigger value="components">{t('components')}</TabsTrigger>}
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed">{productDesc}</p>
              </CardContent>
            </Card>
          </TabsContent>

          {selectedModel && (
            <TabsContent value="specs" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(selectedModel.technical_specs || {}).map(([key, value]) => {
                          if (!value) return null;
                          return (
                            <tr key={key} className="border-b">
                              <td className="py-3 px-4 font-medium text-gray-700">{t(key)}</td>
                              <td className="py-3 px-4">{value}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {selectedModel && selectedModel.components && (
            <TabsContent value="components" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedModel.components || {}).map(([key, value]) => {
                      if (!value) return null;
                      return (
                        <div key={key} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                          <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900">{t(key)}</p>
                            <p className="text-sm text-gray-600">{value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
