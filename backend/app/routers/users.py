# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from typing import List
# from .. import models, schemas
# from ..database import get_db

# router = APIRouter(
#     prefix="/users",
#     tags=["users"]
# )

# @router.post("/", response_model= schemas.User)
# def create_user(user: schemas.User, db: Session = Depends(get_db)):
#     new_user = models.User(**user.dict())
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return new_user



from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.auth import hash_password, verify_password, create_access_token
from app.models import User
from app import schemas
from app.database import get_db

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # db_user = db.query(User).filter(User.email == user.email).first()
    # if db_user:
    #     raise HTTPException(status_code=400, detail="Email already registered")
    # hashed_pw = hash_password(user.password)
    # new_user = User(name=user.name, email=user.email, hashed_password=hashed_pw)
    # db.add(new_user)
    # db.commit()
    # db.refresh(new_user)
    # return new_user
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = hash_password(user.password)
    new_user = User(name=user.name, email=user.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=schemas.Token)
def login(user: schemas.Login, db: Session = Depends(get_db)):
    # db_user = db.query(User).filter(User.email == user.email).first()
    # if not db_user or not verify_password(user.password, db_user.hashed_password):
    #     raise HTTPException(status_code=401, detail="Invalid credentials")
    # token = create_access_token(data={"sub": str(db_user.id)})
    # return {"access_token": token, "token_type": "bearer"}
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    # No need to specify expires_delta as it's now handled in the function
    token = create_access_token(data={"sub": str(db_user.id)})
    return {"access_token": token, "token_type": "bearer"}

