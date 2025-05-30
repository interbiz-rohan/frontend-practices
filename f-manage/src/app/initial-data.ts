// Test users data
const testUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user1234',
    name: 'Regular User',
    role: 'user'
  }
];

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(testUsers));
}

const testFiles = [
  {
    id: '1',
    name: 'Document 1.pdf',
    type: 'pdf',
    size: '2MB',
    url: '/assets/files/doc1.pdf',
    user_id: '1',
    created_on: '2024-03-20'
  },
  {
    id: '2',
    name: 'Image 1.jpg',
    type: 'jpg',
    size: '1MB',
    url: '/assets/files/img1.jpg',
    user_id: '2',
    created_on: '2024-03-21'
  }
];

if (!localStorage.getItem('files')) {
  localStorage.setItem('files', JSON.stringify(testFiles));
} 