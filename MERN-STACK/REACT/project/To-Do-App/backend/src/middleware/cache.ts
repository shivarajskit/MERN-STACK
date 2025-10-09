import { createClient } from 'redis';
import type { Request, Response, NextFunction } from 'express';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('❌ Redis Client Error:', err));

(async () => {
  if (!redisClient.isOpen) await redisClient.connect();
})();

export const cache = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id || 'public';
    const cacheKey = `tasks:${userId}`;

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('✅ Cache Hit');
      return res.json(JSON.parse(cachedData));
    }

    console.log('🚀 Cache Miss');
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      redisClient.setEx(cacheKey, 60, JSON.stringify(data)); // Cache for 60s
      return originalJson(data);
    };

    next();
  } catch (err) {
    console.error('Cache Middleware Error:', err);
    next();
  }
};
