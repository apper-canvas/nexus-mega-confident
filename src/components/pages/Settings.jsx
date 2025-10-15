import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Settings = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
className="bg-white border border-slate-200 rounded-xl p-8 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
<div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <ApperIcon name="Settings" size={24} className="text-blue-600" />
          </div>
          <div>
<h1 className="text-2xl font-bold text-slate-900">General Settings</h1>
              <p className="text-slate-600">Configure your application preferences</p>
          </div>
        </div>
        <div className="text-center py-16">
<ApperIcon name="Settings" size={64} className="text-blue-600 mx-auto mb-4" />
<h3 className="text-xl font-semibold text-slate-900 mb-2">Application Settings</h3>
            <p className="text-slate-600">Configure general settings here</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;