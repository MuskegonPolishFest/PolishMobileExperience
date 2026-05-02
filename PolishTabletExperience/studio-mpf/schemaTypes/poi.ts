import { defineField, defineType } from 'sanity'

const ERA_OPTIONS = [
  { title: 'Golden Age', value: 'golden_age' },
  { title: 'Wars & Partitions', value: 'wars_partitions' },
  { title: 'Struggle for Independence', value: 'independence' },
  { title: 'Rebirth of Poland', value: 'rebirth' },
  { title: 'World War II & Occupation', value: 'ww2' },
  { title: 'Communist Poland', value: 'communist' },
  { title: 'Modern Poland', value: 'modern' },
]

export const poiType = defineType({
  name: 'poi',
  title: 'Point of Interest',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Unique ID',
      type: 'slug',
      description: 'Used internally to link related POIs (e.g. "c1", "c2"). Must be unique.',
      options: { source: 'titleTop', maxLength: 10 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eraKeys',
      title: 'Historical Era(s)',
      type: 'array',
      of: [{ type: 'string', options: { list: ERA_OPTIONS } }],
      description: 'Which era(s) this POI belongs to. Used to filter on the timeline map.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'yearLabel',
      title: 'Year Label',
      type: 'string',
      description: 'E.g. "1791" or "1939–1945". Shown on both cards and detail pages.',
    }),
    defineField({
      name: 'titleTop',
      title: 'Top Label (Category)',
      type: 'string',
      description: 'E.g. "Did You Know?" or "Błyskawica Radio". Shown as a small over-title.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleBottom',
      title: 'Card Title',
      type: 'string',
      description: 'The main headline shown on the Content Card.',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Full Detail Description',
      type: 'text',
      rows: 5,
      description: 'The full paragraph text shown on the detail screen.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'string',
      description: 'One-line summary shown when this POI appears as "Related Content".',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Used for both the Content Card and the Detail screen.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedIds',
      title: 'Related POI IDs',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'IDs of other POIs to show in the "Related Content" section (e.g. ["c2", "c3"]).',
    }),
    defineField({
      name: 'hotspot',
      title: 'Map Hotspot Coordinates',
      type: 'object',
      description: 'The X/Y position of this POI on the timeline map.',
      fields: [
        { name: 'top', type: 'number', title: 'Top (Y axis)', validation: (R) => R.required() },
        { name: 'left', type: 'number', title: 'Left (X axis)', validation: (R) => R.required() },
      ]
    }),
  ],
  preview: {
    select: {
      title: 'titleTop',
      subtitle: 'titleBottom',
      media: 'mainImage',
    },
  },
  orderings: [
    {
      title: 'Year (ascending)',
      name: 'yearAsc',
      by: [{ field: 'yearLabel', direction: 'asc' }],
    },
  ],
})
