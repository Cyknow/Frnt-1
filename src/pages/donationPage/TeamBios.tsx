// import React from 'react'

export default function TeamBios(){
  const people = [
    {name:'Amina Yusuf', role:'Executive Director', bio:'15 years in international development; focus on livelihoods and program design.', img:'/src/assets/download.jpg'},
    {name:'Daniel Okoro', role:'Programs Lead', bio:'Experienced in agricultural programs and community engagement.', img:'/src/assets/baby-1839565_1280.jpg'},
    {name:'Dr. Sarah Mensah', role:'Health Advisor', bio:'Public health specialist with emergency response experience.', img:'/src/assets/download (1).jpg'}
  ]

  return (
    <div className="bg-white rounded p-6 shadow">
      <h3 className="text-lg font-semibold">Meet the team</h3>
      <p className="text-sm text-gray-600 mt-2">Our small but experienced team combines program directors, field coordinators and finance/monitoring staff. Below are sample bios — replace with real names and photos.</p>

      <div className="mt-4 grid md:grid-cols-3 gap-4">
        {people.map(p => (
          <div key={p.name} className="p-4 border rounded">
            <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              <img src={p.img} alt={p.name} className="object-cover h-full w-full" />
            </div>
            <div className="mt-3">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600">{p.role}</div>
              <p className="text-sm mt-2 text-gray-600">{p.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
