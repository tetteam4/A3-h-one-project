from django.contrib import admin

from .models import Branch, Customer, Transactions


class BranchAdmin(admin.ModelAdmin):
    list_display = ["name", "location", "manager"]
    search_fields = ["name", "location"]
    list_filter = ["manager"]


class TransactionsAdmin(admin.ModelAdmin):
    list_display = ["to_branch", "sender", "receiver", "amount", "fee", "amount_pay"]
    search_fields = ["sender", "receiver"]
    list_filter = ["to_branch"]


admin.site.register(Branch, BranchAdmin)
admin.site.register(Transactions, TransactionsAdmin)


class CustomerAdmin(admin.ModelAdmin):
    # List display fields for the customer model in the admin list page
    list_display = (
        "name",
        "father_name",
        "id_card",
        "biometric",
        "phone_number",
        "created_at",
        "updated_at",
    )

    # Fields for the detail view (when editing a customer)
    fields = ("name", "father_name", "id_card", "biometric", "phone_number")

    # Search fields allow searching by the fields specified
    search_fields = ("name", "father_name", "id_card", "phone_number")

    # Filter options to filter by biometric status
    list_filter = ("biometric",)


# Register the Customer model with the custom admin
admin.site.register(Customer, CustomerAdmin)
