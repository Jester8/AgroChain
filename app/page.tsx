import Hero from '@/components/hero';
import Problem from '@/components/problem';
import Solutions from '../components/solutions';
import Who from '../components/who';
import JoinNow from '../components/JoinNow';
import Footer from '../components/footer';
import About from '../components/about';
import WaitlistPopup from '@/components/waitlistPopup';

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