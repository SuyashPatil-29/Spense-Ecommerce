"use client"
import { useState, useEffect } from 'react';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import Link from 'next/link';
import { client } from '../../../../../LIB/client';
import urlFor from '../../../../../LIB/urlFor';
import { useStateContext } from '../../../../../context/StateContext';
import { Product } from '../../../components';

const products = groq`
  *[_type == "vendor"].products[]
`;

const discountQuery= groq`
*[_type == "banner"].discount
`

const vendorQuery = groq`
  *[_type == "vendor"]{
    name,
    products
  }
`;

const slugsData = groq`
*[_type == "vendor"].products[]{
  slug
}
`


export const generateStaticParams = async () => {
  const slugsData = groq`
  *[_type == "vendor"].products[]{
    slug
  }
  `;

  const slugs = await client.fetch(slugsData)
  const slugRoutes = slugs.map((slug) => slug.slug.current)
  return slugRoutes.map(slug => ({ slug }))
}

const ProductDetails = ({ params }) => {
  const [index, setIndex] = useState(0);
  const [productArray, setProductArray] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [slugReturned, setSlug] = useState([])
  const [discount, setDiscount] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await client.fetch(products);
      setProductArray(productsData);
    };

    const fetchSlugsData = async() => { 
     const slugs =await client.fetch(slugsData);
     setSlug(slugs)
    }

    const fetchVendor = async () => {
      const vendorData = await client.fetch(vendorQuery);
      setVendor(vendorData);
    };

    const fetchDiscount = async () => {
      const discountData = await client.fetch(discountQuery);
      setDiscount(discountData);
    }

    fetchProducts();
    fetchVendor();
    fetchSlugsData();
    fetchDiscount();
  }, []);


  const { qty, setQty ,onAdd } = useStateContext();

  const handleIncQty = () => {
    if (qty >= selectedProduct.quantity) {
      alert(`Quantity cannot be more than ${selectedProduct.quantity}`);
    } else {
      setQty((prevQty) => prevQty + 1);
    }
  };
  
  const handleDecQty = () => {
    if (qty - 1 < 1) {
      setQty(1);
    } else {
      setQty((prevQty) => prevQty - 1);
    }
  };
  

  useEffect(() => {
    const matchedProduct = productArray.find(
      (product) => product.slug.current.trim().toLowerCase() === params.slug
    );
    setQty(1)
    setSelectedProduct(matchedProduct);
  }, [productArray, params.slug, setQty]);

  if (!selectedProduct) {
    return <div>Loading...</div>;
  }

  const { slug, productName, image, price, details, quantity, addedQuantity } = selectedProduct;

  return (
    <div>
      <div key={slug.current}>
        <div className="product-detail-container">
          <div className='mx-auto'>
            <div className="image-container">
              <Image
                className="product-detail-image hover:bg-red-500 hover:bg-opacity-40 bg-white bg-opacity-20 hover:rotate-6"
                src={urlFor(image[index]).url()}
                width={500}
                height={500}
                alt="product"
              />
            </div>
            <div className="small-images-container">
              {image?.map((image, i) => (
                <Image
                  key={i}
                  src={urlFor(image).url()}
                  className={
                    i === index
                      ? 'small-image bg-red-500 opacity-40 hover:rotate-6'
                      : 'small-image bg-white bg-opacity-20 hover:rotate-12'
                  }
                  onMouseEnter={() => setIndex(i)}
                  width={100}
                  height={100}
                  alt="product"
                />
              ))}
            </div>
          </div>
          <div className=''>
            <div className="product-detail-desc text-pink-600 text-4xl font-extrabold">
              <h1>{productName}</h1>
            </div>
            <div className="reviews">
              <div className="flex">
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </div>
              <p>(20)</p>
            </div>
            <h4 className="mt-6">
              <span className="text-lg font-bold text-pink-400"> Details: </span>
            </h4>
            <p className="max-w-3xl">{details}</p>
            <p className="price mt-6 text-lg font-bold text-pink-400">
              {discount[0] ? (
                <span className="text-lg font-bold text-pink-400">
                  Price : <span className="line-through text-red-500 mr-4"><span className='text-slate-200'>Rs {price}</span></span><span className="text-slate-200">Rs {price - (price * discount[0]/100)}</span>
                </span>
               ) :
                <span className="text-lg font-bold text-pink-400">
                  Price : <span className="text-slate-200">Rs{price}</span>
                </span>
              }
            </p>
            <div className="flex justify-between items-center lg:min-w-[55vw]">
              {quantity === 0 ? (
                <p className="text-lg font-bold text-pink-400">
                  Remaining Quantity : <span className="text-red-500">0</span>
                </p>
              ) : (
                <p className="text-lg font-bold text-pink-400">
                  Remaining Quantity :{' '}
                  <span className="text-slate-200">{quantity - qty}</span>
                </p>
              )}
              <h3>
                {vendor.map((vendor) =>
                  vendor.products.map((product) =>
                    product.slug.current.trim().toLowerCase() === params.slug ? (
                      <Link
                        href={`/vendors/${vendor.name}`}
                        key={product.slug.current}
                        className="text-lg font-semibold text-cyan-400 rounded-2xl lg:p-3 md:p-3 p-2 hover:bg-white hover:bg-opacity-30 whitespace-nowrap"
                      >
                        Brand : <span className="underline">{vendor.name}</span>
                      </Link>
                    ) : null
                  )
                )}
              </h3>
            </div>
            <div className="quantity">
              <h3 className="text-lg font-bold">Quantity:</h3>
              <p className="quantity-desc flex items-center justify-between">
                <span className="minus" onClick={handleDecQty}>
                  <AiOutlineMinus />
                </span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={handleIncQty}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
            <div className="buttons mx-auto">
              {quantity === 0 ? null : (
                <button
                  type="button"
                  className="add-to-cart rounded-2xl shadow-2xl shadow-black"
                  onClick={() => {
                    if(selectedProduct)
                      onAdd(selectedProduct, qty)}}
                >
                  Add to Cart
                </button>
              )}
              <button
                type="button"
                className={
                  quantity === 0
                    ? 'cursor-not-allowed w-[200px] py-[10px] px-[20px] border-none mt-10 text-lg font-medium rounded-2xl shadow-2xl shadow-black bg-[#f02d34] text-white '
                    : `buy-now rounded-2xl shadow-2xl shadow-black`
                }
                onClick={() => console.log('hello')}
              >
                {quantity === 0 ? 'Out of Stock' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>
        <div className="maylike-products-wrapper w-[80vw] mx-auto">
          <h2>You may also like</h2>
          <div className="marquee lg:h-[400px] md:h-[400px] h-[250px]">
            <div className="maylike-products-container track">
              {productArray.map((item) => (
                <Product key={item.slug.current} product={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
