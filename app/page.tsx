import Hero from '@/app/components/hero';
import Problem from '@/app/components/problem';
import Solutions from './components/solutions';
import Who from './components/who';
import JoinNow from './components/JoinNow';
import Footer from './components/footer';
import About from '../app/components/about';
import WaitlistPopup from '@/app/components/waitlistPopup';

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solutions />
      <Who />
      <JoinNow />
      <About />
      <Footer />
      <WaitlistPopup />
    </>
  );
}