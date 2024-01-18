import works from './works'
import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../../../utils/defineStructure'

const TITLE = 'Works'

export default defineStructure<ListItemBuilder>((S, context) =>
  S.listItem()
    .title(TITLE)
    .child(
      S.list()
        .title(TITLE)
        .items([works(S, context), S.divider()])
    )
)
