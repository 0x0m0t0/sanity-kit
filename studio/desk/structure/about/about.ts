import defineStructure from '../../../utils/defineStructure'
import {i18n} from './../../../languages'

const ID = 'about'
const TITLE = 'About'

export default defineStructure((S, context) =>
  S.listItem()
    .title(TITLE)
    .child(
      S.list()
        .title(TITLE)
        .items([
          ...i18n.languages.map((language) =>
            S.listItem()
              .title(`${TITLE} (${language.id.toLocaleUpperCase()})`)
              .schemaType(ID)

              .child(
                S.documentList()
                  .id(language.id)
                  .title(`${language.title} ${TITLE}`)
                  .schemaType(ID)
                  .filter(`_type == "${ID}" && language == $language`)
                  .params({language: language.id})
                  .initialValueTemplates([
                    S.initialValueTemplateItem('about-language', {
                      id: 'about-language',
                      language: language.id,
                    }),
                  ])
                  .canHandleIntent((intentName, params) => {
                    // TODO: Handle **existing** documents (like search results when clicked)
                    // to return `true` on the correct language list!
                    if (intentName === 'edit') {
                      // return params?.language === language.id
                      return false
                    }

                    // Not an initial value template
                    if (!params.template) {
                      return true
                    }

                    // Template name structure example: "lesson-en"
                    const languageValue = params?.template?.split(`-`).pop()

                    return languageValue === language.id
                  })
              )
          ),
          // I have only added this item so that search results when clicked will load this list
          // If the intent checker above could account for it, I'd remove this item
          S.divider(),
          S.listItem()
            .title(`All ${TITLE}`)
            .schemaType(ID)

            .child(
              S.documentList()
                .id(`all-about`)
                .title(`All ${TITLE}`)
                .schemaType(ID)
                .filter(`_type == "${ID}"`)
                // Load this pane for existing `lesson` documents
                // or new documents that aren't using an initial value template
                .canHandleIntent(
                  (intentName, params) => intentName === 'edit' || params.template === `${ID}`
                )
            ),
        ])
    )
)
