import React, { useState, useEffect } from "react";
import {
  Search,
  Layers,
  Palette,
  Cpu,
  ExternalLink,
  FileText,
  Mail,
  User,
  Briefcase,
  Clock,
  ArrowLeft,
  X,
  Menu,
  CheckCircle2,
  Phone,
  Compass,
  Sparkles,
  ExternalLink as LinkIcon,
  Linkedin,
  Instagram,
  Twitter
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  designerInfo,
  statsData,
  methodologySteps,
  projectsData,
  contactInfo
} from "./data";
import { Project } from "./types";

// دالة تحويل الأرقام الإنجليزية إلى أرقام عربية هندية للعرض في الواجهة
const toArabicDigits = (input: string | number): string => {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(input).replace(/[0-9]/g, (d) => arabicDigits[parseInt(d, 10)]);
};

// مصفوفة أيقونات منهجية العمل لتسهيل عرضها برمجياً وتلقائياً
const iconMap: Record<string, React.ComponentType<any>> = {
  Search,
  Layers,
  Palette,
  Cpu,
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // مراقبة التمرير لتغيير نمط شريط التنقل
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // منع التمرير في الصفحة الخلفية عند فتح المودال
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // نسخ البريد الإلكتروني بنقرة واحدة
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  // مهارات إضافية لعرضها في قسم نبذة عني لزيادة غنى التصميم
  const skillsList = [
    "تصميم واجهات المستخدم (UI)",
    "تخطيط تجربة المستخدم (UX)",
    "رسم المخططات الهيكلية (Wireframing)",
    "تصميم النماذج التفاعلية (Prototyping)",
    "أبحاث المستخدمين (User Research)",
    "هندسة المعلومات (Information Architecture)",
    "التيبوغرافيا والخط العربي الرقمي",
    "تصميم الأنظمة الرقمية (Design Systems)"
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#2D2D2D] flex flex-col selection:bg-[#EAE7E1] selection:text-[#2D2D2D] font-sans antialiased overflow-x-hidden">
      
      {/* 1. شريط التنقل (Navbar) الفخم ذو اللمسة الفنية */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FDFCFB]/90 backdrop-blur-md border-b border-[#EAE7E1] py-4 shadow-xs"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* الشعار والهوية الشخصية المحدثة بطابع فني */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
            id="nav-logo"
          >
            <div className="w-10 h-10 bg-[#EAE7E1] rounded-full overflow-hidden border border-[#EAE7E1] transition-transform duration-300 group-hover:scale-105 shadow-xs grayscale contrast-110 flex items-center justify-center">
              <img
                src={designerInfo.avatarUrl}
                alt={designerInfo.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#2D2D2D] leading-none text-base transition-colors duration-300">
                {designerInfo.name}
              </span>
            </div>
          </a>

          {/* أزرار التنقل السريع للأجهزة المكتبية (Desktop Links) */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium" id="desktop-nav">
            <a href="#home" className="relative text-[#8B8B7A] hover:text-[#2D2D2D] transition-colors duration-200 group/nav">الرئيسية<span className="absolute -bottom-1 right-0 left-0 h-px bg-[#2D2D2D] scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-right"></span></a>
            <a href="#about" className="relative text-[#8B8B7A] hover:text-[#2D2D2D] transition-colors duration-200 group/nav">نبذة عني<span className="absolute -bottom-1 right-0 left-0 h-px bg-[#2D2D2D] scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-right"></span></a>
            <a href="#methodology" className="relative text-[#8B8B7A] hover:text-[#2D2D2D] transition-colors duration-200 group/nav">منهجية العمل<span className="absolute -bottom-1 right-0 left-0 h-px bg-[#2D2D2D] scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-right"></span></a>
            <a href="#portfolio" className="relative text-[#8B8B7A] hover:text-[#2D2D2D] transition-colors duration-200 group/nav">مشاريعي<span className="absolute -bottom-1 right-0 left-0 h-px bg-[#2D2D2D] scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-right"></span></a>
            <a href="#contact" className="relative text-[#8B8B7A] hover:text-[#2D2D2D] transition-colors duration-200 group/nav">تواصل معي<span className="absolute -bottom-1 right-0 left-0 h-px bg-[#2D2D2D] scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-right"></span></a>
          </nav>

          {/* التسمية الفنية الجانبية والأجهزة المكتبية */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={designerInfo.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 text-xs font-semibold text-[#2D2D2D] border border-[#EAE7E1] rounded-xl hover:bg-[#F5F2EE] transition-colors duration-300 inline-flex items-center gap-1.5"
              id="nav-cv-button"
            >
              <FileText size={14} />
              <span>السيرة الذاتية</span>
            </motion.a>
          </div>

          {/* زر القائمة للهواتف (Mobile Menu Toggle) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#2D2D2D] hover:text-[#8B8B7A] transition-colors duration-200 focus:outline-hidden"
            aria-label="قائمة التنقل"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* قائمة التنقل للهواتف (Mobile Menu Overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] bg-[#FDFCFB] border-b border-[#EAE7E1] z-30 shadow-lg md:hidden py-6 px-6 flex flex-col gap-4"
            id="mobile-nav-panel"
          >
            <a
              href="#home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium py-2 border-b border-[#F2EEE9] text-[#2D2D2D]"
            >
              الرئيسية
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium py-2 border-b border-[#F2EEE9] text-[#2D2D2D]"
            >
              نبذة عني
            </a>
            <a
              href="#methodology"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium py-2 border-b border-[#F2EEE9] text-[#2D2D2D]"
            >
              منهجية العمل
            </a>
            <a
              href="#portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium py-2 border-b border-[#F2EEE9] text-[#2D2D2D]"
            >
              مشاريعي
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium py-2 text-[#2D2D2D]"
            >
              تواصل معي
            </a>
            <div className="pt-4 flex justify-center">
              <a
                href={designerInfo.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-3 bg-[#2D2D2D] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <FileText size={16} />
                <span>تحميل السيرة الذاتية (CV)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* محتوى الصفحة الرئيسي المنظم بهيكل فني رائع (Bento / Editorial Grid Layout) */}
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-24">
          
          {/* الجزء الأول: شبكة الترحيب والنبذة الفنية المتساوية تماماً */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:items-stretch" id="home">
            
            {/* العمود الأيسر: بطاقة المصمم الكبيرة المدمجة (Hero Profile Card) */}
            <div className="col-span-1 lg:col-span-4 flex flex-col">
              
              {/* بطاقة المصمم الملموسة الأنيقة */}
              <div className="bg-white p-8 rounded-[32px] border border-[#F2EEE9] shadow-sm flex flex-col justify-between h-full text-right relative overflow-hidden group transition-all duration-300 hover:shadow-md">
                
                <div className="flex flex-col gap-5">
                  {/* شارة توفر العمل الفنية */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 bg-[#F5F2EE] rounded-full text-[9px] font-bold text-[#8B8B7A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>متاح للعمل</span>
                  </div>

                  {/* صورة الأفاتار الشخصية الفاخرة المحدثة بفلتر تباين فني مذهل (Grayscale/Warm Editorial Style) */}
                  <div className="w-24 h-24 rounded-2xl bg-[#EAE7E1] overflow-hidden grayscale contrast-125 border border-[#EAE7E1] shadow-xs relative">
                    <img
                      src={designerInfo.avatarUrl}
                      alt={designerInfo.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* الاسم والمجال المهني */}
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8B8B7A] block">أهلاً بك</span>
                    <h1 className="text-2xl font-extrabold text-[#2D2D2D] leading-none">
                      {designerInfo.name}
                    </h1>
                    <h2 className="text-sm font-semibold text-[#8B8B7A] uppercase tracking-wider font-mono">
                      {designerInfo.title}
                    </h2>
                  </div>

                  {/* نص التعريف القصير للغاية */}
                  <p className="text-xs leading-relaxed text-[#6B6B5E] opacity-90 font-light">
                    {designerInfo.tagline}
                  </p>
                </div>

                {/* أزرار التحميل والتواصل المباشرة */}
                <div className="flex flex-col gap-2 mt-6">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    href={designerInfo.cvUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#2D2D2D] text-white py-3 px-6 rounded-xl text-center text-xs font-semibold hover:bg-[#1C1C17] transition-colors duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <FileText size={14} />
                    <span>عرض السيرة الذاتية (CV)</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    href="#contact"
                    className="border border-[#EAE7E1] text-[#2D2D2D] py-2.5 px-6 rounded-xl text-center text-xs font-semibold hover:bg-[#F5F2EE] transition-colors duration-300"
                  >
                    تواصل معي
                  </motion.a>
                </div>
              </div>

            </div>

            {/* العمود الأيمن: النبذة الموسعة */}
            <div className="col-span-1 lg:col-span-8 flex flex-col">
              
              {/* بطاقة نبذة عني المنسقة بطابع الأوراق الفنية الرقيقة */}
              <div id="about" className="bg-white p-8 rounded-[32px] border border-[#F2EEE9] shadow-sm flex flex-col justify-between h-full text-right">
                <div>
                  <div className="flex justify-between items-center border-b border-[#F2EEE9] pb-4 mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#8B8B7A]">نبذة تعريفيّة</h2>
                    <Sparkles size={16} className="text-[#8B8B7A]" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold text-[#2D2D2D] leading-snug">
                      أصنع تجارب رقمية بسيطة، بديهية، ومفعمة بالجمال البصري المريح للعين.
                    </h3>
                    <p className="text-xs md:text-sm text-[#6B6B5E] leading-relaxed font-light">
                      {designerInfo.bio}
                    </p>
                    <p className="text-xs md:text-sm text-[#6B6B5E] leading-relaxed font-light">
                      أركز دائماً على وضع المستخدم البشري في مركز كل قرار تصميمي، ملتزماً بأعلى معايير التيبوغرافيا المعاصرة والتنسيق البصري المتقن لمختلف اللغات.
                    </p>
                  </div>
                </div>

                {/* قائمة المهارات بشكل فني أنيق هادئ */}
                <div className="pt-6 border-t border-[#F2EEE9] mt-6">
                  <h4 className="text-xs font-bold text-[#2D2D2D] mb-3">مجالات التركيز والاهتمام:</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 bg-[#FAF9F6] border border-[#F2EEE9] text-[10px] font-bold text-[#6B6B5E] rounded-lg transition-all duration-200 hover:border-[#8B8B7A] hover:bg-[#F5F2EE] hover:text-[#2D2D2D] hover:-translate-y-0.5 active:border-[#8B8B7A] active:bg-[#F5F2EE] active:text-[#2D2D2D] active:scale-95 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* قسم الإحصائيات السريعة بأسلوب فني ترابي فاخر ومحاذي تماماً - بعرض الصفحة بالكامل */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="quick-stats-grid">
            {statsData.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-white py-5 px-6 rounded-[24px] text-center border border-[#F2EEE9] shadow-sm transition-all duration-300 hover:border-[#8B8B7A] hover:scale-[1.02] active:border-[#8B8B7A] active:scale-[1.02] flex flex-col justify-center items-center gap-1"
              >
                <div className="text-3xl font-black text-[#2D2D2D] tracking-tight">{toArabicDigits(stat.value)}</div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-[#8B8B7A]">{stat.label}</div>
                <div className="text-[11px] text-[#8B8B7A]/80 leading-relaxed font-light max-w-[220px]">{stat.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* الجزء 1.5: منهجية العمل الاحترافية والمستوحاة من الفن البسيط */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            id="methodology" className="bg-white p-8 md:p-12 rounded-[32px] border border-[#F2EEE9] shadow-sm flex flex-col gap-8 text-right">
            <div className="flex justify-between items-center border-b border-[#F2EEE9] pb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#8B8B7A]">منهجية التصميم والعمل</h2>
              <span className="text-[10px] font-mono text-[#8B8B7A]/60">خطوات التصميم</span>
            </div>

            {/* شبكة الخطوات برسم رقمي وخطوط رقيقة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodologySteps.map((step, idx) => {
                const IconComponent = iconMap[step.iconName] || Search;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                    className="flex flex-col gap-4 group p-4 -m-4 rounded-2xl transition-all duration-300 hover:bg-[#FAF9F6] hover:-translate-y-1 active:bg-[#FAF9F6] active:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black italic text-[#8B8B7A] opacity-20 group-hover:opacity-60 transition-opacity font-mono">
                        {toArabicDigits(step.number)}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#F5F2EE] text-[#8B8B7A] flex items-center justify-center group-hover:bg-[#2D2D2D] group-hover:text-white transition-all duration-300">
                        <IconComponent size={18} />
                      </div>
                    </div>
                    <h3 className="font-bold text-sm text-[#2D2D2D]">{step.title}</h3>
                    <p className="text-xs text-[#6B6B5E] opacity-90 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* الجزء الثاني: شبكة المشاريع معرض الأعمال */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            id="portfolio" className="bg-white p-8 md:p-12 rounded-[32px] border border-[#F2EEE9] shadow-sm flex flex-col gap-8 md:gap-10 text-right">
            
            <div className="flex justify-between items-end border-b border-[#F2EEE9] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#8B8B7A] uppercase tracking-widest block">مشاريع مختارة</span>
                <h2 className="text-xl font-black text-[#2D2D2D]">آخر الأعمال ودراسات الحالة</h2>
              </div>
              <a href="https://www.behance.net/badranuxui" target="_blank" rel="noreferrer" className="text-xs border-b border-[#2D2D2D] pb-0.5 font-bold hover:text-[#8B8B7A] hover:border-[#8B8B7A] transition-colors">
                مشاهدة الجميع على Behance
              </a>
            </div>

            {/* بطاقة عرض المشروع الواحد الحالية مع تعزيز التفاعل بالكامل وتماشيها مع التصميم الفني */}
            <div id="portfolio-container" className="space-y-10">
              {projectsData.map((project, projIdx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: projIdx * 0.12, ease: "easeOut" }}
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveGalleryIndex(0);
                  }}
                  className="group relative bg-[#F9F8F6] rounded-2xl border border-[#F2EEE9] overflow-hidden flex flex-col md:flex-row cursor-pointer transition-all duration-300 hover:border-[#8B8B7A] hover:shadow-lg hover:-translate-y-1 active:border-[#8B8B7A] active:shadow-lg active:-translate-y-1 active:scale-[0.99]"
                >
                  
                  {/* قسم الصورة الأيسر الفاخر */}
                  <div className="w-full md:w-1/2 bg-[#EAE7E1] aspect-video md:aspect-auto relative overflow-hidden">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#2D2D2D]/10 group-hover:bg-transparent group-active:bg-transparent transition-all duration-300"></div>
                  </div>

                  {/* قسم المعلومات وتفاصيل المشروع */}
                  <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
                    <div>
                      {/* علامات التصنيف */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tags.slice(0, 2).map((tag, tIdx) => (
                          <span key={tIdx} className="text-[9px] font-mono font-bold uppercase text-[#8B8B7A] bg-[#F5F2EE] px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* العناوين */}
                      <h3 className="text-xl font-bold text-[#2D2D2D] mb-1 group-hover:text-[#8B8B7A] group-active:text-[#8B8B7A] transition-colors">
                        {project.title}
                      </h3>
                      <h4 className="text-xs font-semibold text-[#8B8B7A] mb-3 leading-snug">
                        {project.subtitle}
                      </h4>
                      <p className="text-xs text-[#6B6B5E] leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>

                    {/* التذييل التفاعلي للبطاقة */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#F2EEE9]">
                      <div className="flex items-center gap-3 text-[10px] text-[#8B8B7A] flex-wrap">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock size={12} className="shrink-0" />
                          <span>{toArabicDigits(project.duration)}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={12} className="shrink-0" />
                          <span>مكتمل</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="w-full sm:w-auto text-[11px] font-bold px-4 py-2 bg-white border border-[#EAE7E1] rounded-lg group-hover:bg-[#2D2D2D] group-hover:text-white transition-all cursor-pointer whitespace-nowrap">
                          تصفح تفاصيل التصميم
                        </button>
                      </div>
                    </div>

                  </div>

                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* الجزء الثالث: شبكة قنوات التواصل المباشرة الفخمة والمنظمة بأسلوب مدمج مريح للعين */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            id="contact" className="space-y-8">
            <div className="text-right pb-1">
              <span className="text-[10px] font-bold text-[#8B8B7A] uppercase tracking-widest block">دعنا نعمل معاً</span>
              <h2 className="text-2xl font-black text-[#2D2D2D]">تواصل معي مباشرة</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="contact-bento-grid">
              
              {/* بطاقة البريد الإلكتروني الكبيرة والمهيبة */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="col-span-1 lg:col-span-5 bg-white p-8 rounded-[32px] border border-[#F2EEE9] flex flex-col justify-between text-right shadow-xs group min-h-[260px]" id="email-bento-card">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F2EE] text-[#2D2D2D] flex items-center justify-center transition-all duration-300 group-hover:bg-[#2D2D2D] group-hover:text-white">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#2D2D2D]">البريد الإلكتروني المباشر</h3>
                    <p className="text-xs text-[#8B8B7A] leading-relaxed mt-1">
                      أستقبل جميع عروض العمل والمشاريع الإبداعية عبر الإيميل، وسأرد عليك في غضون ٢٤ ساعة.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF9F6] p-3 rounded-2xl border border-[#F2EEE9] hover:border-[#8B8B7A] transition-all relative">
                  <span className="text-xs font-mono text-[#2D2D2D] select-all font-bold break-all sm:break-normal" dir="ltr">
                    {contactInfo.email}
                  </span>
                  
                  <button
                    onClick={handleCopyEmail}
                    className="text-[10px] font-bold bg-[#2D2D2D] text-white px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#8B8B7A] transition-all relative w-full sm:w-auto whitespace-nowrap shrink-0"
                  >
                    {copiedEmail ? "تم النسخ!" : "نسخ الإيميل"}
                  </button>

                  <AnimatePresence>
                    {copiedEmail && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2D2D2D] text-white text-[9px] font-medium px-2 py-1 rounded shadow-xs whitespace-nowrap"
                      >
                        تم نسخ البريد!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* شبكة قنوات التواصل المباشرة الأخرى */}
              <div className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4" id="social-bento-subgrid">
                
                {/* WhatsApp */}
                <motion.a
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.0, ease: "easeOut" }}
                  href={contactInfo.whatsapp.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-6 rounded-[24px] border border-[#F2EEE9] flex items-center justify-between hover:border-emerald-500 hover:shadow-sm hover:-translate-y-0.5 active:border-emerald-500 active:shadow-sm active:scale-[0.98] transition-all duration-300 group text-right"
                  id="whatsapp-bento-link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8F8F0] text-emerald-600 flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white group-active:bg-emerald-500 group-active:text-white">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#8B8B7A] block">واتساب مباشرة</span>
                      <span className="text-xs font-bold text-[#2D2D2D] tracking-tighter block font-mono mt-0.5" dir="ltr">
                        {toArabicDigits(contactInfo.whatsapp.number)}
                      </span>
                    </div>
                  </div>
                  <ArrowLeft size={14} className="text-[#8B8B7A] opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
                  href="https://linkedin.com/in/badranuxui"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-6 rounded-[24px] border border-[#F2EEE9] flex items-center justify-between hover:border-sky-600 hover:shadow-sm hover:-translate-y-0.5 active:border-sky-600 active:shadow-sm active:scale-[0.98] transition-all duration-300 group text-right"
                  id="linkedin-bento-link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E6F3FB] text-sky-600 flex items-center justify-center transition-all duration-300 group-hover:bg-sky-600 group-hover:text-white group-active:bg-sky-600 group-active:text-white">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#8B8B7A] block">لينكد إن</span>
                      <span className="text-xs font-bold text-[#2D2D2D] block mt-0.5">
                        أحمد بدران
                      </span>
                    </div>
                  </div>
                  <ArrowLeft size={14} className="text-[#8B8B7A] opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                </motion.a>

                {/* Behance */}
                <motion.a
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
                  href="https://www.behance.net/badranuxui"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-6 rounded-[24px] border border-[#F2EEE9] flex items-center justify-between hover:border-blue-600 hover:shadow-sm hover:-translate-y-0.5 active:border-blue-600 active:shadow-sm active:scale-[0.98] transition-all duration-300 group text-right"
                  id="behance-bento-link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E6EEFC] text-blue-600 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-active:bg-blue-600 group-active:text-white">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#8B8B7A] block">معرض أعمال بيهانس</span>
                      <span className="text-xs font-bold text-[#2D2D2D] block mt-0.5" dir="ltr">
                        @badranuxui
                      </span>
                    </div>
                  </div>
                  <ArrowLeft size={14} className="text-[#8B8B7A] opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                </motion.a>

                {/* Twitter / X */}
                <motion.a
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
                  href="https://x.com/badranuxui"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-6 rounded-[24px] border border-[#F2EEE9] flex items-center justify-between hover:border-[#1C1C17] hover:shadow-sm hover:-translate-y-0.5 active:border-[#1C1C17] active:shadow-sm active:scale-[0.98] transition-all duration-300 group text-right"
                  id="twitter-bento-link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5F2EE] text-neutral-900 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1C1C17] group-hover:text-white group-active:bg-[#1C1C17] group-active:text-white">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#8B8B7A] block">منصة إكس / Twitter</span>
                      <span className="text-xs font-bold text-[#2D2D2D] block mt-0.5" dir="ltr">
                        @badranuxui
                      </span>
                    </div>
                  </div>
                  <ArrowLeft size={14} className="text-[#8B8B7A] opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                </motion.a>

                {/* Instagram */}
                <motion.a
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
                  href="https://instagram.com/badranuxui"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-6 rounded-[24px] border border-[#F2EEE9] flex items-center justify-between hover:border-pink-500 hover:shadow-sm hover:-translate-y-0.5 active:border-pink-500 active:shadow-sm active:scale-[0.98] transition-all duration-300 group text-right sm:col-span-2"
                  id="instagram-bento-link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FDF0F4] text-pink-600 flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-red-500 group-hover:to-pink-600 group-hover:text-white group-active:bg-gradient-to-tr group-active:from-amber-500 group-active:via-red-500 group-active:to-pink-600 group-active:text-white">
                      <Instagram size={20} />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#8B8B7A] block">منصة إنستجرام</span>
                      <span className="text-xs font-bold text-[#2D2D2D] block mt-0.5" dir="ltr">
                        @badranuxui
                      </span>
                    </div>
                  </div>
                  <ArrowLeft size={14} className="text-[#8B8B7A] opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                </motion.a>

              </div>
            </div>
          </motion.div>

        </div>
      </main>

      {/* تذييل الصفحة الفني البسيط والمدمج */}
      <footer className="mt-16 py-8 border-t border-[#EAE7E1] bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8B8B7A]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#2D2D2D]">{designerInfo.name}</span>
            <span className="opacity-50">|</span>
            <span>تصميم واجهات وتجربة المستخدم</span>
          </div>
          <div className="font-mono text-[10px] opacity-70">
            ٢٠٢٦ © جميع الحقوق محفوظة
          </div>
        </div>
      </footer>

      {/* المودال المطور الفخم المتوافق بالكامل مع الهوية الفنية (Project Details Modal) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="project-modal">
            {/* الخلفية المظللة البلورية الهادئة */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-[#1C1C17]/60 backdrop-blur-xs cursor-pointer"
            />

            {/* محتوى المودال الأنيق */}
            <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="relative bg-[#FDFCFB] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-[#EAE7E1] text-right z-10 flex flex-col max-h-[90vh]"
              >
                
                {/* رأس المودال والأزرار السريعة */}
                <div className="p-5 border-b border-[#F2EEE9] bg-[#FDFCFB] flex items-center justify-between sticky top-0 z-10">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full hover:bg-[#F5F2EE] text-[#8B8B7A] hover:text-[#2D2D2D] transition-colors cursor-pointer"
                    aria-label="إغلاق التفاصيل"
                    id="close-modal-button"
                  >
                    <X size={20} />
                  </button>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B8B7A]">
                    مسيرة تصميم ودراسة حالة
                  </h2>
                </div>

                {/* المحتوى القابل للتمرير للمودال */}
                <div className="overflow-y-auto p-6 md:p-8 space-y-8 flex-grow">
                  
                  {/* الرأس الفني والمهني للمشروع */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#F5F2EE] border border-[#EAE7E1] text-[#8B8B7A] rounded-md text-[10px] font-bold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-[#2D2D2D]">
                      {selectedProject.title}
                    </h3>
                    <p className="text-sm text-[#8B8B7A] font-semibold">
                      {selectedProject.subtitle}
                    </p>
                  </div>

                  {/* بطاقة معلومات سريعة عن العمل والمدة */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F5F2EE] border border-[#EAE7E1] rounded-2xl">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-white rounded-xl text-[#8B8B7A] mt-0.5 shadow-xxs">
                        <User size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#2D2D2D]">الدور والمسؤولية:</h4>
                        <p className="text-xs text-[#6B6B5E] leading-normal font-light">{selectedProject.role}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-white rounded-xl text-[#8B8B7A] mt-0.5 shadow-xxs">
                        <Clock size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#2D2D2D]">مدة دورة العمل:</h4>
                        <p className="text-xs text-[#6B6B5E] leading-normal font-light">{toArabicDigits(selectedProject.duration)}</p>
                      </div>
                    </div>
                  </div>

                  {/* معرض الصور التفاعلي الفاخر (Interactive Photo Gallery) */}
                  <div className="space-y-4" id="project-gallery">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B8B7A]">معرض واجهات وتدفقات التصميم</h4>
                    
                    {/* الصورة النشطة المعروضة حالياً - تم ضبط الحجم والارتفاع ليكون مريحاً ومناسباً لجميع الشاشات دون قص */}
                    <div className="w-full max-h-[460px] h-[240px] sm:h-[340px] md:h-[420px] rounded-2xl overflow-hidden bg-[#FAF9F6] border border-[#EAE7E1] relative flex items-center justify-center p-2 sm:p-4 shadow-inner">
                      <img
                        src={selectedProject.galleryImages[activeGalleryIndex]}
                        alt={`شاشة ${activeGalleryIndex + 1} للمشروع`}
                        className="max-w-full max-h-full object-contain transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* ترقيم الصور المكتوب */}
                      <div className="absolute bottom-4 left-4 bg-[#2D2D2D]/85 backdrop-blur-xs text-white text-xxs px-3 py-1.5 rounded-lg font-mono font-bold shadow-xs">
                        {toArabicDigits(activeGalleryIndex + 1)} / {toArabicDigits(selectedProject.galleryImages.length)}
                      </div>
                    </div>

                    {/* الصور المصغرة للتنقل بين الصور */}
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProject.galleryImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveGalleryIndex(idx)}
                          className={`aspect-video rounded-xl overflow-hidden border-2 transition-all duration-200 bg-[#FAF9F6] cursor-pointer relative group/thumb ${
                            activeGalleryIndex === idx
                              ? "border-[#2D2D2D] scale-[1.01] shadow-xs"
                              : "border-transparent opacity-70 hover:opacity-100 hover:border-[#8B8B7A]"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`صورة مصغرة ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* النصوص العميقة: التحدي والحل */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#F2EEE9]">
                    
                    {/* قسم التحدي */}
                    <div className="space-y-3 p-6 bg-[#F5F2EE]/40 border border-[#F2EEE9] rounded-2xl">
                      <h4 className="text-xs font-bold text-[#2D2D2D] uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B8B7A]"></span>
                        <span>1. التحديات وعقبات تجربة المستخدم</span>
                      </h4>
                      <p className="text-xs md:text-sm text-[#6B6B5E] leading-relaxed font-light">
                        {selectedProject.challenge}
                      </p>
                    </div>

                    {/* قسم الحل المقترح */}
                    <div className="space-y-3 p-6 bg-white border border-[#F2EEE9] rounded-2xl">
                      <h4 className="text-xs font-bold text-[#8B8B7A] uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D2D2D]"></span>
                        <span>2. الحلول المقترحة واللمسات الجمالية</span>
                      </h4>
                      <p className="text-xs md:text-sm text-[#6B6B5E] leading-relaxed font-light">
                        {selectedProject.solution}
                      </p>
                    </div>

                  </div>

                  {/* دعوة للإجراء الخارجي في ذيل تفاصيل المودال */}
                  <div className="pt-6 border-t border-[#F2EEE9] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-[10px] text-[#8B8B7A] leading-normal font-light">
                      * للاطلاع على كافة النماذج السلوكية التفاعلية ومخططات خرائط تدفق المستخدم، يرجى التوجه لدراسة الحالة المفصلة على منصة Behance.
                    </p>
                    
                    {selectedProject.behanceUrl ? (
                      <a
                        href={selectedProject.behanceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 bg-[#2D2D2D] hover:bg-[#1C1C17] text-white font-medium text-xs rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 cursor-pointer shadow-sm"
                        id="visit-behance-button"
                      >
                        <LinkIcon size={14} />
                        <span>دراسة الحالة كاملة على Behance</span>
                      </a>
                    ) : (
                      <span
                        className="px-6 py-3 bg-[#F5F2EE] text-[#8B8B7A] font-medium text-xs rounded-xl inline-flex items-center justify-center gap-2 shadow-sm cursor-default whitespace-nowrap"
                        id="behance-pending-label"
                      >
                        <Clock size={14} />
                        <span>البريزنتيشن لسه قيد التجهيز</span>
                      </span>
                    )}
                  </div>

                </div>

              </motion.div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
