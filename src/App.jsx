import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'


export default function App(){
return (
<div className="min-h-dvh flex flex-col">
{/* Default head tags (puedes sobreescribir en cada página) */}
<title>Glo Event Co | St. Louis Parties</title>
<meta name="description" content="Silent disco & modern photo booth rentals in St. Louis. Transform your event with Glo Event Co." />
<link rel="canonical" href="https://www.gloeventco.com" />


<Header />
<main className="flex-1">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/services" element={<Services />} />
<Route path="/portfolio" element={<Portfolio />} />
<Route path="/contact" element={<Contact />} />
<Route path="/faq" element={<FAQ />} />
</Routes>
</main>
<Footer />
</div>
)
}