import { defineType, defineField } from 'sanity';
import { ShareIcon } from '@sanity/icons';

export const vendorListingType = defineType({
  name: 'vendorListing',
  title: 'Vendor Listing',
  type: 'document',
  icon: ShareIcon,
  fields: [
    defineField({
      name: 'product',
      title: 'Related Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vendorName',
      title: 'Vendor Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Shop Location',
      type: 'string',
    }),
    defineField({
      name: 'productUrl',
      title: 'Product Page URL',
      type: 'url',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'vendorName',
      subtitle: 'location',
    },
  },
})