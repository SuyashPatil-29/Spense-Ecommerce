import Category from "./category";

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
      name: "mainImage",
      title: "Main Image",
      type: "image",
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
              name: 'image',
              title: 'Image',
              type: 'array',
              of: [{ type: 'image' }],
              options: {
                hotspot: true,
              },
            },
            {
              name: 'productName',
              title: 'Product Name',
              type: 'string',
            },
            {
              name: 'category',
              title: 'Category',
              type: 'reference',
              to: [{ type: 'category' }],
              options: {
                // Prompt to select existing categories or create new ones
                addUnlisted: true,
              },
              // Specify the field to display from the referenced category
              displayField: 'name',
            },
            {
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {
                maxLength: 90,
              },
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
            },
            {
              name: 'details',
              title: 'Details',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  // Add access control rules
  preview: {
    select: {
      title: 'name',
    },
  },
  // Define custom access control rules
  __experimental_access: [
    {
      role: 'admin',
      permission: 'manage',
    },
    {
      role: 'editor',
      permission: 'create',
    },
    {
      role: 'viewer',
      permission: 'read',
    },
    {
      role: 'editor',
      permission: 'update',
    },
    {
      role: 'viewer',
      permission: 'history',
    },
    {
      role: 'admin',
      permission: 'delete',
    },
  ],
};

export default Vendor;
