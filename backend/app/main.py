# from fastapi import FastAPI
# from app.database import engine
# from app import models
# from .routers import events, bookings, users
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.openapi.utils import get_openapi
# from fastapi.security import OAuth2PasswordBearer

# app = FastAPI()

# models.Base.metadata.create_all(bind=engine)
# app.include_router(events.router)
# app.include_router(bookings.router)
# app.include_router(users.router)

# @app.get("/")
# def root():
#     return {"message": "Houzeful API is running"}

# def custom_openapi():
#     if app.openapi_schema:
#         return app.openapi_schema
#     openapi_schema = get_openapi(
#         title="Houzeful API",
#         version="1.0.0",
#         description="API for booking system",
#         routes=app.routes,
#     )
#     openapi_schema["components"]["securitySchemes"] = {
#         "BearerAuth": {
#             "type": "http",
#             "scheme": "bearer",
#             "bearerFormat": "JWT"
#         }
#     }
#     for path in openapi_schema["paths"].values():
#         for method in path.values():
#             method.setdefault("security", []).append({"BearerAuth": []})
#     app.openapi_schema = openapi_schema
#     return app.openapi_schema

# app.openapi = custom_openapi


import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app import models
from .routers import events, bookings, users

app = FastAPI(
    title="Houzeful API",
    version="1.0.0",
    description="Event booking platform API"
)

# CORS for Railway deployment
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

if ENVIRONMENT == "production":
    # Railway gives you URLs like: https://backend-production-xyz.up.railway.app
    allowed_origins = [
        "https://*.railway.app",
        "https://yourdomain.com"
    ]
else:
    allowed_origins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000"
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
models.Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(events.router, prefix="/api")
app.include_router(bookings.router, prefix="/api")
app.include_router(users.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Houzeful API is running", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "database": "sqlite"}