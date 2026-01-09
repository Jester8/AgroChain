import Navbar from '@/app/components/header';
import Hero from '@/app/components/hero';
import Problem from '@/app/components/problem';
import Solutions from './components/solutions';
import Who from './components/who';
import JoinNow from './components/JoinNow';
import Footer from './components/footer';
 
export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <Problem />
      <Solutions />
      <Who />
      <JoinNow />
      <Footer />
    </>
  );
}