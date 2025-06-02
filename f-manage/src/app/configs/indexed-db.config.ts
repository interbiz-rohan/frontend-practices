import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'f-manage-db',
  version: 1,
  objectStoresMeta: [
    {
      store: 'users',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'email', keypath: 'email', options: { unique: true } },
        { name: 'password', keypath: 'password', options: { unique: false } },
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'role', keypath: 'role', options: { unique: false } },
        { name: 'date_of_birth', keypath: 'date_of_birth', options: { unique: false } },
        { name: 'gender', keypath: 'gender', options: { unique: false } },
        { name: 'created_at', keypath: 'created_at', options: { unique: false } },
        { name: 'updated_at', keypath: 'updated_at', options: { unique: false } }
      ]
    },
    {
      store: 'files',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'size', keypath: 'size', options: { unique: false } },
        { name: 'url', keypath: 'url', options: { unique: false } },
        { name: 'user_id', keypath: 'user_id', options: { unique: false } },
        { name: 'created_on', keypath: 'created_on', options: { unique: false } },
        { name: 'updated_on', keypath: 'updated_on', options: { unique: false } }
      ]
    }
  ]
}; 