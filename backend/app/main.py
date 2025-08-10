from fastapi import FastAPI
from app.database import engine
from app import models
from .routers import events, bookings, users
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()

models.Base.metadata.create_all(bind=engine)
app.include_router(events.router)
app.include_router(bookings.router)
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "Houzeful API is running"}

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Houzeful API",
        version="1.0.0",
        description="API for booking system",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method.setdefault("security", []).append({"BearerAuth": []})
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

