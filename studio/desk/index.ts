import {ListItemBuilder, StructureResolver} from 'sanity/desk'
import works from './structure/works/works'

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
    // 'about',
    // 'contact',
    // 'imprint',
    // 'error',
    //Bases
    // 'baseWork',
    // Documents
    'work',
    // 'service',
    // 'client',
    // Media tag
    // 'media.tag',
  ].includes(id)
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Structure')
    .items([
      S.divider(),
      works(S, context),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])