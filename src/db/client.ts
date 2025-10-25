import { createClient } from '@libsql/client';
import { PrismaClient } from '@prisma/client';
import { env } from '@env/env';
import { logger } from '@utils/logger';

const isProd = env.ENV === 'production';

const libsql = createClient({
  url: env.DATABASE_URL!,
  authToken: env.DATABASE_ACCESS_TOKEN!,
});

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL!,
    },
  },
});

logger.info(`Connected to ${isProd ? 'BunnyDB (libSQL)' : 'local SQLite'}`);

export { prisma, libsql };
