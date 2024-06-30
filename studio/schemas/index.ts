import blockContent from './blockContent'
import home from './home'
import work from './work'
import blog from './blog'
import about from './about'

import metaCard from './objects/metaCard'
import globalMetaCard from './objects/globalMetaCard'

const objects = [metaCard, globalMetaCard]

// Singletons
import legal from './singletons/legals'
import settings from './singletons/settings'

const singletons = [settings, legal]

// Blocks
import body from './blocks/body'

const blocks = [body]

export const schemaTypes = [
  home,
  work,
  blog,
  about,
  blockContent,
  ...objects,
  ...singletons,
  ...blocks,
]
