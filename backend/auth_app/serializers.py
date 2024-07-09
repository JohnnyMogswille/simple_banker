from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class GroupsTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)

    # Add custom claims
    token['groups'] = [group.name for group in user.groups.all()]
    token['is_superuser'] = user.is_superuser

    return token
