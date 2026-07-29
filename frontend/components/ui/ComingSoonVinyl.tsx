import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'compact';
}

export const ComingSoonVinyl = ({ title = "DASHBOARD", subtitle = "Ringkasan aktivitas akun dan pesanan Anda.", variant = 'default' }: Props) => {
    if (variant === 'compact') {
        return (
            <div className="w-full bg-white rounded-2xl border border-border overflow-hidden relative flex flex-col h-[400px]">
                <div className="flex-1 p-6 z-10 flex flex-col">
                    <div>
                        <h2 className="text-lg font-black text-[#171512] uppercase tracking-tighter mb-1 font-sans">{title}</h2>
                        <p className="text-xs text-gray-400">{subtitle}</p>
                    </div>
                    
                    <div className="mt-auto pt-8 mb-4">
                        <h1 className="text-3xl font-black text-[#4A4A4A] leading-[1.05] tracking-tight">
                            We'll Be<br />Launching<br />in 2026
                        </h1>
                    </div>
                </div>

                <div className="absolute right-[-40%] bottom-[-20%] w-[80%] aspect-square flex items-center justify-end">
                    <div className="absolute inset-0 rounded-full animate-[spin_10s_linear_infinite]"
                        style={{
                            background: 'conic-gradient(#171512 0deg, #2a2a2a 45deg, #171512 90deg, #2a2a2a 135deg, #171512 180deg, #2a2a2a 225deg, #171512 270deg, #2a2a2a 315deg, #171512 360deg)',
                        }}
                    >
                        <div className="absolute inset-[4%] rounded-full border-[1px] border-white/5"></div>
                        <div className="absolute inset-[10%] rounded-full border-[1px] border-white/10"></div>
                        <div className="absolute inset-[16%] rounded-full border-[1px] border-white/5"></div>
                        <div className="absolute inset-[22%] rounded-full border-[1px] border-white/10"></div>
                        
                        <div className="absolute inset-0 rounded-full opacity-30"
                            style={{
                                background: 'conic-gradient(transparent 0deg, transparent 200deg, #A0A0A0 200deg, #A0A0A0 260deg, transparent 260deg)',
                                mixBlendMode: 'screen'
                            }}
                        ></div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] h-[38%] bg-[#F3F2EE] rounded-full shadow-inner flex flex-col items-center justify-center border-2 border-[#171512] z-10">
                        <div className="flex flex-col items-center justify-center text-center" style={{ fontFamily: 'var(--font-playfair-display), serif' }}>
                            <h2 className="text-xl tracking-tighter leading-[0.8] text-[#004A8F] mb-1">coming</h2>
                            <h2 className="text-xl tracking-tighter leading-[0.8] text-[#004A8F] ml-2">soon</h2>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full border border-gray-300 shadow-inner"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-2xl border border-border overflow-hidden relative flex flex-col md:flex-row min-h-[500px] lg:min-h-[600px]">
            {/* Left Content */}
            <div className="flex-1 p-8 md:p-12 z-10 flex flex-col">
                <div>
                    <h2 className="text-xl md:text-2xl font-black text-[#171512] uppercase tracking-tighter mb-1 font-sans">{title}</h2>
                    <p className="text-sm text-gray-400">{subtitle}</p>
                </div>
                
                <div className="mt-auto pt-16 mb-8 md:mb-12">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-black text-[#4A4A4A] leading-[1.05] tracking-tight">
                        We'll Be<br />Launching<br />in 2026
                    </h1>
                </div>
            </div>

            {/* Right Content - Vinyl */}
            <div className="relative w-full md:w-[45%] h-64 md:h-auto overflow-hidden flex items-center justify-end">
                {/* The Vinyl Container - positioned absolute to overflow correctly */}
                <div className="absolute right-[-30%] md:right-[-40%] lg:right-[-35%] top-1/2 -translate-y-1/2 w-[130vw] md:w-[80vw] lg:w-[60vw] max-w-[800px] lg:max-w-[1000px] aspect-square">
                    {/* The Spinning Vinyl Record */}
                    <div 
                        className="absolute inset-0 rounded-full animate-[spin_10s_linear_infinite]"
                        style={{
                            background: 'conic-gradient(#171512 0deg, #2a2a2a 45deg, #171512 90deg, #2a2a2a 135deg, #171512 180deg, #2a2a2a 225deg, #171512 270deg, #2a2a2a 315deg, #171512 360deg)',
                        }}
                    >
                        {/* Grooves */}
                        <div className="absolute inset-[4%] rounded-full border-[1px] border-white/5"></div>
                        <div className="absolute inset-[10%] rounded-full border-[1px] border-white/10"></div>
                        <div className="absolute inset-[16%] rounded-full border-[1px] border-white/5"></div>
                        <div className="absolute inset-[22%] rounded-full border-[1px] border-white/10"></div>
                        <div className="absolute inset-[28%] rounded-full border-[1px] border-white/5"></div>
                        <div className="absolute inset-[34%] rounded-full border-[1px] border-white/10"></div>
                        <div className="absolute inset-[40%] rounded-full border-[1px] border-white/5"></div>
                        
                        {/* Accent Wedge */}
                        <div 
                            className="absolute inset-0 rounded-full opacity-30"
                            style={{
                                background: 'conic-gradient(transparent 0deg, transparent 200deg, #A0A0A0 200deg, #A0A0A0 260deg, transparent 260deg)',
                                mixBlendMode: 'screen'
                            }}
                        ></div>
                    </div>

                    {/* Non-spinning Center Label */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] h-[38%] bg-[#F3F2EE] rounded-full shadow-inner flex flex-col items-center justify-center border-2 border-[#171512] z-10">
                        <div className="flex flex-col items-center justify-center text-center" style={{ fontFamily: 'var(--font-playfair-display), serif' }}>
                            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.8] text-[#004A8F] mb-1">
                                coming
                            </h2>
                            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.8] text-[#004A8F] ml-4 md:ml-6 lg:ml-10">
                                soon
                            </h2>
                        </div>
                        {/* Center Hole */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 md:w-6 h-4 md:h-6 bg-white rounded-full border border-gray-300 shadow-inner"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
