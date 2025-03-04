from django.db import models
from django.contrib.auth import get_user_model
from apps.common.models import TimeStampedUUIDModel
from phonenumber_field.modelfields import PhoneNumberField

import random


class Branch(TimeStampedUUIDModel):
    User = get_user_model()
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=300)
    manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)    
    
    def __str__(self):
        return f'{self.name}: {self.location}'
    

class Customer(TimeStampedUUIDModel):
    name = models.CharField(max_length=255)
    father_name = models.CharField(max_length=255)
    id_card = models.PositiveSmallIntegerField(max_length=50)
    biometric = models.BooleanField(default=True)
    phone_number = PhoneNumberField(blank=True, null=True)    
    
    def __str__(self):
        return f"{self.name} {self.father_name}"


class Transactions(TimeStampedUUIDModel):
    STATUS_CHOICES = (
        ('Complete', 'Complete'),
        ('Cancel', 'Cancel'),
    )
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    sender = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name='sent_transactions')  
    receiver = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name='received_transactions')  
    secret_key = models.PositiveIntegerField(unique=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2, default="0.00")
    fee = models.DecimalField(max_digits=12, decimal_places=2, default="0.00")
    amount_pay = models.DecimalField(max_digits=12, decimal_places=2, default="0.00")
    status = models.CharField(max_length=255, choices=STATUS_CHOICES, blank=True, null=True)  

    def save(self, *args, **kwargs):
        
        if self.secret_key is None:
            self.secret_key = random.randint(100000, 999999)  
        
        self.amount_pay = self.amount - self.fee
        

        super(Transactions, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.sender} to {self.receiver}'



