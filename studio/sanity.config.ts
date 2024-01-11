import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {structure} from './desk'
// import {structureTool} from 'sanity/structure'  // !!! DEVCHECK

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
export const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: 'sanity-kit',
  title: 'Sanity Kit',
  projectId,
  dataset,
  plugins: [deskTool({structure}), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
