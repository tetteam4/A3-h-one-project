from django.db import models
from django.contrib.auth import get_user_model
from apps.common.models import TimeStampedUUIDModel


class Branch(TimeStampedUUIDModel):
    User = get_user_model()
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=300)
    manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)    
    
    def __str__(self):
        return f'{self.name}: {self.location}'
    



class Transactions(TimeStampedUUIDModel):
    STATUS_CHOICES = (
        ('Complete', 'Complete'),
        ('Cancel', 'Cancel'),
    )

    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    sender = models.CharField(max_length=255)
    receiver = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=12, decimal_places=2, default="0.00")
    fee = models.DecimalField(max_digits=12, decimal_places=2, default="0.00")
    amount_pay = models.DecimalField(max_digits=12, decimal_places=2, default="0.00")
    status = models.CharField(max_length=255, choices=STATUS_CHOICES, blank=True, null=True)  # You can adjust this to your requirements

    def save(self, *args, **kwargs):
        # Ensure amount_pay is always recalculated
        self.amount_pay = self.amount - self.fee
        super(Transactions, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.sender} to {self.receiver}'
