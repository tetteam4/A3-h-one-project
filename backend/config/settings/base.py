import os
from datetime import timedelta
from pathlib import Path

import environ
from decouple import config

# CORS
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_NAME = "csrftoken"

env = environ.Env()
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
APP_DIR = ROOT_DIR / "apps"

SECRET_KEY = os.getenv(
    "DJANGO_SECRET_KEY",
    default="django-insecure-06%0*w^u*r^g&jg^!o2w%kz-w906e*=ok5+^h#-gss8$o7*p9m",
)

DEBUG = env.bool("DJANGO_DEBUG", default=False)

ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=["*"])

# Application definition
DJANGO_APPS = [
    # "jazzmin",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'django.contrib.sites',
    "ckeditor",
]

LOCAL_APPS = ["apps.core", "apps.common","apps.users"]

THIRD_PARTY_APPS = [
    "rest_framework",
    "django_filters",
    "django_countries",
    "drf_yasg",
    "corsheaders",
    "djcelery_email",
    "rest_framework.authtoken",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "phonenumber_field",
]

INSTALLED_APPS = DJANGO_APPS + LOCAL_APPS + THIRD_PARTY_APPS

# Middleware configuration
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

# Root URL configuration
ROOT_URLCONF = "config.urls"


WSGI_APPLICATION = "config.wsgi.application"

# Templates configuration
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"
STATIC_ROOT = ROOT_DIR / "staticfiles/"
MEDIA_URL = "/media/"
MEDIA_ROOT = ROOT_DIR / "media/"

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kabul"
USE_I18N = True
USE_TZ = True

SITE_ID = 1

# Database (this will be overridden in local.py or production.py)
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",  # Default for development
        "NAME": ROOT_DIR / "db.sqlite3",  # SQLite path
    }
}

ADMIN_URL = "supersecret/"
AUTH_USER_MODEL = "users.User"

# Ensure you allow CORS for API routes
# CORS_URLS_REGEX = "^api/.*$"

# REST Framework settings
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASS": [
        "dj_rest_auth.jwt_auth.JWTCookieAuthentication",
    ],
    "DEFAULT_PERMISSIONS_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
}
ACCOUNT_LOGIN_METHODS = {'email'}

# JWT Authentication settings
SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": (
        "Bearer",
        "JWT",
    ),
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "SIGNING_KEY": config("SIGNING_KEY"),
    "ROTATE_REFRESH_TOKENS": True,
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
}

REST_AUTH = {
    "USE_JWT": True,
    "JWT_AUTH_COOKIE": "authors-access-token",
    "JWT_AUTH_REFRESH_COOKIE": "author-refresh-token",
    # "REGISTER_SERIALIZER": "apps.users.serializers.CustomRegisterSerializer",
}
AUTHENTICATION_BACKENDS = [
    "allauth.account.auth_backends.AuthenticationBackend",
    "django.contrib.auth.backends.ModelBackend",
]

ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = "mandatory"
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 1
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_USERNAME_REQUIRED = False

# Email settings
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = config("EMAIL_HOST")
EMAIL_PORT = config("EMAIL_PORT", cast=int)
EMAIL_USE_TLS = config("EMAIL_USE_TLS", cast=bool)
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL")

# Celery settings
CELERY_BROKER_URL = os.getenv("CELERY_BROKER")
CELERY_RESULT_BACKEND = CELERY_BROKER_URL
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_RESULT_BACKEND_MAX_RETRIES = 10
CELERY_TASK_SEND_SENT_EVENT = True

if USE_TZ:
    CELERY_TIMEZONE = TIME_ZONE
