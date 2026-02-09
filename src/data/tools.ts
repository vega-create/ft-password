export interface Tool {
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'generate', name: 'Password Generation', icon: '🔑' },
  { id: 'check', name: 'Security Check', icon: '🛡️' },
  { id: 'hash', name: 'Hashing & Encoding', icon: '🔐' },
  { id: 'utility', name: 'Utilities', icon: '🧰' },
];

export const tools: Tool[] = [
  { name: 'Password Generator', slug: 'password-generator', description: 'Generate strong, random passwords with custom length and character options.', icon: '🔑', category: 'generate' },
  { name: 'Passphrase Generator', slug: 'passphrase-generator', description: 'Create memorable passphrases using random words that are easy to remember.', icon: '💬', category: 'generate' },
  { name: 'PIN Generator', slug: 'pin-generator', description: 'Generate random numeric PINs of any length for accounts and devices.', icon: '🔢', category: 'generate' },
  { name: 'Bulk Password Generator', slug: 'bulk-password', description: 'Generate multiple passwords at once for teams or multiple accounts.', icon: '📋', category: 'generate' },
  { name: 'Password Strength Checker', slug: 'strength-checker', description: 'Check how strong your password is and get improvement suggestions.', icon: '💪', category: 'check' },
  { name: 'Username Generator', slug: 'username-generator', description: 'Generate unique, available usernames for your online accounts.', icon: '👤', category: 'check' },
  { name: 'MD5 Hash Generator', slug: 'md5-hash', description: 'Generate MD5 hash values from any text string.', icon: '🔒', category: 'hash' },
  { name: 'SHA-256 Hash Generator', slug: 'sha256-hash', description: 'Generate SHA-256 hash values for secure data verification.', icon: '🔏', category: 'hash' },
  { name: 'Bcrypt Hash Generator', slug: 'bcrypt-hash', description: 'Generate bcrypt password hashes with adjustable cost factor.', icon: '⚙️', category: 'hash' },
  { name: 'UUID Generator', slug: 'uuid-generator', description: 'Generate random UUIDs (v4) for databases, APIs, and unique identifiers.', icon: '🆔', category: 'utility' },
  { name: 'Secret Key Generator', slug: 'secret-key', description: 'Generate cryptographic secret keys for APIs, JWT tokens, and encryption.', icon: '🗝️', category: 'utility' },
  { name: 'TOTP Code Viewer', slug: 'totp-viewer', description: 'View time-based one-time passwords from a TOTP secret key.', icon: '⏱️', category: 'utility' },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(t => t.category === categoryId);
}
