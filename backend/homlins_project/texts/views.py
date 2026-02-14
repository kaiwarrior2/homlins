from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserText
from .serializers import UserTextSerializer

class UserTextViewSet(viewsets.ModelViewSet):
    queryset = UserText.objects.all()
    serializer_class = UserTextSerializer

@api_view(['GET'])
def health_check(request):
    return Response({'status': 'ok'})
