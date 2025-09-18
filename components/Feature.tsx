import Image from "next/image";

type GuardianItem = {
  id: string;
  webUrl: string;
  webTitle: string;
  sectionName: string;
  webPublicationDate: string;
  fields?: { thumbnail?: string; trailText?: string };
};

const CAREER_QUERY =
  '(hiring OR recruitment OR "job market" OR employment OR graduate OR graduation OR internship OR "talent acquisition" OR layoffs OR vacancy)';

async function fetchGuardian(query: string = CAREER_QUERY) {
  const key = process.env.GUARDIAN_API_KEY;
  const url = new URL("https://content.guardianapis.com/search");
  url.searchParams.set("q", query);
  url.searchParams.set("page-size", "8");
  url.searchParams.set("order-by", "relevance");          // ✅ prioritaskan kecocokan
  url.searchParams.set("type", "article");                // ✅ hindari liveblogs
  url.searchParams.set("query-fields", "headline,trailText"); // ✅ fokus bidang relevan
  url.searchParams.set("show-fields", "thumbnail,trailText");
  url.searchParams.set("api-key", key || "test");

  // Matikan cache dulu biar hasil langsung berubah. Nanti boleh ganti ke revalidate: 300
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`Guardian API error: ${res.status}`);
  const data = await res.json();
  return data.response?.results ?? [];
}


export default async function Feature() {
  let items: GuardianItem[] = [];

  try {
    items = await fetchGuardian(CAREER_QUERY); // ✅ fokus berita hiring
  } catch (e) {
    console.error("Guardian fetch error:", e);
  }

  return (
    <section
      id="news"
      className="flexCenter flex-col overflow-hidden bg-feature-bg bg-center bg-no-repeat py-24"
    >
      <div className="max-container padding-container w-full">
        <div className="mb-8">
          <h2 className="bold-40 lg:bold-64">Career & Hiring News</h2>
          <p className="regular-16 text-gray-500">Curated from The Guardian</p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((it) => (
            <li
              key={it.id}
              className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              {it.fields?.thumbnail && (
                <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src={it.fields.thumbnail}
                    alt={it.webTitle}
                    fill
                    sizes="(max-width:768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-[1.02] transition"
                  />
                </div>
              )}
              <a
                href={it.webUrl}
                target="_blank"
                rel="noreferrer"
                className="bold-18 hover:underline"
              >
                {it.webTitle}
              </a>
              <p
                className="regular-14 mt-2 line-clamp-3 text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: it.fields?.trailText ?? "",
                }}
              />
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>
                  {new Date(it.webPublicationDate).toLocaleDateString()}
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5">
                  {it.sectionName}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
