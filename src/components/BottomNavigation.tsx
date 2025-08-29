import { useNavigate, useLocation } from "react-router-dom";
import { Heart, CheckSquare, BarChart3 } from "lucide-react";

const navigationItems = [
  {
    path: '/mood',
    label: 'Mood',
    icon: Heart,
  },
  {
    path: '/tasks',
    label: 'Tasks',
    icon: CheckSquare,
  },
  {
    path: '/insights',
    label: 'Insights',
    icon: BarChart3,
  },
];

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 px-6 py-3">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;