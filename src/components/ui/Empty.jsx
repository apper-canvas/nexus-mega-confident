import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  icon = "Inbox", 
  title = "No data yet", 
  description = "Get started by adding your first item",
  actionLabel,
  onAction 
}) => {
  return (
<motion.div
      className="flex items-center justify-center min-h-[400px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="text-center max-w-md px-6">
        <motion.div
className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <ApperIcon name={icon} size={48} className="text-blue-600" />
        </motion.div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary mb-6">{description}</p>
        {actionLabel && onAction && (
<Button onClick={onAction} variant="primary" className="shadow-lg">
              {actionLabel}
            </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;