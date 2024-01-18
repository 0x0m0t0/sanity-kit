import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {defineField} from 'sanity'
import {schemaTypes} from './schemas'
import {structure} from './desk'
import {media} from 'sanity-plugin-media'
import {schemaVisualizer} from 'sanity-plugin-schema-visualizer' // !!! FORDEV
import {i18n} from './languages'
// import {structureTool} from 'sanity/structure'  // !!! DEVCHECK
import {documentInternationalization} from '@sanity/document-internationalization'

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
export const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: 'sanity-kit',
  title: 'Sanity Kit',
  projectId,
  dataset,
  plugins: [
    deskTool({structure}),
    visionTool(),
    media(),
    documentInternationalization({
      supportedLanguages: i18n.languages,
      schemaTypes: ['work'],
    }),
    // !!! FORDEV
    schemaVisualizer({
      defaultSchemaTypes: ['work', 'blog'],
      hiddenSchemaTypes: ['translation.metadata'],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
