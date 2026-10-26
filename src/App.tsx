import { About } from './components/About'
import { Discography } from './components/Discography'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LatestRelease } from './components/LatestRelease'
import { PianoDivider } from './components/PianoDivider'
import { Shows } from './components/Shows'
import { StayUpdated } from './components/StayUpdated'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-50 focus:bg-sun focus:px-4 focus:py-2 focus:font-bold"
      >
        דילוג לתוכן
      </a>
      <Header />
      <main id="main">
        <Hero />
        <PianoDivider />
        <LatestRelease />
        <PianoDivider />
        <Discography />
        <PianoDivider />
        <Shows />
        <PianoDivider />
        <About />
        <PianoDivider />
        <StayUpdated />
      </main>
      <Footer />
    </>
  )
}
