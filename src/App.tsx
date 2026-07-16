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
  MessageCircle,
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
              <span className="font-bold text-[#2D2D2D] leading-none text-base group-hover:text-[#8B8B7A] transition-colors duration-300">
                {designerInfo.name}
              </span>
            </div>
          </a>

          {/* أزرار التنقل السريع للأجهزة المكتبية (Desktop Links) */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium opacity-70" id="desktop-nav">
            <a href="#home" className="hover:text-[#8B8B7A] hover:opacity-100 transition-all duration-200">الرئيسية</a>
            <a href="#about" className="hover:text-[#8B8B7A] hover:opacity-100 transition-all duration-200">نبذة عني</a>
            <a href="#methodology" className="hover:text-[#8B8B7A] hover:opacity-100 transition-all duration-200">منهجية العمل</a>
            <a href="#portfolio" className="hover:text-[#8B8B7A] hover:opacity-100 transition-all duration-200">مشاريعي</a>
            <a href="#contact" className="hover:text-[#8B8B7A] hover:opacity-100 transition-all duration-200">تواصل معي</a>
          </nav>

          {/* التسمية الفنية الجانبية والأجهزة المكتبية */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-[10px] font-mono text-[#8B8B7A] opacity-60 uppercase tracking-widest">
              {contactInfo.username} // 2026
            </span>
            <a
              href={designerInfo.cvUrl}
              className="px-5 py-2 text-xs font-semibold text-[#2D2D2D] border border-[#EAE7E1] rounded-xl hover:bg-[#F5F2EE] transition-all duration-300 inline-flex items-center gap-1.5"
              id="nav-cv-button"
            >
              <FileText size={14} />
              <span>السيرة الذاتية</span>
            </a>
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
              <div className="bg-white p-8 rounded-[32px] border border-[#F2EEE9] shadow-sm flex flex-col justify-between h-full text-right relative overflow-hidden group">
                
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
                    <h1 className="text-3xl font-extrabold text-[#2D2D2D] leading-none">
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
                  <a
                    href={designerInfo.cvUrl}
                    className="bg-[#2D2D2D] text-white py-3 px-6 rounded-xl text-center text-xs font-semibold hover:bg-[#1C1C17] transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <FileText size={14} />
                    <span>عرض السيرة الذاتية (CV)</span>
                  </a>
                  <a
                    href="#contact"
                    className="border border-[#EAE7E1] text-[#2D2D2D] py-2.5 px-6 rounded-xl text-center text-xs font-semibold hover:bg-[#F5F2EE] transition-all duration-300"
                  >
                    تواصل معي
                  </a>
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
                        className="px-3.5 py-1.5 bg-[#FAF9F6] border border-[#F2EEE9] text-[10px] font-bold text-[#6B6B5E] rounded-lg transition-colors hover:border-[#8B8B7A]"
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
              <div
                key={idx}
                className="bg-white py-5 px-6 rounded-[24px] text-center border border-[#F2EEE9] shadow-sm transition-all duration-300 hover:border-[#8B8B7A] hover:scale-[1.02] flex flex-col justify-center items-center gap-1"
              >
                <div className="text-3xl font-black text-[#2D2D2D] tracking-tight">{stat.value}</div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-[#8B8B7A]">{stat.label}</div>
                <div className="text-[11px] text-[#8B8B7A]/80 leading-relaxed font-light max-w-[220px]">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* الجزء 1.5: منهجية العمل الاحترافية والمستوحاة من الفن البسيط */}
          <div id="methodology" className="bg-white p-8 md:p-12 rounded-[32px] border border-[#F2EEE9] shadow-sm flex flex-col gap-8 text-right">
            <div className="flex justify-between items-center border-b border-[#F2EEE9] pb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#8B8B7A]">منهجية التصميم والعمل</h2>
              <span className="text-[10px] font-mono text-[#8B8B7A]/60">خطوات التصميم</span>
            </div>

            {/* شبكة الخطوات برسم رقمي وخطوط رقيقة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodologySteps.map((step, idx) => {
                const IconComponent = iconMap[step.iconName] || Search;
                return (
                  <div key={idx} className="flex flex-col gap-4 group">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black italic text-[#8B8B7A] opacity-20 group-hover:opacity-60 transition-opacity font-mono">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#F5F2EE] text-[#8B8B7A] flex items-center justify-center group-hover:bg-[#2D2D2D] group-hover:text-white transition-all duration-300">
                        <IconComponent size={18} />
                      </div>
                    </div>
                    <h3 className="font-bold text-sm text-[#2D2D2D]">{step.title}</h3>
                    <p className="text-xs text-[#6B6B5E] opacity-90 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* الجزء الثاني: شبكة المشاريع معرض الأعمال */}
          <div id="portfolio" className="bg-white p-8 md:p-12 rounded-[32px] border border-[#F2EEE9] shadow-sm flex flex-col gap-8 md:gap-10 text-right">
            
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
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveGalleryIndex(0);
                  }}
                  className="group relative bg-[#F9F8F6] rounded-2xl border border-[#F2EEE9] overflow-hidden flex flex-col md:flex-row cursor-pointer transition-all duration-300 hover:border-[#8B8B7A] hover:shadow-md"
                >
                  
                  {/* قسم الصورة الأيسر الفاخر */}
                  <div className="w-full md:w-1/2 bg-[#EAE7E1] aspect-video md:aspect-auto relative overflow-hidden">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#2D2D2D]/10 group-hover:bg-transparent transition-all duration-300"></div>
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
                      <h3 className="text-xl font-bold text-[#2D2D2D] mb-1 group-hover:text-[#8B8B7A] transition-colors">
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
                    <div className="flex items-center justify-between pt-4 border-t border-[#F2EEE9]">
                      <div className="flex items-center gap-3 text-[10px] text-[#8B8B7A]">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock size={12} />
                          <span>{project.duration}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          <span>مكتمل</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="text-[11px] font-bold px-4 py-2 bg-white border border-[#EAE7E1] rounded-lg group-hover:bg-[#2D2D2D] group-hover:text-white transition-all cursor-pointer">
                          تصفح تفاصيل التصميم
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* الجزء الثالث: شبكة قنوات التواصل المباشرة الفخمة والمنظمة بأسلوب مدمج مريح للعين */}
          <div id="contact" className="space-y-8">
            <div className="text-right pb-1">
              <span className="text-[10px] font-bold text-[#8B8B7A] uppercase tracking-widest block">دعنا نعمل معاً</span>
              <h2 className="text-2xl font-black text-[#2D2D2D]">تواصل معي مباشرة</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="contact-bento-grid">
              
              {/* بطاقة البريد الإلكتروني الكبيرة والمهيبة */}
              <div className="col-span-1 lg:col-span-5 bg-white p-8 rounded-[32px] border border-[#F2EEE9] flex flex-col justify-between text-right shadow-xs group min-h-[260px]" id="email-bento-card">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F2EE] text-[#2D2D2D] flex items-center justify-center transition-all duration-300 group-hover:bg-[#2D2D2D] group-hover:text-white">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#2D2D2D]">البريد الإلكتروني المباشر</h3>
                    <p className="text-xs text-[#8B8B7A] leading-relaxed mt-1">
                      أستقبل جميع عروض العمل والمشاريع الإبداعية عبر الإيميل، وسأرد عليك في غضون 24 ساعة.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between gap-3 bg-[#FAF9F6] p-3 rounded-2xl border border-[#F2EEE9] hover:border-[#8B8B7A] transition-all relative">
                  <span className="text-xs font-mono text-[#2D2D2D] select-all font-bold" dir="ltr">
                    {contactInfo.email}
                  </span>
                  
                  <button
                    onClick={handleCopyEmail}
                    className="text-[10px] font-bold bg-[#2D2D2D] text-white px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#8B8B7A] transition-all relative"
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
              </div>

              {/* شبكة قنوات التواصل المباشرة الأخرى */}
              <div className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4" id="social-bento-subgrid">
                
                {/* WhatsApp */}
                <a
                  href={contactInfo.whatsapp.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-6 rounded-[24px] border border-[#F2EEE9] flex items-center justify-between hover:border-emerald-500 hover:shadow-xs transition-all duration-300 group text-right"
                  id="whatsapp-bento-link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8F8F0] text-emerald-600 flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#8B8B7A] block">واتساب مباشرة</span>
                      <span className="text-xs font-bold text-[#2D2D2D] tracking-tighter block font-mono mt-0.5" dir="ltr">
                        {contactInfo.whatsapp.number}
                      </span>
                    </div>
                  </div>
                  <ArrowLeft size={14} className="text-[#8B8B7A] opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/badranuxui"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-6 rounded-[24px] border border-[#F2EEE9] flex items-center justify-between hover:border-sky-600 hover:shadow-xs transition-all duration-300 group text-right"
                  id="linkedin-bento-link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E6F3FB] text-sky-600 flex items-center justify-center transition-all duration-300 group-hover:bg-sky-600 group-hover:text-white">
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
                </a>

                {/* Behance */}
                <a
                  href="https://www.behance.net/badranuxui"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-6 rounded-[24px] border border-[#F2EEE9] flex items-center justify-between hover:border-blue-600 hover:shadow-xs transition-all duration-300 group text-right"
                  id="behance-bento-link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E6EEFC] text-blue-600 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M22 10.7h-5.2v1h5.2v-1zm-11.4 1.8c.4 0 .8-.1 1.1-.3.3-.2.5-.5.6-1 .1-.4.1-1 0-1.4-.1-.4-.3-.7-.6-.9-.3-.2-.7-.3-1.1-.3H8.3v3.9h2.3zm.2 4.4c.5 0 .9-.1 1.3-.3.3-.2.6-.5.7-1 .1-.4.2-1 .1-1.5-.1-.4-.3-.8-.6-1-.3-.2-.7-.3-1.2-.3H8.3v4.1h2.5zm6.5-4.4c.3 0 .6.1.8.2.2.1.4.3.5.6.1.3.1.7.1 1.1h-2.9c0-.4.1-.7.2-1 .1-.3.3-.5.5-.6.2-.2.5-.3.8-.3zm5.7-2.1c-.8-.9-1.9-1.4-3.3-1.4-1.5 0-2.6.5-3.4 1.4-.8.9-1.2 2.2-1.2 3.8 0 1.5.4 2.8 1.2 3.7.8.9 1.9 1.4 3.3 1.4 1.1 0 2-.3 2.7-.8s1.2-1.3 1.5-2.2H21c-.2.5-.5.9-1 1.2-.5.3-1.1.5-1.8.5-1 0-1.7-.3-2.2-.9-.5-.6-.8-1.5-.8-2.6H23c0-.2 0-.4 0-.6 0-1.7-.4-2.9-1.3-3.8zm-11.8.3c.9.8 1.3 2 1.3 3.6 0 1-.2 1.9-.6 2.6-.4.7-1 1.3-1.8 1.7-.8.4-1.7.6-2.7.6H4V6.2h5c1.4 0 2.5.3 3.2 1 .7.6 1.1 1.5 1.1 2.6 0 1-.3 1.8-.9 2.4z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#8B8B7A] block">معرض أعمال بيهانس</span>
                      <span className="text-xs font-bold text-[#2D2D2D] block mt-0.5">
                        badranuxui@
                      </span>
                    </div>
                  </div>
                  <ArrowLeft size={14} className="text-[#8B8B7A] opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                </a>

                {/* Twitter / X */}
                <a
                  href="https://x.com/badranuxui"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-6 rounded-[24px] border border-[#F2EEE9] flex items-center justify-between hover:border-[#1C1C17] hover:shadow-xs transition-all duration-300 group text-right"
                  id="twitter-bento-link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5F2EE] text-neutral-900 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1C1C17] group-hover:text-white">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#8B8B7A] block">منصة إكس / Twitter</span>
                      <span className="text-xs font-bold text-[#2D2D2D] block mt-0.5">
                        @badranuxui
                      </span>
                    </div>
                  </div>
                  <ArrowLeft size={14} className="text-[#8B8B7A] opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/badranuxui"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-6 rounded-[24px] border border-[#F2EEE9] flex items-center justify-between hover:border-pink-500 hover:shadow-xs transition-all duration-300 group text-right sm:col-span-2"
                  id="instagram-bento-link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FDF0F4] text-pink-600 flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-red-500 group-hover:to-pink-600 group-hover:text-white">
                      <Instagram size={20} />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#8B8B7A] block">منصة إنستجرام</span>
                      <span className="text-xs font-bold text-[#2D2D2D] block mt-0.5">
                        @badranuxui
                      </span>
                    </div>
                  </div>
                  <ArrowLeft size={14} className="text-[#8B8B7A] opacity-40 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                </a>

              </div>
            </div>
          </div>

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
            2026 © جميع الحقوق محفوظة
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
                        <p className="text-xs text-[#6B6B5E] leading-normal font-light">{selectedProject.duration}</p>
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
                        {activeGalleryIndex + 1} / {selectedProject.galleryImages.length}
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
