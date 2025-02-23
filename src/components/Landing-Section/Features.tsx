import { BarChart, Clock, Layout, Paintbrush, Shield, Users } from "lucide-react"
import { ReactNode } from "react"


export default function FeaturesSection(){
    return (
        <div>
            <section className="w-full py-12 md:py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-gray-900">Fitur Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Layout className="h-8 w-8" />}
              title="Kanvas Tanpa Batas"
              description="Bebaskan pikiran Anda dengan ruang kerja visual yang tak terbatas."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Integrasi Firebase"
              description="Data Anda aman dan dapat diakses dari mana saja, kapan saja."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Kolaborasi Real-time"
              description="Bekerja bersama tim Anda secara efisien dan lancar."
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="Pengaturan Prioritas"
              description="Tandai tugas-tugas penting dan atur tenggat waktu dengan mudah."
            />
            <FeatureCard
              icon={<BarChart className="h-8 w-8" />}
              title="Pelacakan Kemajuan"
              description="Pantau perkembangan proyek Anda secara visual."
            />
            <FeatureCard
              icon={<Paintbrush className="h-8 w-8" />}
              title="Kustomisasi"
              description="Sesuaikan tampilan dan fitur aplikasi sesuai kebutuhan Anda."
            />
          </div>
        </div>
      </section>
        </div>
    )
}


function FeatureCard({
    icon,
    title,
    description,
  }: {
    icon: ReactNode
    title: string
    description: string
  }) {
    return (
      <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="p-3 rounded-full bg-blue-50 text-blue-600">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    )
}