
from .models import Branch, Transactions
from .serializers import BranchSerializer, TransactionsSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Transactions
from .serializers import TransactionsSerializer
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Transactions
from .serializers import TransactionsSerializer
from django.shortcuts import get_object_or_404

import logging

logger = logging.getLogger(__name__)

class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer




class TransactionsViewSet(viewsets.ModelViewSet):
    queryset = Transactions.objects.all()  # Specify the queryset to use for this viewset
    serializer_class = TransactionsSerializer  # Specify the serializer for transactions
    lookup_field = 'id'
    # Optional: Customizing the 'create' method if needed
    def create(self, request, *args, **kwargs):
        # You can perform additional validation or processing before creating
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Optional: Customizing the 'update' method if needed
    def update(self, request, *args, **kwargs):
        # Handle full update of the transaction
        return super().update(request, *args, **kwargs)

    # Optional: Customizing the 'partial_update' method if needed
    def partial_update(self, request, *args, **kwargs):
        # Handle partial update of the transaction
        return super().partial_update(request, *args, **kwargs)

    # Optional: Customizing the 'destroy' method if needed
    def destroy(self, request, *args, **kwargs):
        logger.info(f"Attempting to delete transaction with id: {kwargs['id']}")
        return super().destroy(request, *args, **kwargs)