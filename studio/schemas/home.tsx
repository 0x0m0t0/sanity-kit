import {defineField} from 'sanity'
// import {BsHouse} from 'react-icons/bs' // !!! TODODEV lucide-icons
import CustomInput from '../components/CustomInput'
import {GROUPS} from './../constants'

export default defineField({
  name: 'home',
  type: 'document',
  // icon: BsHouse,
  groups: GROUPS,
  fields: [
    // CONTENT
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      components: {
        input: (props) =>
          CustomInput({
            ...props,
            badges: [{label: 'Required', tone: 'critical'}],
            description: <>📌 This will be hidden from the viewer but required for SEO.</>,
          }),
      },
    }),

    defineField({
      name: 'meta',
      title: 'SEO & Social Media',
      type: 'metaCard',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home',
      }
    },
  },
})
