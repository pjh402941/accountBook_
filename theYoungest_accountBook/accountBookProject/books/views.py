from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from .models import AccountBook, Type1, Type2, Type3
from .serializers import BookSerializer, Type1_Serializer, Type2_Serializer, Type3_Serializer
from rest_framework.viewsets import ModelViewSet
from django.db.models import Sum
from rest_framework import serializers
from .permissions import IsAuthenticatedOrReadOnly, IsWriterOrReadonly, IsAuthenticated
from rest_framework.exceptions import PermissionDenied

class BookViewSet(ModelViewSet):
    queryset = AccountBook.objects.all()
    serializer_class = BookSerializer
    
    # # (주석)허가 권한 
    # permission_classes = [
    #     IsWriterOrReadonly, # 작성자에 한해 수정/삭제 권한
    # ]
    
    # (주석) 작성자 꺼만 가져옴
    # def get_queryset(self):
    #     queryset = super().get_queryset()
    #     user = self.request.user
    #     return queryset.filter(writer=user)
    
    # (주석) 작성자 부분
    # def perform_create(self, serializer):
    #     serializer.save(writer = self.request.user)
    
    # type_name 변경 시에 -> 400 에러 발생
    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     type_name = instance.type_name

    #     partial = kwargs.pop('partial', False)
    #     if not partial:
    #         request.data.pop('type_name', None)

    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)

    #     if type_name != serializer.instance.type_name:
    #         return Response({"error": "Updating 'type_name' is not allowed."}, status=status.HTTP_400_BAD_REQUEST)

    #     return Response(serializer.data)

class TypeViewSet(ModelViewSet):    
    #(주석)권한
    # permission_classes = [IsAuthenticated]
    
    # 해당하는 accountbook 받아와요
    def get_account_book(self):
        book_id = self.kwargs.get('book_id')
        account_book = get_object_or_404(AccountBook, id=book_id)
        return account_book

    # type 부분입니다 해당하는 types 받아와요
    def get_object(self):
        type_id = self.kwargs.get('pk')
        account_book = self.get_account_book()

        type_model = None
        if account_book.type_name == 'Type1':
            type_model = get_object_or_404(Type1, id=type_id, accountBook=account_book)
        elif account_book.type_name == 'Type2':
            type_model = get_object_or_404(Type2, id=type_id, accountBook=account_book)
        elif account_book.type_name == 'Type3':
            type_model = get_object_or_404(Type3, id=type_id, accountBook=account_book)

        return type_model

    # total 계산하는 함수 
    def calculate_total(self):
        account_book = self.get_account_book()
        if account_book.type_name == 'Type1':
            total_money = account_book.type1_set.aggregate(total=Sum('money'))['total']
        elif account_book.type_name == 'Type2':
            total_money = account_book.type2_set.aggregate(total=Sum('money'))['total']
        elif account_book.type_name == 'Type3':
            total_money = account_book.type3_set.aggregate(total=Sum('money'))['total']

        account_book.total = total_money if total_money is not None else 0
        account_book.save()

    # type_name에 따라서 serializer 불러와요
    def get_serializer_class(self):
        account_book = self.get_account_book()
        type_name = account_book.type_name
        if type_name == 'Type1':
            return Type1_Serializer
        elif type_name == 'Type2':
            return Type2_Serializer
        elif type_name == 'Type3':
            return Type3_Serializer
        else:
            return Type1_Serializer 

    # 타입 목록 전체 가져오기
    def get_queryset(self):
        account_book = self.get_account_book()
        self.calculate_total() # total 계산
        user = self.request.user

        # (주석) 작성자 부분 
        # 작성자가 아닌 경우 에러 발생
        # if account_book.writer != user:
        #     raise PermissionDenied("You can only access your own account book types.")

        type_name = account_book.type_name
        if type_name == 'Type1':
            return account_book.type1_set.all()
        elif type_name == 'Type2':
            return account_book.type2_set.all()
        elif type_name == 'Type3':
            return account_book.type3_set.all()
        else:
            return Type1.objects.none() 

    # override - 목록 하나 추가 + accountBook을 미리 저장해둬야하는 부분 
    def create(self, request, *args, **kwargs):
        account_book_id = kwargs.get('book_id')
        account_book = get_object_or_404(AccountBook, id=account_book_id)

        # (주석) 작성자 부분
        # AccountBook의 writer 랑 type 작성하고 있는 writer 가 같아야지만 create 가능함
        # if account_book.writer != self.request.user:
        #     return Response({"error": "Permission denied. You can only create for your own account book."},
        #                     status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # (주석)작성자 부분
        # serializer.save(writer=self.request.user, accountBook=account_book) 
        # 대체 
        serializer.save(accountBook=account_book) 
        self.calculate_total()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # override - 목록 하나 가져오기 + get_object에서 받아와야함 
    def retrieve(self, request, *args, **kwargs):
        account_book_id = kwargs.get('book_id')
        account_book = get_object_or_404(AccountBook, id=account_book_id)

        # # (주석) 작성자 부분
        # # AccountBook의 writer 랑 type 작성하고 있는 writer 가 같아야지만 retrieve 가능함
        # if account_book.writer != self.request.user:
        #     return Response({"error": "Permission denied. You can only retrieve for your own account book."},
        #                     status=status.HTTP_403_FORBIDDEN)
        
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    # override - 목록 하나 수정 
    def update(self, request, *args, **kwargs):
        account_book_id = kwargs.get('book_id')
        account_book = get_object_or_404(AccountBook, id=account_book_id)

        # # (주석) 작성자 부분
        # # AccountBook의 writer 랑 type 작성하고 있는 writer 가 같아야지만 update 가능함
        # if account_book.writer != self.request.user:
        #     return Response({"error": "Permission denied. You can only update for your own account book."},
        #                     status=status.HTTP_403_FORBIDDEN)
        
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        self.calculate_total()
        return Response(serializer.data)

    # override - 목록 하나 삭제
    def destroy(self, request, *args, **kwargs):
        account_book_id = kwargs.get('book_id')
        account_book = get_object_or_404(AccountBook, id=account_book_id)

        # # (주석) 작성자 부분
        # # AccountBook의 writer 랑 type 작성하고 있는 writer 가 같아야지만 delete 가능함
        # if account_book.writer != self.request.user:
        #     return Response({"error": "Permission denied. You can only delete for your own account book."},
        #                     status=status.HTTP_403_FORBIDDEN)
        
        instance = self.get_object()
        self.perform_destroy(instance)
        self.calculate_total()
        return Response(status=status.HTTP_204_NO_CONTENT)