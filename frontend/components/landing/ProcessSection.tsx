import { landingData } from "@/lib/mock/landing";

export function ProcessSection() {
  const { processSteps } = landingData;

  return (
    <section id="process" className="py-24 px-6 bg-cream">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <h2 className="text-h2 font-bold text-ink">Proses<br />Penerbitan</h2>
          <p className="text-caption text-text-muted max-w-[250px] md:text-right font-medium">
            Setiap tahap adalah langkah penting, dengan perhatian penuh pada kualitas buku Anda.
          </p>
        </div>

        <div className="relative border-l border-border-subtle ml-4 md:ml-8 pl-8 md:pl-12 flex flex-col gap-12">
          {processSteps.map((step, idx) => {
            const isActive = idx === 1; // Highlighting the second step as per PRD

            return (
              <div key={idx} className="relative flex flex-col md:flex-row gap-8 items-start">
                {/* Number Badge aligned with the border */}
                <div className="absolute -left-[54px] md:-left-[70px] bg-cream p-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border ${isActive ? 'bg-ink text-surface-white border-ink' : 'bg-surface-white text-ink border-border-subtle'}`}>
                    {step.number}
                  </div>
                </div>

                <div className={`flex-1 ${isActive ? 'bg-ink text-surface-white rounded-[24px] p-8 -mt-6' : 'pt-2'}`}>
                  <h3 className={`text-h3 font-bold mb-4 ${isActive ? 'text-surface-white' : 'text-ink'}`}>
                    {step.title}
                  </h3>
                  <p className={`${isActive ? 'text-surface-muted' : 'text-text-muted'} max-w-md`}>
                    {step.description}
                  </p>
                </div>

                {isActive && step.image && (
                  <div className="hidden md:block w-48 h-48 bg-surface-muted bg-cover bg-center shrink-0" 
                    style={{ 
                      backgroundImage: `url(${step.image || 'https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1973'})`,
                      borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
