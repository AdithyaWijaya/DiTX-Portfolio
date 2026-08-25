from fastapi import APIRouter, Depends, HTTPException, Query, Request
from app.dependencies import verify_admin_credentials
from app.schemas import (AdminLoginRequest, AdminLoginResponse)
from app.limiter import limiter
from app.config import ADMIN_API_KEY

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)

@router.post("/login", response_model=AdminLoginResponse)
@limiter.limit("5/minute")
async def login(request: Request, data: AdminLoginRequest):
    if not verify_admin_credentials(data.username, data.password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password."
        )

    return AdminLoginResponse(api_key=ADMIN_API_KEY, username=data.username)