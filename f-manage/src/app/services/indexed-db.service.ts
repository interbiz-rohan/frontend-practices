import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

  constructor() {
    this.initDB();
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

      // Initialize with sample data
      await initializeDatabase(this);
    } catch (error) {
      console.error('Error initializing IndexedDB:', error);
    }
  }

  // User operations
  addUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Observable<User> {
    return from(this.db!.add('users', {
      ...user,
      created_at: new Date(),
      updated_at: new Date()
    })).pipe(
      map(id => ({ ...user, id: id.toString() })),
      catchError(error => {
        console.error('Error adding user:', error);
        throw error;
      })
    );
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    return from(this.db!.getFromIndex('users', 'by-email', email));
  }

  getAllUsers(): Observable<User[]> {
    return from(this.db!.getAll('users'));
  }

  // File operations
  addFile(file: Omit<File, 'id' | 'created_on' | 'updated_on'>): Observable<File> {
    return from(this.db!.add('files', {
      ...file,
      created_on: new Date(),
      updated_on: new Date()
    })).pipe(
      map(id => ({ ...file, id: id.toString() })),
      catchError(error => {
        console.error('Error adding file:', error);
        throw error;
      })
    );
  }

  getFilesByUser(userId: string): Observable<File[]> {
    return from(this.db!.getAllFromIndex('files', 'by-user', userId));
  }

  getAllFiles(): Observable<File[]> {
    return from(this.db!.getAll('files'));
  }
} 