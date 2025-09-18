import React from "react";

const jobs = [
  {
    title: "Pacar Agung",
    location: "Bali",
    type: "Full-time",
    description: "Bangun hubungan yang langgeng dan bahagia bersama Agung.",
  },
  {
    title: "Frontend Developer",
    location: "Remote / Bali",
    type: "Full-time",
    description: "Bangun dan kembangkan UI/UX menggunakan Next.js & TailwindCSS.",
  },
  {
    title: "Backend Developer",
    location: "Remote / Bali",
    type: "Full-time",
    description:
      "Rancang API scalable dengan Next.js / FastAPI, integrasi database Supabase.",
  },
  {
    title: "Data Scientist",
    location: "Remote",
    type: "Internship",
    description:
      "Eksperimen dengan model AI/ML untuk mendukung sistem scoring kandidat.",
  },
  {
    title: "Product Designer",
    location: "Remote / Bali",
    type: "Contract",
    description:
      "Fokus pada desain sistem, dashboard, dan pengalaman kandidat & HR.",
  },
];

const JobsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero / Tagline */}
      <section className="py-20 text-center bg-gradient-to-r from-[#0097b2] to-[#00d4ff] text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Bergabunglah Bersama PT. 4Kings
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Kami mencari talenta terbaik untuk membangun masa depan rekrutmen
          berbasis AI di Indonesia 🚀
        </p>
      </section>

      {/* Job list */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {job.location} · {job.type}
              </p>
              <p className="text-gray-600 mb-6">{job.description}</p>
              <button
                className="px-4 py-2 bg-[#0097b2] text-white rounded-lg hover:bg-[#007f91] transition"
                disabled
              >
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobsPage;
