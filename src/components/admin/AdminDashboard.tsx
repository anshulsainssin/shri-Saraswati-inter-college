import { useState, type ReactNode } from 'react';
import { LogOut, LayoutDashboard, FileText, Image, CalendarDays, UserCog, GraduationCap, Menu, X, ExternalLink } from 'lucide-react';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import { navigate } from '@/lib/router';
import { AdminNotices } from '@/components/admin/AdminNotices';
import { AdminGallery } from '@/components/admin/AdminGallery';
import { AdminEvents } from '@/components/admin/AdminEvents';
import { AdminPrincipal } from '@/components/admin/AdminPrincipal';
import { AdminAdmissions } from '@/components/admin/AdminAdmissions';

type Tab = 'dashboard' | 'notices' | 'gallery' | 'events' | 'principal' | 'admissions';

const TABS: { id: Tab; label: string; icon: typeof FileText }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'notices', label: 'Notices', icon: FileText },
  { id: 'gallery', label: 'Gallery Photos', icon: Image },
  { id: 'events', label: 'Events', icon: CalendarDays },
  { id: 'principal', label: 'Principal / Staff', icon: UserCog },
  { id: 'admissions', label: 'Admissions', icon: GraduationCap },
];

export function AdminDashboard() {
  const { signOut } = useAdminAuth();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const renderContent = (): ReactNode => {
    switch (tab) {
      case 'notices':
        return <AdminNotices />;
      case 'gallery':
        return <AdminGallery />;
      case 'events':
        return <AdminEvents />;
      case 'principal':
        return <AdminPrincipal />;
      case 'admissions':
        return <AdminAdmissions />;
      default:
        return <DashboardHome onNavigate={setTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <span className="text-sm font-bold text-brand-900">Admin Panel</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setTab(id);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                tab === id
                  ? 'bg-brand-700 text-white'
                  : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 border-t border-slate-200 p-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            <ExternalLink className="h-4 w-4" />
            View Website
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-brand-900">
            {TABS.find((t) => t.id === tab)?.label ?? 'Dashboard'}
          </h1>
          <div className="w-10 lg:hidden" />
        </header>
        <main className="p-4 lg:p-8">{renderContent()}</main>
      </div>
    </div>
  );
}

function DashboardHome({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const cards: { id: Tab; label: string; desc: string; icon: typeof FileText }[] = [
    { id: 'notices', label: 'Notices', desc: 'Add, edit, delete notices', icon: FileText },
    { id: 'gallery', label: 'Gallery Photos', desc: 'Upload and manage photos', icon: Image },
    { id: 'events', label: 'Events', desc: 'Manage school events', icon: CalendarDays },
    { id: 'principal', label: 'Principal / Staff', desc: 'Update principal info & photo', icon: UserCog },
    { id: 'admissions', label: 'Admissions', desc: 'Update admission info', icon: GraduationCap },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-brand-900">Welcome, Admin</h2>
      <p className="mt-1 text-sm text-slate-500">Select a section below to manage website content.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ id, label, desc, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-base font-bold text-brand-900">{label}</h3>
            <p className="mt-1 text-sm text-slate-500">{desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
