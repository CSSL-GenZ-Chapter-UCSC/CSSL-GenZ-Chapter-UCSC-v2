import { type SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import { blog } from "./blog";
import { event } from "./event";
import { member } from "./member";
import { author } from "./author";
import { contactInfo } from "./contactInfo";
import { team } from "./team";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blog, event, member, author, contactInfo, team],
};