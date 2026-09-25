import DemoTelecomConsentimientoClient from "@/app/client/demo-telecom/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consentimiento - DEMO TELECOM SL",
}

export default function DemoTelecomConsentimientoPage() {
    return <DemoTelecomConsentimientoClient/>
}