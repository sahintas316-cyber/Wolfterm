from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone
import uuid

class TechnicalSpec(BaseModel):
    """Technical specifications for a product model"""
    rated_output_min: Optional[str] = None
    rated_output_max: Optional[str] = None
    heating_output_min: Optional[str] = None
    heating_output_max: Optional[str] = None
    efficiency: Optional[str] = None
    nox_class: Optional[str] = None
    flue_gas_temp: Optional[str] = None
    gas_flow_min: Optional[str] = None
    gas_flow_max: Optional[str] = None
    energy_class: Optional[str] = None
    net_weight: Optional[str] = None
    dimensions: Optional[str] = None
    hot_water_temp_min: Optional[str] = None
    hot_water_temp_max: Optional[str] = None
    hot_water_flow: Optional[str] = None
    water_pressure_min: Optional[str] = None
    water_pressure_max: Optional[str] = None
    operating_pressure_min: Optional[str] = None
    operating_pressure_max: Optional[str] = None
    expansion_vessel: Optional[str] = None
    pump_head: Optional[str] = None
    voltage: Optional[str] = None
    power_consumption: Optional[str] = None
    protection_class: Optional[str] = None
    gas_pressure_min: Optional[str] = None
    gas_pressure_max: Optional[str] = None

class ComponentsUsed(BaseModel):
    """Components used in a product model"""
    gas_valve: Optional[str] = None
    three_way_valve: Optional[str] = None
    heat_exchanger: Optional[str] = None
    fan: Optional[str] = None
    pump: Optional[str] = None
    expansion_tank: Optional[str] = None
    air_pressure_switch: Optional[str] = None
    hydraulic_assembly: Optional[str] = None
    control_panel: Optional[str] = None
    burner: Optional[str] = None
    flue_thermostat: Optional[str] = None

class ProductModel(BaseModel):
    """Individual model variant of a product"""
    model_name: str
    technical_specs: TechnicalSpec
    components: ComponentsUsed

class MultiLangText(BaseModel):
    """Multi-language text support"""
    tr: str = ""
    en: str = ""
    ru: str = ""
    it: str = ""

class CatalogBase(BaseModel):
    """Catalog model for downloadable PDF catalogs"""
    name: MultiLangText
    description: MultiLangText | str = ""
    file_url: str
    file_size: Optional[str] = None
    thumbnail: Optional[str] = None
    order: int = 0

class Catalog(CatalogBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductBase(BaseModel):
    name: MultiLangText | str  # Support both old and new format
    category: str
    images: List[str] = []
    description: MultiLangText | str  # Support both old and new format
    models: List[ProductModel] = []
    # Legacy fields for backward compatibility
    price: Optional[float] = None
    image: Optional[str] = None

class Product(ProductBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProductCreate(ProductBase):
    pass

class ReviewBase(BaseModel):
    name: str
    city: str
    rating: int = Field(ge=1, le=5)
    text: str

class Review(ReviewBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: datetime = Field(default_factory=datetime.utcnow)

class ReviewCreate(ReviewBase):
    pass

class CategoryBase(BaseModel):
    id: str
    name: str
    nameEn: str
    nameIt: str
    nameTr: str
    icon: str
    image: str

class Category(CategoryBase):
    pass

class ContactForm(BaseModel):
    name: str
    email: str
    phone: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))

class HeroSlideBase(BaseModel):
    title: MultiLangText
    subtitle: MultiLangText
    image: str
    link: str
    order: int = 0

class HeroSlide(HeroSlideBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)

class HeroSlideCreate(HeroSlideBase):
    pass

class SiteSettingsBase(BaseModel):
    """Comprehensive site settings model"""
    # General Settings
    site_name: MultiLangText
    logo_url: str = ""
    favicon_url: str = ""
    primary_color: str = "#dc2626"  # red-600
    secondary_color: str = "#1f2937"  # gray-800
    
    # Contact Information
    contact_email: str = "info@wolfterm.com"
    contact_phone: str = ""
    contact_address: MultiLangText | str = ""
    contact_map_url: str = ""
    
    # Social Media
    social_facebook: str = ""
    social_instagram: str = ""
    social_twitter: str = ""
    social_linkedin: str = ""
    social_youtube: str = ""
    social_vk: str = ""
    social_whatsapp: str = ""
    
    # SEO Settings
    meta_title: MultiLangText | str = ""
    meta_description: MultiLangText | str = ""
    meta_keywords: MultiLangText | str = ""
    google_analytics_id: str = ""
    
    # Footer Settings
    footer_text: MultiLangText | str = ""
    footer_copyright: MultiLangText | str = ""
    footer_links: List[dict] = []  # [{title, url, order}]
    
    # About Page
    about_title: MultiLangText | str = ""
    about_content: MultiLangText | str = ""
    about_images: List[str] = []
    
    # Homepage Settings
    hero_title: MultiLangText | str = ""
    hero_subtitle: MultiLangText | str = ""
    features_section_visible: bool = True
    products_section_visible: bool = True
    reviews_section_visible: bool = True
    
    # Custom CSS/JS
    custom_css: str = ""
    custom_js: str = ""

class SiteSettings(SiteSettingsBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))