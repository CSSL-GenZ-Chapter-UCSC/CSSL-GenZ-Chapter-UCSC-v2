import { defineField, defineType } from "sanity";

export const contactInfo = defineType({
  name: "contactInfo",
  title: "Contact Info",
  type: "document",
  initialValue: {
    facebookLink: "https://facebook.com/yourpage",
    email: "csslemail@gmail.com",
    mapsLink: "https://maps.google.com/?q=UCSC",
    phoneNumber: "+94 71 299 0638",
  },
  fields: [
    defineField({
      name: "facebookLink",
      title: "Facebook Profile URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (rule) => rule.email().error("Must be a valid email"),
    }),
    defineField({
      name: "mapsLink",
      title: "Maps Link",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      validation: (rule) => rule.min(7).error("Enter a valid phone number"),
    }),
  ],
});
