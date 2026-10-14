import { motion } from "motion/react";
import { designerInfo } from "./data";

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#2D2D2D] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white border border-[#F2EEE9] rounded-[32px] shadow-sm p-10 text-center flex flex-col items-center gap-6"
      >
        <img
          src={designerInfo.avatarUrl}
          alt={designerInfo.name}
          className="w-28 h-28 rounded-[28px] object-cover border border-[#F2EEE9] shadow-sm"
        />

        <h1 className="text-3xl font-extrabold leading-tight">{designerInfo.name}</h1>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F2EE] rounded-full text-xs font-bold text-[#6B6B5E]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          الموقع قيد التحديث
        </div>

        <p className="text-sm text-[#6B6B5E] leading-relaxed font-light">
          أعمل حاليًا على تحديثات جديدة للموقع، وسيعود قريبًا بشكل أفضل.
        </p>
      </motion.div>
    </div>
  );
}
