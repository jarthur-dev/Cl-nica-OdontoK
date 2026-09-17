'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Heart, 
  Award, 
  ChevronRight,
  Stethoscope,
  Smile,
  Camera,
  Clock,
  ShieldCheck,
  MessageCircle,
  FileText,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

const TRATAMENTOS = [
  {
    id: 'sedacao',
    titulo: 'Sedação Moderada',
    descricao: 'Acolhimento especial para quem busca realizar tratamentos odontológicos com máximo conforto, segurança e sem ansiedade.',
    icone: Heart,
    destaque: true,
  },
  {
    id: 'especialidades',
    titulo: 'Todos os Serviços',
    descricao: 'Ortodontia, Implantes, Próteses, Endodontia e Clínica Geral. Atendimento completo para toda a sua família.',
    icone: Stethoscope,
  },
  {
    id: 'estetica',
    titulo: 'Estética do Sorriso',
    descricao: 'Clareamento dental, facetas em resina e tratamentos estéticos modernos para devolver a harmonia do seu sorriso.',
    icone: Smile,
  },
];

const UNIDADES = {
  slm_camara: {
    id: 'slm_camara',
    nome: 'São Lourenço, Camaragibe e Gravatá',
    curto: 'São Lourenço / Camaragibe',
    link: 'https://wa.me/?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta%20na%20Odonto%20K.',
  },
  recife: {
    id: 'recife',
    nome: 'Casa Amarela e Beberibe',
    curto: 'Casa Amarela / Beberibe',
    link: 'https://wa.me/?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta%20na%20Odonto%20K.',
  },
  cabo: {
    id: 'cabo',
    nome: 'Cabo, Paiva e Ponte dos Carvalhos',
    curto: 'Cabo / Ponte dos Carvalhos',
    link: 'https://wa.me/?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta%20na%20Odonto%20K.',
  },
};

const HORARIOS_FUNCIONAMENTO = [
  { dia: 'Segunda-feira', horario: '08:00–17:00' },
  { dia: 'Terça-feira', horario: '08:00–17:00' },
  { dia: 'Quarta-feira', horario: '08:00–17:00' },
  { dia: 'Quinta-feira', horario: '08:00–17:00' },
  { dia: 'Sexta-feira', horario: '08:00–17:00' },
  { dia: 'Sábado', horario: '08:00–12:00' },
  { dia: 'Domingo', horario: 'Fechado' },
];

export default function Home() {
  const [unidadeAtiva, setUnidadeAtiva] = useState<'slm_camara' | 'recife' | 'cabo'>('slm_camara');
  const [estaAberto, setEstaAberto] = useState<boolean>(false);
  const [mostrarHorarios, setMostrarHorarios] = useState<boolean>(false);

  const unidadeAtual = UNIDADES[unidadeAtiva];

  useEffect(() => {
    const checarStatusAtendimento = () => {
      const agora = new Date();
      const diaSemana = agora.getDay();
      const hora = agora.getHours();

      if (diaSemana >= 1 && diaSemana <= 5 && hora >= 8 && hora < 17) {
        setEstaAberto(true);
      } else if (diaSemana === 6 && hora >= 8 && hora < 12) {
        setEstaAberto(true);
      } else {
        setEstaAberto(false);
      }
    };

    checarStatusAtendimento();
    const intervalo = setInterval(checarStatusAtendimento, 60000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Topo Informativo */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-2 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <ShieldCheck size={14} className="text-indigo-400" />
        <span>Referência em Atendimento Humanizado e Sedação Moderada</span>
      </div>

      {/* Header Profissional com Dropdown de Horários */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-600/20">
            OK
          </div>
          <div>
            <h1 className="font-bold text-lg text-white leading-tight tracking-tight">Odonto K</h1>
            <p className="text-xs text-slate-400 font-medium">Clínica Odontológica</p>
          </div>
        </div>

        {/* Botão de Status e Menu Dropdown de Horários */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMostrarHorarios(!mostrarHorarios)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-200 hover:border-slate-700 transition active:scale-95 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${estaAberto ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${estaAberto ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
            </span>
            <span className="font-semibold">{estaAberto ? 'Aberto agora' : 'Fechado agora'}</span>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${mostrarHorarios ? 'rotate-180' : ''}`} />
          </button>

          {mostrarHorarios && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setMostrarHorarios(false)} 
              />
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl z-50 text-xs space-y-3 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-200">
                    <Clock size={15} className="text-indigo-400" />
                    <span>Horário de Funcionamento</span>
                  </div>
                  <span className={`font-bold ${estaAberto ? 'text-emerald-400' : 'text-red-400'}`}>
                    {estaAberto ? 'Aberto' : 'Fechado'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {HORARIOS_FUNCIONAMENTO.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-slate-300 py-0.5">
                      <span className="text-slate-400">{item.dia}</span>
                      <span className="font-mono font-medium text-slate-200">{item.horario}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-16 sm:py-20 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
          <Award size={14} className="text-indigo-400" />
          Medicina e Saúde
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
          Cuidado humanizado e acolhedor para <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300">o seu sorriso</span>.
        </h2>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Atendimento odontológico de excelência com todos os tratamentos em um só lugar. Selecione a unidade e fale diretamente conosco no WhatsApp.
        </p>

        {/* Seletor de Unidades */}
        <div className="pt-4 max-w-md mx-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
            Onde deseja atendimento?
          </p>
          <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-1.5 shadow-inner">
            <button
              type="button"
              onClick={() => setUnidadeAtiva('slm_camara')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                unidadeAtiva === 'slm_camara'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MapPin size={14} /> {UNIDADES.slm_camara.curto}
            </button>
            <button
              type="button"
              onClick={() => setUnidadeAtiva('recife')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                unidadeAtiva === 'recife'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MapPin size={14} /> {UNIDADES.recife.curto}
            </button>
            <button
              type="button"
              onClick={() => setUnidadeAtiva('cabo')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                unidadeAtiva === 'cabo'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MapPin size={14} /> {UNIDADES.cabo.curto}
            </button>
          </div>
        </div>
      </section>

      {/* Cards de Serviços */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12 space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Nossos Serviços & Especialidades
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Confiança e tecnologia para transformar o seu sorriso em Pernambuco.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRATAMENTOS.map((item) => {
            const Icone = item.icone;
            return (
              <div
                key={item.id}
                className="group relative bg-slate-900/90 border border-slate-800 rounded-2xl p-7 space-y-4 transition-all duration-300 ease-out hover:border-indigo-500 hover:scale-105 hover:bg-slate-900 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors duration-300 border border-slate-700/60">
                      <Icone size={24} />
                    </div>
                    {item.destaque && (
                      <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        Sua referência
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                    {item.titulo}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Botões de Ação */}
      <section className="px-6 py-10 mt-4 max-w-md mx-auto w-full space-y-3">
        <a
          href={unidadeAtual.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 text-base shadow-xl shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] w-full text-center"
        >
          <MessageCircle size={20} />
          <span>Agendar em {unidadeAtual.curto}</span>
          <ChevronRight size={18} />
        </a>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800/80 text-slate-200 border border-slate-800 font-semibold px-6 py-3.5 rounded-2xl transition-all duration-200 text-sm hover:border-slate-700 hover:scale-[1.01] active:scale-[0.99] w-full shadow-sm cursor-default"
        >
          <FileText size={18} className="text-indigo-400" />
          <span>Responsáveis Técnicos</span>
          <ExternalLink size={14} className="text-slate-500" />
        </a>
      </section>

      {/* Footer Profissional */}
      <footer className="bg-slate-950 border-t border-slate-800/80 px-6 md:px-12 py-12 mt-auto text-xs text-slate-400">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                OK
              </div>
              <span className="font-bold text-slate-200 text-sm">Odonto K</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] sm:text-xs">
              Cuidado humanizado e atendimento acolhedor. Referência em sedação moderada em Pernambuco.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin size={14} className="text-indigo-400" /> Unidades Atendidas
            </h5>
            <p>• São Lourenço / Camaragibe / Gravatá</p>
            <p>• Casa Amarela / Beberibe</p>
            <p>• Cabo / Paiva / Ponte dos Carvalhos</p>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock size={14} className="text-indigo-400" /> Redes & Institucional
            </h5>
            <div className="flex flex-col gap-2">
              <a 
                href="#" 
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition cursor-default"
              >
                <Camera size={16} /> @clinica.odontok
              </a>
              <a 
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition text-[11px] cursor-default"
              >
                <FileText size={14} /> Responsáveis Técnicos
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-5xl mx-auto pt-8 mt-8 border-t border-slate-900 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} Odonto K. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}