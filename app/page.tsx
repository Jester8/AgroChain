import Navbar from '@/app/components/header';
import Hero from '@/app/components/hero';
import Problem from '@/app/components/problem';
import Solutions from './components/solutions';
import Who from './components/who';
import JoinNow from './components/JoinNow';
import Footer from './components/footer';
import About from '../app/components/about';

export default function Home() {
  return (
    <>
      <Hero id="hero" />
      <Problem id="problem" />
      <Solutions id="solutions" />
      <Who id="who" />
      <JoinNow id="join" />
      <About id="about" />
      <Footer />
      
    </>
  );
}