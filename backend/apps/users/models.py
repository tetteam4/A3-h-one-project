from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(
            email=email, first_name=first_name, last_name=last_name, **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, email, first_name, last_name, password=None, **extra_fields
    ):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_superadmin", True)

        return self.create_user(email, first_name, last_name, password, **extra_fields)


from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class PermissionMixin:
    def has_perm(self, perm, obj=None):
        # Custom permission logic based on role
        if self.is_superadmin:
            return True  # Superadmins have all permissions
        if self.role == User.Admin:
            return perm in ["admin_perm1", "admin_perm2"]  # Example admin permissions
        if self.role == User.Branch_admin:
            return perm in ["branch_admin_perm1", "branch_admin_perm2"]  # Example branch admin permissions
        return False  # Default for other roles

    def has_module_perms(self, app_label):
        # Custom logic for module permissions
        return self.is_superadmin or self.is_staff

class User(AbstractBaseUser, PermissionMixin):
    Admin = 0
    Branch_admin = 1
    agent = 2

    ROLE_CHOICES = (
        (Admin, "Admin"),
        (Branch_admin, "Branch admin"),
        (agent, "Agent"),
    )

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=13, blank=True, null=True)
    otp = models.CharField(max_length=8, blank=True, null=True)
    refresh_token = models.CharField(max_length=1000, blank=True, null=True)
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=True, null=True)

    branch = models.ForeignKey(
        "core.Branch", on_delete=models.PROTECT, null=True, blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superadmin = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = UserManager()

    def __str__(self) -> str:
        return self.email
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    profile_pic = models.ImageField(
        upload_to="user/profile_picture",
        blank=True,
        null=True,
    )
    address = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:

        if self.user:
            return f"{self.user.email}"
        else:
            return "No user associated"
