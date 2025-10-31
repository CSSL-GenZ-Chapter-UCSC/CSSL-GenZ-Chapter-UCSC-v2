import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { event } from './event'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, event],
}
