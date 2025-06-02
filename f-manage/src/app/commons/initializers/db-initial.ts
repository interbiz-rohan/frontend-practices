import { IndexedDBService, User, File } from '../../services/indexed-db.service';
import { Observable, from, forkJoin } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';

export const initialUsers: Omit<User, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    email: ['admin@fmanage.com'],
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
    date_of_birth: '1990-01-01',
    gender: 'male',
    address: ['123 Admin St'],
    contact: ['1234567890']
  },
  {
    email: ['user@fmanage.com'],
    password: 'user123',
    name: 'Regular User',
    role: 'user' as const,
    date_of_birth: '1995-05-15',
    gender: 'female',
    address: ['456 User Ave'],
    contact: ['9876543210']
  }
];

export const initialFiles: Omit<File, 'id' | 'created_on' | 'updated_on'>[] = [
  {
    name: 'Document A',
    type: 'pdf',
    size: '2MB',
    url: '/assets/files/doc-a.pdf',
    user_id: '1'
  },
  {
    name: 'Document B',
    type: 'docx',
    size: '1.5MB',
    url: '/assets/files/doc-b.docx',
    user_id: '1'
  },
  {
    name: 'Image 1',
    type: 'jpg',
    size: '1MB',
    url: '/assets/files/img1.jpg',
    user_id: '2'
  },
  {
    name: 'Text File',
    type: 'txt',
    size: '0.5MB',
    url: '/assets/files/notes.txt',
    user_id: '2'
  }
];

export function initializeDatabase(dbService: IndexedDBService): Observable<void> {
  return dbService.getAllUsers().pipe(
    switchMap(existingUsers => {
    if (!existingUsers || existingUsers.length === 0) {
        return forkJoin(initialUsers.map(user => dbService.addUser(user))).pipe(
          tap(() => console.log('Initial users added successfully'))
        );
    }
      return from(Promise.resolve());
    }),
    switchMap(() => dbService.getAllFiles()),
    switchMap(existingFiles => {
    if (!existingFiles || existingFiles.length === 0) {
        return forkJoin(initialFiles.map(file => dbService.addFile(file))).pipe(
          tap(() => console.log('Initial files added successfully'))
        );
    }
      return from(Promise.resolve());
    }),
    map(() => void 0),
    catchError(error => {
    console.error('Error initializing database:', error);
      return from(Promise.resolve());
    })
  );
} 