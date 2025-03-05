import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function CtaSection(){
    
    return (
        <section className="w-full py-12 md:py-24 bg-gray-50 text-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Siap untuk terhubung lebih mudah?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl mt-4">
                Bergabunglah dengan Socialize sekarang dan mulailah percakapan dengan teman dan keluarga Anda!
                </p>
                <Link href="/auth/register" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors mt-6">
                Mulai Sekarang (Gratis)
                <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </div>
            </section>
    );
}