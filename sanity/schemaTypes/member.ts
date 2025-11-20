import { defineField, defineType } from "sanity";

export const member = defineType({
  name: "member",
  title: "Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "President", value: "president" },
          { title: "Executive Committee", value: "executive" },
          { title: "Team Lead", value: "teamLead" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bgImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "fgImage",
      title: "Foreground Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bgClassName",
      title: "Background Image Class",
      type: "string",
    }),
    defineField({
      name: "fgClassName",
      title: "Foreground Image Class",
      type: "string",
    }),
    defineField({
      name: "cardClassName",
      title: "Card Container Class",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "fgImage" },
  },
});
