import { useEffect } from "react";
import { motion } from "motion/react";
import { designerInfo } from "./data";

export default function Maintenance() {
  // خلفية داكنة للصفحة كلها (بما فيها لون شريط المتصفح على الموبايل)
  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = "#0E0E0D";
    document.documentElement.style.background = "#0E0E0D";
    document.documentElement.style.colorScheme = "dark";
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = "#0E0E0D";
    return () => {
      document.body.style.background = prevBg;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0E0D] text-[#F5F2EE] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-[#171716] border border-[#262624] rounded-[32px] shadow-2xl shadow-black/40 p-10 text-center flex flex-col items-center gap-6"
      >
        <img
          src={designerInfo.avatarUrl}
          alt={designerInfo.name}
          className="w-28 h-28 rounded-[28px] object-cover border border-[#2E2E2B] shadow-lg shadow-black/40"
        />

        <h1 className="text-3xl font-extrabold leading-tight">{designerInfo.name}</h1>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#222220] border border-[#2E2E2B] rounded-full text-xs font-bold text-[#CFCBC2]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          الموقع قيد التحديث
        </div>

        <p className="text-sm text-[#A8A598] leading-relaxed font-light">
          أعمل حاليًا على تحديثات جديدة للموقع، وسيعود قريبًا بشكل أفضل.
        </p>
      </motion.div>
    </div>
  );
}
