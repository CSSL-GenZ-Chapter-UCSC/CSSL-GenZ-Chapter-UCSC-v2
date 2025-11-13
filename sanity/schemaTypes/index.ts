import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { blog } from './blog'
import { event } from './event'
import { author } from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blog, event, author],
}
