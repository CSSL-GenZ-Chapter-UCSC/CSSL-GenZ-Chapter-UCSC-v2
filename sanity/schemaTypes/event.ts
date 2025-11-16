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
      name: "shortSummary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      type: "block",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bannerText",
      type: "string",
    }),
    defineField({
      name: "bannerImage",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "cta",
      type: "boolean",
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

    // photos array for single event page
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
          ],
        },
      ],
      description: "Additional photos for the event detail page (no limit)",
    }),

    // venue
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      description: "Event location/venue",
    }),

    // visibility control
    defineField({
      name: "is_shown",
      title: "Show on website",
      type: "boolean",
      initialValue: true,
      validation: (rule) => rule.required(),
      description: "Toggle to show/hide this event on the website",
    }),

    // highlight control
    defineField({
      name: "is_highlighted",
      title: "Highlight Event",
      type: "boolean",
      initialValue: false,
      description: "Mark this event as highlighted/featured",
    }),

    // start date
    defineField({
      name: "startDate",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "endDate",
      type: "datetime",
    }),

    // featured event reference - shows as dropdown of existing events
    defineField({
      name: "featuredAfter",
      title: "Feature After Event",
      type: "reference",
      to: [{ type: "event" }],
      description: "Optional: Select which event this should be featured after. Leave empty to feature first or not feature at all.",
      options: {
        filter: '_id != $id',
        filterParams: { id: '_id' }
      }
    }),
  ],
});