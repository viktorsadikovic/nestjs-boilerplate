import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums';

export const ROLES_KEY = 'roles';
export const HasRole = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
