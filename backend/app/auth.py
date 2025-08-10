# from datetime import datetime, timedelta
# from jose import JWTError, jwt
# from passlib.context import CryptContext
# from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from sqlalchemy.orm import Session
# from app import models
# from .database import get_db
# import bcrypt

# SECRET_KEY = "yash"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

# # pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")  # or /users/login

# # Hashing
# # def hash_password(password: str):
# #     return pwd_context.hash(password)

# # def verify_password(plain, hashed):
# #     return pwd_context.verify(plain, hashed)

# def hash_password(password: str):
#     # Encode the password to bytes before hashing
#     encoded_password = password.encode('utf-8')
#     # Generate a salt and hash the password
#     salt = bcrypt.gensalt()
#     hashed = bcrypt.hashpw(encoded_password, salt)
#     return hashed.decode('utf-8')

# def verify_password(plain_password: str, hashed_password: str):
#     # Encode both passwords to bytes before comparison
#     encoded_plain = plain_password.encode('utf-8')
#     encoded_hashed = hashed_password.encode('utf-8')
#     return bcrypt.checkpw(encoded_plain, encoded_hashed)


# # JWT creation
# def create_access_token(data: dict, expires_delta: timedelta = None):
#     # to_encode = data.copy()
#     # expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
#     # to_encode.update({"exp": expire})
#     # return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     print("Key used for encoding:", SECRET_KEY) # <-- Add this line
#     to_encode = data.copy()
#     # Use the constant for expiration
#     expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# # JWT validation (used in protected routes)
# def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
#     credentials_exception = HTTPException(
#         status_code=401,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     print("Key used for encoding:", SECRET_KEY) # <-- Add this line
#     try:
#         print(token)
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         print(payload)
#         user_id_str: str = payload.get("sub")
#         if user_id_str is None:
#             raise credentials_exception
#         user_id = int(user_id_str) # Explicitly cast to integer
#         print(payload)
#     except (JWTError, ValueError): # Catch ValueError in case the cast fails
#         # print(token)
#         raise credentials_exception

#     user = db.query(models.User).filter(models.User.id == user_id).first()
#     if user is None:
#         raise credentials_exception
#     return user


from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app import models
from .database import get_db
import bcrypt

SECRET_KEY = "yash"  # Consider using a more secure secret key in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Fix the tokenUrl to match your actual login endpoint
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

def hash_password(password: str):
    # Encode the password to bytes before hashing
    encoded_password = password.encode('utf-8')
    # Generate a salt and hash the password
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(encoded_password, salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str):
    # Encode both passwords to bytes before comparison
    encoded_plain = plain_password.encode('utf-8')
    encoded_hashed = hashed_password.encode('utf-8')
    return bcrypt.checkpw(encoded_plain, encoded_hashed)

# JWT creation
def create_access_token(data: dict, expires_delta: timedelta = None):
    print("Key used for encoding:", SECRET_KEY)
    to_encode = data.copy()
    # Use the constant for expiration
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# JWT validation (used in protected routes)
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    print("Key used for decoding:", SECRET_KEY)
    try:
        print("Token received:", token)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("Decoded payload:", payload)
        user_id_str: str = payload.get("sub")
        if user_id_str is None:
            print("No 'sub' field in payload")
            raise credentials_exception
        user_id = int(user_id_str)
        print("User ID:", user_id)
    except (JWTError, ValueError) as e:
        print(f"JWT Error: {e}")
        raise credentials_exception

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        print("User not found in database")
        raise credentials_exception
    print(f"User found: {user.email}")
    return user