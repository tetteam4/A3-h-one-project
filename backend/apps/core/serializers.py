
import random
from rest_framework import serializers
from .models import Branch, Customer, Transactions
from django.contrib.auth import get_user_model

User = get_user_model()

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['id', 'name', 'location', 'manager']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'father_name', "phone_number", 'id_card', 'biometric']

class TransactionsSerializer(serializers.ModelSerializer):
    branch_method = serializers.SerializerMethodField()
    
    sender = CustomerSerializer(read_only=True)
    receiver = CustomerSerializer(read_only=True)

    amount = serializers.DecimalField(max_digits=12, decimal_places=2)
    fee = serializers.DecimalField(max_digits=12, decimal_places=2)
    amount_pay = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)  

    status = serializers.ChoiceField(choices=Transactions.STATUS_CHOICES)

    secret_key = serializers.IntegerField(read_only=True)  
    sender = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    receiver = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())

    class Meta:
        model = Transactions
        fields = ['id', 'branch', 'branch_method', 'sender', 'receiver', 'amount', 'fee', 'amount_pay', 'status', "secret_key", 'created_at', 'updated_at']

    def get_branch_method(self, obj):
        return obj.branch.name if obj.branch else None

    def validate(self, data):
        """
        Automatically calculate 'amount_pay' before saving.
        """
        if 'amount' in data and 'fee' in data:
            data['amount_pay'] = data['amount'] - data['fee']
        
        return data

    def create(self, validated_data):
        """
        Ensure secret_key is generated and amount_pay is calculated correctly before saving.
        """
        if 'secret_key' not in validated_data:
            validated_data['secret_key'] = random.randint(10000, 99999)

        if 'amount' in validated_data and 'fee' in validated_data:
            validated_data['amount_pay'] = validated_data['amount'] - validated_data['fee']
        
        transaction = super().create(validated_data)
        return transaction

    def update(self, instance, validated_data):
        """
        Override update method to ensure amount_pay is calculated correctly on updates.
        """
        if 'amount' in validated_data and 'fee' in validated_data:
            validated_data['amount_pay'] = validated_data['amount'] - validated_data['fee']
        
        return super().update(instance, validated_data)