import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";

const Companies = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold gradient-text">Companies</h1>
        <p className="text-white/60 mt-1">Manage your business accounts and organizations</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-12"
      >
        <Empty
          icon="Building2"
          title="No companies yet"
          description="Company management is coming soon. You'll be able to organize contacts by company, track company-wide deals, and manage accounts."
        />
      </motion.div>
    </div>
  );
};

export default Companies;