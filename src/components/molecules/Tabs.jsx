import { cn } from "@/utils/cn";

const Tabs = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={cn("border-b border-white/10", className)}>
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "pb-4 px-1 font-medium text-sm transition-all duration-200 relative",
              activeTab === tab.id
                ? "text-white"
                : "text-white/60 hover:text-white/80"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;