export type FileCategory = 'All' | 'Video' | 'Image' | 'Doc';

export const FILE_CATEGORIES: FileCategory[] = ['All', 'Video', 'Image', 'Doc'];

// Video formats
const VIDEO_EXTENSIONS = [
  'mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm',
  'm4v', 'mpg', 'mpeg', '3gp', 'mts', 'm2ts', 'ts',
  'vob', 'ogv', 'mxf', 'asf', 'rm', 'rmvb', 'swf'
];

// Image formats
const IMAGE_EXTENSIONS = [
  'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg',
  'tiff', 'tif', 'ico', 'psd', 'ai', 'eps', 'raw',
  'cr2', 'nef', 'arw', 'heic', 'heif', 'indd', 'ind'
];

// Document formats
const DOC_EXTENSIONS = [
  'pdf', 'doc', 'docx', 'txt', 'rtf', 'odt',
  'xls', 'xlsx', 'csv', 'ods', 'xlsm', 'xlsb',
  'ppt', 'pptx', 'odp', 'pps', 'ppsx',
  'md', 'tex', 'epub', 'mobi', 'azw3', 'fb2',
  'odt', 'ods', 'odp', 'odg', 'odf',
  'dot', 'dotx', 'xlt', 'xltx', 'pot', 'potx'
];

// MIME Types mapping
export const MIME_TYPES: { [key: string]: string } = {
  // Documents
  'pdf': 'application/pdf',
  'doc': 'application/msword',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'dot': 'application/msword',
  'dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
  'xls': 'application/vnd.ms-excel',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'xlsm': 'application/vnd.ms-excel.sheet.macroEnabled.12',
  'xlsb': 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
  'xlt': 'application/vnd.ms-excel',
  'xltx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
  'ppt': 'application/vnd.ms-powerpoint',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'pps': 'application/vnd.ms-powerpoint',
  'ppsx': 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
  'pot': 'application/vnd.ms-powerpoint',
  'potx': 'application/vnd.openxmlformats-officedocument.presentationml.template',
  'txt': 'text/plain',
  'rtf': 'application/rtf',
  'csv': 'text/csv',
  'md': 'text/markdown',
  'tex': 'application/x-tex',
  'epub': 'application/epub+zip',
  'mobi': 'application/x-mobipocket-ebook',
  'azw3': 'application/vnd.amazon.ebook',
  'fb2': 'application/x-fictionbook+xml',
  
  // OpenDocument formats
  'odt': 'application/vnd.oasis.opendocument.text',
  'ods': 'application/vnd.oasis.opendocument.spreadsheet',
  'odp': 'application/vnd.oasis.opendocument.presentation',
  'odg': 'application/vnd.oasis.opendocument.graphics',
  'odf': 'application/vnd.oasis.opendocument.formula',
  
  // Images
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  'bmp': 'image/bmp',
  'webp': 'image/webp',
  'svg': 'image/svg+xml',
  'tiff': 'image/tiff',
  'tif': 'image/tiff',
  'ico': 'image/x-icon',
  'psd': 'image/vnd.adobe.photoshop',
  'ai': 'application/postscript',
  'eps': 'application/postscript',
  'raw': 'image/x-raw',
  'cr2': 'image/x-canon-cr2',
  'nef': 'image/x-nikon-nef',
  'arw': 'image/x-sony-arw',
  'heic': 'image/heic',
  'heif': 'image/heif',
  'indd': 'application/x-indesign',
  'ind': 'application/x-indesign',
  
  // Videos
  'mp4': 'video/mp4',
  'avi': 'video/x-msvideo',
  'mov': 'video/quicktime',
  'wmv': 'video/x-ms-wmv',
  'flv': 'video/x-flv',
  'mkv': 'video/x-matroska',
  'webm': 'video/webm',
  'm4v': 'video/x-m4v',
  'mpg': 'video/mpeg',
  'mpeg': 'video/mpeg',
  '3gp': 'video/3gpp',
  'mts': 'video/mp2t',
  'm2ts': 'video/mp2t',
  'ts': 'video/mp2t',
  'vob': 'video/mpeg',
  'ogv': 'video/ogg',
  'mxf': 'application/mxf',
  'asf': 'video/x-ms-asf',
  'rm': 'application/vnd.rn-realmedia',
  'rmvb': 'application/vnd.rn-realmedia-vbr',
  'swf': 'application/x-shockwave-flash'
};

export function getFileCategory(fileType: string): FileCategory {
  const extension = fileType.toLowerCase();
  
  if (VIDEO_EXTENSIONS.includes(extension)) {
    return 'Video';
  }
  if (IMAGE_EXTENSIONS.includes(extension)) {
    return 'Image';
  }
  if (DOC_EXTENSIONS.includes(extension)) {
    return 'Doc';
  }
  return 'All';
}

export function filterFilesByCategory(files: any[], category: FileCategory): any[] {
  if (category === 'All') {
    return files;
  }
  
  return files.filter(file => getFileCategory(file.type) === category);
}

export function getMimeType(extension: string): string {
  return MIME_TYPES[extension.toLowerCase()] || 'application/octet-stream';
} 