"use client";
import { useAuthContext } from "@/context/AppContext";
import WhatsappButton from "./WhatsappButton";

export default function WhatsappWrapper() {

    const { isAdmin , session } = useAuthContext();
    if (isAdmin || !session) return null;
    return <WhatsappButton />;
}