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
    password: 'user12345',
    name: 'Regular User',
    role: 'user' as const,
    date_of_birth: '1995-05-15',
    gender: 'female',
    address: ['456 User Ave'],
    contact: ['9876543210']
  }
];

const FILE_PATHS = {
  docx: 'assets/file-manager.docx',
  pdf: 'assets/notification.pdf',
  jpg: 'assets/Capture.PNG',
  txt: 'assets/logos/dark-bg-logo.PNG'
};

async function readFileFromAssets(path: string): Promise<Blob> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${path}`);
    }
    return response.blob();
  } catch (error) {
    console.error(`Error reading file ${path}:`, error);
    throw error;
  }
}

// File metadata without data
const initialFileMetadata: Omit<File, 'id' | 'created_on' | 'updated_on' | 'data'>[] = [
  {
    name: 'Document of f-manage',
    type: 'docx',
    size: '2MB',
    url: FILE_PATHS.docx,
    user_id: '1',
    overview: 'This is a sample PDF document containing important information about project A.'
  },
  {
    name: 'Notification Document',
    type: 'pdf',
    size: '1.5MB',
    url: FILE_PATHS.pdf,
    user_id: '1',
    overview: 'A detailed report document with project specifications and requirements.'
  },
  {
    name: 'Header Image',
    type: 'jpg',
    size: '1MB',
    url: FILE_PATHS.jpg,
    user_id: '2',
    overview: 'Product demonstration image showing the latest features and updates.'
  },
  {
    name: 'Text File',
    type: 'txt',
    size: '0.5MB',
    url: FILE_PATHS.txt,
    user_id: '2',
    overview: 'Meeting notes and action items from the last team discussion.'
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
        const fileInitializations = initialFileMetadata.map(async (fileMetadata) => {
          try {
            const fileData = await readFileFromAssets(fileMetadata.url);
            return dbService.addFile({
              ...fileMetadata,
              url:"",
              data: fileData
            }).toPromise();
          } catch (error) {
            console.error(`Error initializing file ${fileMetadata.name}:`, error);
            return null;
          }
        });

        return forkJoin(fileInitializations).pipe(
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