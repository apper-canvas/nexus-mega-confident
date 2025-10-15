import { motion } from "framer-motion";

const Loading = ({ type = "card" }) => {
  if (type === "table") {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 animate-shimmer h-16 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        ))}
      </div>
    );
  }

  if (type === "detail") {
    return (
      <div className="space-y-6">
        <div className="h-32 rounded-lg animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 rounded-lg animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          ))}
        </div>
      </div>
    );
  }

  return (
<div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
<p className="text-slate-600 text-sm">Loading...</p>
      </motion.div>
    </div>
  );
};

export default Loading;