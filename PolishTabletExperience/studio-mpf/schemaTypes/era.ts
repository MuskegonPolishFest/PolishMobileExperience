import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const eraType = defineType({
  name: 'era',
  title: 'Historical Era',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Era Name',
      type: 'string',
      description: 'The name of the historical era (e.g., "The Golden Age").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'id',
      title: 'Era ID (Slug)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timeframe',
      title: 'Time Period',
      type: 'string',
      description: 'E.g., "Late 15th — Mid-17th Century" or "1939 — 1945".',
    }),
    defineField({
      name: 'summary',
      title: 'Era Summary',
      type: 'text',
      rows: 3,
      description: 'A brief description of what this era represents.',
    }),
    defineField({
      name: 'years',
      title: 'Key Years',
      type: 'array',
      of: [{ type: 'number' }],
      description: 'A list of specific years that trigger this era on the timeline (e.g., [1635, 1653]).',
    }),
    defineField({
      name: 'color',
      title: 'Theme Color',
      type: 'string',
      description: 'Hex color code for this era (e.g., #6E5A12).',
      initialValue: '#2f2b2d',
    }),
    defineField({
      name: 'borderExplanation',
      title: 'Border Change Explanation',
      type: 'text',
      rows: 4,
      description: 'Text explaining why the borders changed during this era.',
    }),
    defineField({
      name: 'mapAsset',
      title: 'Background Map',
      type: 'image',
      description: 'The map image to display in the background for this era.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'timeframe',
      media: 'mapAsset',
    },
  },
})
