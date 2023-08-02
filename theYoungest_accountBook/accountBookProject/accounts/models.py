from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
class UserManager(BaseUserManager):
    # 일반 user 생성
    def create_user(self, id, birth, phone, nickname, name, password=None):
        if not id:
            raise ValueError('must have user id')
        if not phone:
            raise ValueError('must have user phone')
        if not birth:
            raise ValueError('must have user birth')
        if not nickname:
            raise ValueError('must have user nickname')
        if not name:
            raise ValueError('must have user name')
        user = self.model(
            phone = phone,
            nickname = nickname,
            name = name,
            birth = birth,
            id = id
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    # 관리자 user 생성
    def create_superuser(self,id, birth, phone, nickname, name, password=None):
        user = self.create_user(
            id=id,
            phone =phone,
            nickname = nickname,
            name = name,
            birth = birth
        )
        user.set_password(password)
        # user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    id= models.CharField(primary_key=True, default='', max_length=100, null=False, blank=False, unique=True)
    phone = models.CharField(default='', max_length=100, null=False, blank=False)
    birth = models.CharField(default='', max_length=100, null=False, blank=False)
    nickname = models.CharField(default='', max_length=100, null=False, blank=False, unique=True)
    name = models.CharField(default='', max_length=100, null=False, blank=False)

    # User 모델의 필수 field
    is_active = models.BooleanField(default=True)   
    is_admin = models.BooleanField(default=True)

    # 헬퍼 클래스 사용
    objects = UserManager()

    # 사용자의 username field는 id로 설정
    USERNAME_FIELD = 'id'
    # 필수로 작성해야하는 field
    REQUIRED_FIELDS = ['phone', 'name', 'birth', 'nickname']

    def __str__(self):
        return self.id

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin