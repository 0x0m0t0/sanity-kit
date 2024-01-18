import {defineField, defineType} from 'sanity'

export default defineField({
  name: 'blog',
  title: 'blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    // !!! FORDEV
    // defineField({
    //   name: 'images',
    //   title: 'Images',
    //   type: 'array',
    //   of: [
    //     {
    //       name: 'image',
    //       type: 'image',
    //       title: 'Image',
    //       options: [{accept: '.webp, .jpg, .jpeg'}],
    //       validation: (Rule) => Rule.required(), // custom inputs needed for validation
    //       fields: [
    //         {
    //           name: 'caption',
    //           title: 'Caption',
    //           type: 'string',
    //         },
    //       ],
    //       preview: {
    //         select: {
    //           caption: 'caption',
    //           media: 'asset',
    //         },
    //         prepare({caption, media}) {
    //           return {
    //             title: caption ? caption : 'image.000',
    //             media: media,
    //           }
    //         },
    //       },
    //     },
    //   ],
    //   validation: (Rule) => Rule.required().min(1),
    // }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
