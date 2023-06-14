import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import urlFor from '../../../LIB/urlFor';


function ProductDisplay({product}) {

    const [index, setIndex] = useState(0);
    const [isMouseOver, setIsMouseOver] = useState(false);
  

    useEffect(() => {
        let interval;
    
        if (isMouseOver) {
          interval = setInterval(() => {
            if (index === 3) {
              setIndex(0);
            } else {
              setIndex(index + 1);
            }
          }, 1500);
        }
    
        return () => {
          clearInterval(interval);
        };
      }, [index, isMouseOver, product]);
    
      function handleMouseEnter() {
        setIsMouseOver(true);
      }
    
      function handleMouseLeave() {
        setIsMouseOver(false);
        setIndex(0); // Reset the index when mouse leaves
      }
    

  return (
      <Link href={`/shop/${product.slug.current}`} key={product._id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='w-4/5 mx-auto lg:flex md:flex flex-row items-center bg-white h-[250px] bg-opacity-20 rounded-2xl my-6 shadow-2xl hover:transition hover:ease-in-out hover:scale-105 duration-300'>
            <div className="lg:w-2/5 md:w-2/5 w-1/2 ml-12">
              <Image src={urlFor(product.image[index]).url()} alt="Product Image" className=" lg:max-h-[250px] lg:max-w-[250px] rounded-2xl md:max-h-[250px] md:max-w-[250px] object-cover w-full max-h-[180px] min-h-[120px]" width={300} height={250} />
            </div>
            <div className="ml-8 mr-12 lg:w-3/5 md:w-3/5 w-1/2 lg:block md:block hidden">
              <h2 className="text-lg font-semibold">{product.productName}</h2>
              <p className="text-lg text-white font-semibold">Rs {product.price}</p>
              <p className="text-md text-gray-200 mt-2 mr-3 lg:block hidden md:block">
                {`${product.details.substr(0, 150).replace(/\n/g, " ")}...`}
              </p>
              <p>{}</p>
            </div>
            <div className='lg:hidden md:hidden block mx-4'>
                <h2 className="text-lg font-semibold">{product.productName}</h2>
                <p className="text-lg text-white font-semibold">Rs {product.price}</p>
            </div>
            </div>
        </Link>
  )
}

export default ProductDisplay