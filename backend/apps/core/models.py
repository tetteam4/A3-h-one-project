import random

from django.contrib.auth import get_user_model
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from apps.common.models import TimeStampedUUIDModel


class Branch(models.Model):
    User = get_user_model()
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=300)
    manager = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="managers",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}: {self.location}"


class Customer(models.Model):
    name = models.CharField(max_length=255)
    father_name = models.CharField(max_length=255)
    id_card = models.PositiveSmallIntegerField()
    biometric = models.BooleanField(default=True)
    phone_number = models.IntegerField(blank=True, null=True, max_length=14)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} {self.father_name}"


class Transactions(models.Model):
    User = get_user_model()
    STATUS_CHOICES = (
        ("Complete", "Complete"),
        ("pending", "Pending"),
        ("Cancel", "Cancel"),
    )
    current_branch = models.ForeignKey(
        Branch, on_delete=models.CASCADE, related_name="current_brach"
    )
    to_branch = models.ForeignKey(
        Branch, on_delete=models.CASCADE, related_name="to_brach"
    )
    sender = models.ForeignKey(
        Customer, on_delete=models.PROTECT, related_name="sent_transactions"
    )
    receiver = models.ForeignKey(
        Customer, on_delete=models.PROTECT, related_name="received_transactions"
    )
    agent = models.ForeignKey(User, on_delete=models.CASCADE)
    secret_key = models.PositiveIntegerField(unique=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2, default="0.00")
    fee = models.DecimalField(max_digits=12, decimal_places=2, default="0.00")
    amount_pay = models.DecimalField(max_digits=12, decimal_places=2, default="0.00")
    status = models.CharField(
        max_length=255, choices=STATUS_CHOICES, blank=True, null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):

        if self.secret_key is None:
            self.secret_key = random.randint(100000, 999999)

        self.amount_pay = self.amount - self.fee

        super(Transactions, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.sender} to {self.receiver}"
