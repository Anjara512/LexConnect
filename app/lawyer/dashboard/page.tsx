"use client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Page() {
  const theTitle = [
    "tu est au bonne endroit ",
    "si tu veux reussir dans ton domaine",
    "nous somme la pour t'aider",
  ];
  return (
    <div className="flex items-center justify-center h-screen  flex-col w-full">
      <Card className=" flex flex-col w-3/4 h-max bg-gradient-to-l from-cyan-500 to-purple-800">
        {theTitle.map((el, index) => (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 * index }}
            className="uppercase font-medium text-lg "
            key={index}
          >
            {el}
          </motion.p>
        ))}
      </Card>
    </div>
  );
}
