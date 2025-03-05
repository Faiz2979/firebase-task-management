import { Globe, MessageSquare, PhoneCall, Shield, Users, Zap } from "lucide-react";
import { ReactNode } from "react";


export default function FeaturesSection(){
    return (
      <section className="w-full py-12 md:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-gray-900">Fitur Utama</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon={<MessageSquare className="h-8 w-8" />} title="Pesan Instan" description="Kirim dan terima pesan secara real-time tanpa hambatan." />
          <FeatureCard icon={<Users className="h-8 w-8" />} title="Grup Chat" description="Buat grup chat untuk tetap terhubung dengan komunitas Anda." />
          <FeatureCard icon={<Shield className="h-8 w-8" />} title="Keamanan Terjamin" description="Chat Anda terenkripsi end-to-end untuk privasi maksimal." />
          <FeatureCard icon={<PhoneCall className="h-8 w-8" />} title="Panggilan Suara & Video" description="Nikmati komunikasi suara dan video berkualitas tinggi." />
          <FeatureCard icon={<Globe className="h-8 w-8" />} title="Tersedia di Semua Perangkat" description="Gunakan Socialize di ponsel, tablet, atau desktop." />
          <FeatureCard icon={<Zap className="h-8 w-8" />} title="Respons Cepat" description="Nikmati pengalaman chatting yang ringan dan cepat." />
        </div>
      </div>
    </section>
    )
}


interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="p-3 rounded-full bg-blue-50 text-blue-600">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}