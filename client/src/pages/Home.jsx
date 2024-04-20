// import { ScaleIcon } from '@heroicons/react/20/solid'
// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useTranslation } from 'react-i18next';

// export default function Home() {

//   const {t,i18n} = useTranslation();

//   const [counts, setCounts] = React.useState({})
//   const cards = [
//     { id: 'cafeteria', name: 'MENSA', icon: ScaleIcon },
//     { id: 'takeawayPackage', name: 'PACCO ASPORTO', icon: ScaleIcon },
//     { id: 'showers', name: 'DOCCIE', icon: ScaleIcon },
//     { id: 'covers', name: 'COPERTE', icon: ScaleIcon },
//     { id: 'medicines', name: 'MEDICINE', icon: ScaleIcon },
//   ]

//   const renderedCards = cards.map(card => ({
//     ...card,
//     name: t(card.nameKey) // Translate name using t function
//   }));

//   useEffect(() => {

//     axios.get("http://localhost:4000/service/count", { params: { date: new Date().toDateString() } })
//       .then((res) => {
//         setCounts(res.data);
//       }).catch((err) => {
//         console.log(err);
//       });
//   }, [])
//   return (

//     <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-8">
//       <h2 className="text-lg font-medium leading-6 text-gray-900">Overview</h2>
//       <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//         {/* Card */}
//         {renderedCards.map((card) => (
//           <div key={card.nameKey} className="overflow-hidden rounded-lg bg-white shadow">
//             <div className="p-5">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="truncate text-sm font-medium text-gray-500">{card.name}</dt>
//                     <dd>
//                       <div className="text-lg font-medium text-gray-900">{counts[card.id] || 0}</div>
//                     </dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// };


import { ScaleIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t, i18n } = useTranslation();
  const [counts, setCounts] = React.useState({});
  
  const cards = [
    { id: 'MENSA', nameKey: 'Cafeteria', icon: ScaleIcon },
    { id: 'PACCO ASPORTO', nameKey: 'Takeaway Package', icon: ScaleIcon },
    { id: 'DOCCIE', nameKey: 'Shower', icon: ScaleIcon },
    { id: 'COPERTE', nameKey: 'Covers', icon: ScaleIcon },
    { id: 'MEDICINE', nameKey: 'Medicines', icon: ScaleIcon },
  ];

  useEffect(() => {
    axios.get("http://localhost:4000/service/count", { params: { date: new Date().toDateString() } })
      .then((res) => {
        setCounts(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-8">
      <h2 className="text-lg font-medium leading-6 text-gray-900">{t("Overview")}</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card */}
        {cards.map((card) => (
          <div key={card.id} className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{t(card.nameKey)}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{counts[card.id] || 0}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

