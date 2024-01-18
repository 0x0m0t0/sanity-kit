import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import defineStructure from '../../../utils/defineStructure'

const ID = 'work'
const TITLE = 'Works'

export default defineStructure((S, context) =>
  orderableDocumentListDeskItem({
    S,
    context,
    type: ID,
    title: TITLE,
    icon: () => '📝',
  })
)
