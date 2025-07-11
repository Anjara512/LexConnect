"use client";

import { getUserName } from "@/app/server/getLawyerInfo";
import { DisplayCardsDemo } from "@/components/box";
import DisplayCards from "@/components/ui/display-cards";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  const sessionId = session?.user?.id;

  const { data } = useQuery({
    queryKey: ["name"],
    queryFn: async () => await getUserName(String(sessionId))
  })

  return (
    <div className="flex items-center flex-row  justify-center h-screen   w-full">

      <DisplayCardsDemo >

      </DisplayCardsDemo>
    </div>
  );
}
