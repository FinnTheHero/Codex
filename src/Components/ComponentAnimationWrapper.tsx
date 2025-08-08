import { motion } from "framer-motion";
import { ReactNode } from "react";

export const ComponentAnimationWrapper = ({
    children,
    hidden = false,
}: {
    children: ReactNode;
    hidden?: boolean;
}) => {
    return (
        hidden && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
            >
                {children}
            </motion.div>
        )
    );
};
