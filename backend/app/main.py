from fastapi import FastAPI
from app.database import engine
from app import models
from .routers import events

app = FastAPI()

models.Base.metadata.create_all(bind=engine)
app.include_router(events.router)

@app.get("/")
def root():
    return {"message": "Houzeful API is running"}

