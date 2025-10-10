import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Dashboard = () => {
  const metrics = [
    { label: "Total Contacts", value: "248", icon: "Users", color: "from-primary to-secondary" },
    { label: "Active Deals", value: "12", icon: "TrendingUp", color: "from-emerald-500 to-teal-500" },
    { label: "Revenue", value: "$124K", icon: "DollarSign", color: "from-amber-500 to-orange-500" },
    { label: "Activities", value: "56", icon: "Activity", color: "from-pink-500 to-rose-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Welcome back, John!</h1>
            <p className="text-white/60 text-lg">Here's what's happening with your business today.</p>
          </div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
            <ApperIcon name="Sparkles" size={32} className="text-white" />
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-glow`}>
                <ApperIcon name={metric.icon} size={24} className="text-white" />
              </div>
            </div>
            <p className="text-white/60 text-sm mb-1">{metric.label}</p>
            <p className="text-4xl font-bold gradient-text">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Activity Feed Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Recent Activity</h2>
          <ApperIcon name="Activity" size={24} className="text-primary" />
        </div>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ApperIcon name="Clock" size={40} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Activity Feed Coming Soon</h3>
          <p className="text-white/60 text-center max-w-md">
            Track all your recent interactions, deals, and important events in one place.
          </p>
        </div>
      </motion.div>

{/* Charts Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Key Metrics</h2>
          <ApperIcon name="BarChart3" size={24} className="text-primary" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Contact Growth",
              value: "+23%",
              description: "vs last month",
              icon: "TrendingUp",
              color: "from-emerald-500 to-teal-500"
            },
            {
              title: "Deal Conversion",
              value: "68%",
              description: "success rate",
              icon: "Target",
              color: "from-amber-500 to-orange-500"
            },
            {
              title: "Activity Rate",
              value: "156",
              description: "this week",
              icon: "Activity",
              color: "from-pink-500 to-rose-500"
            }
          ].map((chart, index) => (
            <div key={chart.title} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${chart.color} flex items-center justify-center`}>
                  <ApperIcon name={chart.icon} size={20} className="text-white" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold gradient-text">{chart.value}</p>
                  <p className="text-white/60 text-sm">{chart.description}</p>
                </div>
              </div>
              <h3 className="text-white font-medium">{chart.title}</h3>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { icon: "UserPlus", label: "Add Contact", desc: "Create a new contact", color: "primary" },
          { icon: "Building2", label: "Add Company", desc: "Register a new company", color: "secondary" },
          { icon: "TrendingUp", label: "Create Deal", desc: "Start tracking a new deal", color: "accent" },
        ].map((action, index) => (
          <div
            key={action.label}
            className="glass-card p-6 hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-lg bg-${action.color}/20 flex items-center justify-center mb-4`}>
              <ApperIcon name={action.icon} size={24} className={`text-${action.color}`} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{action.label}</h3>
            <p className="text-white/60 text-sm">{action.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;