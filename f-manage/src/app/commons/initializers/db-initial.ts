import { User, File } from '../../services/indexed-db.service';

export const initialUsers: Omit<User, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    email: ['admin@fmanage.com'],
    password: 'admin123', // In production, this should be hashed
    name: 'Admin User',
    role: 'admin',
    date_of_birth: '1990-01-01',
    gender: 'male',
    address: ['123 Admin St, Admin City'],
    contact: ['123-456-7890'],
  },
  {
    email: ['user@fmanage.com'],
    password: 'user123', // In production, this should be hashed
    name: 'Regular User',
    role: 'user',
    date_of_birth: '1995-05-15',
    gender: 'female',
    address: ['456 User Ave, User Town'],
    contact: ['987-654-3210'],
  }
];

export const initialFiles: Omit<File, 'id' | 'created_on' | 'updated_on'>[] = [
  {
    name: 'Project Requirements.pdf',
    type: 'pdf',
    size: '2.5MB',
    url: '/assets/files/requirements.pdf',
    user_id: '1' // Admin's file
  },
  {
    name: 'User Guide.docx',
    type: 'docx',
    size: '1.8MB',
    url: '/assets/files/guide.docx',
    user_id: '1' // Admin's file
  },
  {
    name: 'Sample Image.jpg',
    type: 'jpg',
    size: '3.2MB',
    url: '/assets/files/sample.jpg',
    user_id: '2' // Regular user's file
  },
  {
    name: 'Meeting Notes.txt',
    type: 'txt',
    size: '0.5MB',
    url: '/assets/files/notes.txt',
    user_id: '2' // Regular user's file
  },
  {
    name: 'Project Timeline.xlsx',
    type: 'xlsx',
    size: '1.2MB',
    url: '/assets/files/timeline.xlsx',
    user_id: '1' // Admin's file
  }
];

// Function to initialize database with sample data
export async function initializeDatabase(dbService: any) {
  try {
    // Check if users exist
    const existingUsers = await dbService.getAllUsers().toPromise();
    if (!existingUsers || existingUsers.length === 0) {
      // Add initial users
      for (const user of initialUsers) {
        await dbService.addUser(user).toPromise();
      }
      console.log('Initial users added successfully');
    }

    // Check if files exist
    const existingFiles = await dbService.getAllFiles().toPromise();
    if (!existingFiles || existingFiles.length === 0) {
      // Add initial files
      for (const file of initialFiles) {
        await dbService.addFile(file).toPromise();
      }
      console.log('Initial files added successfully');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
} 