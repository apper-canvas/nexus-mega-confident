import { motion } from "framer-motion";
import React from "react";
import Chart from "react-apexcharts";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
const Analytics = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
<h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-blue-100 mt-1">Gain insights into your business performance</p>
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
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] border border-blue-700 rounded-xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Contact Growth</h3>
                <p className="text-white/60">Monthly contact acquisition</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <ApperIcon name="TrendingUp" size={20} className="text-emerald-400" />
              </div>
            </div>
            <div className="h-64">
{(() => {
                const series = [{
                  name: 'New Contacts',
                  data: [12, 18, 25, 32, 28, 45, 38, 52, 61, 48, 73, 84]
                }];
                const options = {
                  chart: {
                    type: 'area',
                    background: 'transparent',
                    toolbar: { show: false }
                  },
                  theme: { mode: 'dark' },
colors: ['#3B82F6'],
                    stroke: {
                    curve: 'smooth',
                    width: 3
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      shadeIntensity: 1,
                      opacityFrom: 0.4,
                      opacityTo: 0.1,
                      stops: [0, 100]
                    }
                  },
                  grid: {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    strokeDashArray: 3
                  },
                  xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
labels: { style: { colors: '#E0F2FE' } }
                  },
                  yaxis: {
labels: { style: { colors: '#E0F2FE' } }
                  },
                  tooltip: {
                    theme: 'dark',
                    style: { fontSize: '12px' }
                  }
                };
                return <Chart options={options} series={series} type="area" height="100%" />;
              })()}
            </div>
          </motion.div>

          {/* Deal Conversion Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Deal Conversion</h3>
                <p className="text-white/60">Sales pipeline efficiency</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <ApperIcon name="Target" size={20} className="text-amber-400" />
              </div>
            </div>
            <div className="h-64">
{(() => {
                const series = [68, 24, 8];
                const options = {
                  chart: {
                    type: 'donut',
                    background: 'transparent'
                  },
                  theme: { mode: 'dark' },
colors: ['#3B82F6', '#60A5FA', '#93C5FD'],
                    labels: ['Won', 'In Progress', 'Lost'],
                  legend: {
                    position: 'bottom',
labels: { colors: '#E0F2FE' }
                    },
                  plotOptions: {
                    pie: {
                      donut: {
                        size: '70%',
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            label: 'Success Rate',
                            color: '#fff',
                            formatter: () => '68%'
                          }
                        }
                      }
                    }
                  },
                  tooltip: {
                    theme: 'dark',
                    y: {
                      formatter: (val) => val + '%'
                    }
                  },
                  responsive: [{
                    breakpoint: 480,
                    options: {
                      chart: { width: 280 },
                      legend: { position: 'bottom' }
                    }
                  }]
                };
                return <Chart options={options} series={series} type="donut" height="100%" />;
              })()}
            </div>
          </motion.div>

          {/* Activity Metrics Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Activity Metrics</h3>
                <p className="text-white/60">Team performance this month</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                <ApperIcon name="Activity" size={20} className="text-pink-400" />
              </div>
            </div>
            <div className="h-64">
{(() => {
                const series = [{
                  name: 'Activities',
                  data: [44, 32, 28, 19, 25, 31, 18]
                }];
                const options = {
                  chart: {
                    type: 'bar',
                    background: 'transparent',
                    toolbar: { show: false }
                  },
                  theme: { mode: 'dark' },
colors: ['#60A5FA'],
                    plotOptions: {
                    bar: {
                      borderRadius: 6,
                      columnWidth: '50%'
                    }
                  },
                  grid: {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    strokeDashArray: 3
                  },
                  xaxis: {
                    categories: ['Calls', 'Emails', 'Meetings', 'Tasks', 'Notes', 'Demos', 'Follow-ups'],
labels: { style: { colors: '#E0F2FE' } }
                    },
                  yaxis: {
labels: { style: { colors: '#E0F2FE' } }
                    },
                  tooltip: {
                    theme: 'dark',
                    style: { fontSize: '12px' }
                  }
                };
                return <Chart options={options} series={series} type="bar" height="100%" />;
              })()}
            </div>
          </motion.div>
        </div>

        {/* Keep existing structure intact */}
        {[].map((chart) => (
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