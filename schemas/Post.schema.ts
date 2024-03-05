import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const Post = list({
  access: allowAll,
  fields: {
    title: text(),
    author: relationship({
      ref: 'User.posts',
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineEdit: { fields: ['name', 'email'] },
        inlineCreate: { fields: ['name', 'email', 'password'] },
        linkToItem: true,
      },
    }),
  },
});
