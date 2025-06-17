from upstash_redis import Redis
from dotenv import load_dotenv
import os

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL")
REDIS_TOKEN = os.getenv("REDIS_TOKEN")
DEFAULT_CREDITS = 10
TTL_SECONDS = 12 * 60 * 60  # 12 hours

# Connect to your Upstash Redis instance
redis = Redis(
  url=REDIS_URL, # type: ignore
  token=REDIS_TOKEN # type: ignore
)

def track_credits(user_id: str) -> bool:
  key = f"user:{user_id}:credits"
  current = redis.get(key)
  print(f"track_credits : {user_id} | {current}")

  if current is None:
    # New user or expired TTL — initialize with TTL
    redis.set(key, DEFAULT_CREDITS - 1, ex=TTL_SECONDS)
    return True

  if int(current) <= 0:
    return False

  redis.decr(key)
  return True

def get_user_credits(user_id: str) -> int:
  key = f"user:{user_id}:credits"
  value = redis.get(key)
  print(f"get_user_credits :{user_id} | {value}")
  return int(value) if value is not None else DEFAULT_CREDITS

def reset_user_credits(user_id: str):
  redis.set(f"user:{user_id}:credits", DEFAULT_CREDITS, ex=TTL_SECONDS)




