import { allowAll } from '@keystone-6/core/access';
import { relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { document } from '@keystone-6/fields-document';

export const Post = list({
  access: allowAll,
  fields: {
    title: text(),
    content: document({
      formatting: true,
      links: true,
      dividers: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
    }),
    publishedAt: timestamp(),
    status: select({
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      defaultValue: 'draft',
      ui: { displayMode: 'segmented-control' },
    }),
    author: relationship({
      ref: 'User.posts',
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineConnect: true,
        inlineEdit: { fields: ['name', 'email'] },
        inlineCreate: { fields: ['name', 'email', 'password'] },
        linkToItem: true,
      },
    }),
  },
  hooks: {
    resolveInput: ({ operation, resolvedData }) => {
      switch (operation) {
        case 'create':
        case 'update':
          if (resolvedData.status === 'published') {
            return {
              ...resolvedData,
              publishedAt: new Date(),
            };
          }
          return resolvedData;
      }
    },
  },
});
