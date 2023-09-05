'use client';

import { motion } from "framer-motion"

export default function SplashScreen() {
    
    return (
        <motion.div
        initial={{ opacity: 1 }}
        animate={{
            opacity: 0,
            pointerEvents: "none",
            transition: { duration: 1 },
        }}
        whileFocus={{ display: "none" }}
        className="fixed top-0 h-screen w-full bg-gray-500 text-black z-50"
        >
            <div>
                Loading
            </div>
        </motion.div>
    );
}