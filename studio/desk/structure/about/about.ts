import defineStructure from '../../../utils/defineStructure'
import {i18n} from './../../../languages'

const ID = 'about'
const TITLE = 'About'

export default defineStructure((S, context) =>
  S.listItem()
    .title(TITLE)
    .child(
      S.documentList()
        .id(`all-about`)
        .title(`All ${TITLE}`)
        .schemaType(ID)
        .filter(`_type == "${ID}"`)
        .canHandleIntent(
          (intentName, params) => intentName === 'edit' || params.template === `${ID}`
        )
        .initialValueTemplates(
          i18n.languages.map((language) => ({
            id: `${ID}-${language.id}`,
            templateId: `${ID}-${language.id}`,
            params: {language: language.id},
          }))
        )
    )
)
