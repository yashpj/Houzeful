# from datetime import datetime
# from pydantic import BaseModel
# from typing import List, Optional

# ###############################################
# # Shared properties
# # class UserCreate(BaseModel):
# #     email: str
# #     password: str

# # class User(BaseModel):
# #     id: int
# #     email: str

# #     class Config:
# #         orm_mode = True

# class UserCreate(BaseModel):
#     name: str
#     email: str
#     password: str

# class User(BaseModel):
#     id: int
#     name: str
#     email: str

#     class Config:
#         orm_mode = True

# # class Token(BaseModel):
# #     access_token: str
# #     token_type: str

# ###############################################
# class EventBase(BaseModel):
#     title: str
#     description: Optional[str] = None
#     genre: Optional[str] = None
#     location: str
#     date: datetime
#     language: Optional[str] = None

# class EventCreate(EventBase):
#     pass

# class Event(EventBase):
#     id: int
#     created_at: datetime

#     class Config:
#         orm_mode = True

# # ###############################################
# # class BookingBase(BaseModel):
# #     # event_id: int
# #     number_of_tickets: int = 1

# # class BookingCreate(BookingBase):
# #     event_id: int

# # class Booking(BookingBase):
# #     id: int
# #     user_id: int
# #     booked_on: datetime

# #     class Config:
# #         orm_mode = True


# ##########################################

# # In app/schemas.py
# from datetime import datetime

# # Booking create request
# class BookingCreate(BaseModel):
#     user_id: int
#     event_id: int
#     # seats: int

# # Booking response
# class Booking(BaseModel):
#     id: int
#     user_id: int
#     event_id: int
#     # seats: int
#     # booking_time: datetime

#     class Config:
#         orm_mode = True

# ###########################################

# # For login input
# class TokenData(BaseModel):
#     email: str | None = None

# class Token(BaseModel):
#     access_token: str
#     token_type: str

# class Login(BaseModel):
#     email: str
#     password: str


from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class User(BaseModel):
    id: int
    name: str
    email: str

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

##########################################
# Booking schemas - Fixed to not require user_id since it comes from auth
class BookingCreate(BaseModel):
    event_id: int
    number_of_tickets: Optional[int] = 1

# Booking response
class Booking(BaseModel):
    id: int
    user_id: int
    event_id: int
    number_of_tickets: int

    class Config:
        orm_mode = True

###########################################
# For login input
class TokenData(BaseModel):
    email: str | None = None

class Token(BaseModel):
    access_token: str
    token_type: str

class Login(BaseModel):
    email: str
    password: str
