from django.contrib import admin
from .models import Branch, Transactions

class BranchAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'manager']
    search_fields = ['name', 'location']
    list_filter = ['manager']

class TransactionsAdmin(admin.ModelAdmin):
    list_display = ['branch', 'sender', 'receiver', 'amount', 'fee', 'amount_pay']
    search_fields = ['sender', 'receiver']
    list_filter = ['branch']

admin.site.register(Branch, BranchAdmin)
admin.site.register(Transactions, TransactionsAdmin)
