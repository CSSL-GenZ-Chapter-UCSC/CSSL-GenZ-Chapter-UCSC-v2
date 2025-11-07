import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "startDate",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    
    // logo
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
        },
      ],
    }),

    // main image
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
        { name: "caption", type: "string", title: "Caption" },
      ],
    }),

    // sub main image
    defineField({
      name: "subMainImage",
      title: "Sub Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),

    // two other images
    defineField({
      name: "otherImage1",
      title: "Other Image 1",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "otherImage2",
      title: "Other Image 2",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
  ],
});