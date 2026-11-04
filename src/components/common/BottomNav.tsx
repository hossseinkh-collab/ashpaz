import { BookOpen, Cake, CalendarDays, Refrigerator, Sparkles, Scale } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'recipes', label: 'رسپی‌ها', icon: BookOpen },
    { id: 'pastry', label: 'قنادی و شیرینی', icon: Cake },
    { id: 'health', label: 'وزن و سلامت', icon: Scale },
    { id: 'planner', label: 'برنامه غذایی', icon: CalendarDays },
    { id: 'fridge', label: 'یخچال و انبار', icon: Refrigerator },
    { id: 'assistant', label: 'دستیار هوش', icon: Sparkles }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-md mx-auto px-2 h-16 flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all duration-150 active:scale-90 ${
                isActive ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-full transition-all duration-200 ${
                  isActive ? 'bg-amber-400/15' : 'bg-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold' : 'font-normal'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
