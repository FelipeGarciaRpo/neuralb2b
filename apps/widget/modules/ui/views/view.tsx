"use client";

import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth";
import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-heaer";

interface Props {
    organizationId: string;
}

export const WidgetView = ({organizationId}: Props) =>{
    return(
        <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
            {/* <div className="flex flex-1"> */}
                <WidgetAuthScreen/>
            {/* </div> */}
            {/* <WidgetFooter/> */}
        </main>
    )
}