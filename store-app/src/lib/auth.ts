export type ContactType = 'phone' | 'email';

export interface User {
  id: string;
  phone: string;
  email: string;
  contactType: ContactType;
  password: string;
  name: string;
  createdAt: number;
}

const USERS_KEY = 'rakan_users';
const SESSION_KEY = 'rakan_session';

function hash(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return 'h_' + Math.abs(h).toString(36);
}

export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(USERS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function register(contactType: ContactType, contact: string, password: string, name: string): { ok: boolean; error?: string } {
  const users = getUsers();

  if (contactType === 'phone') {
    if (users.some(u => u.contactType === 'phone' && u.phone === contact)) {
      return { ok: false, error: 'الرقم مسجل بالفعل' };
    }
  } else {
    if (users.some(u => u.contactType === 'email' && u.email === contact)) {
      return { ok: false, error: 'الايميل مسجل بالفعل' };
    }
  }

  if (password.length < 4) {
    return { ok: false, error: 'كلمة المرور يجب أن تكون 4 أحرف على الأقل' };
  }

  const user: User = {
    id: 'u_' + Date.now().toString(36),
    phone: contactType === 'phone' ? contact : '',
    email: contactType === 'email' ? contact : '',
    contactType,
    password: hash(password),
    name,
    createdAt: Date.now(),
  };
  users.push(user);
  saveUsers(users);
  return { ok: true };
}

export function login(contactType: ContactType, contact: string, password: string): { ok: boolean; error?: string; user?: User } {
  const users = getUsers();
  const user = users.find(u => u.contactType === contactType && (contactType === 'phone' ? u.phone === contact : u.email === contact));
  if (!user) return { ok: false, error: contactType === 'phone' ? 'الرقم غير مسجل' : 'الايميل غير مسجل' };
  if (user.password !== hash(password)) return { ok: false, error: 'كلمة المرور غير صحيحة' };
  const session = {
    id: user.id,
    phone: user.phone,
    email: user.email,
    contactType: user.contactType,
    name: user.name,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true, user };
}

export type UserSession = { id: string; phone: string; email: string; contactType: ContactType; name: string };

export function getSession(): UserSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
