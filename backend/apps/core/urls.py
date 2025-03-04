


# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BranchViewSet, CustomerViewSet, TransactionsViewSet

router = DefaultRouter()
router.register('branches', BranchViewSet)
router.register('transactions', TransactionsViewSet, basename='transaction')
router.register('customers', CustomerViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
