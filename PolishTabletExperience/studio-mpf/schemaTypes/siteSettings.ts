import { defineField, defineType, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Polish Tablet Experience Settings',
      readOnly: true,
    }),
    defineField({
      name: 'globalMaps',
      title: 'Global Timeline Maps',
      description: 'Maps that change based on specific years, not necessarily tied to a single era definition.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'yearMap',
          fields: [
            defineField({ name: 'startYear', type: 'number', title: 'Start Year' }),
            defineField({ name: 'mapAsset', type: 'image', title: 'Map Image' }),
          ],
          preview: {
            select: {
              year: 'startYear',
              media: 'mapAsset',
            },
            prepare({ year, media }) {
              return {
                title: `Year: ${year}`,
                media,
              }
            },
          },
        }),
      ],
    }),
  ],
})
