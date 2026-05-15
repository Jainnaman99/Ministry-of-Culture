import { ExternalLink, Globe, Image, Video, FileText, Music } from "lucide-react";

interface SearchResultCardProps {
  title: string;
  summary: string;
  source: string;
  url: string;
  keywords?: string[];
  image?: string;
  mediaType?: "article" | "image" | "video" | "audio" | "document";
}

// Topic-matched Indian heritage fallbacks. Used only when a Wikimedia/external URL fails.
// Each entry maps a topic to a verified-loading Unsplash photo so the fallback still feels relevant.
const TOPIC_FALLBACKS: { match: RegExp; src: string }[] = [
  { match: /veda|upanishad|manuscript|sanskrit|gita|scripture|chant|palm.?leaf/i,
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rigveda_MS2097.jpg?width=400" },
  { match: /dance|bharatanatyam|kathak|odissi|kathakali|kuchipudi|natyashastra|sangeet|perform/i,
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Odissi_dance_at_Nishagandi_Dance_Festival_2024_%28207%29.jpg?width=400" },
  { match: /museum|gallery|salar.?jung|victoria.?memorial|exhibit|artefact|art/i,
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg?width=400" },
  { match: /ajanta|ellora|cave|rock.?cut|elephanta/i,
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Ajanta_%2863%29.jpg?width=400" },
  { match: /gandhi|freedom|independence|dandi|quit.india|swadeshi|smriti/i,
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Portrait_Gandhi.jpg?width=400" },
  { match: /archive|abhilekh|record|gazettes|national.?archive/i,
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/National_Archives_of_India.jpg?width=400" },
  { match: /taj|mumtaz|shah.?jahan|mughal|humayun/i,
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=75" },
  { match: /hampi|virupaksha|vijayanagara/i,
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg?width=400" },
  { match: /konark|sun.temple|odisha/i,
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Konarka_Temple.jpg?width=400" },
  { match: /khajuraho|temple|dravidian|chola|hoysala|mahabalipuram|mamallapuram/i,
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/A_collage_of_Mamallapuram_town_Tamil_Nadu_India.jpg?width=400" },
  { match: /unesco|world.heritage|intangible/i,
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=75" },
  { match: /scheme|scholarship|fellowship|grant|funding/i,
    src: "https://images.unsplash.com/photo-1583394293214-28a4b0a5dc6e?auto=format&fit=crop&w=400&q=75" },
];

// Final fallback when nothing matches — Indian heritage generic
const GENERIC_FALLBACK = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=75";

function pickFallback(title: string, summary: string, keywords?: string[]): string {
  const haystack = [title, summary, ...(keywords ?? [])].join(" ");
  for (const { match, src } of TOPIC_FALLBACKS) {
    if (match.test(haystack)) return src;
  }
  return GENERIC_FALLBACK;
}

const mediaIcons = {
  article: FileText,
  image: Image,
  video: Video,
  audio: Music,
  document: FileText,
};

const mediaLabels = {
  article: "Article",
  image: "Image",
  video: "Video",
  audio: "Audio",
  document: "Document",
};

export function SearchResultCard({ title, summary, source, url, keywords, image, mediaType = "article" }: SearchResultCardProps) {
  const MediaIcon = mediaIcons[mediaType];
  const fallbackSrc = pickFallback(title, summary, keywords);

  return (
    <div
      className="group rounded-xl border bg-white hover:shadow-md hover:border-[var(--gold)] transition-all overflow-hidden"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="flex">
        {/* Thumbnail */}
        {image && (
          <div className="w-48 flex-shrink-0 relative overflow-hidden hidden md:block" style={{ backgroundColor: "#F5E4C8" }}>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget;
                // Two-stage fallback: first try a topic-matched Wikimedia image, then an Unsplash safety net
                if (img.dataset.fellBack === "2") return;
                if (img.dataset.fellBack === "1") {
                  img.dataset.fellBack = "2";
                  img.src = GENERIC_FALLBACK;
                  return;
                }
                img.dataset.fellBack = "1";
                img.src = fallbackSrc;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5" />
            {/* Media type badge */}
            <span
              className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 backdrop-blur-sm"
              style={{ backgroundColor: "rgba(11,31,59,0.75)", color: "#fff" }}
            >
              <MediaIcon className="h-2.5 w-2.5" />
              {mediaLabels[mediaType]}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="flex-1 text-base leading-snug group-hover:text-[var(--gold)] transition-colors" style={{ color: 'var(--navy)' }}>
              {title}
            </h3>
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap flex items-center gap-1.5"
              style={{
                backgroundColor: 'rgba(198, 167, 94, 0.12)',
                color: '#8B6914'
              }}
            >
              <Globe className="h-3 w-3" />
              {source}
            </span>
          </div>

          <p className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            {summary}
          </p>

          <div className="flex items-center justify-between">
            {keywords && keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium"
                    style={{
                      backgroundColor: 'var(--muted)',
                      color: 'var(--navy)'
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2.5 flex-shrink-0 ml-3"
              style={{ color: 'var(--gold)' }}
            >
              Visit Source
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
