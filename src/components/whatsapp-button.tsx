import { MessageCircle } from "lucide-react";
import { company, whatsappLink } from "@/lib/company";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(`Hello ${company.name}, I would like to enquire about your services.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
