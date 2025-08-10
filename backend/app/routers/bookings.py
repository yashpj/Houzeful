# # app/crud.py

# from sqlalchemy.orm import Session
# from fastapi import APIRouter, Depends
# from .. import models, schemas, database
# from typing import List
# from ..database import get_db
# from ..auth import get_current_user
# from app.models import User

# router = APIRouter(prefix="/bookings", tags=["Bookings"])

# @router.get("/my", response_model=List[schemas.Booking])
# def get_bookings_by_user(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
#     return db.query(models.Booking).filter(models.Booking.user_id == current_user.id).all()

# # @router.post("/", response_model=schemas.Booking)
# # def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
# #     db_booking = models.Booking(**booking.dict())
# #     db.add(db_booking)
# #     db.commit()
# #     db.refresh(db_booking)
# #     return db_booking

# # @router.post("/", response_model=schemas.Booking)
# # def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
# #     db_booking = models.Booking(**booking.dict(), user_id=user_id)
# #     db.add(db_booking)
# #     db.commit()
# #     db.refresh(db_booking)
# #     return db_booking


# @router.post("/", response_model=schemas.Booking)
# def create_booking(
#     booking: schemas.BookingCreate, 
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     # Optional: link booking to the current user
#     booking.user_id = current_user.id
#     db_booking = models.Booking(**booking.dict())
#     db.add(db_booking)
#     db.commit()
#     db.refresh(db_booking)
#     return db_booking

# # @router.get("/my", response_model=List[schemas.Booking])
# # def get_bookings_by_user(user_id: int, db: Session = Depends(get_db)):
# #     return db.query(models.Booking).filter(models.Booking.user_id == user_id).all()

# # def get_all_bookings(db: Session):
# #     return db.query(models.Booking).all()


from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from .. import models, schemas, database
from typing import List
from ..database import get_db
from ..auth import get_current_user
from app.models import User

router = APIRouter(prefix="/bookings", tags=["Bookings"])

@router.get("/my", response_model=List[schemas.Booking])
def get_bookings_by_user(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(models.Booking).filter(models.Booking.user_id == current_user.id).all()

@router.post("/", response_model=schemas.Booking)
def create_booking(
    booking: schemas.BookingCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Link booking to the current user (override any user_id in the request)
    db_booking = models.Booking(
        user_id=current_user.id,
        event_id=booking.event_id,
        number_of_tickets=booking.number_of_tickets if hasattr(booking, 'number_of_tickets') else 1
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking
