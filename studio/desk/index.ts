import {ListItemBuilder, StructureResolver} from 'sanity/desk'
import works from './structure/works/works'
import blogs from './structure/blog/blog'
import about from './structure/about/about'

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    // Singletons
    // 'home',
    // 'exploration',
    // 'settings',
    'about',
    // 'contact',
    // 'imprint',
    // 'error',
    //Bases
    // 'baseWork',
    // Documents
    'work',
    'blog',
    // 'service',
    // 'client',
    // Media tag
    'media.tag',
    'translation.metadata',
  ].includes(id)
}

export const structure: StructureResolver = (
  S,
  context // !!! DEVCHECK
) =>
  S.list()
    .title('Home')
    .items([
      S.divider(),
      works(S, context),
      blogs(S, context),
      about(S, context),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
