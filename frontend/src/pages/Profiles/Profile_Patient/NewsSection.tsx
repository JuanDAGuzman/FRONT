import React, { useMemo } from "react";

export interface NewsItem {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  source?: { name?: string };
  publishedAt?: string;
  link?: string; 
}

interface Topic {
  name: string;
  keywords: string[];
  color: string;
}

const TOPICS: Topic[] = [
  {
    name: "Diabetes y Pie Diabético",
    keywords: [
      "diabetes",
      "pie diabético",
      "glucosa",
      "insulina",
      "azúcar en sangre",
      "glucémico",
      "glucemias",
      "glucemia",
    ],
    color: "text-red-700",
  },
  {
    name: "Cardiología",
    keywords: [
      "corazón",
      "cardíaco",
      "infarto",
      "hipertensión",
      "presión arterial",
    ],
    color: "text-pink-700",
  },
  {
    name: "Salud Mental",
    keywords: [
      "ansiedad",
      "depresión",
      "mental",
      "estrés",
      "psicólogo",
      "psiquiatra",
    ],
    color: "text-blue-700",
  },
  {
    name: "Salud",
    keywords: [],
    color: "text-blue-700",
  },
];

function detectTopic(news: NewsItem[]): Topic {
  const counts = TOPICS.map((topic) => ({
    ...topic,
    count: news.reduce((acc, n) => {
      const text = (n.title + " " + (n.description || "")).toLowerCase();
      return acc + (topic.keywords.some((word) => text.includes(word)) ? 1 : 0);
    }, 0),
  }));

  const most = counts.reduce((max, t) => (t.count > max.count ? t : max), {
    count: 0,
  } as any);
  if (most.count > 0) {
    return most;
  }
  return TOPICS.find((t) => t.name === "Salud")!;
}

interface NewsSectionProps {
  news: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  const topic = useMemo(() => detectTopic(news), [news]);

  return (
    <section className="w-full max-w-4xl">
      <h2 className="font-extrabold text-2xl mb-4 px-2">
        Noticias recientes sobre{" "}
        <span className={topic.color}>{topic.name}</span>
      </h2>
      <div
        className="max-h-[430px] overflow-y-auto pr-2 space-y-4"
        style={{ scrollbarGutter: "stable", minWidth: 320 }}
      >
        {news.map((item, idx) => (
          <a
            key={item.url + idx}
            href={item.url || item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition flex gap-4 p-4"
            style={{ minHeight: 120, textDecoration: "none" }}
          >
            {item.urlToImage ? (
              <img
                src={item.urlToImage}
                alt={item.title}
                className="rounded-lg object-cover w-28 h-24 flex-shrink-0"
              />
            ) : (
              <div className="w-28 h-24 flex-shrink-0 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg text-lg">
                <span role="img" aria-label="Noticia">
                  📰
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="font-bold text-base text-gray-800 mb-1 line-clamp-2">
                {item.title}
              </div>
              <div className="text-xs text-gray-500 mb-1 truncate">
                {item.source?.name ||
                  item.link?.replace(/^https?:\/\//, "")?.split("/")[0] ||
                  "--"}
                {item.publishedAt && (
                  <>
                    {" "}
                    — {new Date(item.publishedAt).toLocaleDateString("es-CO")}
                  </>
                )}
              </div>
              <div className="text-gray-600 text-sm line-clamp-2">
                {item.description || ""}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
