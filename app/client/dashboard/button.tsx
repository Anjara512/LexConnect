"use client"
import { Button } from "@/components/ui/button";


export default function ClickButton({ onclick }: any) {
 return (
  <Button onClick={onclick}>
   voir le profil
  </Button>
 )
}