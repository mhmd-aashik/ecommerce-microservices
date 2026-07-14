import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwksRsa from 'jwks-rsa';
import { AuthUser } from '../interfaces/auth-user.interface';

interface KeycloakJwtPayload {
  sub: string;
  email?: string;
  preferred_username?: string;
  realm_access?: {
    roles?: string[];
  };
  resource_access?: Record<
    string,
    {
      roles?: string[];
    }
  >;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}`,
      algorithms: ['RS256'],
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`,
      }),
    });
  }

  validate(payload: KeycloakJwtPayload): AuthUser {
    const clientId = process.env.KEYCLOAK_CLIENT_ID ?? 'ecommerce-api';
    const realmRoles = payload.realm_access?.roles ?? [];
    const clientRoles = payload.resource_access?.[clientId]?.roles ?? [];

    return {
      sub: payload.sub,
      email: payload.email,
      preferredUsername: payload.preferred_username,
      roles: [...new Set([...realmRoles, ...clientRoles])],
    };
  }
}
