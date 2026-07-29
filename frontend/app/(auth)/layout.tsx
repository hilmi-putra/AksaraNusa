import { MainNavbar } from "@/components/organisms/MainNavbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#EFEADD] to-[#f4efe5] overflow-hidden">
      
      <MainNavbar />

      {/* Subtle Grid Pattern Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
        }}
      />
      
      {/* Content wrapper - Simple Centered Card */}
      <div className="relative z-10 w-full max-w-md flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
