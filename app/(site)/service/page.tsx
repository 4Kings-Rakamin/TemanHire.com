import Button from '@/components/Button';
import Image from 'next/image';

const services = [
  {
    title: "AI Hiring Predictor",
    icon: "/folded-map.svg", // Add these icons to your public folder
    description: "Prediksi kandidat terbaik dengan teknologi AI canggih",
    features: [
      "Prediksi 1500+ Kandidat dengan 99.9% akurasi prediksi model XGBoost kecocokan kandidat",
      "Analisis berbagai parameter kandidat secara real-time",
      "Rekomendasi personal berdasarkan kultur perusahaan",
      "Dashboard prediksi visual yang informatif"
    ]
  },
  {
    title: "AI Hiring Consultant",
    icon: "/folded-map.svg",
    description: "Konsultan virtual 24/7 untuk kebutuhan hiring Anda",
    features: [
      "Konsultasi real-time dengan AI Assistant berbasis LLM (Bebas pilih Sonnet 3.5, GPT-3.5, GPT-4, GPT-5, Agung-R1(Free))",
      "Rekomendasi strategi hiring yang teroptimasi",
      "Analisis tren pasar tenaga kerja terkini",
      "Solusi hiring yang dipersonalisasi"
    ]
  },
  {
    title: "AI CV/Resume Screening",
    icon: "/folded-map.svg",
    description: "Screening CV/Resume dalam hitungan detik",
    features: [
      "Scan 1000+ CV dalam 60 detik",
      "Ekstraksi skill & pengalaman otomatis",
      "Deteksi keaslian dokumen dengan AI",
      "Scoring kandidat berbasis machine learning"
    ]
  },
    {
    title: "Portal berita seputar HR & Bisnis",
    icon: "/folded-map.svg",
    description: "Dapatkan update terbaru seputar HR & Bisnis",
    features: [
      "Konten berkualitas dari sumber terpercaya",
      "Cari tahu tips & trik seputar HR dan Bisnis",
      "Akses gratis kapan saja, di mana saja",
      "Nikmati pengalaman membaca yang menyenangkan"
    ]
  }
];

export default function ServicePage() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Layanan AI Kami
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Optimalkan proses hiring Anda dengan teknologi AI terdepan
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div 
              key={service.title}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="bg-[#0097b2] p-3 rounded-lg">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={32}
                    height={32}
                    className="text-white"
                  />
                </div>
                <h3 className="text-2xl font-semibold ml-4 text-gray-900">
                  {service.title}
                </h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>

              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg 
                      className="w-5 h-5 text-[#0097b2] mr-3"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 w-full bg-[#0097b2] text-white py-3 px-6 rounded-lg transition-colors duration-300">
                <Button 
                type="button"
                title="Coba Sekarang"
                icon="/folded-map.svg"
                variant="btn_blue"
                full
                href="/login"
                />                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}