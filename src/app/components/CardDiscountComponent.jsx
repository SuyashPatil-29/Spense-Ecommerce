import React from 'react'
import { useStateContext } from '../../../context/StateContext'


const CardDiscountComponent = ({card, index}) => {
    const { handleDiscountChange } = useStateContext();
  return (
    <div key={card.cardName} className="relative" onChange={()=>handleDiscountChange(card.discount)}>
                  <input
                    className="peer hidden"
                    id={`radio_${index + 1}`}
                    type="radio"
                    name="radio"
                  />
                  <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-slate-200"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    htmlFor={`radio_${index + 1}`}
                  >
                    {/* <img className="w-14 object-contain" src="/images/naorr.                .png" alt="Shipping Method 1" /> */}
                    <div className="ml-4">
                      <p className="font-semibold text-black">{card.cardName}</p>
                      <p className="text-gray-800">{card.discount}% off</p>
                    </div>
                  </label>
                </div>
  )
}

export default CardDiscountComponent