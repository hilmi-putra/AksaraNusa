import { ArrowRight, FileText, Palette, Store, MessageCircle } from "lucide-react";
import { landingData } from "@/lib/mock/landing";

const iconMap: Record<string, React.ElementType> = {
  FileText: FileText,
  Palette: Palette,
  Store: Store,
  MessageCircle: MessageCircle,
};

export function AdvantagesSection() {
  const { advantages } = landingData;

  return (
    <section id="services" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Title Card */}
          <div className="bg-surface-muted rounded-[32px] p-10 flex flex-col justify-between min-h-[400px]">
            <div>
              <h2 className="text-h2 font-bold text-ink leading-tight">
                Keunggulan<br />Kami
              </h2>
            </div>
            <div className="flex justify-end">
              <ArrowRight className="w-8 h-8 text-ink" />
            </div>
          </div>

          {/* Grid of Advantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map((adv, idx) => {
              const Icon = iconMap[adv.icon] || FileText;
              return (
                <div 
                  key={idx} 
                  className="bg-primary-brand hover:bg-secondary-brand transition-colors rounded-[32px] p-8 flex flex-col justify-between text-surface-white"
                >
                  <div>
                    <h3 className="text-h3 font-semibold mb-2">{adv.title}</h3>
                    <p className="text-sm opacity-90">{adv.description}</p>
                  </div>
                  <div className="mt-8">
                    <div className="bg-surface-white/20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-6 h-6 text-surface-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
