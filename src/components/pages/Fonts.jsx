import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Fonts = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-border rounded-xl p-8 shadow-card"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <ApperIcon name="Type" size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Font Optimization</h1>
            <p className="text-text-secondary">Optimize web font loading and performance</p>
          </div>
        </div>
        <div className="text-center py-16">
          <ApperIcon name="Type" size={64} className="text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">Font Settings</h3>
          <p className="text-text-secondary">Configure font optimization here</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Fonts;