from django.shortcuts import render
from django.http import StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt
from mms.models import WorkOrder, WOAsset, WOEquip, WOLabor, WOMaterial, WOOtherContract
import json

# Create your views here.

def index(request):
    return render(request, 'mms/index.html')

@csrf_exempt
def newWorkOrder(request):
    if request.method=='POST':
        data = json.loads(request.POST['data'])
        return StreamingHttpResponse('success')
    elif request.method=='GET':
        return render(request,'mms/new_work_order.html')
