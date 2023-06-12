// schema.js

const Vendor = {
    name: 'vendor',
    title: 'Vendor',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Vendor Name',
        type: 'string',
      },
      {
        name: 'products',
        title: 'Products',
        type: 'array',
        of: [
          {
            type: 'object',
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
                {
                    name: "details",
                    title: "Details",
                    title: "Details",
                    type: "string",
                
                }
            ],
          },
        ],
      },
    ],
  };

  export default Vendor;

  
  
