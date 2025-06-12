import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Observable, from, defer } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { initializeDatabase } from '../shared/initializers/db-initial';

interface FManageDB extends DBSchema {
  users: {
    key: string;
    value: User;
    indexes: { 'by-email': string };
  };
  files: {
    key: string;
    value: File;
    indexes: { 'by-user': string, 'by-overview': string };
  };
}

export interface User {
  id?: string;
  email: string[];
  password: string;
  name: string;
  role: 'admin' | 'user';
  date_of_birth: string;
  gender: string;
  address: string[];
  contact: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface File {
  id?: string;
  name: string;
  type: string;
  size: string;
  url: string;
  data?: Blob;
  user_id: string;
  overview: string;
  created_on?: Date;
  updated_on?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private db: IDBPDatabase<FManageDB> | null = null;
  private readonly DB_NAME = 'fmanage-db';
  private readonly DB_VERSION = 1;
  private ready$: Observable<void>;

  constructor() {
    this.ready$ = from(this.initDB());
  }

  private async initDB() {
    try {
      this.db = await openDB<FManageDB>(this.DB_NAME, this.DB_VERSION, {
        upgrade(db: IDBPDatabase<FManageDB>) {
          if (!db.objectStoreNames.contains('users')) {
            const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
            userStore.createIndex('by-email', 'email', { unique: false });
          }

          if (!db.objectStoreNames.contains('files')) {
            const fileStore = db.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
            fileStore.createIndex('by-user', 'user_id');
            fileStore.createIndex('by-overview', 'overview', { unique: false });
          }
        }
      });

       initializeDatabase(this);
    } catch (error) {
      console.error('Error initializing IndexedDB:', error);
      throw error;
    }
  }

  private ensureDB(): Observable<void> {
    return this.ready$.pipe(
      tap(() => {
        if (!this.db) {
          throw new Error('Database not initialized');
        }
      })
    );
  }

  addUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Observable<User> {
    console.log(user)

    return this.ensureDB().pipe(
      switchMap(() => from(this.db!.add('users', {
        ...user,
        created_at: new Date(),
        updated_at: new Date()
      }))),
      map(id => ({ ...user, id: id.toString() })),
      tap(user => console.log('Added user:', user)),
      catchError(error => {
        console.error('Error adding user:', error);
        throw error;
      })
    );
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.ensureDB().pipe(
      switchMap(() => from(this.db!.getAll('users'))),
      map(users => users.find(user => user.email.includes(email))),
      tap(user => console.log('Retrieved user:', user))
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.ensureDB().pipe(
      switchMap(() => from(this.db!.getAll('users')))
    );
  }

  addFile(file: Omit<File, 'id' | 'created_on' | 'updated_on'>): Observable<File> {
    return this.ensureDB().pipe(
      switchMap(() => from(this.db!.add('files', {
        ...file,
        created_on: new Date(),
        updated_on: new Date()
      }))),
      map(id => ({ ...file, id: id.toString() })),
      catchError(error => {
        console.error('Error adding file:', error);
        throw error;
      })
    );
  }

  getFilesByUser(userId: string): Observable<File[]> {
    console.log('Getting files for userId:', userId);
    return this.ensureDB().pipe(
      switchMap(() => {
        console.log('Database ready, querying files...');
        return from(this.db!.getAll('files'));
      }),
      map(files => files.filter(file => file.user_id == userId)),
      tap((files: File[]) => {
        console.log('Retrieved files:', files);
        if (!files || files.length === 0) {
          console.log('No files found for user:', userId);
        }
      }),
      catchError(error => {
        console.error('Error getting files by user:', error);
        throw error;
      })
    );
  }

  getAuthorName(userId: string): Observable<string> {
    console.log('Looking for user with ID:', userId);
    return this.ensureDB().pipe(
      switchMap(() => from(this.db!.getAll('users'))),
      map(users => {
        let user = users.find(u => u.id === userId);
                if (!user) {
          const numericId = parseInt(userId, 10);
          if (!isNaN(numericId)) {
            user = users.find(u => parseInt(u.id || '', 10) === numericId);
          }
        }
        return user?.name || 'Unknown Author';
      }),
    );
  }
  

  getAllFiles(): Observable<File[]> {
    return this.ensureDB().pipe(
      switchMap(() => from(this.db!.getAll('files')))
    );
  }

  deleteFile(fileId: string): Observable<void> {
    return this.ensureDB().pipe(
      switchMap(() => from(this.db!.delete('files', fileId)))
    );
  }

  getUserById(id: string): Observable<User | null> {
    return this.ensureDB().pipe(
      switchMap(() => from(this.db!.get('users', id))),
      map(user => user || null)
    );
  }

  updateUser(id: string, data: Partial<User>): Observable<User> {
    return this.ensureDB().pipe(
      switchMap(() => from(this.db!.get('users', id))),
      switchMap(existingUser => {
        if (!existingUser) throw new Error('User not found');
        const updatedUser = { ...existingUser, ...data, updated_at: new Date() };
        return from(this.db!.put('users', updatedUser)).pipe(
          map(() => updatedUser)
        );
      }),
      catchError(error => {
        console.error('Error updating user:', error);
        throw error;
      })
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.ensureDB().pipe(
      switchMap(() => from(this.db!.delete('users', id))),
      catchError(error => {
        console.error('Error deleting user:', error);
        throw error;
      })
    );
  }
} 