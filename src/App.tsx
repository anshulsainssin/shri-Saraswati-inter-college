import { LanguageProvider } from '@/LanguageContext';
import { AdminAuthProvider } from '@/lib/AdminAuthContext';
import { usePathname } from '@/lib/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Principal } from '@/components/sections/Principal';
import { Academics } from '@/components/sections/Academics';
import { Facilities } from '@/components/sections/Facilities';
import { Gallery } from '@/components/sections/Gallery';
import { VideoSection } from '@/components/sections/VideoSection';
import { Notices } from '@/components/sections/Notices';
import { Events } from '@/components/sections/Events';
import { Timings } from '@/components/sections/Timings';
import { Admissions } from '@/components/sections/Admissions';
import { Achievements } from '@/components/sections/Achievements';
import { Contact } from '@/components/sections/Contact';
import { AdminPage } from '@/components/admin/AdminPage';

function PublicSite() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Principal />
        <Academics />
        <Facilities />
        <Gallery />
        <Achievements />
        <VideoSection />
        <Notices />
        <Events />
        <Timings />
        <Admissions />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <AdminAuthProvider>
        <AdminPage />
      </AdminAuthProvider>
    );
  }

  return (
    <LanguageProvider>
      <PublicSite />
    </LanguageProvider>
  );
}

export default App;
