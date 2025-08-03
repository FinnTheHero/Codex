import { motion } from "framer-motion";
import { ReactNode } from "react";

export const PageAnimationWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full flex justify-center"
        >
            {children}
        </motion.div>
    );
};
