# admin.py
from django.contrib import admin
from django.db import connection, models

from .models import TableField, UserTable


class TableFieldInline(admin.TabularInline):
    model = TableField
    extra = 1


class UserTableAdmin(admin.ModelAdmin):
    list_display = ("user", "table_name", "created_at")
    search_fields = ("table_name",)
    inlines = [TableFieldInline]

    def save_model(self, request, obj, form, change):
        # Save the UserTable as usual
        super().save_model(request, obj, form, change)

        # Dynamically create a table in the database for this user
        self.create_dynamic_table(obj)

    def create_dynamic_table(self, user_table):
        """
        This method will create a new table for a UserTable with the fields defined in TableField.
        It uses raw SQL to create the table dynamically.
        """
        fields = (
            user_table.fields.all()
        )  # Get all the fields associated with the UserTable
        table_name = user_table.table_name

        # Begin building the SQL query for creating the table
        sql = f"CREATE TABLE {table_name} (id SERIAL PRIMARY KEY)"

        for field in fields:
            # Add each field to the SQL statement
            field_name = field.field_name
            field_type = field.data_type

            if field_type == "CharField":
                sql += f", {field_name} VARCHAR(100)"
            elif field_type == "IntegerField":
                sql += f", {field_name} INTEGER"
            elif field_type == "DateField":
                sql += f", {field_name} DATE"

        # Execute the SQL query to create the table
        with connection.cursor() as cursor:
            cursor.execute(sql)


# Register UserTable and TableField with Django Admin
admin.site.register(UserTable, UserTableAdmin)
admin.site.register(TableField)

# # admin.py
# from django import forms
# from django.contrib import admin

# from .models import TableField, UserTable


# class TableFieldInline(admin.TabularInline):
#     model = TableField
#     extra = 1


# class UserTableAdmin(admin.ModelAdmin):
#     list_display = ("user", "table_name", "created_at")
#     search_fields = ("table_name",)
#     inlines = [TableFieldInline]


# admin.site.register(UserTable, UserTableAdmin)
# admin.site.register(TableField)
