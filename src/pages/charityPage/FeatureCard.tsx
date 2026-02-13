import { Link } from 'react-router-dom'

export default function FeatureCard({title, desc, href}:{title:string; desc:string; href:string}){
  return (
    <article className="p-6 rounded-lg shadow bg-white">
      <h3 className="font-semibold text-lg text-blue-600">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
      <div className="mt-4">
        <Link to={href} className="text-sm font-medium underline">Support this work</Link>
      </div>
    </article>
  )
}
