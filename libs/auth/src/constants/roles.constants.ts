export const AUTH_ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  SELLER: 'seller',
  SUPPORT: 'support',
} as const;

export type AuthRole = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];
