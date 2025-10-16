import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage{
    role: "user" | "assistant";
    text: string;
}

export const useVapi = ()=>{
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(()=>{
        const vapiInstace = new Vapi("5c72feea-0aed-411b-b87e-d3fec3fb0149");
        setVapi(vapiInstace);

        vapiInstace.on("call-start",()=>{
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]);
        });

        vapiInstace.on("call-end", ()=>{
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        })

        vapiInstace.on("speech-start", ()=>{
            setIsSpeaking(true);
        })

        vapiInstace.on("speech-end", ()=>{
            setIsSpeaking(false);
        })

        vapiInstace.on("error", (error)=>{
            console.log(error, "VAPI_ERROR")
            setIsConnecting(false);
        })

        vapiInstace.on("message", (message)=>{
            if (message.type==="transcript" && message.transcriptType === "final"){
                setTranscript((prev)=>[
                    ...prev,
                    {
                        role: message.role === "user" ? "user": "assistant",
                        text: message.transcript
                    }
                ])
            }
        });

        return ()=>{
            vapiInstace?.stop();
        }

    },[])

    const startCall = ()=>{
        setIsConnecting(true);

        if(vapi){
            vapi.start("0fcf9883-9a2b-458c-97dd-1332ec54102d")
        }
    }

    const endCall = ()=>{
        if(vapi){
            vapi.stop();
        }
    };

    return {
        isSpeaking,
        isConnecting,
        isConnected,
        transcript,
        startCall,
        endCall
    }
};

