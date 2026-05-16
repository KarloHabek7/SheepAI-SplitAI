import React from 'react';
import WebGLBackground from './components/WebGLBackground';
import { useReveal } from './hooks/useReveal';
import { 
  Bot, Shield, Zap, Activity, RefreshCw, Layers, Network, Plus, 
  Globe, BarChart2, Settings, Loader2, Check, Sparkles, Mail, MapPin, Scan 
} from 'lucide-react';

export default function App() {
  useReveal();

  return (
    <div className="relative z-10 w-full lg:max-w-[1440px] mx-auto flex flex-col min-h-screen lg:border-x border-white/10 bg-black/20 backdrop-blur-[2px] lg:px-8 lg:py-8">
      
      {/* Mini Corner Squares */}
      <div className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border border-white/20 bg-[#030303] z-50"></div>
      <div className="hidden lg:block absolute -top-1 -right-1 w-2 h-2 border border-white/20 bg-[#030303] z-50"></div>
      <div className="hidden lg:block absolute -bottom-1 -left-1 w-2 h-2 border border-white/20 bg-[#030303] z-50"></div>
      <div className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border border-white/20 bg-[#030303] z-50"></div>

      {/* Hero Card Container */}
      <div className="flex-1 relative lg:rounded-[2rem] overflow-hidden flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-0 lg:p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent z-10">
        
        {/* Inner Solid Background */}
        <div className="absolute inset-0 lg:inset-[1px] bg-[#09090b]/90 backdrop-blur-xl lg:rounded-[calc(2rem-1px)] z-0"></div>

        {/* WebGL Mesh Gradient Background */}
        <div className="absolute inset-0 lg:inset-[1px] z-0 overflow-hidden lg:rounded-[calc(2rem-1px)]">
          <WebGLBackground className="w-full h-full opacity-100 mix-blend-screen pointer-events-none" />
        </div>

        {/* Vertical dropping lines */}
        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 w-[300px] h-[300px] pointer-events-none z-0">
          <div className="drop-line absolute left-[35%] top-0 w-[1px] h-32" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)', animationDuration: '2s', animationDelay: '0s' }}></div>
          <div className="drop-line absolute left-[50%] top-10 w-[1px] h-48" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), transparent)', animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
          <div className="drop-line absolute left-[65%] top-4 w-[1px] h-24" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.25), transparent)', animationDuration: '3s', animationDelay: '1s' }}></div>
        </div>

        {/* Content Z-Layering */}
        <div className="relative z-10 flex flex-col h-full w-full px-5 py-8 md:px-10 md:py-10 flex-1">
            
          {/* Navigation */}
          <nav className="flex items-center justify-between w-full reveal-fade" style={{ transitionDelay: '0.2s' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <iconify-icon icon="solar:infinity-bold-duotone" class="text-black text-xl"></iconify-icon>
              </div>
            </div>

            {/* Center Pill Menu */}
            <div className="hidden lg:block p-[1px] bg-gradient-to-br from-white/20 to-white/5 rounded-full shadow-lg">
              <div className="flex items-center rounded-full bg-[#111]/80 backdrop-blur-md px-1.5 py-1.5">
                <div className="flex items-center px-4 gap-6 text-sm font-light text-gray-400">
                  <a href="#" className="text-white">Features</a>
                  <a href="#" className="hover:text-gray-200 transition-colors">Marjan Vision</a>
                  <a href="#" className="hover:text-gray-200 transition-colors">Split Zmaj RAG</a>
                  <a href="#" className="hover:text-gray-200 transition-colors">Pazar Feed</a>
                  <a href="#" className="hover:text-gray-200 transition-colors">City API</a>
                </div>
                <div className="w-px h-4 bg-white/10 mx-2"></div>
                <a href="#" className="flex items-center gap-1.5 text-sm font-light text-gray-300 hover:text-white transition-colors px-3">
                  App <iconify-icon icon="solar:arrow-up-right-bold-duotone" class="text-sm"></iconify-icon>
                </a>
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center ml-1">
                  <iconify-icon icon="solar:shield-check-bold-duotone" class="text-white text-sm"></iconify-icon>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="hidden md:flex items-center gap-2 text-sm font-light text-gray-300 hover:text-white transition-colors">
                <iconify-icon icon="solar:user-bold-duotone" class="text-lg"></iconify-icon>
                Sign In
              </a>
              <button className="lg:hidden text-white">
                <iconify-icon icon="solar:hamburger-menu-bold-duotone" class="text-2xl"></iconify-icon>
              </button>
            </div>
          </nav>

          {/* Central Hero Content */}
          <main className="flex-1 flex flex-col text-center w-full mt-16 relative items-center justify-center md:mt-32">
              
            {/* Floating Nodes */}
            <div className="absolute hidden lg:flex items-center gap-3 top-[15%] left-[8%] group cursor-default">
              <div className="p-[1px] rounded-full bg-gradient-to-br from-white/30 to-white/5 shadow-lg">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#111]/80 backdrop-blur-md z-10">
                  <iconify-icon icon="solar:cpu-bold-duotone" class="text-white text-sm"></iconify-icon>
                </div>
              </div>
              <div className="w-12 h-px bg-gradient-to-r from-white/30 to-transparent"></div>
              <div className="text-left translate-y-[-2px]">
                <div className="text-sm font-light text-gray-200 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span> Edge Sync</div>
                <div className="text-xs text-gray-500 mt-0.5 tracking-wider font-mono">1.42 ms</div>
              </div>
            </div>

            <div className="absolute hidden lg:flex flex-row-reverse items-center gap-3 top-[22%] right-[10%] group cursor-default">
              <div className="p-[1px] rounded-full bg-gradient-to-bl from-white/30 to-white/5 shadow-lg">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#111]/80 backdrop-blur-md z-10">
                  <iconify-icon icon="solar:database-bold-duotone" class="text-white text-sm"></iconify-icon>
                </div>
              </div>
              <div className="w-10 h-px bg-gradient-to-l from-white/30 to-transparent"></div>
              <div className="text-right translate-y-[-2px]">
                <div className="text-sm font-light text-gray-200 flex items-center justify-end gap-1.5">Validation <span className="w-1 h-1 rounded-full bg-white/60"></span></div>
                <div className="text-xs text-gray-500 mt-0.5 tracking-wider font-mono">v8.2.0</div>
              </div>
            </div>

            {/* 01 Detail Marker */}
            <div className="text-sm font-light tracking-widest text-gray-500 mb-6 flex items-center gap-2 reveal-fade" style={{ transitionDelay: '0.35s' }}>
              <span>01</span><div className="w-6 h-px bg-gray-600"></div><span className="">CONCEPT</span>
            </div>

            {/* Masked Reveal Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl mx-auto leading-[1.05] drop-shadow-2xl tracking-tight font-extralight text-white gsap-reveal" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <span className="overflow-hidden inline-flex pb-2"><span className="word inline-block will-change-transform" style={{ transitionDelay: '0.2s' }}>One AI</span></span><br/>
              <span className="overflow-hidden inline-flex pb-2 lg:-ml-2"><span className="word inline-block will-change-transform" style={{ transitionDelay: '0.35s' }}>Agent for</span></span>
              <span className="overflow-hidden inline-flex pb-2"><span className="word inline-block will-change-transform" style={{ transitionDelay: '0.5s' }}>Split</span></span>
            </h1>

            {/* Subcopy */}
            <p className="text-base md:text-lg text-gray-400 font-extralight max-w-xl mx-auto mb-10 leading-relaxed reveal-fade" style={{ transitionDelay: '0.65s' }}>
              Ask anything, report anything, in any language. The unified municipal AI assistant for residents, tourists, and city workers.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center items-center gap-4 reveal-fade" style={{ transitionDelay: '0.8s' }}>
              <a href="#" className="px-6 py-3 bg-white text-black rounded-full text-base font-normal hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Launch App <span className="ml-1 opacity-60">↗</span>
              </a>
              <div className="p-[1px] rounded-full bg-gradient-to-br from-white/20 to-white/5 hover:opacity-80 transition-opacity">
                <a href="#" className="block px-6 py-3 text-white rounded-full text-base font-light bg-[#111]/60 backdrop-blur-md">
                  Learn More
                </a>
              </div>
            </div>
          </main>

          {/* Bottom Footer/Indicators */}
          <footer className="flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-8 md:gap-0 mt-20 md:mt-0 reveal-fade" style={{ transitionDelay: '0.95s' }}>
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="text-sm font-light tracking-widest text-gray-500 flex items-center gap-2">
                <span>02</span><div className="w-6 h-px bg-gray-600"></div><span>CAPABILITIES</span>
              </div>
              <div className="flex items-center gap-3 rounded-full pl-1 pr-4 py-1 p-[1px] bg-gradient-to-b from-white/20 to-white/5 bg-[#111]/40 backdrop-blur-md w-max shadow-sm">
                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
                  <iconify-icon icon="solar:arrow-down-bold-duotone" class="text-xs"></iconify-icon>
                </div>
                <span className="text-xs font-light text-gray-400 tracking-widest uppercase">View Demo</span>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <span className="text-xs font-light text-gray-400 tracking-widest uppercase">Active Nodes</span>
              <div className="flex gap-1.5">
                <div className="w-6 h-0.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"></div>
                <div className="w-4 h-0.5 rounded-full bg-white/20"></div>
                <div className="w-4 h-0.5 rounded-full bg-white/20"></div>
                <div className="w-4 h-0.5 rounded-full bg-white/20"></div>
              </div>
            </div>
          </footer>
        </div>
        
        {/* 03 Detail Marker & Logo Cloud */}
        <div className="flex flex-col w-full z-10 pt-24 pb-12 relative items-center">
          <div className="text-sm font-light tracking-widest text-gray-500 mb-8 flex items-center gap-2 reveal-fade">
            <span>03</span><div className="w-6 h-px bg-gray-600"></div><span className="">INTEGRATIONS</span>
          </div>
          <div className="flex justify-center items-center gap-8 md:gap-14 opacity-50 grayscale flex-wrap px-6 reveal-fade w-full max-w-5xl" style={{ transitionDelay: '0.2s' }}>
            <iconify-icon icon="simple-icons:vercel" class="text-3xl md:text-4xl text-white hover:opacity-100 hover:grayscale-0 transition-all duration-300"></iconify-icon>
            <iconify-icon icon="simple-icons:stripe" class="text-3xl md:text-4xl text-white hover:opacity-100 hover:grayscale-0 transition-all duration-300"></iconify-icon>
            <iconify-icon icon="simple-icons:supabase" class="text-3xl md:text-4xl text-white hover:opacity-100 hover:grayscale-0 transition-all duration-300"></iconify-icon>
            <iconify-icon icon="simple-icons:github" class="text-3xl md:text-4xl text-white hover:opacity-100 hover:grayscale-0 transition-all duration-300"></iconify-icon>
            <iconify-icon icon="simple-icons:cloudflare" class="text-3xl md:text-4xl text-white hover:opacity-100 hover:grayscale-0 transition-all duration-300"></iconify-icon>
            <iconify-icon icon="simple-icons:prisma" class="text-3xl md:text-4xl text-white hover:opacity-100 hover:grayscale-0 transition-all duration-300"></iconify-icon>
          </div>
        </div>

        {/* Engineering Supercharged */}
        <section className="z-10 reveal-fade w-full max-w-[1200px] mr-auto ml-auto pt-24 pr-6 pb-24 pl-6 relative">
          <div className="w-full border-t border-x border-white/[0.08] flex flex-col relative bg-[#030303]">
            {/* Top Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-white/[0.08]">
              <div className="p-8 lg:p-14 lg:border-r border-white/[0.08] flex flex-col justify-end">
                <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white mb-4 leading-[1.1]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  City Services,<br/>Powered by AI.
                </h2>
                <p className="text-base text-gray-400 font-extralight max-w-md">SplitAI is your unified interface to everything happening in the city of Split.</p>
              </div>
              <div className="p-8 lg:p-14 flex items-start border-t lg:border-t-0 border-white/[0.08]">
                <p className="text-base text-gray-500 font-extralight max-w-[320px] leading-relaxed">
                  Powered by Gemini 2.5 Flash, providing sub-second responses, visual issue triage, and real-time civic context.
                </p>
              </div>
            </div>

            {/* Middle Row: 3 Feature Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 border-b border-white/[0.08]">
                
              {/* Card 1 */}
              <div className="group relative p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col gap-8 h-full overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 flashlight-bg"></div>
                <div className="absolute inset-0 border border-transparent group-hover:border-white/10 group-hover:bg-white/[0.01] transition-all duration-500 pointer-events-none z-0"></div>
                
                <div className="relative z-10 h-64 bg-[#080808] border border-white/[0.05] rounded-xl p-5 overflow-hidden flex flex-col shadow-inner">
                  <div className="flex text-xs font-mono leading-relaxed tracking-wider">
                    <div className="flex flex-col text-gray-700 text-right pr-4 select-none">
                      <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
                    </div>
                    <div className="flex flex-col text-gray-400 w-full">
                      <div className="animate-type-1"><span className="text-gray-200">Mesh</span> <span className="text-emerald-400">"novaMesh"</span> {'{'}</div>
                      <div className="animate-type-2 pl-4">api_token = var.nova_auth_token</div>
                      <div className="animate-type-3 pl-4">region = var.target_region</div>
                      <div className="animate-type-4">{'}'}</div>
                      <div className="h-6"></div>
                      <div className="animate-type-5"><span className="text-gray-200">resource</span> <span className="text-emerald-400">"novacore_vpc"</span> <span className="text-emerald-400">"primary"</span> {'{'}</div>
                      <div className="animate-type-6 pl-4"><span className="text-gray-600"># Low-latency peering enabled</span></div>
                      <div className="animate-type-7">{'}'}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex flex-col gap-2 relative z-10">
                  <div className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-gray-200" strokeWidth={1.5} />
                    <h3 className="text-xl font-normal tracking-tight text-white">Marjan Vision</h3>
                  </div>
                  <p className="text-base text-gray-500 font-extralight leading-relaxed">Instantly classify civic issues and generate tickets from photos.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col gap-8 h-full overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 flashlight-bg"></div>
                <div className="absolute inset-0 border border-transparent group-hover:border-white/10 group-hover:bg-white/[0.01] transition-all duration-500 pointer-events-none z-0"></div>
                
                <div className="relative z-10 h-64 w-full flex items-center justify-center overflow-hidden">
                  <div className="relative w-[180px] h-[180px]">
                    <div className="absolute w-[160px] h-[160px] rounded-full border border-dashed border-white/10 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="absolute w-full h-full animate-[spin_20s_linear_infinite] z-10">
                      <div className="absolute top-1/2 left-1/2 -mt-5 -ml-5">
                        <div className="w-10 h-10 rounded-full bg-[#080808] border border-white/10 flex items-center justify-center shadow-lg animate-reverse-spin">
                          <Shield className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -mt-5 -ml-5" style={{ transform: 'rotate(60deg) translateX(80px) rotate(-60deg)' }}>
                        <div className="w-10 h-10 rounded-full bg-[#080808] border border-white/10 flex items-center justify-center shadow-lg animate-reverse-spin">
                          <Zap className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -mt-5 -ml-5" style={{ transform: 'rotate(120deg) translateX(80px) rotate(-120deg)' }}>
                        <div className="w-10 h-10 rounded-full bg-[#080808] border border-white/10 flex items-center justify-center shadow-lg animate-reverse-spin">
                          <Activity className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -mt-5 -ml-5" style={{ transform: 'rotate(180deg) translateX(80px) rotate(-180deg)' }}>
                        <div className="w-10 h-10 rounded-full bg-[#080808] border border-white/10 flex items-center justify-center shadow-lg animate-reverse-spin">
                          <RefreshCw className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -mt-5 -ml-5" style={{ transform: 'rotate(240deg) translateX(80px) rotate(-240deg)' }}>
                        <div className="w-10 h-10 rounded-full bg-[#080808] border border-white/10 flex items-center justify-center shadow-lg animate-reverse-spin">
                          <Layers className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -mt-5 -ml-5" style={{ transform: 'rotate(300deg) translateX(80px) rotate(-300deg)' }}>
                        <div className="w-10 h-10 rounded-full bg-[#080808] border border-white/10 flex items-center justify-center shadow-lg animate-reverse-spin">
                          <Network className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-20 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-pink-500 to-orange-500 p-[2px] shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                        <div className="w-full h-full bg-[#030303] rounded-full"></div>
                      </div>
                      <div className="absolute flex items-center justify-center w-6 h-6 bg-gradient-to-tr from-blue-500 via-pink-500 to-orange-500 rounded-full drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                        <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex flex-col gap-2 relative z-10">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-200" strokeWidth={1.5} />
                    <h3 className="text-xl font-normal tracking-tight text-white">Multilingual Core</h3>
                  </div>
                  <p className="text-base text-gray-500 font-extralight leading-relaxed">Native support for Croatian dialects, English, German, and more.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative p-8 lg:p-10 flex flex-col gap-8 h-full overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 flashlight-bg"></div>
                <div className="absolute inset-0 border border-transparent group-hover:border-white/10 group-hover:bg-white/[0.01] transition-all duration-500 pointer-events-none z-0"></div>
                
                <div className="relative z-10 h-64 w-full flex flex-col justify-between">
                  <div className="relative w-full h-32 flex items-center justify-center mt-2">
                    <div className="absolute w-[80px] h-[80px] rounded-full border border-orange-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-sonar opacity-0 pointer-events-none"></div>
                    <div className="absolute w-[80px] h-[80px] rounded-full border border-orange-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-sonar opacity-0 pointer-events-none" style={{ animationDelay: '1.33s' }}></div>
                    <div className="absolute w-[80px] h-[80px] rounded-full border border-orange-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-sonar opacity-0 pointer-events-none" style={{ animationDelay: '2.66s' }}></div>
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full px-2">
                    <div className="w-full bg-[#080808] border border-white/[0.08] rounded p-2.5 flex items-center gap-2 text-xs font-mono shadow-sm">
                      <span className="text-emerald-400">add</span><span className="text-gray-400">`novacore_vpc_peering`</span>
                    </div>
                    <div className="w-[95%] mx-auto bg-[#080808] border border-white/[0.04] rounded p-2.5 flex items-center gap-2 text-xs font-mono opacity-60">
                      <span className="text-gray-500">resource `novacore_iam_group` "ops" {'{'}</span>
                    </div>
                    <div className="w-[90%] mx-auto bg-[#080808] border border-white/[0.02] rounded p-2.5 flex items-center gap-2 text-[10px] font-mono opacity-30">
                      <span className="text-gray-600">Mesh `nova_id_240_81` "ops" {'{'}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex flex-col gap-2 relative z-10">
                  <div className="flex items-center gap-3">
                    <BarChart2 className="w-5 h-5 text-gray-200" strokeWidth={1.5} />
                    <h3 className="text-xl font-normal tracking-tight text-white">Split Zmaj RAG</h3>
                  </div>
                  <p className="text-base text-gray-500 font-extralight leading-relaxed">Query the full GUP and city regulations with exact citations.</p>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 p-8 lg:p-14 gap-12 items-end border-b border-white/[0.08]">
              <div className="lg:col-span-8 flex flex-col justify-end">
                <p className="text-sm tracking-wide text-gray-500 font-normal mb-5">Global-scale distribution engine.</p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-tight text-white leading-[1.3] max-w-3xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Turn your application into a NovaCore global mesh with zero-config endpoints, adaptive descriptions, and hosted execution.
                </h2>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end w-full">
                <div className="w-full max-w-[280px] h-32 bg-[#050b14] border border-white/[0.05] rounded-md overflow-hidden relative shadow-inner">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent"></div>
                  <div className="absolute -top-[10%] -right-[20%] w-[150%] h-[30px] bg-white rounded-full rotate-[-35deg] blur-[15px] opacity-70"></div>
                  <div className="absolute top-[20%] right-[10%] w-[80%] h-[10px] bg-blue-200 rounded-full rotate-[-35deg] blur-[4px] opacity-90"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="z-10 flex flex-col reveal-fade bg-[#030303] w-full pt-24 pr-6 pb-24 pl-6 relative items-center justify-center">
          <div className="w-full max-w-[1200px] bg-[#080808] border border-white/[0.08] rounded-[2rem] p-8 md:p-14 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
              <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/5 blur-[100px] rounded-full"></div>
              <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-orange-500/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="relative z-10 w-full mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-normal text-gray-300 w-max mb-8 shadow-sm">
                <span className="text-orange-500 text-[10px] leading-none">◆</span> Why Nexus?
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white max-w-2xl leading-[1.1]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Solve issues<br/>in seconds
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full relative z-10">
              
              {/* Column 1: Design */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg text-white font-normal">Design</h3>
                  <p className="text-sm text-gray-400 font-extralight max-w-md leading-relaxed min-h-[60px]">
                    Architecting systems through manual configuration, fragmented service maps, and constant environment syncing.
                  </p>
                </div>
                
                <div className="w-full aspect-[4/3] rounded-2xl border border-white/10 bg-[#0A0A0A] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 shadow-inner">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                  
                  <div className="w-full max-w-[340px] bg-[#111] border border-white/10 rounded-xl shadow-2xl z-10 flex flex-col p-2.5 gap-1.5 backdrop-blur-md">
                    
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.02]">
                      <div className="flex items-center gap-3">
                        <iconify-icon icon="simple-icons:supabase" class="text-lg text-emerald-500"></iconify-icon>
                        <span className="text-xs text-gray-400 font-light">Supabase</span>
                      </div>
                      <div className="px-2 py-1 rounded border border-orange-500/20 bg-orange-500/10 text-orange-400 text-[10px] flex items-center gap-1.5">
                        Configuring <Settings className="w-3 h-3 animate-[spin_3s_linear_infinite]" strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.02]">
                      <div className="flex items-center gap-3">
                        <iconify-icon icon="simple-icons:vercel" class="text-lg text-white"></iconify-icon>
                        <span className="text-xs text-gray-400 font-light">Vercel</span>
                      </div>
                      <div className="px-2 py-1 rounded border border-orange-500/20 bg-orange-500/10 text-orange-400 text-[10px] flex items-center gap-1.5">
                        Deploying <RefreshCw className="w-3 h-3 animate-[spin_4s_linear_infinite]" strokeWidth={1.5} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.02]">
                      <div className="flex items-center gap-3">
                        <iconify-icon icon="simple-icons:figma" class="text-lg text-pink-500"></iconify-icon>
                        <span className="text-xs text-gray-400 font-light">Figma</span>
                      </div>
                      <div className="px-2 py-1 rounded border border-orange-500/20 bg-orange-500/10 text-orange-400 text-[10px] flex items-center gap-1.5">
                        Syncing <Loader2 className="w-3 h-3 animate-[spin_2s_linear_infinite]" strokeWidth={1.5} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-transparent">
                      <div className="flex items-center gap-3">
                        <iconify-icon icon="simple-icons:slack" class="text-lg"></iconify-icon>
                        <span className="text-xs text-gray-400 font-light opacity-60">Slack</span>
                      </div>
                      <div className="px-2 py-1 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] flex items-center gap-1 opacity-80">
                        Live <Check className="w-3 h-3" strokeWidth={1.5} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-transparent">
                      <div className="flex items-center gap-3">
                        <iconify-icon icon="simple-icons:notion" class="text-lg"></iconify-icon>
                        <span className="text-xs text-gray-400 font-light opacity-60">Notion</span>
                      </div>
                      <div className="px-2 py-1 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] flex items-center gap-1 opacity-80">
                        Live <Check className="w-3 h-3" strokeWidth={1.5} />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Column 2: Process */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg text-white font-normal">Process</h3>
                  <p className="text-sm text-gray-400 font-extralight max-w-md leading-relaxed min-h-[60px]">
                    Nexus Neural Engine automates the deployment lifecycle, intelligently routing requests across 500+ global edges.
                  </p>
                </div>
                
                <div className="w-full aspect-[4/3] rounded-2xl border border-white/10 bg-[#0A0A0A] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 shadow-inner">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                  
                  <div className="w-full max-w-[360px] bg-[#111] border border-white/10 rounded-xl shadow-2xl z-10 flex flex-col overflow-hidden backdrop-blur-md">
                    
                    <div className="grid grid-cols-3 border-b border-white/[0.08] bg-[#0C0C0C]">
                      <div className="flex items-center gap-2.5 p-3.5 border-r border-b border-white/[0.08]">
                        <iconify-icon icon="simple-icons:supabase" class="text-base text-emerald-500"></iconify-icon><span className="text-[10px] text-gray-400 font-light">DB</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-3.5 border-r border-b border-white/[0.08]">
                        <iconify-icon icon="simple-icons:vercel" class="text-base text-white"></iconify-icon><span className="text-[10px] text-gray-400 font-light">Edge</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-3.5 border-b border-white/[0.08]">
                        <iconify-icon icon="simple-icons:figma" class="text-base text-pink-500"></iconify-icon><span className="text-[10px] text-gray-400 font-light">Assets</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-3.5 border-r border-white/[0.08]">
                        <iconify-icon icon="simple-icons:shopify" class="text-base text-white"></iconify-icon><span className="text-[10px] text-gray-400 font-light">Shop</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-3.5 border-r border-white/[0.08]">
                        <iconify-icon icon="simple-icons:slack" class="text-base text-blue-400"></iconify-icon><span className="text-[10px] text-gray-400 font-light">Notify</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-3.5">
                        <iconify-icon icon="simple-icons:notion" class="text-base text-white"></iconify-icon><span className="text-[10px] text-gray-400 font-light">Docs</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-4 border-b border-white/[0.08] bg-gradient-to-r from-blue-500/5 to-transparent">
                      <Sparkles className="w-4 h-4 text-blue-400" strokeWidth={1.5} />
                      <span className="text-xs text-gray-200 font-normal tracking-wide">Nexus Neural Engine active</span>
                    </div>

                    <div className="p-5 bg-[#080808] flex flex-col gap-5">
                      <div className="bg-[#111] border border-white/[0.05] rounded-lg p-3.5">
                        <p className="text-[11px] text-gray-400 font-extralight leading-relaxed">
                          Traffic intelligently routed through 542 identified optimal nodes. Global state consistency achieved across 48 regions. System latency: 4.2ms.
                        </p>
                      </div>
                      <button className="w-full py-2.5 bg-white text-black text-xs font-normal rounded-lg hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        Initialize neural pipeline
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Subscribe */}
        <section className="w-full bg-[#030303] py-24 px-6 relative z-10 flex flex-col items-center justify-center reveal-fade">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white mb-4 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>Join the Beta</h2>
          <p className="text-lg text-gray-400 font-extralight text-center mb-10 max-w-md">Sign up today and get early access to SplitAI.</p>
          
          <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-8" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" strokeWidth={1.5} />
              </div>
              <input type="email" placeholder="Enter your email address" className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-base text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors font-light" />
            </div>
            <button type="button" className="px-7 py-3 bg-white text-black rounded-xl text-base font-normal hover:bg-gray-200 transition-colors whitespace-nowrap shadow-sm">Get started</button>
          </form>

          <div className="flex items-center gap-4 text-sm text-gray-400 font-extralight">
            <span className="">Our experts are ready to help!</span>
            <div className="flex -space-x-2">
              <img className="w-7 h-7 rounded-full border border-[#030303] bg-gray-800" src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
              <img className="w-7 h-7 rounded-full border border-[#030303] bg-gray-800" src="https://i.pravatar.cc/100?img=2" alt="Avatar" />
              <img className="w-7 h-7 rounded-full border border-[#030303] bg-gray-800" src="https://i.pravatar.cc/100?img=3" alt="Avatar" />
            </div>
          </div>
        </section>

        {/* Footer & Overlapping CTA Container */}
        <div className="bg-[#030303] w-full z-20 pt-20 pb-0 relative">
            
          {/* Absolute Overlapping CTA Card */}
          <div className="reveal-fade w-full max-w-[1000px] z-30 mx-auto pr-6 pb-12 pl-6">
            <div className="w-full bg-[#0a0a0c] border border-white/10 rounded-3xl overflow-hidden relative shadow-[0_25px_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row min-h-[300px]">
              
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent pointer-events-none"></div>

              <div className="p-10 md:p-14 md:w-[55%] relative z-10 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4 leading-[1.1]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Experience superior<br/>planetary scaling</h3>
                <p className="text-base text-gray-400 font-extralight mb-8">Deploy across 250+ edge locations globally.</p>
                <div className="w-max">
                  <a href="#" className="inline-flex px-7 py-3 bg-white text-black rounded-xl text-base font-normal hover:bg-gray-200 transition-colors shadow-sm">Get started</a>
                </div>
              </div>

              <div className="w-full md:w-[45%] h-56 md:h-auto relative overflow-hidden flex items-center justify-end right-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent z-10 md:w-32"></div>
                
                <div className="absolute w-[200%] h-[200%] top-1/2 left-1/2 md:left-[20%] -translate-x-1/2 -translate-y-1/2 z-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 2px, transparent 2px)', backgroundSize: '24px 24px', WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 50%)', maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 50%)' }}>
                </div>

                <div className="absolute right-[20%] top-[30%] z-10 p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white"><MapPin className="w-4 h-4" strokeWidth={2} /></div>
                <div className="absolute right-[40%] bottom-[25%] z-10 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white/70"><MapPin className="w-3 h-3" strokeWidth={2} /></div>
                <div className="absolute right-[10%] bottom-[45%] z-10 p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white/50"><MapPin className="w-4 h-4" strokeWidth={2} /></div>
              </div>
            </div>
          </div>

          {/* Footer Main Base */}
          <footer className="w-full bg-[#050505] border-t border-white/[0.05] pt-32 pb-12 px-6 lg:px-14 relative z-10 reveal-fade">
            <div className="max-w-[1100px] mx-auto flex flex-col">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
                
                {/* Left Info Column */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Scan className="w-6 h-6" strokeWidth={2} />
                    <span className="text-xl font-normal tracking-tight">SplitAI</span>
                  </div>
                  <address className="text-sm text-gray-500 font-extralight leading-loose not-italic">
                    Obala hrvatskog narodnog preporoda 1<br/>
                    Split, 21000<br/>
                    Croatia
                  </address>
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-sm mt-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-gray-600 font-normal">Phone number</span>
                      <a href="tel:18005550199" className="text-gray-400 font-extralight hover:text-white transition-colors">1-800-555-0199</a>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-gray-600 font-normal">Email</span>
                      <a href="mailto:support@splitai.hr" className="text-gray-400 font-extralight hover:text-white transition-colors">support@splitai.hr</a>
                    </div>
                  </div>
                </div>

                {/* Right Links Grid */}
                <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-8">
                  <div className="flex flex-col gap-4">
                    <span className="text-sm text-gray-600 font-normal mb-2">Quick links</span>
                    <a href="#" className="text-sm text-gray-400 font-extralight hover:text-white transition-colors w-max">Pricing</a>
                    <a href="#" className="text-sm text-gray-400 font-extralight hover:text-white transition-colors w-max">Resources</a>
                    <a href="#" className="text-sm text-gray-400 font-extralight hover:text-white transition-colors w-max">About us</a>
                    <a href="#" className="text-sm text-gray-400 font-extralight hover:text-white transition-colors w-max">FAQ</a>
                    <a href="#" className="text-sm text-gray-400 font-extralight hover:text-white transition-colors w-max">Contact us</a>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-sm text-gray-600 font-normal mb-2">Social</span>
                    <a href="#" className="text-sm text-gray-400 font-extralight hover:text-white transition-colors w-max">Facebook</a>
                    <a href="#" className="text-sm text-gray-400 font-extralight hover:text-white transition-colors w-max">Instagram</a>
                    <a href="#" className="text-sm text-gray-400 font-extralight hover:text-white transition-colors w-max">LinkedIn</a>
                    <a href="#" className="text-sm text-gray-400 font-extralight hover:text-white transition-colors w-max">Twitter</a>
                    <a href="#" className="text-sm text-gray-400 font-extralight hover:text-white transition-colors w-max">Youtube</a>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-sm text-gray-600 font-normal mb-2">Legal</span>
                    <a href="#" className="text-sm text-gray-400 font-extralight hover:text-white transition-colors w-max">Terms of service</a>
                    <a href="#" className="text-sm text-gray-400 font-extralight hover:text-white transition-colors w-max">Privacy policy</a>
                    <a href="#" className="text-sm text-gray-400 font-extralight hover:text-white transition-colors w-max">Cookie policy</a>
                  </div>
                </div>
              </div>

              {/* Copyright Bottom */}
              <div className="w-full flex justify-center text-xs text-gray-600 font-extralight pt-8 border-t border-white/[0.05]">
                © 2026 SplitAI Hackathon Team. All rights reserved.
              </div>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
}