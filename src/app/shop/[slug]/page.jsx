"use client"
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import { client } from '../../../../LIB/client'
import urlFor from '../../../../LIB/urlFor'
import { groq } from 'next-sanity'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '@/app/components'

const products = groq`
      *[_type == "vendor"].products[]
`

const vedor = groq`
    *[_type == "vendor"]{
        name,
        products
    }
`

export default function ProductDetails({ params }) {
    const [index, setIndex] = useState(0);
    const [productArray, setProductArray] = useState([]);
    const [vendor, setVendor] = useState([]);
  
    useEffect(() => {
      async function fetchProducts() {
        const productsData = await client.fetch(products);
        setProductArray(productsData);
      }
      fetchProducts();
      async function fetchVendor() {
        const vendorData = await client.fetch(vedor);
        setVendor(vendorData);
      }
      fetchVendor(); 
    }, []);

    return(
        <div>
        {productArray.map((product)=>{
            const {slug, productName, image, price, details, quantity } = product
        if(slug.current.trim().toLowerCase()=== params.slug){
            return(
                <div key={slug.current}>
                    <div className="product-detail-container">
                        <div>
                            <div className='image-container'>
                                <Image className="product-detail-image hover:bg-red-500 hover:bg-opacity-40 bg-white bg-opacity-20 hover:rotate-6" src={urlFor(image[index]).url()} width={500} height={500} alt='product'/>
                            </div>
                            <div className='small-images-container'>
                                {image?.map((image, i)=>{
                                    return(
                                        <Image
                                            key={i}
                                            src={urlFor(image).url()}
                                            className={i === index ? 'small-image bg-red-500 opacity-40 hover:rotate-6' : 'small-image bg-white bg-opacity-20 hover:rotate-12'}
                                            onMouseEnter={()=>setIndex(i)}
                                            width={100}
                                            height={100}
                                            alt="product"
                                        />                  
                                    )
                                }
                                )}
                            </div>
                        </div>
                        <div>
                        <div className='product-detail-desc text-pink-600 text-4xl font-extrabold'>
                            <h1>{productName}</h1>
                        </div>
                            <div className='reviews'>
                                <div className='flex'>
                                    <AiFillStar/>
                                    <AiFillStar/>
                                    <AiFillStar/>
                                    <AiFillStar/>
                                    <AiOutlineStar/>
                                </div>
                                <p>(20)</p>
                            </div>
                            <h4 className="mt-6" >
                                <span className='text-lg font-bold text-pink-400'> Details: </span>
                            </h4>
                                <p className="max-w-3xl">
                                    {details}
                                </p>
                                <p className='price mt-6 text-lg font-bold text-pink-400'>Price : <spam className='text-slate-200'>Rs{price}</spam></p>
                                <div className='flex justify-between items-center lg:min-w-[55vw]'>
                                {quantity === 0 ? <p className='text-lg font-bold text-pink-400'>Remaining Quantity : <span className='text-red-500'>0</span></p> : <p className='text-lg font-bold text-pink-400'>Remaining Quantity : <span className='text-slate-200'>{quantity}</span></p>}
                                <h3>{vendor.map((vendor) => (
                                    vendor.products.map((product) => (
                                        product.slug.current.trim().toLowerCase() === params.slug ? <p key={product._id} className='text-lg font-bold text-cyan-400 underline'>Vendor: {vendor.name}</p> : null
                                        ))
                                    ))}
                                </h3>
                                </div>
                                <div className="quantity">
                                    <h3 className='text-lg font-bold'>Quantity:</h3>
                                    <p className="quantity-desc flex items-center justify-between">
                                    <span className="minus" onClick={() => (console.log('hello'))}><AiOutlineMinus /></span>
                                    <span className="num">1</span>
                                    <span className="plus" onClick={() => (console.log('hello'))}><AiOutlinePlus /></span>
                                    </p>
                                </div>
                                <div className="buttons">
                                  {quantity === 0 ? null : <button type="button" className="add-to-cart" onClick={() => (console.log('hello'))}>Add to Cart</button>}
                                  <button type="button" className={(quantity === 0 ? 'cursor-not-allowed w-[200px] py-[10px] px-[20px] border-none mt-10 text-lg font-medium bg-[#f02d34] text-white ' : `buy-now`)} onClick={() => (console.log('hello'))}>{quantity === 0 ? 'Out of Stock' : 'Buy Now'}</button>
                                </div>
                        </div>
                    </div>
                    <div className='maylike-products-wrapper w-[80vw] mx-auto'>
                    <h2 >You may also like</h2>
                    <div className="marquee">
                    <div className="maylike-products-container track">
                        {productArray.map((item) => (
                        <Product key={item._id} product={item} />
                        ))}
                    </div>
                    </div>
                    </div>
                </div>
            )
        }
    })}
    </div>

    )
    }
  
   