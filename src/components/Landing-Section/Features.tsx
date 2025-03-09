import { Globe, MessageSquare, PhoneCall, Shield, Users, Zap } from "lucide-react";
import { ReactNode } from "react";

export default function FeaturesSection(){
  return (
    <section className="w-full py-12 md:py-24 bg-white">
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-gray-900">Lorem Ipsum</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard icon={<MessageSquare className="h-8 w-8" />} title="Lorem Ipsum" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
      <FeatureCard icon={<Users className="h-8 w-8" />} title="Dolor Sit Amet" description="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      <FeatureCard icon={<Shield className="h-8 w-8" />} title="Consectetur Adipiscing" description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." />
      <FeatureCard icon={<PhoneCall className="h-8 w-8" />} title="Eiusmod Tempor" description="Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor." />
      <FeatureCard icon={<Globe className="h-8 w-8" />} title="Incididunt Ut" description="In reprehenderit in voluptate velit esse cillum dolore eu fugiat." />
      <FeatureCard icon={<Zap className="h-8 w-8" />} title="Labore Et Dolore" description="Excepteur sint occaecat cupidatat non proident, sunt in culpa." />
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
