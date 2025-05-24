import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST') ?? '';
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT') ?? 0;
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER') ?? '';
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD') ?? '';
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME') ?? '';
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE') ?? false;
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') ?? '';
  }
}
