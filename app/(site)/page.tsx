import Camp from '@/components/Camp'
import Feature from '@/components/Feature'
import Guide from '@/components/Guide'
import Hero from '@/components/Hero'
import GetApp from '@/components/GetApp'
import Image from 'next/image'


export default function Home() {
  return (
    <>
    <Hero />
    <Camp />
    <Guide />
    <Feature />
    <GetApp />
    </>
  )
}
