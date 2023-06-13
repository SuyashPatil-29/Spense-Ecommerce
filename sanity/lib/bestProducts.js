const BestProducts = {
  name: 'BestProducts',
  title: 'Best Products',
  type: 'document',
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
          hotspot: true,
      }
  },
  {
      name: "productName",
      title: "Product Name",
      type: "string",
  },
  {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
          maxLength: 90,
      }
  },
  {
      name: "quantity",
      title: "Quantity",
      type: "number",
  },
  {
      name: "price",
      title: "Price",
      title: "Price",
      type: "number",
  },
  ],
};

export default BestProducts;