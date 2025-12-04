"use client";

import { useState, useEffect } from "react";
import { 
  Brain, 
  Heart, 
  Sparkles, 
  TrendingUp, 
  Calendar,
  BookOpen,
  Users,
  Target,
  Award,
  Bell,
  Settings,
  Menu,
  X,
  Play,
  Wind,
  PenLine,
  Lightbulb,
  MessageCircle,
  Send,
  ThumbsUp
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useMood } from "@/hooks/useMood";
import { useMeditation } from "@/hooks/useMeditation";
import { useCommunity } from "@/hooks/useCommunity";
import { useJournal } from "@/hooks/useJournal";

export default function Home() {
  const [currentView, setCurrentView] = useState<"onboarding" | "dashboard">("onboarding");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>("dashboard");
  
  const { user, loading: userLoading } = useUser();
  const { moodHistory, addMoodEntry, getWeeklyAverage } = useMood(user?.id || 'demo-user-id');
  const { sessions, startSession, getTotalSessions } = useMeditation(user?.id || 'demo-user-id');
  const { posts, createPost, likePost } = useCommunity();
  const { entries, createEntry } = useJournal(user?.id || 'demo-user-id');

  // Onboarding Screen
  if (currentView === "onboarding") {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#A84CC0] to-[#00A7E1] rounded-3xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#A84CC0] to-[#00A7E1] bg-clip-text text-transparent">
              Equilíbrio
            </h1>
            <p className="text-gray-400 text-lg">
              Seu espaço seguro para bem-estar mental
            </p>
          </div>

          <div className="space-y-6 py-8">
            <OnboardingCard 
              icon={<Brain className="w-6 h-6" />}
              title="Rastreie seu humor"
              description="Monitore suas emoções diariamente"
            />
            <OnboardingCard 
              icon={<Heart className="w-6 h-6" />}
              title="Meditação guiada"
              description="Programas personalizados para você"
            />
            <OnboardingCard 
              icon={<Users className="w-6 h-6" />}
              title="Comunidade de apoio"
              description="Conecte-se de forma anônima"
            />
          </div>

          <button
            onClick={() => setCurrentView("dashboard")}
            className="w-full bg-gradient-to-r from-[#A84CC0] to-[#00A7E1] text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-[#A84CC0]/50 transition-all duration-300 transform hover:scale-105"
          >
            Começar Jornada
          </button>

          <p className="text-gray-500 text-sm">
            Junte-se a milhares de pessoas cuidando da saúde mental
          </p>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#A84CC0] to-[#00A7E1] rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold hidden sm:block">Equilíbrio</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <NavButton icon={<Target />} label="Dashboard" active={selectedSection === "dashboard"} onClick={() => setSelectedSection("dashboard")} />
              <NavButton icon={<Heart />} label="Humor" active={selectedSection === "mood"} onClick={() => setSelectedSection("mood")} />
              <NavButton icon={<Brain />} label="Meditação" active={selectedSection === "meditation"} onClick={() => setSelectedSection("meditation")} />
              <NavButton icon={<PenLine />} label="Diário" active={selectedSection === "journal"} onClick={() => setSelectedSection("journal")} />
              <NavButton icon={<Users />} label="Comunidade" active={selectedSection === "community"} onClick={() => setSelectedSection("community")} />
            </nav>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/5 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#A84CC0] rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button 
                className="md:hidden p-2 hover:bg-white/5 rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0D0D0D] animate-fade-in">
            <nav className="px-4 py-4 space-y-2">
              <MobileNavButton icon={<Target />} label="Dashboard" active={selectedSection === "dashboard"} onClick={() => { setSelectedSection("dashboard"); setMobileMenuOpen(false); }} />
              <MobileNavButton icon={<Heart />} label="Humor" active={selectedSection === "mood"} onClick={() => { setSelectedSection("mood"); setMobileMenuOpen(false); }} />
              <MobileNavButton icon={<Brain />} label="Meditação" active={selectedSection === "meditation"} onClick={() => { setSelectedSection("meditation"); setMobileMenuOpen(false); }} />
              <MobileNavButton icon={<PenLine />} label="Diário" active={selectedSection === "journal"} onClick={() => { setSelectedSection("journal"); setMobileMenuOpen(false); }} />
              <MobileNavButton icon={<Users />} label="Comunidade" active={selectedSection === "community"} onClick={() => { setSelectedSection("community"); setMobileMenuOpen(false); }} />
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedSection === "dashboard" && (
          <DashboardView 
            user={user}
            moodAverage={getWeeklyAverage()}
            totalMeditations={getTotalSessions()}
            totalEntries={entries.length}
          />
        )}
        {selectedSection === "mood" && (
          <MoodTrackingView 
            moodHistory={moodHistory}
            onAddMood={addMoodEntry}
          />
        )}
        {selectedSection === "meditation" && (
          <MeditationView 
            sessions={sessions}
            onStartSession={startSession}
          />
        )}
        {selectedSection === "journal" && (
          <JournalView 
            entries={entries}
            onCreateEntry={createEntry}
          />
        )}
        {selectedSection === "community" && (
          <CommunityView 
            posts={posts}
            onCreatePost={createPost}
            onLikePost={likePost}
            userId={user?.id || 'demo-user-id'}
          />
        )}
      </main>
    </div>
  );
}

// Components
function OnboardingCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-[#A84CC0]/50 transition-all duration-300 hover:bg-white/10">
      <div className="w-12 h-12 bg-gradient-to-br from-[#A84CC0]/20 to-[#00A7E1]/20 rounded-xl flex items-center justify-center text-[#A84CC0] flex-shrink-0">
        {icon}
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
        active 
          ? "bg-gradient-to-r from-[#A84CC0]/20 to-[#00A7E1]/20 text-white border border-[#A84CC0]/50" 
          : "hover:bg-white/5 text-gray-400 hover:text-white"
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function MobileNavButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        active 
          ? "bg-gradient-to-r from-[#A84CC0]/20 to-[#00A7E1]/20 text-white border border-[#A84CC0]/50" 
          : "hover:bg-white/5 text-gray-400 hover:text-white"
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function DashboardView({ user, moodAverage, totalMeditations, totalEntries }: any) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-[#A84CC0]/10 to-[#00A7E1]/10 rounded-3xl p-6 sm:p-8 border border-[#A84CC0]/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Olá, {user?.name || 'bem-vindo'}! 👋</h2>
            <p className="text-gray-400">Como você está se sentindo hoje?</p>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-[#A84CC0]" />
            <div>
              <p className="text-sm text-gray-400">Sequência</p>
              <p className="text-2xl font-bold text-[#A84CC0]">{user?.streak_days || 7} dias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Heart />} label="Humor Médio" value={moodAverage} trend="+12%" color="from-[#A84CC0] to-purple-600" />
        <StatCard icon={<Brain />} label="Meditações" value={totalMeditations.toString()} trend="+5" color="from-[#00A7E1] to-blue-600" />
        <StatCard icon={<PenLine />} label="Entradas Diário" value={totalEntries.toString()} trend="+3" color="from-emerald-500 to-green-600" />
        <StatCard icon={<Award />} label="Pontos" value={user?.total_points?.toString() || "1,240"} trend="+120" color="from-amber-500 to-orange-600" />
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeatureCard
          icon={<Heart />}
          title="Rastreamento de Humor"
          description="Monitore suas emoções diárias"
          color="from-[#A84CC0] to-purple-600"
          action="Registrar Humor"
        />
        <FeatureCard
          icon={<Brain />}
          title="Meditação Guiada"
          description="15 programas disponíveis"
          color="from-[#00A7E1] to-blue-600"
          action="Começar Sessão"
        />
        <FeatureCard
          icon={<Wind />}
          title="Exercícios de Relaxamento"
          description="Técnicas de respiração"
          color="from-cyan-500 to-teal-600"
          action="Relaxar Agora"
        />
        <FeatureCard
          icon={<PenLine />}
          title="Diário Emocional"
          description={`${totalEntries} entradas registradas`}
          color="from-pink-500 to-rose-600"
          action="Escrever"
        />
        <FeatureCard
          icon={<Lightbulb />}
          title="Educação"
          description="Artigos sobre bem-estar"
          color="from-amber-500 to-orange-600"
          action="Aprender"
        />
        <FeatureCard
          icon={<Target />}
          title="Plano Personalizado"
          description="Seu roteiro de bem-estar"
          color="from-violet-500 to-purple-600"
          action="Ver Plano"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Atividade Recente</h3>
          <button className="text-[#A84CC0] hover:text-[#00A7E1] transition-colors text-sm font-medium">
            Ver Tudo
          </button>
        </div>
        <div className="space-y-4">
          <ActivityItem
            icon={<Brain />}
            title="Meditação Matinal"
            time="Há 2 horas"
            points="+50 pontos"
          />
          <ActivityItem
            icon={<Heart />}
            title="Humor Registrado"
            time="Há 5 horas"
            points="+20 pontos"
          />
          <ActivityItem
            icon={<PenLine />}
            title="Diário Atualizado"
            time="Ontem"
            points="+30 pontos"
          />
        </div>
      </div>
    </div>
  );
}

function MoodTrackingView({ moodHistory, onAddMood }: any) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const moods = [
    { emoji: "😊", label: "Ótimo", value: 5 },
    { emoji: "🙂", label: "Bem", value: 4 },
    { emoji: "😐", label: "Normal", value: 3 },
    { emoji: "😔", label: "Triste", value: 2 },
    { emoji: "😢", label: "Mal", value: 1 },
  ];

  const handleSubmit = async () => {
    if (selectedMood) {
      await onAddMood(selectedMood, note);
      setShowSuccess(true);
      setSelectedMood(null);
      setNote("");
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  // Calcular dados do gráfico dos últimos 7 dias
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const chartData = last7Days.map(date => {
    const dayEntries = moodHistory.filter((entry: any) => {
      const entryDate = new Date(entry.created_at);
      return entryDate.toDateString() === date.toDateString();
    });
    
    if (dayEntries.length === 0) return 0;
    const avg = dayEntries.reduce((sum: number, entry: any) => sum + entry.mood_value, 0) / dayEntries.length;
    return Math.round(avg);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-[#A84CC0]/10 to-[#00A7E1]/10 rounded-3xl p-6 sm:p-8 border border-[#A84CC0]/20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Como você está se sentindo?</h2>
        <p className="text-gray-400">Registre seu humor para acompanhar seu progresso</p>
      </div>

      {showSuccess && (
        <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-2xl p-4 text-center animate-fade-in">
          <p className="text-emerald-400 font-semibold">✓ Humor registrado com sucesso! +20 pontos</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => setSelectedMood(mood.value)}
            className={`bg-white/5 hover:bg-white/10 border rounded-2xl p-6 transition-all duration-300 hover:scale-105 group ${
              selectedMood === mood.value ? 'border-[#A84CC0] bg-[#A84CC0]/20' : 'border-white/10 hover:border-[#A84CC0]/50'
            }`}
          >
            <div className="text-5xl mb-3">{mood.emoji}</div>
            <p className="font-semibold text-white group-hover:text-[#A84CC0] transition-colors">{mood.label}</p>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4 animate-fade-in">
          <div>
            <label className="block text-sm font-medium mb-2">Adicionar nota (opcional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Como você está se sentindo hoje?"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-[#A84CC0] focus:outline-none resize-none"
              rows={3}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#A84CC0] to-[#00A7E1] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Registrar Humor
          </button>
        </div>
      )}

      <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
        <h3 className="text-xl font-bold mb-4">Seu Histórico de Humor (Últimos 7 dias)</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {chartData.map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-gradient-to-t from-[#A84CC0] to-[#00A7E1] rounded-t-xl transition-all duration-500 hover:opacity-80 relative group"
                style={{ height: value > 0 ? `${value * 20}%` : '4px' }}
              >
                {value > 0 && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {value}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MeditationView({ sessions, onStartSession }: any) {
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const programs = [
    { title: "Meditação Matinal", duration: 10, level: "Iniciante", color: "from-[#A84CC0] to-purple-600", description: "Comece o dia com clareza mental" },
    { title: "Redução de Ansiedade", duration: 15, level: "Intermediário", color: "from-[#00A7E1] to-blue-600", description: "Técnicas para acalmar a mente" },
    { title: "Sono Profundo", duration: 20, level: "Todos", color: "from-indigo-500 to-purple-600", description: "Prepare-se para uma noite tranquila" },
    { title: "Foco e Concentração", duration: 12, level: "Avançado", color: "from-cyan-500 to-teal-600", description: "Melhore sua produtividade" },
    { title: "Gratidão Diária", duration: 8, level: "Iniciante", color: "from-pink-500 to-rose-600", description: "Cultive pensamentos positivos" },
    { title: "Energia Positiva", duration: 15, level: "Todos", color: "from-amber-500 to-orange-600", description: "Renove suas energias" },
  ];

  const handleStart = async (program: any) => {
    setSelectedProgram(program);
    setIsPlaying(true);
    setProgress(0);
    
    await onStartSession(program.title, program.duration);
    
    // Simular progresso
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 100;
        }
        return prev + 1;
      });
    }, (program.duration * 60 * 1000) / 100);
  };

  if (selectedProgram && isPlaying) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-br from-[#A84CC0]/10 to-[#00A7E1]/10 rounded-3xl p-8 border border-[#A84CC0]/20 text-center">
          <div className={`w-32 h-32 mx-auto bg-gradient-to-br ${selectedProgram.color} rounded-full flex items-center justify-center mb-6 animate-pulse`}>
            <Brain className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">{selectedProgram.title}</h2>
          <p className="text-gray-400 mb-6">{selectedProgram.description}</p>
          
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${selectedProgram.color} transition-all duration-1000`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-2xl font-bold">{Math.round(progress)}%</p>
            <p className="text-gray-400">
              {Math.round((selectedProgram.duration * progress) / 100)} de {selectedProgram.duration} minutos
            </p>
          </div>

          <button
            onClick={() => {
              setIsPlaying(false);
              setSelectedProgram(null);
            }}
            className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
          >
            Pausar Sessão
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-[#A84CC0]/10 to-[#00A7E1]/10 rounded-3xl p-6 sm:p-8 border border-[#A84CC0]/20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Programas de Meditação</h2>
        <p className="text-gray-400">Escolha uma sessão guiada para começar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.map((program, i) => (
          <div
            key={i}
            className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#A84CC0]/50 transition-all duration-300 hover:scale-105 group"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${program.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <Play className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2">{program.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{program.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <span>⏱️ {program.duration} min</span>
              <span>📊 {program.level}</span>
            </div>
            <button 
              onClick={() => handleStart(program)}
              className={`w-full bg-gradient-to-r ${program.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
            >
              Começar
            </button>
          </div>
        ))}
      </div>

      {sessions.length > 0 && (
        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-4">Sessões Recentes</h3>
          <div className="space-y-3">
            {sessions.slice(0, 5).map((session: any) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#A84CC0] to-[#00A7E1] rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{session.program_name}</p>
                    <p className="text-sm text-gray-400">{session.duration_minutes} minutos</p>
                  </div>
                </div>
                {session.completed && (
                  <span className="text-emerald-400 text-sm font-semibold">✓ Completo</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function JournalView({ entries, onCreateEntry }: any) {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (title && content) {
      await onCreateEntry(title, content);
      setTitle("");
      setContent("");
      setIsCreating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-[#A84CC0]/10 to-[#00A7E1]/10 rounded-3xl p-6 sm:p-8 border border-[#A84CC0]/20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Diário Emocional</h2>
        <p className="text-gray-400">Registre seus pensamentos e reflexões</p>
      </div>

      {showSuccess && (
        <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-2xl p-4 text-center animate-fade-in">
          <p className="text-emerald-400 font-semibold">✓ Entrada criada com sucesso! +30 pontos</p>
        </div>
      )}

      {!isCreating ? (
        <button
          onClick={() => setIsCreating(true)}
          className="w-full bg-gradient-to-r from-[#A84CC0] to-[#00A7E1] text-white py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-[#A84CC0]/50 transition-all duration-300"
        >
          + Nova Entrada
        </button>
      ) : (
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4 animate-fade-in">
          <div>
            <label className="block text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dê um título para sua entrada..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-[#A84CC0] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Conteúdo</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva seus pensamentos e reflexões..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-[#A84CC0] focus:outline-none resize-none"
              rows={8}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-[#A84CC0] to-[#00A7E1] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Salvar Entrada
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setTitle("");
                setContent("");
              }}
              className="px-6 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {entries.map((entry: any) => (
          <div key={entry.id} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#A84CC0]/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold">{entry.title}</h3>
              <span className="text-sm text-gray-400">
                {new Date(entry.created_at).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap">{entry.content}</p>
          </div>
        ))}
      </div>

      {entries.length === 0 && !isCreating && (
        <div className="text-center py-12 text-gray-400">
          <PenLine className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Nenhuma entrada ainda. Comece a escrever!</p>
        </div>
      )}
    </div>
  );
}

function CommunityView({ posts, onCreatePost, onLikePost, userId }: any) {
  const [isCreating, setIsCreating] = useState(false);
  const [content, setContent] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (content) {
      await onCreatePost(userId, content);
      setContent("");
      setIsCreating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleLike = async (postId: string) => {
    await onLikePost(postId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-[#A84CC0]/10 to-[#00A7E1]/10 rounded-3xl p-6 sm:p-8 border border-[#A84CC0]/20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Comunidade de Apoio</h2>
        <p className="text-gray-400">Conecte-se de forma anônima e compartilhe sua jornada</p>
      </div>

      {showSuccess && (
        <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-2xl p-4 text-center animate-fade-in">
          <p className="text-emerald-400 font-semibold">✓ Post compartilhado com sucesso!</p>
        </div>
      )}

      {!isCreating ? (
        <button
          onClick={() => setIsCreating(true)}
          className="w-full bg-gradient-to-r from-[#A84CC0] to-[#00A7E1] text-white py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-[#A84CC0]/50 transition-all duration-300"
        >
          + Compartilhar Experiência
        </button>
      ) : (
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4 animate-fade-in">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Compartilhe sua experiência de forma anônima..."
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-[#A84CC0] focus:outline-none resize-none"
            rows={4}
          />
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-[#A84CC0] to-[#00A7E1] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Publicar
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setContent("");
              }}
              className="px-6 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post: any) => (
          <div key={post.id} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#A84CC0]/30 transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#A84CC0] to-[#00A7E1] rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{post.author_name || 'Usuário Anônimo'}</h4>
                  <span className="text-sm text-gray-400">
                    {new Date(post.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{post.content}</p>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 hover:text-[#A84CC0] transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-[#00A7E1] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments_count || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, color }: { icon: React.ReactNode; label: string; value: string; trend: string; color: string }) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#A84CC0]/30 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        <span className="text-emerald-400 text-sm font-semibold">{trend}</span>
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description, color, action }: { icon: React.ReactNode; title: string; description: string; color: string; action: string }) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#A84CC0]/50 transition-all duration-300 hover:scale-105 group">
      <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-all duration-300 border border-white/10 hover:border-[#A84CC0]/50">
        {action}
      </button>
    </div>
  );
}

function ActivityItem({ icon, title, time, points }: { icon: React.ReactNode; title: string; time: string; points: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10">
      <div className="w-10 h-10 bg-gradient-to-br from-[#A84CC0]/20 to-[#00A7E1]/20 rounded-xl flex items-center justify-center text-[#A84CC0]">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-sm text-gray-400">{time}</p>
      </div>
      <span className="text-[#A84CC0] font-semibold text-sm">{points}</span>
    </div>
  );
}
