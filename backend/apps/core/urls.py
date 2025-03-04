


# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BranchViewSet, TransactionsViewSet

router = DefaultRouter()
router.register('branches', BranchViewSet)
router.register('transactions', TransactionsViewSet, basename='transaction')


urlpatterns = [
    path('api/', include(router.urls)),
]
