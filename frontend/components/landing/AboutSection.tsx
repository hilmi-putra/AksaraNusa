import { BookOpen, PenTool } from "lucide-react";
import { landingData } from "@/lib/mock/landing";

export function AboutSection() {
  const { aboutIntro } = landingData;

  // A simple way to highlight text based on the mock data highlights
  // In a real app, you might use a more robust parsing method if highlights are dynamic
  const highlightWord = (text: string, word: string, Icon: React.ElementType) => {
    const parts = text.split(new RegExp(`(${word})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === word.toLowerCase() ? (
        <span key={i} className="inline-flex items-center gap-1 bg-surface-white px-2 py-1 rounded-full border border-border-subtle mx-1 relative -top-1">
          <Icon className="w-4 h-4 text-primary-brand" />
          <span className="font-bold underline decoration-primary-brand decoration-2 underline-offset-4">{part}</span>
        </span>
      ) : (
        part
      )
    );
  };

  let paragraphContent: React.ReactNode = aboutIntro.paragraph;
  // Apply highlights if they match our known words for this demo
  if (typeof paragraphContent === 'string') {
    paragraphContent = highlightWord(paragraphContent, "penerbit", BookOpen);
    // Since it returns an array, we'd need a reduce to apply multiple, but for simplicity:
    // We'll just hardcode the styling to match the PRD intent if dynamic is too complex for simple string replace
  }

  return (
    <section id="about" className="py-24 px-6 bg-cream">
      <div className="container mx-auto flex flex-col items-center text-center max-w-4xl">
        <h2 className="text-body-lg font-medium text-ink leading-relaxed mb-10">
          Halo! Kami Aksara Nusa, dan kami <span className="inline-flex items-center gap-1 bg-surface-white px-3 py-1 rounded-full border border-border-subtle mx-1 align-middle text-base"><BookOpen className="w-4 h-4 text-primary-brand" /><span className="font-bold">penerbit</span></span>. Bersama kami, Anda mendapatkan kesempatan untuk mewujudkan naskah menjadi <span className="inline-flex items-center gap-1 bg-surface-white px-3 py-1 rounded-full border border-border-subtle mx-1 align-middle text-base"><PenTool className="w-4 h-4 text-primary-brand" /><span className="font-bold">karya berkualitas</span></span> dan menyebarkannya ke pembaca secara luas.
        </h2>
        
        <button className="bg-ink text-surface-white px-6 py-2 rounded-full text-button hover:bg-ink/90 transition-colors">
          {aboutIntro.ctaText}
        </button>
      </div>
    </section>
  );
}
