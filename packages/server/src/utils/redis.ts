// Redis
import { redisClient } from "../db/redis";

const getOrSetCache = async (key, cb) => {
  const data = await redisClient.get(key);

  if (data !== null) {
    return JSON.parse(data);
  }
  const freshData = await cb();
  await redisClient.setEx(
    key,
    Number(process.env.REDIS_CACHE_EXP_TIME) || 24 * 3600,
    JSON.stringify(freshData)
  );
  return freshData;
};

const getCache = async (key) => {
  const data = await redisClient.get(key);

  if (data !== null) {
    return JSON.parse(data);
  }
};

const setCache = async (key, data) => {
  await redisClient.setEx(
    key,
    Number(process.env.REDIS_CACHE_EXP_TIME) || 24 * 3600,
    JSON.stringify(data)
  );
};

const deleteCache = async (key: string) => {
  await redisClient.del(key);
};

const deleteAllCacheThatIncludedGivenKey = async (
  key1: string,
  key2?: string
) => {
  let cursor = 0;
  const pattern = key2 ? `*${key1}*${key2}*` : `*${key1}*`;
  let keysToDelete: string[] = [];

  do {
    const res = await redisClient.scan(cursor, { MATCH: pattern });
    cursor = res.cursor;
    keysToDelete = keysToDelete.concat(
      res.keys.filter((key) => {
        return key2
          ? key.includes(key1) && key.includes(key2)
          : key.includes(key1);
      })
    );
  } while (cursor !== 0);

  if (keysToDelete.length > 0) {
    await Promise.all(keysToDelete.map((key) => redisClient.del(key)));
  }
};

const deleteAllCache = async () => {
  await redisClient.flushAll();
};

const handleCacheMutation = async (
  key: string,
  userId?: string,
  entityId?: string
) => {
  if (process.env.NODE_ENV !== "production") {
    await deleteAllCacheThatIncludedGivenKey(key);
  }

  if (userId) {
    await deleteAllCacheThatIncludedGivenKey(key, userId);
  }

  if (entityId) {
    await deleteAllCacheThatIncludedGivenKey(entityId);
  }
};

export {
  getOrSetCache,
  deleteAllCache,
  setCache,
  deleteCache,
  getCache,
  deleteAllCacheThatIncludedGivenKey,
  handleCacheMutation,
};
