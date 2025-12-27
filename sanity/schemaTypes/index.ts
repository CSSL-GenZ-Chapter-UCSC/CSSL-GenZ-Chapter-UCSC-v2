import { type SchemaTypeDefinition } from "sanity";
import { blog } from "./blog";
import { event } from "./event";
import { member } from "./member";
import { author } from "./author";
import { contactInfo } from "./contactInfo";
import { team } from "./team";
import { announcement } from "./announcement";
import { testimonial } from "./testimonial";
import { category } from "./category";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blog,
    event,
    member,
    author,
    contactInfo,
    team,
    announcement,
    testimonial,
    category,
  ],
};
