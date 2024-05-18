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

const deleteAllCache = async () => {
  await redisClient.flushAll();
};

export { getOrSetCache, deleteAllCache, setCache, deleteCache, getCache };
