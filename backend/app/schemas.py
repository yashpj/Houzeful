from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional

###############################################
# Shared properties
class UserBase(BaseModel):
    name: str
    email: str

# Used when creating a user (input)
class UserCreate(UserBase):
    password: str

# Response model (output)
class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

###############################################
class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    genre: Optional[str] = None
    location: str
    date: datetime
    language: Optional[str] = None

class EventCreate(EventBase):
    pass

class Event(EventBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

###############################################
class BookingBase(BaseModel):
    event_id: int
    number_of_tickets: int = 1

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int
    user_id: int
    booked_on: datetime

    class Config:
        orm_mode = True


##########################################

# In app/schemas.py
from pydantic import BaseModel
from datetime import datetime

# Booking create request
class BookingCreate(BaseModel):
    user_id: int
    event_id: int
    seats: int

# Booking response
class Booking(BaseModel):
    id: int
    user_id: int
    event_id: int
    seats: int
    booking_time: datetime

    class Config:
        orm_mode = True
