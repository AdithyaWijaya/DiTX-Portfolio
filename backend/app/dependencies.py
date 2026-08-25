from fastapi import Header, HTTPException
import secrets
from app.config import ADMIN_API_KEY, ADMIN_USERNAME, ADMIN_PASSWORD

def verify_admin_key(x_api_key: str = Header(...)):
    if ADMIN_API_KEY is None or not secrets.compare_digest(x_api_key, ADMIN_API_KEY):
        raise HTTPException(
            status_code=401,
            detail="Invalid API Key"
        )

def verify_admin_credentials(username: str, password: str) -> bool:
    if ADMIN_USERNAME is None or ADMIN_PASSWORD is None or ADMIN_API_KEY is None:
        return False

    username_ok = secrets.compare_digest(username, ADMIN_USERNAME)
    password_ok = secrets.compare_digest(password, ADMIN_PASSWORD)

    return username_ok and password_ok