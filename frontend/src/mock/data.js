export const products = [
  {
    id: 1,
    name: 'WolfTerm 24 Varme',
    category: 'gas-boilers',
    price: 45900,
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800',
    description: 'Двухконтурный настенный газовый котел мощностью 24 кВт',
    power: '24 кВт',
    efficiency: '95%',
    warranty: '5 лет'
  },
  {
    id: 2,
    name: 'Модуль управления Wi-Fi',
    category: 'accessories',
    price: 8900,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800',
    description: 'Wi-Fi модуль управления котлом через мобильное приложение',
    features: ['SMS-оповещения', 'Режим по OpenTherm', 'Релейный режим']
  },
  {
    id: 3,
    name: 'WolfTerm 30 Varme',
    category: 'gas-boilers',
    price: 52900,
    image: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800',
    description: 'Двухконтурный настенный газовый котел мощностью 30 кВт',
    power: '30 кВт',
    efficiency: '95%',
    warranty: '5 лет'
  },
  {
    id: 4,
    name: 'INOX 800 Premium',
    category: 'boilers',
    price: 89900,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    description: 'Бойлер косвенного нагрева 800 литров с анодом',
    volume: '800 л',
    material: 'Нержавеющая сталь'
  },
  {
    id: 5,
    name: 'Труба Pe-Xa Evoh',
    category: 'pipes',
    price: 120,
    image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800',
    description: 'Труба для отопления Pe-Xa с кислородным барьером',
    size: '16-32 мм'
  },
  {
    id: 6,
    name: 'Радиатор стальной панельный',
    category: 'radiators',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1545259742-12f8c767e030?w=800',
    description: 'Стальной панельный радиатор отопления',
    type: 'Тип 22'
  }
];

export const heroSlides = [
  {
    id: 1,
    title: 'Модуль управления котлом Wi-Fi WolfTerm',
    subtitle: 'Круглосуточно из любой точки мира',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1920',
    link: '/catalog/accessories/wifi-module'
  },
  {
    id: 2,
    title: 'Газовые котлы с гарантией 5 лет',
    subtitle: 'Европейское качество, доступная цена',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1920',
    link: '/catalog/gas-boilers'
  },
  {
    id: 3,
    title: 'Бойлеры косвенного нагрева',
    subtitle: 'От 100 до 3000 литров',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920',
    link: '/catalog/boilers'
  }
];

export const reviews = [
  {
    id: 1,
    name: 'Александр Семенов',
    city: 'г. Москва',
    rating: 5,
    date: '2024-11-15',
    text: 'Достоинства: Отличный котёл, по привлекательной цене, за полтора года пользования ни разу не подвёл, при этом цена довольно таки не плохая, абсолютно бесшумен'
  },
  {
    id: 2,
    name: 'Алена Кузнецова',
    city: 'г. Екатеринбург',
    rating: 4,
    date: '2024-10-20',
    text: 'Достоинства: Быстро нагревается вода. Недостатки: немного шумный. Комментарий: Мне этот котел поставили недавно, в августе. Что особо понравилось? Скорость, с которой вода нагревается. Открываешь кран, и вода практически сразу идет горячая.'
  },
  {
    id: 3,
    name: 'Дмитрий Иванов',
    city: 'г. Санкт-Петербург',
    rating: 5,
    date: '2024-09-10',
    text: 'Отличное качество сборки, работает бесшумно, экономичный расход газа. Wi-Fi модуль очень удобный - можно управлять отоплением из любой точки.'
  }
];

export const categories = [
  {
    id: 'gas-boilers',
    name: 'Газовые котлы',
    nameEn: 'Gas Boilers',
    nameIt: 'Caldaie a Gas',
    nameTr: 'Gaz Kazanları',
    icon: '🔥',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600'
  },
  {
    id: 'boilers',
    name: 'Бойлеры',
    nameEn: 'Boilers',
    nameIt: 'Bollitori',
    nameTr: 'Sıcak Su Depoları',
    icon: '💧',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600'
  },
  {
    id: 'radiators',
    name: 'Радиаторы',
    nameEn: 'Radiators',
    nameIt: 'Radiatori',
    nameTr: 'Radyatörler',
    icon: '♨️',
    image: 'https://images.unsplash.com/photo-1545259742-12f8c767e030?w=600'
  },
  {
    id: 'pipes',
    name: 'Трубы',
    nameEn: 'Pipes',
    nameIt: 'Tubi',
    nameTr: 'Borular',
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600'
  },
  {
    id: 'accessories',
    name: 'Аксессуары',
    nameEn: 'Accessories',
    nameIt: 'Accessori',
    nameTr: 'Aksesuarlar',
    icon: '⚙️',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600'
  }
];

export const translations = {
  ru: {
    home: 'Главная',
    about: 'О компании',
    catalog: 'Каталог',
    support: 'Поддержка',
    videos: 'Видеообзоры',
    warranty: 'Гарантия и сервис',
    dealer: 'Стать дилером',
    equipment: 'Оборудование',
    auth: 'Авторизация',
    search: 'Поиск по каталогу товаров',
    find: 'Найти',
    reviews: 'Отзывы',
    readAll: 'Читать все отзывы',
    phone: '8 800 700 62 01',
    viewMore: 'Подробнее',
    featuredProducts: 'Популярные товары',
    viewAll: 'Смотреть все',
    productCatalog: 'Каталог продукции',
    models: 'Модели',
    details: 'Подробнее'
  },
  en: {
    home: 'Home',
    about: 'About',
    catalog: 'Catalog',
    support: 'Support',
    videos: 'Videos',
    warranty: 'Warranty & Service',
    dealer: 'Become a Dealer',
    equipment: 'Equipment',
    auth: 'Authorization',
    search: 'Search products',
    find: 'Search',
    reviews: 'Reviews',
    readAll: 'Read all reviews',
    phone: '8 800 700 62 01',
    viewMore: 'View More',
    featuredProducts: 'Featured Products',
    viewAll: 'View All',
    productCatalog: 'Product Catalog',
    models: 'Models',
    details: 'Details'
  },
  it: {
    home: 'Home',
    about: 'Chi Siamo',
    catalog: 'Catalogo',
    support: 'Supporto',
    videos: 'Video',
    warranty: 'Garanzia e Servizio',
    dealer: 'Diventa Rivenditore',
    equipment: 'Attrezzatura',
    auth: 'Accesso',
    search: 'Cerca prodotti',
    find: 'Cerca',
    reviews: 'Recensioni',
    readAll: 'Leggi tutte le recensioni',
    phone: '8 800 700 62 01',
    viewMore: 'Maggiori Informazioni',
    featuredProducts: 'Prodotti in Evidenza',
    viewAll: 'Vedi Tutti',
    productCatalog: 'Catalogo Prodotti',
    models: 'Modelli',
    details: 'Dettagli'
  },
  tr: {
    home: 'Ana Sayfa',
    about: 'Hakkımızda',
    catalog: 'Katalog',
    support: 'Destek',
    videos: 'Videolar',
    warranty: 'Garanti ve Servis',
    dealer: 'Bayi Ol',
    equipment: 'Ekipman',
    auth: 'Giriş',
    search: 'Ürün ara',
    find: 'Ara',
    reviews: 'Yorumlar',
    readAll: 'Tüm yorumları oku',
    phone: '8 800 700 62 01',
    viewMore: 'Daha Fazla',
    featuredProducts: 'Öne Çıkan Ürünler',
    viewAll: 'Tümünü Gör',
    productCatalog: 'Ürün Kataloğu',
    models: 'Modeller',
    details: 'Detaylar'
  }
};