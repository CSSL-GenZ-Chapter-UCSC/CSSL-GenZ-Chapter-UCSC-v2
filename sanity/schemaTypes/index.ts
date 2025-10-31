import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { blog } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blog],
}
