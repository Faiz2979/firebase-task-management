import { ArrowRight } from "lucide-react";

export default function HeroSection(){
    return (
    <div>
        <section className="w-full h-screen flex items-center py-12 md:py-24 lg:py-32 hero">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center space-y-4 text-center">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-blue-50">
                            Bebaskan Produktivitas Anda dengan TaskCanvas
                            </h1>
                            <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                            Kelola tugas, proyek, dan ide Anda dengan mudah menggunakan platform task management visual yang intuitif
                            dan fleksibel.
                            </p>
                            <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors mt-6">
                            Mulai Sekarang (Gratis)
                            <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                </div>
            </div>
            <h1 className="absolute translate-x-4 translate-y-96">Designed by Freepick</h1>
        </section>
    </div>
    );
}