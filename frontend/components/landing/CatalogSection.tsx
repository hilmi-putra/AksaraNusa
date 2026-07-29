import { Book, ArrowRight } from "lucide-react";
import { landingData } from "@/lib/mock/landing";

export function CatalogSection() {
  const { catalogShowcase } = landingData;

  // Assuming the first item is the large one for the bento grid
  const mainItem = catalogShowcase.find(item => item.size === "large") || catalogShowcase[0];
  const smallItems = catalogShowcase.filter(item => item.size === "small").slice(0, 3); // take up to 3 for grid

  return (
    <section id="catalog" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Title Card */}
          <div className="bg-ink rounded-[32px] p-8 text-surface-white flex flex-col justify-between min-h-[250px] lg:col-span-1">
            <div>
              <div className="bg-surface-white/10 w-10 h-10 rounded-full flex items-center justify-center mb-6">
                <Book className="w-5 h-5 text-surface-white" />
              </div>
              <h2 className="text-h2 font-bold leading-tight">
                Katalog<br />Unggulan
              </h2>
            </div>
          </div>

          {/* Large Item */}
          <div className="lg:col-span-1 lg:row-span-2 relative group overflow-hidden rounded-[32px] min-h-[400px]">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${mainItem.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974'})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent flex flex-col justify-end p-8 text-surface-white">
              <span className="text-xs uppercase tracking-wider mb-2 font-semibold bg-primary-brand px-3 py-1 rounded-full self-start">{mainItem.category}</span>
              <h3 className="text-h3 font-bold">{mainItem.title}</h3>
            </div>
          </div>

          {/* Small Items Column */}
          <div className="flex flex-col gap-4 lg:col-span-1 lg:row-span-2">
            {smallItems.map((item, idx) => (
              <div key={item.id} className="relative group overflow-hidden rounded-[24px] h-[200px] flex-1">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.coverImage || `https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop&${idx}`})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent flex flex-col justify-end p-6 text-surface-white">
                   <h3 className="text-lg font-bold">{item.title}</h3>
                   <span className="text-xs text-surface-muted mt-1">{item.category}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <button className="flex items-center gap-2 bg-transparent text-ink border border-ink/20 px-6 py-3 rounded-full text-button hover:bg-ink/5 transition-colors">
            Lihat Semua Katalog <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
