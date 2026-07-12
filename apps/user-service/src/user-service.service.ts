import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { userAddresses, users } from './db/schema';
import { DRIZZLE_DB } from '@app/database';
import type { UserDatabase } from './db';

@Injectable()
export class UserServiceService {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly db: UserDatabase,
  ) {}

  async createUserProfile(data: {
    keycloakUserId: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) {
    const [existingUser] = await this.db
      .select()
      .from(users)
      .where(eq(users.keycloakUserId, data.keycloakUserId));
    if (existingUser) {
      throw new ConflictException('User profile already exists');
    }

    const [user] = await this.db
      .insert(users)
      .values({
        keycloakUserId: data.keycloakUserId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      })
      .returning();

    return user;
  }

  async findUserById(id: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(and(eq(users.id, id), eq(users.isActive, true)));
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findUserByKeycloakId(keycloakUserId: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(
        and(eq(users.keycloakUserId, keycloakUserId), eq(users.isActive, true)),
      );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUserProfile(data: {
    id: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) {
    await this.findUserById(data.id);
    const [user] = await this.db
      .update(users)
      .set({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        updatedAt: new Date(),
      })
      .where(eq(users.id, data.id))
      .returning();

    return user;
  }

  async addUserAddress(data: {
    userId: string;
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    isDefault?: boolean;
  }) {
    await this.findUserById(data.userId);

    if (data.isDefault) {
      await this.db
        .update(userAddresses)
        .set({
          isDefault: false,
          updatedAt: new Date(),
        })
        .where(eq(userAddresses.userId, data.userId));
    }

    const [address] = await this.db
      .insert(userAddresses)
      .values({
        ...data,
        isDefault: data.isDefault ?? false,
      })

      .returning();

    return address;
  }

  async findUserAddresses(userId: string) {
    await this.findUserById(userId);
    return this.db
      .select()
      .from(userAddresses)
      .where(
        and(eq(userAddresses.userId, userId), eq(userAddresses.isActive, true)),
      );
  }

  async setDefaultAddress(data: { userId: string; addressId: string }) {
    await this.findUserById(data.userId);

    const [address] = await this.db
      .select()
      .from(userAddresses)
      .where(
        and(
          eq(userAddresses.id, data.addressId),
          eq(userAddresses.userId, data.userId),
          eq(userAddresses.isActive, true),
        ),
      );

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    await this.db
      .update(userAddresses)
      .set({
        isDefault: false,
        updatedAt: new Date(),
      })
      .where(eq(userAddresses.userId, data.userId));

    const [updatedAddress] = await this.db
      .update(userAddresses)
      .set({
        isDefault: true,
        updatedAt: new Date(),
      })
      .where(eq(userAddresses.id, data.addressId))
      .returning();

    return updatedAddress;
  }
}
