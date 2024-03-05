import { config } from '@keystone-6/core';
import { lists } from './schemas';
import { withAuth, session } from './auth';
export default config(
  withAuth({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    session,
    lists,
    ui: { isAccessAllowed: ctx => !!ctx.session?.data },
  })
);
