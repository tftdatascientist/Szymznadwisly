import { defineCollection, z } from 'astro:content';

const gallery = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    material: z.string(),
    year: z.number(),
    type: z.enum(['photo', 'video']),
    videoSrc: z.string().optional(),
    duration: z.string().optional(),
    dimensions: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { gallery };
