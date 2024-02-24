import {defineField, defineType} from 'sanity'
import CustomInput from '../../components/CustomInput'

export default defineType({
  name: 'metaCard',
  type: 'object',
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: 'title',
      title: 'Title template for SEO, sharing on social networks and history',
      type: 'string',
      validation: (Rule) => Rule.required(),
      components: {
        input: (props) =>
          CustomInput({
            ...props,
            maxLength: 70,
            tone: 'critical',
            description: (
              <>
                📌 The template title is used to give context and to convert users on social
                networks and Google searches. This title will be combined with the title for the SEO
                of each page. Ideally between 15 to 70 characters.
              </>
            ),
          }),
      },
    }),
    defineField({
      name: 'description',
      title: 'Short description for SEO and sharing on social networks',
      type: 'text',
      rows: 3,
      components: {
        input: (props) =>
          CustomInput({
            ...props,
            maxLength: 160,
            tone: 'caution',
            description: (
              <>
                ⚡ Optional, to convert more visitors from Google and social networks. This
                description will be used if the page consulted does not contain one. Ideally between
                70 and 160 characters.
              </>
            ),
          }),
      },
    }),
    defineField({
      name: 'keywords',
      title: 'Series of relevant keywords related to the page content',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      components: {
        input: (props: any) =>
          CustomInput({
            ...props,
            maxLength: 10,
            tone: 'caution',
            description: (
              <>
                ⚡ Optionall, keywords are specific terms or expressions used to describe the
                content of a web page. content of a web page, making it easier for users to find
                relevant information. Mandatory to improve the visibility of the web page in the
                search results. These keywords will be used if the page consulted does not contains
                any. Ideally between 5 and 10.
              </>
            ),
          }),
      },
    }),
    defineField({
      name: 'image',
      title: 'Image to share on social networks',
      type: 'image',
      options: {accept: '.webp, .jpg, .jpeg, .png'},
      components: {
        input: (props: any) =>
          CustomInput({
            ...props,
            badges: [
              {label: 'Optional', tone: 'caution'},
              {label: 'jpg'},
              {label: 'jpeg'},
              {label: 'png'},
              {label: 'webp'},
            ],
            description: (
              <>
                ⚡ Optional, but highly recommended in order to increase the conversion rate of
                links to this page when shared on social networks, emails, messages, etc. This image
                will be used if the page consulted does not contain one. Ideal format: 1200×630
                pixels.
              </>
            ),
          }),
      },
    }),
  ],
})
