from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'mms/index.html')

def newWorkOrder(request):
    return render(request,'mms/new_work_order.html')