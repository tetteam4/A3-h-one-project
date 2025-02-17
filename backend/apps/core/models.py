from django.contrib.auth import get_user_model

# models.py
from django.db import models


class UserTable(models.Model):
    User = get_user_model()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    table_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Table: {self.table_name} for User: {self.user.username}"


class TableField(models.Model):
    CHAR = "CharField"
    INTEGER = "IntegerField"
    DATE = "DateField"
    BOOLEAN = "BooleanField"

    DATA_TYPES_CHOICES = [
        (CHAR, "Character Field"),
        (INTEGER, "Integer Field"),
        (DATE, "Date Field"),
        (BOOLEAN, "Boolean Field"),
    ]
    user_table = models.ForeignKey(
        UserTable, related_name="fields", on_delete=models.CASCADE
    )
    field_name = models.CharField(max_length=100)
    data_type = models.CharField(
        max_length=50,
        choices=DATA_TYPES_CHOICES,
        default=CHAR,
    )
    is_nullable = models.BooleanField(default=True)

    def __str__(self):
        return f"Field: {self.field_name} in Table: {self.user_table.table_name}"
