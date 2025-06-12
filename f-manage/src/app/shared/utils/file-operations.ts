import { IndexedDBService, File } from '../../services/indexed-db.service';
import { Observable, from, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface FilePayload {
  name: string;
  type: string;
  size: string;
  url?: string;
  data?: Blob;
  user_id: string;
  overview: string;
}

export async function readFileFromAssets(path: string): Promise<Blob> {
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

export function saveFile(dbService: IndexedDBService, filePayload: FilePayload | FilePayload[]): Observable<File | File[]> {
  if (Array.isArray(filePayload)) {
    const fileOperations = filePayload.map(payload => 
      dbService.addFile({
        ...payload,
        url: payload.url || '',
        data: payload.data
      })
    );
    return forkJoin(fileOperations);
  }

  return dbService.addFile({
    ...filePayload,
    url: filePayload.url || '',
    data: filePayload.data
  });
} 