import uuid
from datetime import datetime

async def seed_database(db):
    """Seed the database with WolfTerm boiler products"""
    
    # Clear existing collections
    await db.products.delete_many({})
    await db.categories.delete_many({})
    await db.hero_slides.delete_many({})
    await db.reviews.delete_many({})
    
    # Categories data
    categories = [
        {
            "id": "non-condensing",
            "name": "Yoğuşmasız Kombiler",
            "nameEn": "Non-Condensing Boilers",
            "nameRu": "Обычные Котлы",
            "nameIt": "Caldaie Non Condensanti",
            "nameTr": "Yoğuşmasız Kombiler",
            "icon": "🔥",
            "image": "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800"
        },
        {
            "id": "condensing",
            "name": "Yoğuşmalı Kombiler",
            "nameEn": "Condensing Boilers",
            "nameRu": "Конденсационные Котлы",
            "nameIt": "Caldaie a Condensazione",
            "nameTr": "Yoğuşmalı Kombiler",
            "icon": "⚡",
            "image": "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800"
        }
    ]
    
    await db.categories.insert_many(categories)
    
    # Products data with multi-language support and models
    products = [
        # WOLFPREMIUM SERIES
        {
            "id": str(uuid.uuid4()),
            "name": {
                "tr": "WOLFPREMIUM Serisi Yoğuşmasız Kombi",
                "en": "WOLFPREMIUM Series Non-Condensing Combi Boiler",
                "ru": "Серия WOLFPREMIUM Обычный Котел",
                "it": "Serie WOLFPREMIUM Caldaia Non Condensante"
            },
            "category": "non-condensing",
            "images": [
                "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/zm1l7gi4_WOLFPREM%C4%B0UM1.jpg",
                "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/kb318b1d_WOLFPREM%C4%B0UM2.jpg"
            ],
            "description": {
                "tr": "WOLFPREMIUM serisi yoğuşmasız kombiler, modern tasarımı ve yüksek performansıyla her türlü alana kolay adaptasyon sağlar. 10 kademeli kontrol sistemi ile güvenli, güvenilir ve uzun ömürlü çalışma sunar.",
                "en": "The WOLFPREMIUM series non-condensing combi boilers are designed for easy adaptation to any space with their modern design and high performance. They offer safe, reliable, and long-lasting operation with a 10-level control system.",
                "ru": "Серия WOLFPREMIUM предлагает легкую адаптацию к любому пространству благодаря современному дизайну и высокой производительности. Обеспечивает безопасную и надежную работу с 10-уровневой системой управления.",
                "it": "La serie WOLFPREMIUM è progettata per un facile adattamento a qualsiasi spazio con il suo design moderno e le alte prestazioni. Offre un funzionamento sicuro, affidabile e duraturo con un sistema di controllo a 10 livelli."
            },
            "models": [
                {
                    "model_name": "18kW",
                    "technical_specs": {
                        "rated_output_min": "9.4 kW",
                        "rated_output_max": "20.3 kW",
                        "heating_output_min": "8.2 kW",
                        "heating_output_max": "18.5 kW",
                        "efficiency": "92%",
                        "nox_class": "3",
                        "flue_gas_temp": "138°C",
                        "gas_flow_min": "0.9 m³/h",
                        "gas_flow_max": "2.3 m³/h",
                        "energy_class": "B",
                        "net_weight": "29.2 kg",
                        "dimensions": "710 x 410 x 260 mm",
                        "hot_water_temp_min": "35°C",
                        "hot_water_temp_max": "60°C",
                        "hot_water_flow": "11.4 l/min",
                        "water_pressure_min": "0.5 bar",
                        "water_pressure_max": "10 bar",
                        "operating_pressure_min": "0.5 bar",
                        "operating_pressure_max": "3 bar",
                        "expansion_vessel": "8 L",
                        "pump_head": "6 M",
                        "voltage": "230V/50Hz",
                        "power_consumption": "128 W",
                        "protection_class": "IP42"
                    },
                    "components": {
                        "gas_valve": "SIT / Honeywell",
                        "three_way_valve": "ELBI",
                        "heat_exchanger": "VALMEX / CONDEVO",
                        "fan": "FIME / SIT",
                        "pump": "GRUNDFOS",
                        "expansion_tank": "Onaysan",
                        "air_pressure_switch": "HUBA",
                        "hydraulic_assembly": "ARCELL",
                        "control_panel": "ENPI / SIEMENS"
                    }
                },
                {
                    "model_name": "24kW",
                    "technical_specs": {
                        "rated_output_min": "9.4 kW",
                        "rated_output_max": "24.3 kW",
                        "heating_output_min": "8.2 kW",
                        "heating_output_max": "23.1 kW",
                        "efficiency": "92%",
                        "nox_class": "3",
                        "flue_gas_temp": "138°C",
                        "gas_flow_min": "0.9 m³/h",
                        "gas_flow_max": "2.76 m³/h",
                        "energy_class": "B",
                        "net_weight": "29.2 kg",
                        "dimensions": "710 x 410 x 260 mm",
                        "hot_water_temp_min": "35°C",
                        "hot_water_temp_max": "60°C",
                        "hot_water_flow": "11.4 l/min",
                        "water_pressure_min": "0.5 bar",
                        "water_pressure_max": "10 bar",
                        "operating_pressure_min": "0.5 bar",
                        "operating_pressure_max": "3 bar",
                        "expansion_vessel": "8 L",
                        "pump_head": "6 M",
                        "voltage": "230V/50Hz",
                        "power_consumption": "128 W",
                        "protection_class": "IP42"
                    },
                    "components": {
                        "gas_valve": "SIT / Honeywell",
                        "three_way_valve": "ELBI",
                        "heat_exchanger": "VALMEX / CONDEVO",
                        "fan": "FIME / SIT",
                        "pump": "GRUNDFOS",
                        "expansion_tank": "Onaysan",
                        "air_pressure_switch": "HUBA",
                        "hydraulic_assembly": "ARCELL",
                        "control_panel": "ENPI / SIEMENS"
                    }
                },
                {
                    "model_name": "32kW",
                    "technical_specs": {
                        "rated_output_min": "13 kW",
                        "rated_output_max": "33.3 kW",
                        "heating_output_min": "11.4 kW",
                        "heating_output_max": "29.9 kW",
                        "efficiency": "92%",
                        "nox_class": "3",
                        "flue_gas_temp": "158°C",
                        "gas_flow_min": "1.2 m³/h",
                        "gas_flow_max": "3.7 m³/h",
                        "energy_class": "B",
                        "net_weight": "34.3 kg",
                        "dimensions": "710 x 410 x 350 mm",
                        "hot_water_temp_min": "35°C",
                        "hot_water_temp_max": "60°C",
                        "hot_water_flow": "15.2 l/min",
                        "water_pressure_min": "0.5 bar",
                        "water_pressure_max": "10 bar",
                        "operating_pressure_min": "0.5 bar",
                        "operating_pressure_max": "3 bar",
                        "expansion_vessel": "8 L",
                        "pump_head": "6 M",
                        "voltage": "230V/50Hz",
                        "power_consumption": "128 W",
                        "protection_class": "IP42"
                    },
                    "components": {
                        "gas_valve": "SIT / Honeywell",
                        "three_way_valve": "ELBI",
                        "heat_exchanger": "VALMEX / CONDEVO",
                        "fan": "FIME / SIT",
                        "pump": "GRUNDFOS",
                        "expansion_tank": "Onaysan",
                        "air_pressure_switch": "HUBA",
                        "hydraulic_assembly": "ARCELL",
                        "control_panel": "ENPI / SIEMENS"
                    }
                }
            ],
            "created_at": datetime.utcnow()
        },
        
        # WOLFECO SERIES
        {
            "id": str(uuid.uuid4()),
            "name": {
                "tr": "WOLFECO Serisi Yoğuşmasız Kombi",
                "en": "WOLFECO Series Non-Condensing Combi Boiler",
                "ru": "Серия WOLFECO Обычный Котел",
                "it": "Serie WOLFECO Caldaia Non Condensante"
            },
            "category": "non-condensing",
            "images": [
                "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/g2xb4ykk_wolfeco1.png",
                "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/g8x349q6_wolfeco3.png"
            ],
            "description": {
                "tr": "WOLFECO serisi, ekonomik ve güvenilir çözümler arayan kullanıcılar için tasarlanmış yoğuşmasız kombi sistemidir. Modern tasarım ve kolay bakım özellikleri ile öne çıkar.",
                "en": "The WOLFECO series is a non-condensing combi system designed for users seeking economical and reliable solutions. It stands out with its modern design and easy maintenance features.",
                "ru": "Серия WOLFECO - это обычная комбинированная система, разработанная для пользователей, ищущих экономичные и надежные решения. Отличается современным дизайном и простотой обслуживания.",
                "it": "La serie WOLFECO è un sistema combinato non condensante progettato per utenti che cercano soluzioni economiche e affidabili. Si distingue per il design moderno e la facilità di manutenzione."
            },
            "models": [
                {
                    "model_name": "20kW",
                    "technical_specs": {
                        "rated_output_min": "8 kW",
                        "rated_output_max": "20 kW",
                        "efficiency": "90.5%",
                        "nox_class": "3",
                        "energy_class": "B",
                        "net_weight": "28 kg",
                        "dimensions": "710 x 410 x 260 mm",
                        "voltage": "230V/50Hz",
                        "power_consumption": "120 W",
                        "protection_class": "IP42"
                    },
                    "components": {
                        "gas_valve": "SIT",
                        "heat_exchanger": "Copper",
                        "fan": "FIME",
                        "pump": "GRUNDFOS",
                        "control_panel": "ENPI"
                    }
                },
                {
                    "model_name": "24kW",
                    "technical_specs": {
                        "rated_output_min": "9 kW",
                        "rated_output_max": "24 kW",
                        "efficiency": "90.5%",
                        "nox_class": "3",
                        "energy_class": "B",
                        "net_weight": "28 kg",
                        "dimensions": "710 x 410 x 260 mm",
                        "voltage": "230V/50Hz",
                        "power_consumption": "123 W",
                        "protection_class": "IP42"
                    },
                    "components": {
                        "gas_valve": "SIT",
                        "heat_exchanger": "Copper",
                        "fan": "FIME",
                        "pump": "GRUNDFOS",
                        "control_panel": "ENPI"
                    }
                },
                {
                    "model_name": "28kW",
                    "technical_specs": {
                        "rated_output_min": "11 kW",
                        "rated_output_max": "28 kW",
                        "efficiency": "90.5%",
                        "nox_class": "3",
                        "energy_class": "B",
                        "net_weight": "30 kg",
                        "dimensions": "710 x 410 x 260 mm",
                        "voltage": "230V/50Hz",
                        "power_consumption": "137 W",
                        "protection_class": "IP42"
                    },
                    "components": {
                        "gas_valve": "SIT",
                        "heat_exchanger": "Copper",
                        "fan": "FIME",
                        "pump": "GRUNDFOS",
                        "control_panel": "ENPI"
                    }
                }
            ],
            "created_at": datetime.utcnow()
        },
        
        # WOLFCOND SERIES
        {
            "id": str(uuid.uuid4()),
            "name": {
                "tr": "WOLFCOND Serisi Yoğuşmalı Kombi",
                "en": "WOLFCOND Series Condensing Combi Boiler",
                "ru": "Серия WOLFCOND Конденсационный Котел",
                "it": "Serie WOLFCOND Caldaia a Condensazione"
            },
            "category": "condensing",
            "images": [
                "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/nonxqkao_Condensig%202.jpg",
                "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/q1rganqu_Condensig%203.jpg"
            ],
            "description": {
                "tr": "WOLFCOND serisi, Wolfterm'in son nesil yoğuşmalı kombi çözümlerini temsil eder. Yenilikçi teknoloji, yüksek performans ve üst düzey güvenlik özellikleri sunar. Akıllı yoğuşma teknolojisi yakıt tüketimini minimize eder.",
                "en": "The WOLFCOND series represents Wolfterm's latest generation of condensing combi boiler solutions. It offers innovative technology, high performance, and top-tier safety features. Intelligent condensing technology minimizes fuel consumption.",
                "ru": "Серия WOLFCOND представляет последнее поколение конденсационных котлов Wolfterm. Предлагает инновационные технологии, высокую производительность и первоклассные функции безопасности. Интеллектуальная технология конденсации минимизирует расход топлива.",
                "it": "La serie WOLFCOND rappresenta l'ultima generazione di soluzioni di caldaie a condensazione Wolfterm. Offre tecnologia innovativa, alte prestazioni e caratteristiche di sicurezza di alto livello. La tecnologia di condensazione intelligente minimizza il consumo di carburante."
            },
            "models": [
                {
                    "model_name": "25kW",
                    "technical_specs": {
                        "rated_output_min": "3.5 kW",
                        "rated_output_max": "25.1 kW",
                        "heating_output_min": "3.7 kW",
                        "heating_output_max": "23.4 kW",
                        "efficiency": "102%",
                        "nox_class": "6",
                        "flue_gas_temp": "55°C",
                        "gas_flow_min": "0.37 m³/h",
                        "gas_flow_max": "2.5 m³/h",
                        "energy_class": "A",
                        "net_weight": "28 kg",
                        "dimensions": "650 x 410 x 285 mm",
                        "hot_water_temp_min": "35°C",
                        "hot_water_temp_max": "60°C",
                        "hot_water_flow": "10.3 l/min",
                        "water_pressure_min": "0.5 bar",
                        "water_pressure_max": "10 bar",
                        "operating_pressure_min": "0.5 bar",
                        "operating_pressure_max": "3 bar",
                        "expansion_vessel": "8 L",
                        "pump_head": "6 M",
                        "voltage": "230V/50Hz",
                        "power_consumption": "170 W",
                        "protection_class": "IPX4D"
                    },
                    "components": {
                        "gas_valve": "European Premium",
                        "heat_exchanger": "Stainless Steel",
                        "fan": "High Efficiency",
                        "pump": "GRUNDFOS",
                        "control_panel": "Advanced Digital"
                    }
                },
                {
                    "model_name": "35kW",
                    "technical_specs": {
                        "rated_output_min": "3.5 kW",
                        "rated_output_max": "35.4 kW",
                        "heating_output_min": "3.7 kW",
                        "heating_output_max": "34.5 kW",
                        "efficiency": "102%",
                        "nox_class": "6",
                        "flue_gas_temp": "55°C",
                        "gas_flow_min": "0.4 m³/h",
                        "gas_flow_max": "3.6 m³/h",
                        "energy_class": "A",
                        "net_weight": "29.5 kg",
                        "dimensions": "650 x 410 x 285 mm",
                        "hot_water_temp_min": "35°C",
                        "hot_water_temp_max": "60°C",
                        "hot_water_flow": "14.8 l/min",
                        "water_pressure_min": "0.5 bar",
                        "water_pressure_max": "10 bar",
                        "operating_pressure_min": "0.5 bar",
                        "operating_pressure_max": "3 bar",
                        "expansion_vessel": "8 L",
                        "pump_head": "6 M",
                        "voltage": "230V/50Hz",
                        "power_consumption": "170 W",
                        "protection_class": "IPX4D"
                    },
                    "components": {
                        "gas_valve": "European Premium",
                        "heat_exchanger": "Stainless Steel",
                        "fan": "High Efficiency",
                        "pump": "GRUNDFOS",
                        "control_panel": "Advanced Digital"
                    }
                },
                {
                    "model_name": "42kW",
                    "technical_specs": {
                        "rated_output_min": "3.5 kW",
                        "rated_output_max": "42.3 kW",
                        "heating_output_min": "3.7 kW",
                        "heating_output_max": "41.1 kW",
                        "efficiency": "102%",
                        "nox_class": "6",
                        "flue_gas_temp": "55°C",
                        "gas_flow_min": "0.6 m³/h",
                        "gas_flow_max": "4.0 m³/h",
                        "energy_class": "A",
                        "net_weight": "31 kg",
                        "dimensions": "650 x 410 x 285 mm",
                        "hot_water_temp_min": "35°C",
                        "hot_water_temp_max": "60°C",
                        "hot_water_flow": "19.3 l/min",
                        "water_pressure_min": "0.5 bar",
                        "water_pressure_max": "10 bar",
                        "operating_pressure_min": "0.5 bar",
                        "operating_pressure_max": "3 bar",
                        "expansion_vessel": "8 L",
                        "pump_head": "6 M",
                        "voltage": "230V/50Hz",
                        "power_consumption": "170 W",
                        "protection_class": "IPX4D"
                    },
                    "components": {
                        "gas_valve": "European Premium",
                        "heat_exchanger": "Stainless Steel",
                        "fan": "High Efficiency",
                        "pump": "GRUNDFOS",
                        "control_panel": "Advanced Digital"
                    }
                }
            ],
            "created_at": datetime.utcnow()
        },
        
        # WOLFMAX SERIES
        {
            "id": str(uuid.uuid4()),
            "name": {
                "tr": "WOLFMAX Serisi Yüksek Kapasite Yoğuşmalı Kazan",
                "en": "WOLFMAX Series High Capacity Condensing Boiler",
                "ru": "Серия WOLFMAX Высокопроизводительный Конденсационный Котел",
                "it": "Serie WOLFMAX Caldaia a Condensazione ad Alta Capacità"
            },
            "category": "condensing",
            "images": [
                "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/9wr1ax88_Duvar%20tipi%20kazan%20i%C3%A7%20g%C3%B6rsel.png",
                "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/xn4dqv40_Duvar%20tipi%20kazan%20izo%20isometrik%20g%C3%B6rsel.png",
                "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/leucehm3_non-condensig%202.png"
            ],
            "description": {
                "tr": "WOLFMAX serisi, mühendislik mükemmeliyeti ve ileri Avrupa teknolojisinin zirvesini temsil eder. Modern yoğuşma teknolojisi sayesinde kayıp ısıyı geri kazanır ve enerji tüketimini önemli ölçüde azaltır. Yüksek kapasiteli ısıtma talepleri için profesyonel çözümdür.",
                "en": "The WOLFMAX series represents the pinnacle of engineering excellence and advanced European technology. It recovers lost heat through modern condensing technology and significantly reduces energy consumption. A professional solution for high-capacity heating demands.",
                "ru": "Серия WOLFMAX представляет вершину инженерного совершенства и передовых европейских технологий. Восстанавливает потерянное тепло с помощью современной технологии конденсации и значительно снижает энергопотребление. Профессиональное решение для высокопроизводительных систем отопления.",
                "it": "La serie WOLFMAX rappresenta l'apice dell'eccellenza ingegneristica e della tecnologia europea avanzata. Recupera il calore perso attraverso la moderna tecnologia di condensazione e riduce significativamente il consumo energetico. Una soluzione professionale per esigenze di riscaldamento ad alta capacità."
            },
            "models": [
                {
                    "model_name": "50kW",
                    "technical_specs": {
                        "rated_output_min": "10 kW",
                        "rated_output_max": "50 kW",
                        "efficiency": "105%",
                        "nox_class": "6",
                        "energy_class": "A++",
                        "net_weight": "45 kg",
                        "dimensions": "800 x 450 x 350 mm",
                        "voltage": "230V/50Hz",
                        "power_consumption": "200 W",
                        "protection_class": "IPX4D"
                    },
                    "components": {
                        "flue_thermostat": "Turkey",
                        "heat_exchanger": "France - Premium Stainless Steel",
                        "burner": "Italy - Advanced Premix",
                        "fan": "Italy - High Efficiency",
                        "gas_valve": "Italy - Modulating",
                        "control_panel": "Germany - Smart Digital"
                    }
                },
                {
                    "model_name": "70kW",
                    "technical_specs": {
                        "rated_output_min": "14 kW",
                        "rated_output_max": "70 kW",
                        "efficiency": "105%",
                        "nox_class": "6",
                        "energy_class": "A++",
                        "net_weight": "50 kg",
                        "dimensions": "850 x 450 x 350 mm",
                        "voltage": "230V/50Hz",
                        "power_consumption": "220 W",
                        "protection_class": "IPX4D"
                    },
                    "components": {
                        "flue_thermostat": "Turkey",
                        "heat_exchanger": "France - Premium Stainless Steel",
                        "burner": "Italy - Advanced Premix",
                        "fan": "Italy - High Efficiency",
                        "gas_valve": "Italy - Modulating",
                        "control_panel": "Germany - Smart Digital"
                    }
                },
                {
                    "model_name": "100kW",
                    "technical_specs": {
                        "rated_output_min": "20 kW",
                        "rated_output_max": "100 kW",
                        "efficiency": "107%",
                        "nox_class": "6",
                        "energy_class": "A++",
                        "net_weight": "65 kg",
                        "dimensions": "950 x 500 x 400 mm",
                        "voltage": "230V/50Hz",
                        "power_consumption": "250 W",
                        "protection_class": "IPX4D"
                    },
                    "components": {
                        "flue_thermostat": "Turkey",
                        "heat_exchanger": "France - Premium Stainless Steel",
                        "burner": "Italy - Advanced Premix",
                        "fan": "Italy - High Efficiency",
                        "gas_valve": "Italy - Modulating",
                        "control_panel": "Germany - Smart Digital"
                    }
                }
            ],
            "created_at": datetime.utcnow()
        }
    ]
    
    await db.products.insert_many(products)
    
    # Hero slides with WolfTerm branded product images
    hero_slides = [
        {
            "id": str(uuid.uuid4()),
            "title": {
                "tr": "WolfTerm - Güvenilir Teknoloji",
                "en": "WolfTerm - Reliable Technology",
                "ru": "WolfTerm - Надежная Технология",
                "it": "WolfTerm - Tecnologia Affidabile"
            },
            "subtitle": {
                "tr": "Avrupa kalitesinde ısıtma sistemleri",
                "en": "European quality heating systems",
                "ru": "Системы отопления европейского качества",
                "it": "Sistemi di riscaldamento di qualità europea"
            },
            "image": "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/p8r27hld_image.png",
            "link": "/catalog",
            "order": 1,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": {
                "tr": "Yüksek Verimlilik, Düşük Maliyet",
                "en": "High Efficiency, Low Cost",
                "ru": "Высокая Эффективность, Низкая Стоимость",
                "it": "Alta Efficienza, Basso Costo"
            },
            "subtitle": {
                "tr": "Ekonomik ve kolay bakım özellikleri",
                "en": "Economic and easy maintenance features",
                "ru": "Экономичные и простые в обслуживании",
                "it": "Caratteristiche economiche e di facile manutenzione"
            },
            "image": "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/6eckdai7_image.png",
            "link": "/catalog",
            "order": 2,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": {
                "tr": "WOLFPREMIUM Serisi",
                "en": "WOLFPREMIUM Series",
                "ru": "Серия WOLFPREMIUM",
                "it": "Serie WOLFPREMIUM"
            },
            "subtitle": {
                "tr": "Modern tasarım ve yüksek performans",
                "en": "Modern design and high performance",
                "ru": "Современный дизайн и высокая производительность",
                "it": "Design moderno e alte prestazioni"
            },
            "image": "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/zm1l7gi4_WOLFPREM%C4%B0UM1.jpg",
            "link": "/catalog/non-condensing",
            "order": 3,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": {
                "tr": "WOLFCOND Yoğuşmalı Kombiler",
                "en": "WOLFCOND Condensing Boilers",
                "ru": "WOLFCOND Конденсационные Котлы",
                "it": "WOLFCOND Caldaie a Condensazione"
            },
            "subtitle": {
                "tr": "%102 verimlilik ile enerji tasarrufu",
                "en": "Energy savings with 102% efficiency",
                "ru": "Энергосбережение с КПД 102%",
                "it": "Risparmio energetico con efficienza del 102%"
            },
            "image": "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/nonxqkao_Condensig%202.jpg",
            "link": "/catalog/condensing",
            "order": 4,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": {
                "tr": "WOLFMAX Yüksek Kapasite",
                "en": "WOLFMAX High Capacity",
                "ru": "WOLFMAX Высокая Производительность",
                "it": "WOLFMAX Alta Capacità"
            },
            "subtitle": {
                "tr": "50-100kW arası endüstriyel çözümler",
                "en": "Industrial solutions from 50-100kW",
                "ru": "Промышленные решения от 50 до 100кВт",
                "it": "Soluzioni industriali da 50 a 100kW"
            },
            "image": "https://customer-assets.emergentagent.com/job_brandwolf-shop/artifacts/xn4dqv40_Duvar%20tipi%20kazan%20izo%20isometrik%20g%C3%B6rsel.png",
            "link": "/catalog/condensing",
            "order": 5,
            "created_at": datetime.utcnow()
        }
    ]
    
    await db.hero_slides.insert_many(hero_slides)
    
    # Sample reviews
    reviews = [
        {
            "id": str(uuid.uuid4()),
            "name": "Ahmet Yılmaz",
            "city": "İstanbul",
            "rating": 5,
            "text": "WOLFCOND kombiyi 2 yıldır kullanıyorum. Hem performansı hem de yakıt tasarrufu mükemmel. Ailece çok memnunuz.",
            "date": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Elena Petrova",
            "city": "Moscow",
            "rating": 5,
            "text": "Отличное качество и надежность. WOLFPREMIUM работает безупречно уже третий год.",
            "date": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Maria Rossi",
            "city": "Roma",
            "rating": 4,
            "text": "Molto soddisfatta della caldaia WOLFECO. Consiglio vivamente!",
            "date": datetime.utcnow()
        }
    ]
    
    await db.reviews.insert_many(reviews)
    
    print("✅ Database seeded successfully with WolfTerm products!")
    print(f"   - Added {len(products)} products")
    print(f"   - Added {len(categories)} categories")
    print(f"   - Added {len(hero_slides)} hero slides")
    print(f"   - Added {len(reviews)} reviews")
