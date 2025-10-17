"use client";

import { WidgetView } from "@/modules/ui/views/view";
import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";
import { use } from "react";


interface Props {
  searchParams: Promise<{organizationId: string}>
}

const Page = ({searchParams}: Props)=>{
  
  const {organizationId} = use(searchParams)

  return (
    <WidgetView organizationId={organizationId}/>
  )
}

export default Page;

