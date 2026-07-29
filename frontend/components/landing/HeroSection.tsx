import { ArrowRight } from "lucide-react";
import { landingData } from "@/lib/mock/landing";

export function HeroSection() {
  const { heroContent } = landingData;

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-16 gap-8">
          {/* Headline */}
          <h1 className="text-hero font-bold text-ink leading-tight tracking-tight whitespace-pre-line max-w-2xl">
            {heroContent.headline}
          </h1>

          {/* Subcopy & CTA */}
          <div className="flex flex-col items-start md:items-end gap-6 text-left md:text-right mt-4 md:mt-0">
            <p className="text-caption text-text-muted whitespace-pre-line font-medium max-w-[250px]">
              {heroContent.subcopy}
            </p>
            <button className="flex items-center gap-2 bg-ink text-surface-white px-6 py-3 rounded-full text-button hover:bg-ink/90 transition-colors">
              {heroContent.ctaText}
              <span className="bg-surface-white text-ink rounded-full p-1">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>

        {/* Gallery / Blobs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
          {/* We're simulating the organic shapes using Tailwind's border-radius arbitrary values */}
          <div 
            className="bg-surface-muted bg-cover bg-center"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop")',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
            }}
          />
          <div 
            className="bg-surface-muted bg-cover bg-center"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop")',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
            }}
          />
          <div 
            className="bg-surface-muted bg-cover bg-center"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2070&auto=format&fit=crop")',
              borderRadius: '70% 30% 50% 50% / 40% 50% 50% 60%'
            }}
          />
        </div>
      </div>
    </section>
  );
}
