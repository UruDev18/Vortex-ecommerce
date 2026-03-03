import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Search, ShoppingBag, User, Menu, X, ArrowRight, Star, Camera, Sparkles, Filter, ChevronDown, Check } from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: string;
  priceNumeric: number;
  category: string;
  image: string;
  description: string;
  specs: string[];
  color: string;
  rating: number;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Chronos Obsidian",
    price: "$4,200",
    priceNumeric: 4200,
    category: "Lujo",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800",
    description: "La ingeniería de precisión se une a la estética atemporal de la obsidiana. Una obra maestra del arte relojero.",
    specs: ["Cristal de Zafiro", "Reserva de 48h", "Resistente al agua 100m"],
    color: "Negro",
    rating: 4.9
  },
  {
    id: 2,
    name: "Aura Soundscape",
    price: "$850",
    priceNumeric: 850,
    category: "Electrónica",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
    description: "Experiencia de audio inmersiva impulsada por procesamiento de sonido neuronal. Escucha el futuro.",
    specs: ["Cancelación de Ruido Activa", "Audio Espacial", "Batería de 30h"],
    color: "Blanco",
    rating: 4.7
  },
  {
    id: 3,
    name: "Velvet Nomad",
    price: "$1,150",
    priceNumeric: 1150,
    category: "Moda",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
    description: "Cuero italiano hecho a mano con un acabado aterciopelado. Para el explorador moderno.",
    specs: ["Cuero de Grano Completo", "Diseño Ergonómico", "Edición Limitada"],
    color: "Marrón",
    rating: 4.8
  },
  {
    id: 4,
    name: "Lumina Desk",
    price: "$2,800",
    priceNumeric: 2800,
    category: "Lujo",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800",
    description: "Solución de espacio de trabajo minimalista con iluminación ambiental integrada y carga inalámbrica.",
    specs: ["Roble Sostenible", "Iluminación Inteligente", "Hub Inalámbrico"],
    color: "Natural",
    rating: 4.6
  },
  {
    id: 5,
    name: "Obsidian Strap",
    price: "$350",
    priceNumeric: 350,
    category: "Lujo",
    image: "https://images.unsplash.com/photo-1539815208101-99d356776e54?auto=format&fit=crop&q=80&w=800",
    description: "Correa de eslabones de obsidiana premium diseñada específicamente para la serie Chronos.",
    specs: ["Eslabones de Obsidiana", "Liberación Rápida", "Hipoalergénico"],
    color: "Negro",
    rating: 4.5
  },
  {
    id: 6,
    name: "Travel Case",
    price: "$180",
    priceNumeric: 180,
    category: "Lujo",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    description: "Estuche de viaje rígido con forro de terciopelo. Protege tus inversiones con estilo.",
    specs: ["Resistente a Impactos", "Interior de Terciopelo", "Cremallera Impermeable"],
    color: "Gris",
    rating: 4.4
  },
  {
    id: 7,
    name: "Nebula Projector",
    price: "$1,450",
    priceNumeric: 1450,
    category: "Electrónica",
    image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&q=80&w=800",
    description: "Proyección láser 4K con tecnología de sangrado de luz atmosférica.",
    specs: ["Resolución 4K", "2000 Lúmenes", "SO Inteligente"],
    color: "Negro",
    rating: 4.8
  },
  {
    id: 8,
    name: "Silk Horizon",
    price: "$620",
    priceNumeric: 620,
    category: "Moda",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    description: "Seda de origen ético con un tejido holográfico.",
    specs: ["100% Seda", "Transpirable", "Teñido a mano"],
    color: "Blanco",
    rating: 4.9
  },
  {
    id: 9,
    name: "Titanium Flask",
    price: "$290",
    priceNumeric: 290,
    category: "Lujo",
    image: "https://images.unsplash.com/photo-1517254456976-ee8682099819?auto=format&fit=crop&q=80&w=800",
    description: "Recipiente de titanio de grado 5 para el viajero exigente.",
    specs: ["Ultraligero", "Libre de BPA", "Garantía de por vida"],
    color: "Gris",
    rating: 4.5
  },
  {
    id: 10,
    name: "Zenith Chair",
    price: "$3,900",
    priceNumeric: 3900,
    category: "Lujo",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=800",
    description: "Asiento de gravedad cero con retroalimentación háptica integrada.",
    specs: ["Ergonómico", "Retroalimentación Háptica", "Cuero Premium"],
    color: "Negro",
    rating: 5.0
  },
  {
    id: 11,
    name: "Prism Lens",
    price: "$1,200",
    priceNumeric: 1200,
    category: "Electrónica",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    description: "Óptica de próxima generación para capturar el espectro invisible.",
    specs: ["Apertura f/1.2", "Recubrimiento Nano", "Sellado contra el clima"],
    color: "Negro",
    rating: 4.7
  },
  {
    id: 12,
    name: "Ether Scarf",
    price: "$450",
    priceNumeric: 450,
    category: "Moda",
    image: "https://images.unsplash.com/photo-1456885284447-7dd4bb8720bf?auto=format&fit=crop&q=80&w=800",
    description: "Calidez sin peso confeccionada con lana rara de alta montaña.",
    specs: ["Lana Rara", "Hipoalergénico", "Tejido Artesanal"],
    color: "Gris",
    rating: 4.6
  }
];

const REVIEWS = [
  { id: 1, user: "Elena R.", text: "La atención al detalle es simplemente impresionante. Vortex es el futuro.", sentiment: "Positive", keys: ["detalle", "impresionante", "futuro"] },
  { id: 2, user: "Marcus T.", text: "Diseño increíble e integración perfecta con mi estilo de vida.", sentiment: "Positive", keys: ["increíble", "perfecta", "estilo de vida"] },
];

// --- Constants ---
const COLOR_MAP: Record<string, string> = {
  'Negro': '#000000',
  'Blanco': '#FFFFFF',
  'Marrón': '#8B4513',
  'Natural': '#D2B48C',
  'Gris': '#808080',
};

// --- Components ---

const MagneticCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over a magnetic element
      const target = e.target as HTMLElement;
      if (target.closest('.magnetic-target')) {
        const rect = target.closest('.magnetic-target')!.getBoundingClientRect();
        setMagneticTarget({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
        setIsHovering(true);
      } else {
        setMagneticTarget(null);
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-glow pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: magneticTarget ? magneticTarget.x - 16 : position.x - 16,
        y: magneticTarget ? magneticTarget.y - 16 : position.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(46, 196, 182, 0.2)' : 'transparent',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    />
  );
};

const Header = ({ 
  selectedCategories, 
  onCategoriesChange 
}: { 
  selectedCategories: string[], 
  onCategoriesChange: (cats: string[]) => void 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const allCategories = Array.from(new Set(PRODUCTS.map(p => p.category)));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCategory = (cat: string) => {
    onCategoriesChange(
      selectedCategories.includes(cat)
        ? selectedCategories.filter(c => c !== cat)
        : [...selectedCategories, cat]
    );
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <h1 className="text-2xl font-bold tracking-tighter text-bg-deep cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>VORTEX</h1>
          <nav className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest items-center">
            {[
              { label: 'Colecciones', href: '#collections' },
              { label: 'Spectra', href: '#spectra' }
            ].map((item) => (
              <a key={item.label} href={item.href} className="hover:text-accent-glow transition-colors">{item.label}</a>
            ))}
            
            {/* Categories Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:text-accent-glow transition-colors uppercase tracking-widest group"
              >
                <span>Categorías</span>
                {selectedCategories.length > 0 && (
                  <span className="flex items-center justify-center w-4 h-4 bg-accent-glow text-white text-[10px] rounded-full font-bold animate-in zoom-in duration-300">
                    {selectedCategories.length}
                  </span>
                )}
                <ChevronDown size={14} className={`transition-transform duration-300 group-hover:text-accent-glow ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-4 w-56 glass rounded-2xl p-4 shadow-2xl border border-white/10"
                    >
                      <div className="space-y-2">
                        <button 
                          onClick={() => {
                            onCategoriesChange([]);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-between ${selectedCategories.length === 0 ? 'bg-accent-glow text-white' : 'hover:bg-white/5'}`}
                        >
                          Todas las Categorías
                          {selectedCategories.length === 0 && <Check size={12} />}
                        </button>
                        <div className="h-px bg-white/10 my-2" />
                        {allCategories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-between ${selectedCategories.includes(cat) ? 'bg-accent-glow text-white' : 'hover:bg-white/5'}`}
                          >
                            {cat}
                            {selectedCategories.includes(cat) && <Check size={12} />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                    {/* Backdrop to close dropdown */}
                    <div className="fixed inset-0 z-[-1]" onClick={() => setIsDropdownOpen(false)} />
                  </>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-bg-deep/5 rounded-full transition-colors"><Search size={20} /></button>
          <button className="p-2 hover:bg-bg-deep/5 rounded-full transition-colors"><User size={20} /></button>
          <button className="relative p-2 hover:bg-bg-deep/5 rounded-full transition-colors">
            <ShoppingBag size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-accent-glow rounded-full"></span>
          </button>
          <button className="md:hidden p-2"><Menu size={20} /></button>
        </div>
      </div>
    </header>
  );
};

const Hero = ({ onSuggestionClick }: { onSuggestionClick: (id: number) => void }) => {
  const [userName] = useState("entusiasta del diseño");
  const [isScanning, setIsScanning] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const handleScan = () => {
    setIsScanning(true);
    setShowSuggestions(false);
    setTimeout(() => {
      setIsScanning(false);
      setShowSuggestions(true);
    }, 2500);
  };

  const suggestions = [
    { id: 5, name: "Correa de Obsidiana", match: "98%", img: "https://images.unsplash.com/photo-1539815208101-99d356776e54?auto=format&fit=crop&q=80&w=200" },
    { id: 6, name: "Estuche de Viaje", match: "94%", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=200" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-glow/10 text-accent-glow text-xs font-bold mb-6">
            <Sparkles size={14} />
            <span>Bienvenido de nuevo, {userName}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8">
            Curaduría Digital / <br />
            <span className="text-accent-glow">Inteligencia</span> Estética
          </h1>
          <p className="text-lg text-bg-deep/60 max-w-md mb-10 leading-relaxed">
            Experimenta el futuro del retail donde la tecnología invisible cura cada detalle de tu estilo de vida.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-bg-deep text-pure-white rounded-full font-bold hover:bg-accent-glow transition-all flex items-center gap-2 group magnetic-target">
              Explorar Colección
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={handleScan}
              className="flex items-center gap-3 px-6 py-4 rounded-full border border-bg-deep/10 text-sm font-bold hover:bg-surface-cream transition-all magnetic-target"
            >
              <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-accent-glow animate-ping' : 'bg-accent-glow'}`} />
              {isScanning ? 'Analizando Estilo...' : 'AI Stylist: Analizar Match'}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          style={{ y: y1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <div className="relative z-10">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-float">
              <img
                src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200"
                alt="Hero Product"
                className="w-full max-w-lg mx-auto"
                referrerPolicy="no-referrer"
              />
              {isScanning && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent-glow animate-scan shadow-[0_0_20px_rgba(46,196,182,1)]" />
                  <div className="absolute inset-0 bg-accent-glow/5 animate-pulse" />
                </div>
              )}
            </div>

            <AnimatePresence>
              {showSuggestions && (
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute -bottom-10 -right-10 md:-right-20 glass p-6 rounded-2xl w-full max-w-[280px] shadow-2xl z-20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent-glow">Match de Estilo IA</p>
                    <button onClick={() => setShowSuggestions(false)} className="text-bg-deep/40 hover:text-bg-deep"><X size={14} /></button>
                  </div>
                  <div className="space-y-4">
                    {suggestions.map((item, i) => (
                      <motion.div 
                        key={item.name}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => onSuggestionClick(item.id)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-bg-deep/5 transition-colors cursor-pointer group"
                      >
                        <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-xs font-bold">{item.name}</p>
                          <div className="flex items-center gap-1">
                            <div className="h-1 flex-1 bg-bg-deep/10 rounded-full overflow-hidden">
                              <div className="h-full bg-accent-glow" style={{ width: item.match }} />
                            </div>
                            <span className="text-[10px] font-bold text-accent-glow">{item.match}</span>
                          </div>
                        </div>
                        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>
                  <button 
                    onClick={() => document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full mt-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-accent-glow/20 rounded-lg hover:bg-accent-glow hover:text-white transition-all magnetic-target"
                  >
                    Ver Look Completo
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {!showSuggestions && !isScanning && (
              <div className="absolute -bottom-10 -right-10 glass p-6 rounded-2xl max-w-[200px] shadow-xl">
                <p className="text-xs font-bold uppercase tracking-widest text-accent-glow mb-2">Recomendación IA</p>
                <p className="text-sm font-medium">Pulsa "Analizar Match" para ver complementos curados.</p>
              </div>
            )}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent-glow/5 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const CategoryHub = ({ onCategorySelect }: { onCategorySelect: (cat: string) => void }) => {
  const categories = [
    { name: 'Electrónica', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800', desc: 'Tecnología de vanguardia con alma digital.' },
    { name: 'Moda', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800', desc: 'Estética atemporal para el nómada moderno.' },
    { name: 'Lujo', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800', desc: 'Excelencia artesanal sin compromisos.' },
  ];

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="spectra" className="py-24 bg-bg-deep text-pure-white overflow-hidden">
      <div className="container mx-auto px-6 mb-16 flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-bold mb-4">La Red Spectra</h2>
          <p className="text-pure-white/40 max-w-md">Explora universos curados mediante visión artificial y sensibilidad estética.</p>
        </div>
        <div className="hidden md:block text-right">
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-accent-glow">Curado por Vortex AI</span>
        </div>
      </div>
      <div className="grid md:grid-cols-3 border-t border-pure-white/10">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.name}
            className="relative h-[700px] group cursor-pointer overflow-hidden border-r border-pure-white/10 last:border-r-0"
            whileHover="hover"
            onClick={() => {
              onCategorySelect(cat.name);
              document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <motion.img
              style={{ y }}
              src={cat.image}
              alt={cat.name}
              className="absolute inset-0 w-full h-[120%] object-cover opacity-40 transition-all duration-1000"
              variants={{ hover: { scale: 1.05, opacity: 0.6 } }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/20 to-transparent opacity-80" />
            
            <div className="absolute inset-0 p-12 flex flex-col justify-end">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
              >
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent-glow mb-4 block">Spectra 0{idx + 1}</span>
                <h3 className="text-6xl font-bold mb-4 tracking-tighter">{cat.name}</h3>
                <p className="text-pure-white/60 mb-8 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">{cat.desc}</p>
                <motion.div
                  className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest"
                  variants={{ hover: { x: 10 } }}
                >
                  Explorar Universo <ArrowRight size={18} className="text-accent-glow" />
                </motion.div>
              </motion.div>
            </div>

            {/* Decorative lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pure-white/20 to-transparent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ProductGrid = ({ 
  onProductClick, 
  selectedCategories, 
  onCategoriesChange 
}: { 
  onProductClick: (p: Product) => void,
  selectedCategories: string[],
  onCategoriesChange: (cats: string[]) => void
}) => {
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'alpha-asc' | 'alpha-desc'>('alpha-asc');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = React.useRef<HTMLDivElement>(null);

  const colors = Array.from(new Set(PRODUCTS.map(p => p.color)));
  const allCategories = Array.from(new Set(PRODUCTS.map(p => p.category)));

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesPrice = p.priceNumeric >= priceRange[0] && p.priceNumeric <= priceRange[1];
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(p.color);
    const matchesRating = p.rating >= minRating;
    return matchesCategory && matchesPrice && matchesColor && matchesRating;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceNumeric - b.priceNumeric;
    if (sortBy === 'price-desc') return b.priceNumeric - a.priceNumeric;
    if (sortBy === 'alpha-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'alpha-desc') return b.name.localeCompare(a.name);
    return 0;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategories, priceRange, selectedColors, sortBy, minRating]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredProducts.length) {
          setVisibleCount(prev => prev + 6);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, filteredProducts.length]);

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleCategory = (cat: string) => {
    onCategoriesChange(
      selectedCategories.includes(cat)
        ? selectedCategories.filter(c => c !== cat)
        : [...selectedCategories, cat]
    );
  };

  return (
    <section id="product-grid" className="py-24 bg-pure-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">Selección Inteligente</h2>
            <p className="text-bg-deep/40">Curaduría algorítmica basada en tus preferencias estéticas.</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar pb-2">
            <button
              onClick={() => onCategoriesChange([])}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                selectedCategories.length === 0 
                  ? 'bg-bg-deep text-pure-white' 
                  : 'border border-bg-deep/10 text-bg-deep/40 hover:border-bg-deep/40'
              }`}
            >
              Todo
            </button>
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  selectedCategories.includes(cat)
                    ? 'bg-bg-deep text-pure-white' 
                    : 'border border-bg-deep/10 text-bg-deep/40 hover:border-bg-deep/40'
                }`}
              >
                {cat}
              </button>
            ))}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all ${
                isFilterOpen ? 'bg-accent-glow border-accent-glow text-white' : 'border-bg-deep/10 text-bg-deep hover:border-bg-deep'
              }`}
            >
              <Filter size={14} />
              Filtros Avanzados
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filter Sidebar */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                className="lg:w-64 space-y-12 overflow-hidden"
              >
                {/* Multi-select Category Dropdown (Custom implementation) */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-bg-deep/40">Categorías</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {allCategories.map(cat => (
                      <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            className="peer appearance-none w-5 h-5 border border-bg-deep/10 rounded-md checked:bg-accent-glow checked:border-accent-glow transition-all"
                          />
                          <Sparkles size={10} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm font-medium text-bg-deep/60 group-hover:text-bg-deep transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-bg-deep/40">Ordenar por</h4>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-transparent border-b border-bg-deep/10 py-2 text-sm font-medium outline-none focus:border-accent-glow transition-colors"
                  >
                    <option value="alpha-asc">Alfabeto: A - Z</option>
                    <option value="alpha-desc">Alfabeto: Z - A</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                  </select>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-bg-deep/40">Rango de Precio</h4>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <p className="text-[10px] text-bg-deep/40 mb-1 uppercase">Min</p>
                        <input 
                          type="number" 
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                          className="w-full bg-surface-cream rounded-lg px-3 py-2 text-xs font-bold outline-none focus:ring-1 focus:ring-accent-glow"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] text-bg-deep/40 mb-1 uppercase">Max</p>
                        <input 
                          type="number" 
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                          className="w-full bg-surface-cream rounded-lg px-3 py-2 text-xs font-bold outline-none focus:ring-1 focus:ring-accent-glow"
                        />
                      </div>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="5000" 
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-accent-glow"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-bg-deep/40">Calificación Mínima</h4>
                  <div className="space-y-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="5" 
                      step="0.1"
                      value={minRating}
                      onChange={(e) => setMinRating(parseFloat(e.target.value))}
                      className="w-full accent-accent-glow"
                    />
                    <div className="flex justify-between text-xs font-bold">
                      <div className="flex items-center gap-1">
                        <Star size={10} className="fill-accent-glow text-accent-glow" />
                        <span>0</span>
                      </div>
                      <div className="flex items-center gap-1 text-accent-glow">
                        <Star size={10} className="fill-accent-glow text-accent-glow" />
                        <span>{minRating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-bg-deep/40">Colores</h4>
                  <div className="grid grid-cols-5 gap-3">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        title={color}
                        className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColors.includes(color)
                            ? 'border-accent-glow scale-110'
                            : 'border-transparent hover:border-bg-deep/10'
                        }`}
                        style={{ backgroundColor: COLOR_MAP[color] || '#ccc' }}
                      >
                        {selectedColors.includes(color) && (
                          <Check size={12} className={color === 'White' ? 'text-black' : 'text-white'} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setPriceRange([0, 5000]);
                    setSelectedColors([]);
                    setSortBy('alpha-asc');
                    setMinRating(0);
                    onCategoriesChange([]);
                  }}
                  className="text-[10px] font-bold uppercase tracking-widest text-alert-coral hover:underline"
                >
                  Limpiar Filtros
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid */}
          <div className="flex-1">
            {visibleProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {visibleProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: 0.8, 
                        delay: (idx % 3) * 0.1, 
                        ease: [0.21, 0.47, 0.32, 0.98] 
                      }}
                      className="group cursor-pointer"
                      onClick={() => onProductClick(product)}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-surface-cream">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                          {product.id === 3 && (
                            <span className="px-3 py-1 bg-alert-coral text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                              Edición Limitada
                            </span>
                          )}
                          <div className="px-2 py-1 bg-pure-white/90 backdrop-blur-sm rounded-lg flex items-center gap-1 shadow-sm">
                            <Star size={10} className="fill-accent-glow text-accent-glow" />
                            <span className="text-[10px] font-bold">{product.rating}</span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-bg-deep/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-6 py-3 bg-pure-white text-bg-deep rounded-full text-xs font-bold uppercase tracking-widest">Vista Rápida</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-accent-glow mb-1">{product.category} • {product.color}</p>
                          <h3 className="text-lg font-bold group-hover:text-accent-glow transition-colors">{product.name}</h3>
                        </div>
                        <p className="font-bold">{product.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Infinite Scroll Sentinel */}
                {visibleCount < filteredProducts.length && (
                  <div ref={loaderRef} className="h-20 flex items-center justify-center mt-12">
                    <div className="flex gap-1">
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1] }} 
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-1.5 h-1.5 bg-accent-glow rounded-full" 
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1] }} 
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-1.5 h-1.5 bg-accent-glow rounded-full" 
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1] }} 
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-1.5 h-1.5 bg-accent-glow rounded-full" 
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center text-center">
                <p className="text-xl font-bold mb-4">No se encontraron productos</p>
                <p className="text-bg-deep/40 mb-8">Intenta ajustar tus filtros para encontrar lo que buscas.</p>
                <button 
                  onClick={() => {
                    setPriceRange([0, 5000]);
                    setSelectedColors([]);
                    setMinRating(0);
                    onCategoriesChange([]);
                  }}
                  className="px-8 py-4 bg-bg-deep text-pure-white rounded-full font-bold"
                >
                  Ver Todo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const QuickView = ({ product, onClose }: { product: Product | null, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg-deep/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="fixed inset-x-0 bottom-0 md:bottom-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 h-[90vh] md:h-[85vh] w-full md:max-w-5xl bg-pure-white z-[101] shadow-[0_-20px_80px_rgba(15,42,67,0.15)] overflow-y-auto rounded-t-[40px] md:rounded-[40px]"
          >
            <div className="sticky top-0 right-0 p-8 flex justify-end z-10 pointer-events-none">
              <button 
                onClick={onClose} 
                className="p-3 bg-bg-deep/5 hover:bg-bg-deep/10 backdrop-blur-md rounded-full transition-all pointer-events-auto group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
            <div className="px-8 md:px-16 pb-24 -mt-16">
              <div className="grid lg:grid-cols-2 gap-16 mb-16">
                <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl bg-surface-cream">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-accent-glow/10 text-accent-glow text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">{product.category}</span>
                    <div className="flex items-center gap-1 text-accent-glow">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold">{product.rating}</span>
                    </div>
                  </div>
                  <h2 className="text-5xl font-bold mb-6 tracking-tight">{product.name}</h2>
                  <p className="text-3xl font-bold mb-10 text-bg-deep/80">{product.price}</p>
                  <p className="text-lg text-bg-deep/60 leading-relaxed mb-12">{product.description}</p>
                  
                    <div className="grid grid-cols-2 gap-8 mb-12">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-bg-deep/40">Especificaciones Técnicas</h4>
                      <ul className="space-y-3">
                        {product.specs.slice(0, 2).map(spec => (
                          <li key={spec} className="flex items-center gap-3 text-sm font-medium">
                            <div className="w-1.5 h-1.5 bg-accent-glow rounded-full" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-bg-deep/40">Materialidad</h4>
                      <p className="text-sm font-medium flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-accent-glow rounded-full" />
                        Acabado {product.color} Premium
                      </p>
                    </div>
                  </div>

                  <button className="w-full py-6 bg-bg-deep text-pure-white rounded-full font-bold text-lg hover:bg-accent-glow transition-all shadow-xl hover:shadow-accent-glow/20 magnetic-target">
                    Añadir al Carrito
                  </button>
                </div>
              </div>

              <div className="border-t border-bg-deep/10 pt-12">
                <div className="flex items-center gap-2 text-accent-glow mb-6">
                  <Sparkles size={18} />
                  <span className="text-sm font-bold uppercase tracking-widest">Análisis de Sentimiento IA</span>
                </div>
                <div className="space-y-8">
                  {REVIEWS.map(review => (
                    <div key={review.id} className="p-6 bg-surface-cream rounded-2xl">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold">{review.user}</span>
                        <div className="flex text-accent-glow"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                      </div>
                      <p className="text-sm leading-relaxed">
                        {review.text.split(' ').map((word, i) => (
                          <span key={i} className={review.keys.includes(word.toLowerCase().replace('.', '')) ? 'text-accent-glow font-bold shadow-[0_0_10px_rgba(46,196,182,0.3)]' : ''}>
                            {word}{' '}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const VisualSearchOverlay = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-bg-deep/90 flex items-center justify-center p-6"
        >
          <button onClick={onClose} className="absolute top-8 right-8 text-pure-white p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={32} />
          </button>
          <div className="max-w-2xl w-full text-center">
            <div className="relative w-full aspect-video border-2 border-dashed border-accent-glow/30 rounded-3xl flex flex-col items-center justify-center mb-8 group overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-accent-glow animate-scan shadow-[0_0_15px_rgba(46,196,182,0.8)]" />
              </div>
              <Camera size={48} className="text-accent-glow mb-4" />
              <p className="text-pure-white text-xl font-medium mb-2">Arrastra una imagen para buscar</p>
              <p className="text-pure-white/40 text-sm">Nuestra IA analizará el estilo, color y textura.</p>
            </div>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 bg-accent-glow text-bg-deep rounded-full font-bold">Subir Archivo</button>
              <button className="px-8 py-3 border border-pure-white/20 text-pure-white rounded-full font-bold">Usar Cámara</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  return (
    <footer className="bg-bg-deep text-pure-white py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-2">
            <h2 className="text-4xl font-bold mb-8">VORTEX</h2>
            <p className="text-pure-white/40 max-w-sm leading-relaxed">
              Redefiniendo el lujo mediante la curaduría inteligente. Una experiencia de retail diseñada para el mañana.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Explorar</h4>
            <ul className="space-y-4 text-sm text-pure-white/60">
              <li><a href="#collections" className="hover:text-accent-glow transition-colors">Colecciones</a></li>
              <li><a href="#spectra" className="hover:text-accent-glow transition-colors">Red Spectra</a></li>
              <li><a href="#product-grid" className="hover:text-accent-glow transition-colors">Edición Limitada</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Soporte</h4>
            <ul className="space-y-4 text-sm text-pure-white/60">
              <li><a href="#" className="hover:text-accent-glow transition-colors">Conserje 24/7</a></li>
              <li><a href="#" className="hover:text-accent-glow transition-colors">Envíos Globales</a></li>
              <li><a href="#" className="hover:text-accent-glow transition-colors">Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-pure-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs text-pure-white/20">© 2026 Vortex Luxury. Todos los derechos reservados.</p>
          <div className="relative group">
            <span className="text-xs font-bold tracking-[0.5em] text-pure-white/40 group-hover:text-accent-glow transition-colors cursor-default">MAREAWEB</span>
            <div className="absolute -bottom-2 left-0 w-full h-px bg-accent-glow scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSuggestionClick = (productId: number) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
      // Smooth scroll to the grid first
      document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
      
      // Delay opening QuickView slightly to allow scroll to start/finish
      setTimeout(() => {
        setSelectedProduct(product);
      }, 500);
    }
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategories([cat]);
  };

  return (
    <div className="relative">
      <MagneticCursor />
      <Header 
        selectedCategories={selectedCategories} 
        onCategoriesChange={setSelectedCategories} 
      />
      
      <main>
        <Hero onSuggestionClick={handleSuggestionClick} />
        
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setIsVisualSearchOpen(true)}
            className="w-16 h-16 bg-bg-deep text-pure-white rounded-full flex items-center justify-center shadow-2xl hover:bg-accent-glow transition-all group"
          >
            <Camera size={24} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <CategoryHub onCategorySelect={handleCategorySelect} />
        <ProductGrid 
          onProductClick={setSelectedProduct} 
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
        />
        
        <section className="py-24 bg-surface-cream">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-8">El Futuro es Curado.</h2>
            <p className="text-xl text-bg-deep/60 max-w-2xl mx-auto mb-12">
              Únete a nuestra comunidad exclusiva y recibe recomendaciones personalizadas por nuestra IA de estilo.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Tu email de lujo"
                className="flex-1 px-6 py-4 rounded-full bg-pure-white border-none focus:ring-2 focus:ring-accent-glow outline-none"
              />
              <button className="px-8 py-4 bg-bg-deep text-pure-white rounded-full font-bold hover:bg-accent-glow transition-all magnetic-target">
                Unirse
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <VisualSearchOverlay isOpen={isVisualSearchOpen} onClose={() => setIsVisualSearchOpen(false)} />
    </div>
  );
}
