
from rest_framework import serializers
from .models import Branch, Customer, Transactions
from django.contrib.auth import get_user_model

User = get_user_model()

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['id', 'name', 'location', 'manager']

class TransactionsSerializer(serializers.ModelSerializer):
    branch_method = serializers.SerializerMethodField()

    sender = serializers.CharField(max_length=255)
    receiver = serializers.CharField(max_length=255)
    amount = serializers.DecimalField(max_digits=12, decimal_places=2)
    fee = serializers.DecimalField(max_digits=12, decimal_places=2)
    amount_pay = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)  # Make it read-only

    status = serializers.ChoiceField(choices=Transactions.STATUS_CHOICES)

    class Meta:
        model = Transactions
        fields = ['id', 'branch', 'branch_method', 'sender', 'receiver', 'amount', 'fee', 'amount_pay', 'status', 'created_at', 'updated_at']

    def get_branch_method(self, obj):
        return obj.branch.name if obj.branch else None

    def validate(self, data):
        """
        Automatically calculate 'amount_pay' before saving.
        """
        # Calculate amount_pay if it's not already provided
        if 'amount' in data and 'fee' in data:
            data['amount_pay'] = data['amount'] - data['fee']
        return data

    def create(self, validated_data):
        """
        Override create method to ensure amount_pay is calculated correctly
        """
        transaction = super().create(validated_data)
        return transaction

    def update(self, instance, validated_data):
        """
        Override update method to ensure amount_pay is calculated correctly on updates
        """
        if 'amount' in validated_data and 'fee' in validated_data:
            validated_data['amount_pay'] = validated_data['amount'] - validated_data['fee']
        
        return super().update(instance, validated_data)
    


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'father_name', 'id_card', 'biometric']