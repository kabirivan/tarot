import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;

/** Cliente Redis compartido (singleton). Usa REDIS_URL en .env.local */
export async function getRedis(): Promise<RedisClientType> {
  const url = process.env.REDIS_URL;
  if (!url) {
    throw new Error("REDIS_URL no está definida. Añádela en .env.local para usar el contador.");
  }
  if (client?.isOpen) {
    return client;
  }
  client = createClient({ url });
  client.on("error", (err) => console.error("[Redis]", err.message));
  await client.connect();
  return client;
}
