import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'motion/react';
import {
  MessageSquare,
  Phone,
  Sun,
  Menu,
  X,
  Zap,
  ChevronRight,
  ChevronLeft,
  Truck,
  Wrench,
  ShieldCheck,
  MapPin,
  Clock,
  Star,
  Quote,
  CircleCheckBig,
  ExternalLink,
  ChevronDown,
  Facebook,
  Instagram,
  Youtube,
  Car,
  Award,
  Shield,
  ThumbsUp,
  Check,
} from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ElementType;
}

const CustomSelect = ({ options, value, onChange, placeholder, icon: Icon }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className={`relative ${isOpen ? 'z-50' : 'z-10'}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full pl-12 pr-4 py-4 text-left bg-white dark:bg-neutral-900 border ${
          isOpen ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-slate-200 dark:border-white/10'
        } rounded-xl text-slate-900 dark:text-white font-medium transition-all hover:border-orange-500/50 flex items-center justify-between group outline-none`}
      >
        <div className="absolute left-4 text-slate-400 group-hover:text-orange-600 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <span className={`block truncate ${!value ? 'text-slate-500' : ''}`}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#120500] border border-slate-100 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto custom-scrollbar"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${
                  value === option.value
                    ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400'
                    : 'text-slate-700 dark:text-gray-300'
                }`}
              >
                <span className="font-medium truncate">{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-orange-500 shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const [currentUnitImageIndex, setCurrentUnitImageIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const brandsCarouselRef = useRef<HTMLDivElement>(null);

  const scrollBrandsLeft = () => {
    if (brandsCarouselRef.current) {
      const scrollAmount = brandsCarouselRef.current.firstElementChild?.clientWidth || 350;
      brandsCarouselRef.current.scrollBy({ left: -(scrollAmount + 24), behavior: 'smooth' });
    }
  };

  const scrollBrandsRight = () => {
    if (brandsCarouselRef.current) {
      const scrollAmount = brandsCarouselRef.current.firstElementChild?.clientWidth || 350;
      brandsCarouselRef.current.scrollBy({ left: scrollAmount + 24, behavior: 'smooth' });
    }
  };

  const batteryBrands = [
    {
      name: "Moura",
      tag: "MouraOriginal",
      desc: "Líder absoluta. A bateria original das maiores montadoras do mundo. Durabilidade comprovada.",
      img: "https://i.imgur.com/rDi6Fsu.png"
    },
    {
      name: "Crall",
      tag: "CrallOriginal",
      desc: "Excelente custo-benefício. Energia confiável para o dia a dia com certificação do Inmetro.",
      img: "https://i.imgur.com/QQvBK2A.png"
    },
    {
      name: "Heliar",
      tag: "HeliarOriginal",
      desc: "Tecnologia PowerFrame. Maior resistência à corrosão e fluxo de corrente otimizado.",
      img: "https://i.imgur.com/ik4r0sE.png"
    },
    {
      name: "Pioneiro",
      tag: "PioneiroOriginal",
      desc: "Alta performance e variedade de aplicações. A escolha inteligente para quem busca qualidade.",
      img: "https://i.imgur.com/ZmND1y8.png"
    },
    {
      name: "Bosch",
      tag: "BoschOriginal",
      desc: "Tecnologia alemã de ponta. Máxima potência de partida e longa vida útil para o seu veículo.",
      img: "https://i.imgur.com/0pcm10W.png"
    },
    {
      name: "Connect",
      tag: "ConnectOriginal",
      desc: "Baterias de alta tecnologia com excelente desempenho e durabilidade para diversas aplicações.",
      img: "https://i.imgur.com/2z3E5lk.png"
    },
    {
      name: "OnBat",
      tag: "OnBatOriginal",
      desc: "Qualidade superior e resistência. Projetada para entregar energia constante e confiável.",
      img: "https://i.imgur.com/yGSoaZR.png"
    },
    {
      name: "Zetta",
      tag: "ZettaOriginal",
      desc: "Fabricada pela Moura. Qualidade premium com excelente custo-benefício para o seu dia a dia.",
      img: "https://i.imgur.com/XfmQfxx.png"
    },
    {
      name: "Extranger",
      tag: "ExtrangerOriginal",
      desc: "Robustez e durabilidade. A energia que seu veículo precisa para rodar com segurança.",
      img: "https://i.imgur.com/g9NHIhE.png"
    }
  ];

  useEffect(() => {
    const carousel = brandsCarouselRef.current;
    if (!carousel) return;

    let isInteracting = false;
    let animationFrameId: number;
    let scrollSpeed = 0.5; // Pixels per frame
    let currentScroll = carousel.scrollLeft;

    const handleInteractStart = () => { isInteracting = true; };
    const handleInteractEnd = () => { 
      setTimeout(() => { isInteracting = false; }, 1000);
    };

    carousel.addEventListener('mouseenter', handleInteractStart);
    carousel.addEventListener('mouseleave', handleInteractEnd);
    carousel.addEventListener('touchstart', handleInteractStart, { passive: true });
    carousel.addEventListener('touchend', handleInteractEnd);

    const scrollContinuously = () => {
      if (!isInteracting && carousel) {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        if (currentScroll >= maxScroll - 1) {
          // Reset to beginning smoothly
          currentScroll = 0;
        } else {
          currentScroll += scrollSpeed;
        }
        carousel.scrollLeft = currentScroll;
      } else if (carousel) {
        // Sync accumulator when user interacts
        currentScroll = carousel.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(scrollContinuously);
    };

    animationFrameId = requestAnimationFrame(scrollContinuously);

    return () => {
      cancelAnimationFrame(animationFrameId);
      carousel.removeEventListener('mouseenter', handleInteractStart);
      carousel.removeEventListener('mouseleave', handleInteractEnd);
      carousel.removeEventListener('touchstart', handleInteractStart);
      carousel.removeEventListener('touchend', handleInteractEnd);
    };
  }, []);

  const unitImages = [
    "https://i.imgur.com/JH7hHQ6.png",
    "https://i.imgur.com/ASKZH35.png",
    "https://i.imgur.com/2AmMerN.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUnitImageIndex((prev) => (prev + 1) % unitImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [unitImages.length]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.firstElementChild?.clientWidth || 350;
      carouselRef.current.scrollBy({ left: -(scrollAmount + 24), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.firstElementChild?.clientWidth || 350;
      carouselRef.current.scrollBy({ left: scrollAmount + 24, behavior: 'smooth' });
    }
  };

  const cityOptions = [
    { value: 'jardim-america', label: 'Jardim América' },
    { value: 'bueno', label: 'Setor Bueno' },
    { value: 'marista', label: 'Setor Marista' },
    { value: 'pedro-ludovico', label: 'Pedro Ludovico' },
    { value: 'campinas', label: 'Campinas' },
    { value: 'centro', label: 'Centro' },
  ];

  const modelOptions = [
    { value: 'leve', label: 'Carro de Passeio' },
    { value: 'suv', label: 'SUV / Caminhonete' },
    { value: 'moto', label: 'Moto' },
    { value: 'pesado', label: 'Caminhão / Ônibus' },
  ];

  const [whatsappNumber] = useState(() => {
    const numbers = ['5562993147640', '5562995251379'];
    return numbers[Math.floor(Math.random() * numbers.length)];
  });

  const getWhatsappLink = () => {
    let message = 'Olá, gostaria de conferir os preços';
    
    const cityMap: Record<string, string> = {
      'jardim-america': 'Jardim América',
      'bueno': 'Setor Bueno',
      'marista': 'Setor Marista',
      'pedro-ludovico': 'Pedro Ludovico',
      'campinas': 'Campinas',
      'centro': 'Centro'
    };

    const modelMap: Record<string, string> = {
      'leve': 'Carro de Passeio',
      'suv': 'SUV / Caminhonete',
      'moto': 'Moto',
      'pesado': 'Caminhão / Ônibus'
    };

    if (selectedCarModel) {
      message += ` para ${modelMap[selectedCarModel] || selectedCarModel}`;
    }
    
    if (selectedCity) {
      message += ` em ${cityMap[selectedCity] || selectedCity}`;
    }

    message += '\n\n🏷️ Vim do site mundialbaterias.com';

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const { scrollY, scrollYProgress } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const navPadding = useTransform(scrollY, [0, 100], ["1.5rem", "0.5rem"]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.8]);

  const [showButton, setShowButton] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.3) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  });

  useEffect(() => {
    // Sempre iniciar no modo claro quando o usuário entrar no site
    setIsDarkMode(false);
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0500] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-orange-900/40 dark:via-[#0a0500] dark:to-[#0a0500] text-slate-900 dark:text-white font-sans selection:bg-orange-600 selection:text-white relative transition-colors duration-300">
      {/* Noise Overlay */}
      <div 
        className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      ></div>

      {/* Floating Emergency Call Button */}
      <motion.a
        id="btn-floating-call"
        href={`tel:${whatsappNumber}`}
        aria-label="Ligar para socorro de baterias"
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: 150, opacity: 0 }
        }}
        animate={showButton ? "visible" : "hidden"}
        initial="hidden"
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed bottom-0 left-0 w-full z-[300] md:bottom-6 md:right-6 md:left-auto md:w-auto"
      >
        <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-700 py-5 md:py-4 md:px-6 md:rounded-full shadow-2xl hover:from-orange-600 hover:to-orange-800 transition-all group hover-electric-orange">
          <Phone className="w-6 h-6 md:w-8 md:h-8 text-white fill-current" />
          <div className="flex flex-col md:hidden">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80 leading-none mb-1">
              Socorro Rápido
            </span>
            <span className="text-sm font-black uppercase tracking-tighter text-white">
              Ligar Agora
            </span>
          </div>
          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/80">
              Emergência
            </span>
            <span className="text-xs font-black uppercase text-white">
              Ligar Agora
            </span>
          </div>
        </div>
      </motion.a>

      {/* Navigation */}
      <motion.nav 
        style={{ paddingTop: navPadding, paddingBottom: navPadding }}
        className="fixed top-0 left-0 w-full z-[100] transition-colors duration-500 ease-in-out translate-y-0 bg-white/95 dark:bg-[#0a0500]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/5 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <motion.img
              style={{ scale: logoScale, transformOrigin: "left center" }}
              alt="Mundial Baterias Logo"
              className="h-12 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://i.imgur.com/Aw08okd.png"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-slate-600 dark:text-gray-300">
            <a href="#" className="hover:text-orange-500 transition-colors uppercase">
              Início
            </a>
            <a
              href="#produtos"
              className="hover:text-orange-500 transition-colors uppercase"
            >
              Produtos
            </a>
            <a
              href="#unidades"
              className="hover:text-orange-500 transition-colors uppercase"
            >
              Lojas
            </a>
            <a
              href="#depoimentos"
              className="hover:text-orange-500 transition-colors uppercase"
            >
              Avaliações
            </a>
            <a
              href="#faq"
              className="hover:text-orange-500 transition-colors uppercase"
            >
              Dúvidas
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10 cursor-pointer"
              aria-label="Alternar tema"
            >
              <Sun className="w-4 h-4" />
            </button>
            <a
              id="btn-header-call"
              href={`tel:${whatsappNumber}`}
              className="flex items-center gap-2 text-white bg-orange-600 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-orange-600 transition-all duration-300 shadow-lg shadow-orange-600/20 border border-transparent hover:border-orange-600 hover-electric-orange"
            >
              <Phone className="w-3.5 h-3.5" /> Deseja Pedir por Telefone? Ligue: (62) 99314-7640
            </a>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10 cursor-pointer"
              aria-label="Alternar tema"
            >
              <Sun className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-slate-900 dark:text-white cursor-pointer"
              aria-label="Abrir menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[200] bg-slate-50 dark:bg-[#0a0500] transition-transform duration-500 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <img
              alt="Mundial Baterias Logo"
              className="h-12 w-auto object-contain"
              src="https://i.imgur.com/Aw08okd.png"
            />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 border border-slate-200 dark:border-white/10 rounded-full text-slate-900 dark:text-white cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          <div className="flex flex-col gap-8 text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white">
            <a href="#" onClick={() => setIsMenuOpen(false)}>
              INÍCIO
            </a>
            <a href="#produtos" onClick={() => setIsMenuOpen(false)}>
              PRODUTOS
            </a>
            <a href="#unidades" onClick={() => setIsMenuOpen(false)}>
              LOJAS
            </a>
            <a href="#depoimentos" onClick={() => setIsMenuOpen(false)}>
              AVALIAÇÕES
            </a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </a>
          </div>
          <div className="mt-auto pb-24 text-center">
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center md:items-start pb-20 md:pb-48 md:pt-28">
        <div className="w-full md:max-w-7xl md:mx-auto md:px-6 relative z-40">
          <div className="relative md:rounded-[40px] overflow-hidden bg-slate-900 shadow-2xl min-h-screen md:min-h-[600px] flex items-center">
            {/* Background Image/Video */}
            <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full overflow-hidden">
              <iframe 
                src="https://www.youtube.com/embed/IWRINHc5egM?autoplay=1&mute=1&loop=1&playlist=IWRINHc5egM&controls=0&showinfo=0&rel=0" 
                title="Mundial Baterias Video" 
                className="absolute top-1/2 left-1/2 w-[150vw] h-[84.37vw] min-h-[150vh] min-w-[266.66vh] -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none max-w-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

            {/* Content Overlay */}
            <div className="relative z-50 p-8 pt-32 pb-48 md:px-16 md:pb-16 md:pt-64 max-w-3xl">
              <div className="flex items-center gap-2 text-orange-500 font-bold text-xs tracking-[0.4em] mb-6 uppercase animate-in fade-in slide-in-from-left duration-700">
                <span className="w-8 h-[2px] bg-orange-500"></span>Loja de Baterias Especializada
              </div>
              <h1 className="text-3xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-8 italic uppercase text-white relative animate-in fade-in slide-in-from-left duration-700 delay-100">
                BATERIAS GOIÂNIA GO
                <br />
                <span className="text-orange-500 inline-flex items-center gap-2">
                  TROCA NA HORA!{' '}
                  <Zap className="w-8 h-8 md:w-12 md:h-12 fill-yellow-400 text-yellow-400 animate-pulse hidden md:block" />
                </span>
              </h1>
              <p className="text-gray-200 text-lg max-w-md mb-10 leading-relaxed animate-in fade-in slide-in-from-left duration-700 delay-200">
                Entrega e instalação gratuita de baterias em
                até 40 minutos em Goiânia e região.
              </p>
              <div className="flex flex-wrap gap-6 items-center animate-in fade-in slide-in-from-left duration-700 delay-300 relative z-30">
                <a
                  id="btn-hero-whatsapp"
                  href={getWhatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 text-white px-10 py-5 rounded-lg font-black italic tracking-widest hover:bg-white hover:text-orange-600 transition-all flex items-center gap-3 group shadow-lg shadow-orange-600/20 hover-electric-orange relative z-50"
                >
                  WHATSAPP RÁPIDO{' '}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Floating Search Widget */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] max-w-5xl bg-slate-50 dark:bg-[#120500]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-orange-900/30 p-8 md:p-10 animate-in fade-in zoom-in duration-700 delay-500 z-40">
            {/* Animated Energy Border */}
            <div className="energy-border-container">
              <div className="energy-border-spinner"></div>
            </div>
            
            <h2 className="text-center text-xl md:text-2xl font-black italic tracking-tight text-slate-900 dark:text-white mb-8 relative z-20">
              Peça de onde estiver e pague apenas na entrega!
            </h2>
            <div className="grid md:grid-cols-3 gap-6 relative z-20">
              <CustomSelect
                options={cityOptions}
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder="Selecione seu Bairro"
                icon={MapPin}
              />

              <CustomSelect
                options={modelOptions}
                value={selectedCarModel}
                onChange={setSelectedCarModel}
                placeholder="Modelo do Carro"
                icon={Car}
              />

              <a 
                id="btn-search-whatsapp"
                href={getWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-orange-600 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 hover-electric-orange"
              >
                Confira os preços
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Units Section */}
      <section id="unidades" className="relative z-30 pt-72 md:pt-40 pb-32 bg-white dark:bg-transparent">
        <FadeIn className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <div className="flex items-center gap-2 text-orange-500 font-bold text-xs tracking-[0.4em] mb-4 uppercase">
              <span className="w-8 h-[2px] bg-orange-500"></span>Onde Estamos
            </div>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">
              Nossas Unidades
            </h2>
          </div>
          <div className="max-w-5xl mx-auto">
            {/* Jardim América */}
            <div className="group relative bg-slate-50 dark:bg-[#120500] rounded-[40px] overflow-hidden border border-slate-200 dark:border-white/5 hover:border-orange-600/30 transition-all duration-500 shadow-2xl flex flex-col md:flex-row">
              <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-full overflow-hidden">
                {unitImages.map((img, index) => (
                  <img
                    key={img}
                    alt={`Loja Mundial Baterias Goiânia ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                      index === currentUnitImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    } group-hover:scale-110`}
                    src={img}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/80 dark:from-neutral-900 via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-6 left-6 bg-orange-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-10">
                  Loja Física
                </div>
                
                {/* Dots Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {unitImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentUnitImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentUnitImageIndex 
                          ? 'bg-orange-500 w-6' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Ir para imagem ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-6 text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                  Jardim América
                </h3>
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-1" />
                    <p className="text-slate-600 dark:text-gray-400 text-sm font-medium leading-relaxed">
                      Av. C, 231 - QD 521 LT 01 , N° 700 - Jardim América, Goiânia - GO
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-orange-600 shrink-0" />
                    <p className="text-slate-600 dark:text-gray-400 text-sm font-medium">
                      Seg a Sex: 08h às 18h <br />
                      Sáb das 08h as 14h
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-orange-600 shrink-0" />
                    <p className="text-slate-900 dark:text-white text-lg font-black tracking-tight">
                      (62) 99314-7640 <br />
                      (62) 99525-1379
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-neutral-900 transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Ver Mapa
                  </a>
                  <a
                    id="btn-jardim-america-whatsapp"
                    href={getWhatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 hover-electric-orange"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Parceiros Oficiais Section */}
      <section id="marcas" className="relative z-30 py-32 bg-slate-50 dark:bg-[#0a0500] border-y border-slate-200 dark:border-white/5 overflow-hidden">
        <FadeIn className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 text-orange-500 font-bold text-xs tracking-[0.4em] mb-4 uppercase">
              <span className="w-8 h-[2px] bg-orange-500"></span>Parceiros Oficiais<span className="w-8 h-[2px] bg-orange-500"></span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter italic uppercase mb-6 text-slate-900 dark:text-white">
              As Melhores Marcas
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-lg font-medium max-w-2xl mx-auto">
              Trabalhamos apenas com baterias certificadas e com garantia de fábrica. Escolha a marca de sua preferência e solicite um orçamento via WhatsApp.
            </p>
          </div>
        </FadeIn>

        <div className="relative group/carousel w-full mt-10">
          {/* Navigation Buttons */}
          <button 
            onClick={scrollBrandsLeft}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-neutral-800 p-3 rounded-full shadow-xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:text-orange-500 hover:border-orange-500 transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={scrollBrandsRight}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-neutral-800 p-3 rounded-full shadow-xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:text-orange-500 hover:border-orange-500 transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={brandsCarouselRef}
            className="flex overflow-x-auto gap-6 pb-12 pt-4 px-6 md:px-12 w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {batteryBrands.map((brand, index) => (
              <div key={index} className="w-[85vw] md:w-[400px] shrink-0 group bg-white dark:bg-[#120500] rounded-3xl p-6 border border-slate-200 dark:border-white/5 hover:border-orange-500/50 transition-all duration-300 shadow-xl flex flex-col h-full">
                  <div className="w-full h-48 bg-slate-100 dark:bg-white/5 rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute top-4 left-4 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full z-10">
                      {brand.tag}
                    </div>
                    <img src={brand.img} alt={`Bateria ${brand.name}`} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-xl" />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic text-slate-900 dark:text-white mb-3">{brand.name}</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm mb-8 flex-grow">
                    {brand.desc}
                  </p>
                  <a href={getWhatsappLink()} target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white transition-all text-center">
                    Consultar Valor
                  </a>
                </div>
              ))}
            </div>
          </div>
      </section>

      {/* Why Choose Mundial Baterias Section */}
      <section id="produtos" className="relative z-30 py-32 bg-white dark:bg-transparent">
        <FadeIn className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase text-slate-900 dark:text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 animate-text-energy inline-block">
                POR QUE ESCOLHER A MUNDIAL BATERIAS?
              </span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-lg font-medium">
              Confira os benefícios que fazem da Mundial Baterias a sua melhor escolha:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="flex gap-6">
              <div className="shrink-0">
                <Award className="w-12 h-12 text-orange-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">
                  Garantia de Fábrica
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  Oferecemos baterias com garantia de fábrica, garantindo a sua tranquilidade e segurança.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="shrink-0">
                <div className="relative">
                  <Shield className="w-12 h-12 text-orange-500" strokeWidth={1.5} />
                  <Zap className="w-5 h-5 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-current" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">
                  Alta Durabilidade
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  Trabalhamos com baterias de alta tecnologia que garantem maior durabilidade e desempenho para o seu veículo.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="shrink-0">
                <ThumbsUp className="w-12 h-12 text-orange-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">
                  As Melhores Marcas
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  Atendemos a exigências rigorosas de performance trabalhando apenas com as marcas líderes do mercado.
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-[21/9] md:aspect-[3/1] flex items-end justify-center group">
            {/* Energy Glow Effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute w-[60%] h-[60%] bg-orange-500/30 blur-[80px] rounded-full animate-pulse"></div>
              <div className="absolute w-[40%] h-[40%] bg-yellow-400/20 blur-[60px] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            <img 
              src="https://marvanbaterias.com.br/portal/wp-content/uploads/2018/04/capa_moura.png" 
              alt="Marcas de Baterias" 
              className="w-full h-full object-contain object-bottom hover:scale-105 transition-transform duration-700 relative z-10 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(249,115,22,0.6)]"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1200";
                e.currentTarget.className = "w-full h-full object-cover object-center opacity-80 relative z-10";
              }}
            />
          </div>
        </FadeIn>
      </section>

      {/* Testimonials Section */}
      <section
        id="depoimentos"
        className="relative z-30 py-32 bg-white dark:bg-transparent overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        <FadeIn className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 text-orange-500 font-bold text-xs tracking-[0.4em] mb-4 uppercase">
              <span className="w-8 h-[2px] bg-orange-500"></span>O que dizem sobre
              nós<span className="w-8 h-[2px] bg-orange-500"></span>
            </div>
            <h2 className="text-3xl md:text-7xl font-black tracking-tighter italic uppercase mb-6 text-slate-900 dark:text-white">
              Avaliações reais
            </h2>
            <div className="inline-flex items-center gap-4 bg-slate-100 dark:bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-slate-200 dark:border-white/10">
              <div className="flex text-yellow-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-xl font-black italic tracking-tight text-slate-900 dark:text-white">
                5.0 / 5 no Google
              </span>
            </div>
          </div>
          <div className="relative group/carousel">
            {/* Navigation Buttons */}
            <button 
              onClick={scrollLeft} 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 bg-white dark:bg-neutral-800 p-3 rounded-full shadow-xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:text-orange-500 hover:border-orange-500 transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={scrollRight} 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 bg-white dark:bg-neutral-800 p-3 rounded-full shadow-xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:text-orange-500 hover:border-orange-500 transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 px-4 -mx-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[
                {
                  name: 'Lucas Carvalho',
                  time: 'há uma semana',
                  text: '"Minha bateria falhou no meio do feriado. Chamei no WhatsApp, combinei rapidão e o cara apareceu em 15 minutos com uma bateria nova e a trocou ligeiramente. Recomendo muitíssimo!"',
                  img: 'https://i.pravatar.cc/150?u=lucas',
                },
                {
                  name: 'Victor Fernandes',
                  time: 'há 1 mês',
                  text: '"Fui atendido pelo Christian, ótimo atendimento, melhor preço que encontrei e ainda veio até minha residência fazer a troca na hora. Recomendo demais!"',
                  img: 'https://i.pravatar.cc/150?u=victor',
                },
                {
                  name: 'Jhany Martins',
                  time: 'há 2 meses',
                  text: '"Rapidez e eficiência! Resolveu o que precisava em poucos minutos com preço bom e justo. Pessoal muito educado e prestativo também. Indico muito!"',
                  img: 'https://i.pravatar.cc/150?u=jhany',
                },
                {
                  name: 'Thiago Oliveira',
                  time: 'há 3 meses',
                  text: '"Não é sobre o preço apesar que eles possuem o melhor preço do mercado, prestam um atendimento honesto e de grande excelência. Super atencioso no atendimento e tirou todas as dúvidas. Parabéns"',
                  img: 'https://i.pravatar.cc/150?u=thiago',
                },
                {
                  name: 'Marcello Spirandelli da Silva',
                  time: 'há 4 meses',
                  text: '"Todos bem atenciosos no atendimento e serviço. Foi rápido e sem problema. Além da troca da bateria ainda fizeram uma limpeza caprichada nos terminais e cabos. Também testaram se o alternador estava carregando."',
                  img: 'https://i.pravatar.cc/150?u=marcello',
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start shrink-0 group relative bg-slate-50 dark:bg-white/10 backdrop-blur-lg rounded-[32px] p-8 border border-slate-200 dark:border-white/10 hover:border-orange-600/30 dark:hover:border-white/20 transition-all duration-500 flex flex-col shadow-xl"
                >
                <div className="absolute top-8 right-8 text-slate-200 dark:text-white/5 group-hover:text-orange-600/10 dark:group-hover:text-orange-600/20 transition-colors duration-500">
                  <Quote className="w-12 h-12 fill-current" />
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <img
                      alt={`Avatar de ${review.name}`}
                      className="w-14 h-14 rounded-full border-2 border-white/20 object-cover"
                      src={review.img}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white dark:border-neutral-900">
                      <CircleCheckBig className="w-2.5 h-2.5 text-white fill-current" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-lg italic uppercase tracking-tighter leading-none mb-1 text-slate-900 dark:text-white">
                      {review.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                      {review.time}
                    </span>
                  </div>
                </div>
                <div className="flex text-yellow-500 gap-0.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-gray-200 text-sm leading-relaxed font-medium mb-8 flex-grow">
                  {review.text}
                </p>
                <div className="pt-6 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      ></path>
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-400">
                      Google Review
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-gray-500 group-hover:text-orange-600 dark:group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="relative z-30 py-32 bg-slate-50 dark:bg-transparent border-y border-slate-200 dark:border-white/5"
      >
        <FadeIn className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase text-slate-900 dark:text-white">
              Dúvidas sobre Baterias
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'Quanto tempo demora a entrega e instalação?',
                a: 'Nossa média de atendimento em horário comercial é de 30 a 50 minutos para toda a região metropolitana.',
              },
              {
                q: 'Vocês aceitam a bateria usada como base de troca?',
                a: 'Sim! Todos os preços anunciados já consideram a devolução da bateria inservível (base de troca).',
              },
              {
                q: 'Quais as formas de pagamento disponíveis?',
                a: 'Disponibilizamos várias opções de pagamento! Pagamentos à vista você ganha 5% de desconto (Sendo no dinheiro ou Pix) ou pague com o seu cartão de crédito e parcelamos em até 10x no cartão e o pagamento só é efetuado após instalação bem-sucedida da sua bateria, seja ela do seu carro ou caminhão.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openFaqIndex === index
                    ? 'bg-white dark:bg-[#120500] border-orange-500 dark:border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)]'
                    : 'bg-white dark:bg-[#120500]/50 border-slate-200 dark:border-white/5 hover:border-orange-500/30'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex justify-between items-center cursor-pointer"
                >
                  <h3 className={`font-bold text-lg italic uppercase tracking-tight transition-colors duration-300 ${
                    openFaqIndex === index 
                      ? 'text-orange-600 dark:text-orange-400' 
                      : 'text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400'
                  }`}>
                    {item.q}
                  </h3>
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    openFaqIndex === index 
                      ? 'bg-orange-100 dark:bg-orange-900/30 rotate-180' 
                      : 'bg-slate-100 dark:bg-white/5 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20'
                  }`}>
                    <ChevronDown
                      className={`w-5 h-5 transition-colors duration-300 ${
                        openFaqIndex === index 
                          ? 'text-orange-600 dark:text-orange-400' 
                          : 'text-slate-500 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400'
                      }`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/20 to-transparent mb-4"></div>
                        <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 dark:bg-[#050200] pt-32 pb-32 md:pb-12 border-t border-neutral-800 relative overflow-hidden transition-colors duration-300">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          <img 
            src="https://marcaspelomundo.com.br/wp-content/uploads/2023/05/moura.png" 
            alt="Background" 
            className="w-full h-full object-cover object-bottom"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <img
                  alt="Mundial Baterias Logo"
                  className="h-12 w-auto object-contain"
                  src="https://i.imgur.com/Aw08okd.png"
                />
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-10 font-medium italic">
                Sua distribuidora de baterias Moura e Heliar com entrega rápida
                na região.
              </p>
              <a
                id="btn-footer-call"
                href={`tel:${whatsappNumber}`}
                className="hidden md:inline-flex items-center gap-2 text-white bg-orange-600 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-orange-600 transition-all shadow-lg shadow-orange-600/20 hover-electric-orange"
              >
                <Phone className="w-3.5 h-3.5" /> Deseja Pedir por Telefone? Ligue: (62) 99314-7640
              </a>
            </div>
            <div>
              <h4 className="font-black mb-10 uppercase tracking-[0.3em] text-[10px] text-orange-500 italic">
                Serviços
              </h4>
              <ul className="space-y-4 text-sm text-neutral-400 font-bold uppercase tracking-widest">
                <li>Baterias de Carro</li>
                <li>Baterias de Moto</li>
                <li>Troca no Local</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-10 uppercase tracking-[0.3em] text-[10px] text-orange-500 italic">
                Socorro
              </h4>
              <ul className="space-y-4 text-sm text-neutral-400 font-bold uppercase tracking-widest">
                <li>
                  <a
                    href={getWhatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Rápido
                  </a>
                </li>
                <li>Teste Elétrico</li>
                <li>Regiões Atendidas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-10 uppercase tracking-[0.3em] text-[10px] text-orange-500 italic">
                Social
              </h4>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/people/Mundial-baterias/61552026774684" target="_blank" rel="noopener noreferrer" className="bg-neutral-800 border border-neutral-700 p-3 rounded-2xl hover:bg-orange-600 hover:text-white transition-all cursor-pointer text-neutral-400">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/mundialbateriasgo" target="_blank" rel="noopener noreferrer" className="bg-neutral-800 border border-neutral-700 p-3 rounded-2xl hover:bg-orange-600 hover:text-white transition-all cursor-pointer text-neutral-400">
                  <Instagram className="w-5 h-5" />
                </a>
                <div className="bg-neutral-800 border border-neutral-700 p-3 rounded-2xl hover:bg-orange-600 hover:text-white transition-all cursor-pointer text-neutral-400">
                  <Youtube className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-neutral-800 text-center text-[10px] text-neutral-500 font-black tracking-[0.3em] uppercase">
            <p>© 2024 MUNDIAL BATERIAS - OTIMIZADO PARA GOOGLE</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
