import blockContent from './blockContent'
import home from './home'
import work from './work'
import blog from './blog'
import about from './about'

import metaCard from './objects/metaCard'
import globalMetaCard from './objects/globalMetaCard'

const objects = [metaCard, globalMetaCard]

export const schemaTypes = [home, work, blog, about, blockContent, ...objects]
