import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const addressType = defineType({
  name: 'address',
  title: 'Addresses',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Address Name",
      type: "string",
      description: "A friendly name for this address (e.g. Home, Work)",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
        name: "email",
        title: "User Email",
        type: "email",
    }),
    defineField({
        name: "address",
        title: "Street Address",
        type: "string",
        description: "The street address including apartment/unit number",
        validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
        name: "city",
        title: "City",
        type: "string",
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: "state",
        title: "State",
        type: "string",
        description: "Three letter state code (e.g. CAMEROON)",
        validation: (Rule) => Rule.required().length(8).uppercase(),
    }),
    defineField({
        name: "zip",
        title: "Zip",
        type: "string",
        description: "Enter postal code if applicable, otherwise leave as N/A or 00000",
        validation: (Rule) =>
            Rule.required()
        .custom((zip: string | undefined) => {
            if (!zip || zip.trim() === "") {
          return "Zip/postal code is required";
        }
             if (!zip.match(/^[a-zA-Z0-9\s\-]{2,}$/)) {
          return "Please enter a valid postal code or N/A";
        }
            return true;
        }),
    }),
    defineField({
        name: "default",
        title: "Default Address",
        type: "boolean",
        description: "Is this the default shipping address?",
        initialValue: false,
    }),
    defineField({
        name: "createdAt",
        title: "Created At",
        type: "datetime",
        initialValue: () => new Date().toISOString(),
    }),
],
preview: {
    select:{
        title: "name",
        subtitle: "address",
        city: "city",
        state: "state",
        isDefault: "default",
    },
    prepare({ title, subtitle, city, state, isDefault }) {
        return {
            title: `${title} ${isDefault ? "(Default)" : ""}`,
            subtitle: `${subtitle}, ${city}, ${state}`,
        };
    },
}
}); 