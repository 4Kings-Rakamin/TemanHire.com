// app/(site)/4kings/page.tsx
import Image from "next/image";
import { FEATURES } from "@/constants"; // ✅ pakai data fitur lama

const companyStats = [
  { label: "Founded", value: "2025" },
  { label: "Employees", value: "4+" },
  { label: "Beta Users", value: "15+" },
  { label: "Success Rate", value: "99%" },
];

const milestones = [
  {
    year: "August 2025",
    title: "Company Founded",
    description:
      "TemanHire.com didirikan oleh I Gusti Ngurah Agung Hari Vijaya Kusuma",
  },
  {
    year: "September 2025",
    title: "AI Integration",
    description:
      "Meluncurkan teknologi AI untuk mempercepat proses hiring",
  },
  {
    year: "October 2025",
    title: "Market Expansion",
    description: "Ekspansi ke seluruh Indonesia",
  },
];

// ✅ data credit tim (tanpa gambar, pakai inisial bulat agar aman asset)
const team = [
  { name: "I G N Agung Hari Vijaya Kusuma", role: "Founder & CEO", initials: "AH" },
  { name: "Agi Rahmawandi", role: "Data Scientist", initials: "AR" },
  { name: "Shan Ramadhan", role: "ML Engineer", initials: "SR" },
  { name: "Muhammad Muqorrobin", role: "Full-Stack Dev", initials: "MM" },
];

export default function FourKingsPage() {
  return (
    <div className="bg-white">
      {/* Company Stats */}
      <section className="py-20 bg-gray-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-[#0097b2]">{stat.value}</p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Image
                src="/agungs.png"
                alt="Founder"
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Founder & CEO</h2>
              <h3 className="text-xl text-[#0097b2] mb-4">
                I Gusti Ngurah Agung Hari Vijaya Kusuma
              </h3>
              <p className="text-gray-600 mb-6">
                Dengan visi untuk merevolusi proses perekrutan di Indonesia,
                beliau mendirikan 4Kings Technology pada 23 Agustus 2025 di usia 24.
                Fokus utama perusahaan adalah mengembangkan solusi AI untuk
                mempercepat dan mengoptimalkan proses hiring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-24">
                  <p className="text-xl font-bold text-[#0097b2]">{m.year}</p>
                </div>
                <div className="flex-1">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{m.title}</h3>
                    <p className="text-gray-600">{m.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mempercepat dan mengoptimalkan proses hiring di Indonesia melalui
            teknologi AI yang inovatif, membantu perusahaan menemukan talent
            terbaik dengan lebih efisien.
          </p>
        </div>
      </section>

      {/* ⬇️ NEW: Meet 4Kings (pakai layout FEATURE lama + credit tim) */}
      <section
        id="4_kings"
        className="flex-col flexCenter overflow-hidden bg-feature-bg bg-center bg-no-repeat py-24"
      >
        <div className="max-w-7xl mx-auto px-4 relative w-full flex justify-end">
          {/* phone mock (opsional), aman dihapus jika tak perlu */}
          <div className="hidden lg:block flex-1 lg:min-h-[900px]">
            <Image
              src="/phone2.png"
              alt="phone"
              width={440}
              height={1000}
              className="feature-phone lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:-translate-x-10"
            />
          </div>

          <div className="z-20 flex w-full flex-col lg:w-[60%]">
            <div className="relative">
              <h2 className="bold-40 lg:bold-64">Meet 4Kings</h2>
              <p className="regular-16 text-gray-600 mt-2">
                Tim kecil yang ngegas bareng buat bikin proses hiring jadi lebih cepat dan adil.
              </p>
            </div>

            {/* grid fitur lama */}
            <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-20">
              {FEATURES.map((f) => (
                <FeatureItem
                  key={f.title}
                  title={f.title}
                  icon={f.icon}
                  description={f.description}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===== sub-component untuk item fitur ===== */
type FeatureItemProps = {
  title: string;
  icon: string;
  description: string;
};

function FeatureItem({ title, icon, description }: FeatureItemProps) {
  return (
    <li className="flex w-full flex-1 flex-col items-start">
      <div className="rounded-full p-4 lg:p-7 bg-[#0097b2]">
        <Image src={icon} alt={title} width={28} height={28} />
      </div>
      <h3 className="bold-20 lg:bold-32 mt-5 capitalize">{title}</h3>
      <p className="regular-16 mt-4 text-gray-600">{description}</p>
    </li>
  );
}
