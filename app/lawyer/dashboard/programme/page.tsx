"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import Image from "next/image";


export interface testimonials {
  quote: string;
  name: string;
  designation: string;
  src: string;
}
export default function Page() {
  const { theme } = useTheme();

  const title = ["votre", "calendrier", "actuel"];
  const [choiceDate, setchoiceDate] = useState<Date>(new Date());

  const letterDate = ["janvier", "fevrier", "mars", "avril", "may", "juin", "juillet", "aout", "septembre", "octobre", "decembre"];

  const uppercaseLetterDate = letterDate.map((e) => e.toLocaleUpperCase())

  const poper = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/20220115_170738.jpg",

    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/20220115_170738.jpg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "/20220115_170738.jpg",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "/20220115_170738.jpg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "/20220115_170738.jpg",
    },
  ];


  return (
    <div
      className={cn(
        "flex bg-neutral-800 w-full text-white flex-col gap-2 md:gap-20 h-screen",
        {
          "bg-neutral-50 text-black": theme !== "dark",
        }
      )}
    >
      <motion.ul className="flex flex-row gap-2  ">
        {title.map((el, index) => (
          <motion.li
            className="uppercase font-medium  "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 * index }}
            key={index}
          >
            {el}
          </motion.li>
        ))}
      </motion.ul>
      <Card className="w-3/4 mx-10">

        <CardContent>le programme du jour</CardContent>
      </Card>

      <div>
        <span>calendrier</span>
        <div className=" flex flex-row gap-10">
          <Calendar mode="single"
            selected={choiceDate}
            onSelect={setchoiceDate}
            className="3/4 " />
          <Card>
            <CardHeader>
              <CardTitle>rendez-vous du :{`${choiceDate.getDate()}  ${uppercaseLetterDate[choiceDate.getMonth()]}`}  </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              personne:Antananarivo
              date:Antananarivo
              heure:Antananarivo
              motif:Antananarivo

            </CardContent>
          </Card>


        </div>
      </div>
      <AnimatedTestimonials testimonials={poper}></AnimatedTestimonials>
    </div>
  );
}
