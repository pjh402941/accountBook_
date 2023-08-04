from django.db import models
from accounts.models import User

TYPE_CHOICES = (
    ('Type1', 'Type1'),
    ('Type2', 'Type2'),
    ('Type3', 'Type3'),
)

# main account book
# class AccountBook(models.Model):
#     title = models.CharField(max_length=128)
#     date = models.DateField(verbose_name="날짜")
#     writer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
#     type_name = models.CharField(verbose_name="type명", choices=TYPE_CHOICES, default='Type1', max_length=10)
#     total = models.IntegerField(default=0)

#     def __str__(self):
#         return str(self.date)
    
#     class Meta:
#         # 'date' 필드를 기준으로 중복 방지
#         unique_together = ['date']

# 프론트 전용 
class AccountBook(models.Model):
    date = models.DateField(verbose_name="날짜")
    category = models.TextField(default="카테고리", null=True)
    memo = models.TextField(default="소비내역", null=True)
    money = models.IntegerField(default=0)

    def __str__(self):
        return str(self.date)

# Type1
class Type1(models.Model):
    accountBook = models.ForeignKey(AccountBook, on_delete=models.CASCADE, related_name='type1_set')
    money = models.IntegerField(default=0)
    writer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.money)

# Type2
class Type2(models.Model):
    accountBook = models.ForeignKey(AccountBook, on_delete=models.CASCADE, related_name='type2_set')
    category = models.TextField()
    memo = models.TextField()
    money = models.IntegerField(default=0)
    writer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.money)

# Type3
class Type3(models.Model):
    accountBook = models.ForeignKey(AccountBook, on_delete=models.CASCADE, related_name='type3_set')
    content = models.TextField()
    image = models.ImageField(verbose_name='이미지', blank=True, null=True, upload_to='post-image')
    money = models.IntegerField(default=0)
    writer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.money)
