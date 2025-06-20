"use client";
import React from "react";
import { Vortex } from "@/components/ui/vortex";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FullPage() {
  return (
    <div className="w-full     h-screen overflow-hidden">
      <Vortex

        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center  flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Welcome to the
          <span className="font-bold bg-gradient-to-r rounded-md text-black from-purple-500 to-cyan-500">
            lawyer
          </span>
          application
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          This is chemical burn. It&apos;ll hurt more than you&apos;ve ever been
          burned and you&apos;ll have a scar.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Accordion type="single" collapsible >
            <AccordionItem value="item1">
              <AccordionTrigger className="px- cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                Get started
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                <div className="flex flex-col  gap-2">
                  <Button variant={"default"} asChild>
                    <Link href="/auth/login?role=client">
                      se connecter en tant que client
                    </Link>
                  </Button>

                  <Button variant={"default"} asChild>
                    <Link href="\auth\login?role=lawyer">
                      se connecter en tant que avocat
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Vortex>
    </div>
  );
}
