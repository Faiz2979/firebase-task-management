import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection(){
    return (
        <section className="w-full h-screen flex items-center py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Terhubung dengan Mudah, Kapan Saja
          </h1>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl mt-4">
            Socialize adalah aplikasi chatting yang cepat, aman, dan gratis untuk menghubungkan Anda dengan teman dan keluarga.
          </p>
          <Link href="/auth/register" className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-sm font-medium text-blue-600 hover:bg-gray-200 transition-colors mt-6">
            Mulai Sekarang (Gratis)
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    );
}