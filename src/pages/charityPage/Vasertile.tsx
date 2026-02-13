
import { Link } from 'react-router-dom'
import theme from '../../components/themes/Theme'

const Vasertile = () => {
  return (
    <div>
        <main className="container mx-auto py-12">
      <section className="rounded-xl p-8 shadow-lg" style={{background: 'linear-gradient(135deg,#e6f3ff, #ffffff)'}}>
        <h1 className="text-3xl font-bold text-blue-700">Extend a Helping Hand — Change a Life</h1>
        <p className="mt-4 text-gray-700">We work across grants, internships, sustainable agriculture, medical aid and more to empower communities.</p>
        <div className="mt-6 flex space-x-4">
          <Link to="/donate" className="px-6 py-3 rounded-md font-semibold" style={{background: theme.gold}}>Donate Now</Link>
          <Link to="/what-we-do" className="px-6 py-3 rounded-md border">Learn More</Link>
        </div>
        
      </section>
    </main>
    </div>
  )
}

export default Vasertile;
