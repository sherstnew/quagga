from passlib.context import CryptContext

SECRET_KEY = "3c9e0c73d91fadb89bba4bbf12772221ecb11ce9b35e9f78f480499eaf5290f1"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")