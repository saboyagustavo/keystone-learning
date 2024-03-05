import { config } from '@keystone-6/core';
import { lists } from './schemas';
export default config({
  db: {
    provider: 'sqlite',
    url: 'file:./keystone.db',
  },
  lists,
});
