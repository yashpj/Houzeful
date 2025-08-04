from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/events",
    tags=["events"]
)

# GET /events
@router.get("/", response_model=List[schemas.Event])
def get_events(db: Session = Depends(get_db)):
    events = db.query(models.Event).all()
    return events

# POST /events
@router.post("/", response_model=schemas.Event)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    new_event = models.Event(**event.dict())
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event
