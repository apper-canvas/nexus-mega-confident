import { motion } from "framer-motion";
import Empty from "@/components/ui/Empty";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold gradient-text">Analytics</h1>
        <p className="text-white/60 mt-1">Gain insights into your business performance</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-12"
      >
        <Empty
          icon="BarChart3"
          title="Analytics Dashboard in Development"
          description="Soon you'll be able to visualize your CRM data with beautiful charts, track KPIs, and generate custom reports."
        />
      </motion.div>

      {/* Chart Placeholders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { title: "Revenue Trends", icon: "LineChart" },
          { title: "Deal Pipeline", icon: "PieChart" },
          { title: "Contact Growth", icon: "TrendingUp" },
          { title: "Activity Heatmap", icon: "Calendar" },
        ].map((chart) => (
          <div key={chart.title} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">{chart.title}</h3>
            </div>
            <div className="bg-white/5 rounded-lg h-64 flex items-center justify-center opacity-40">
              <p className="text-white/60">Chart preview</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Analytics;