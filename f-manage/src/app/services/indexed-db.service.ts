import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Observable, from, defer } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { initializeDatabase } from '../commons/initializers/db-initial';

interface FManageDB extends DBSchema {
  users: {
    key: string;
    value: User;
    indexes: { 'by-email': string };
  };
  files: {
    key: string;
    value: File;
    indexes: { 'by-user': string };
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
  user_id: string;
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
    return this.ensureDB().pipe(
      switchMap(() => from(this.db!.add('users', {
        ...user,
        created_at: new Date(),
        updated_at: new Date()
      }))),
      map(id => ({ ...user, id: id.toString() })),
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
    return this.ensureDB().pipe(
      switchMap(() => from(this.db!.getAllFromIndex('files', 'by-user', userId)))
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
} 