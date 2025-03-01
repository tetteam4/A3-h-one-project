from django.db import models
from django.contrib.auth import get_user_model

class Branch(models.Model):
    User = get_user_model()
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=300)
    manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)    
    
    def __str__(self):
        return f'{self.name}: {self.location}'
    
    