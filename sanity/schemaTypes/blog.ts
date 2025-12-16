import { defineField, defineType } from "sanity";

export const blog = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(8)
          .max(20)
          .error("Title must be between 8 and 20 characters"), // blocks publishing
    }),
    defineField({
      name: "titleSplitCharCount",
      title: "Title Split Character Count",
      type: "number",
      description: "Number of characters in the first line of the title",
      initialValue: 11, // default
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.min(88)
            .max(131)
            .error("Excerpt must be between 88 and 131 characters"),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "string",
      options: {
        list: [
          { title: "Events", value: "Events" },
          { title: "Workshops", value: "Workshops" },
          { title: "Competitions", value: "Competitions" },
          { title: "Announcements", value: "Announcements" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Events", value: "Events" },
          { title: "Workshops", value: "Workshops" },
          { title: "Competitions", value: "Competitions" },
          { title: "Announcements", value: "Announcements" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});