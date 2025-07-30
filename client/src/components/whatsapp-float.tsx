import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/923001234567", "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center apple-shadow-hover hover:bg-green-600 transition-all z-40 animate-pulse"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  );
}
