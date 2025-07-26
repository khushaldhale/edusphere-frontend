import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, yoyo: Infinity }}
        className="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-300"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-blue-600"
        >
          <BookOpen className="w-10 h-10" />
        </motion.div>
        <h2 className="text-xl font-semibold text-gray-900">Loading....</h2>
      </motion.div>
    </div>
  );
};

export default Loading;
