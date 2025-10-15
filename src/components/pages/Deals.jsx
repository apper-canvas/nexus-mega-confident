import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";

const Deals = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
<h1 className="text-3xl font-bold text-white">Deals</h1>
          <p className="text-blue-100 mt-1">Track your sales pipeline and close more deals</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-12"
      >
        <Empty
          icon="TrendingUp"
          title="Deal Pipeline Coming Soon"
          description="Visualize your sales pipeline with a kanban board. Track deals through stages from lead to close, set values and expected close dates."
        />
      </motion.div>

      {/* Kanban Board Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {["Lead", "Qualified", "Proposal", "Closed"].map((stage, index) => (
          <div key={stage} className="glass-card p-4">
            <h3 className="text-white font-semibold mb-4">{stage}</h3>
            <div className="space-y-3 opacity-40">
              <div className="bg-white/5 rounded-lg p-3 h-24" />
              <div className="bg-white/5 rounded-lg p-3 h-24" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Deals;