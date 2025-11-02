import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">О компании WolfTerm</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Европейский производитель отопительного оборудования высочайшего качества. С 2016 года мы поставляем надежные решения для отопления и горячего водоснабжения.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle>Гарантия 5 лет</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Полная гарантия на все оборудование с бесплатным сервисным обслуживанием
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle>Европейское качество</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Производство на современном заводе с строгим контролем качества
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle>Опытная команда</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Профессиональная поддержка от проектирования до монтажа и обслуживания
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle>Широкая сеть</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Сервисные центры по всей России и странам СНГ
              </p>
            </CardContent>
          </Card>
        </div>

        {/* History */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800"
                alt="Производство"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-center mb-12">Наша история</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  WolfTerm была основана в 2016 году в Италии с целью создания высококачественного отопительного оборудования для европейского рынка.
                </p>
                <p>
                  Сегодня компания имеет современный завод в Турции, оснащенный новейшими технологиями, что позволяет нам производить широкий ассортимент оборудования.
                </p>
                <p>
                  Наша продукция представлена в России, странах СНГ и Европы, где мы зарекомендовали себя как надежный поставщик качественного оборудования.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Range */}
        <div className="bg-gray-50 rounded-lg p-12">
          <h2 className="text-4xl font-bold text-center mb-12">Наша продукция</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Газовые котлы</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Настенные и напольные газовые котлы с высоким КПД (до 95%) и гарантией 5 лет. Подходят для отопления квартир, домов и коммерческих помещений.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Бойлеры косвенного нагрева</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Бойлеры объемом от 100 до 3000 литров из нержавеющей стали и стали с эмалированным покрытием.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Радиаторы отопления</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Стальные панельные радиаторы с эффективной теплоотдачей и долгим сроком службы.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Аксессуары</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Wi-Fi модули управления, трубы Pe-Xa, насосы, коллекторы и другие комплектующие.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;