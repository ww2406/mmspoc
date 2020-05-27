from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse, StreamingHttpResponse
from django.views import generic
from django.views.decorators.csrf import csrf_exempt
from mms.models import Project, WorkOrder, WOAsset, WOEquip, WOLabor, WOMaterial, WOOtherContract
import json
from datetime import date

# Create your views here.

class WOListView(generic.ListView):
    model = WorkOrder
    template_name = 'mms/index.html'
    context_object_name = 'WorkOrder_list'

def index(request):
    return render(request, 'mms/index.html')

@csrf_exempt
def newWorkOrder(request):
    if request.method=='POST':
        data = json.loads(request.POST['data'])
        woDetails=data["woDetails"]  # coreFunction, asset, activity, repairType
        assets = data["assets"]  # arrays
        labor=data["labor"]  # arrays
        equip=data["equip"]  # arrays
        materials = data["materials"]  # arrays
        otherContract = data["otherContract"]  # arrays
        accomplishments = data["accomplishments"]  # arrays
        woProject = data["woProject"]  # projectName, district, county

        # does project exist?
        pCount=Project.objects.filter(district=woProject["district"],county=woProject["county"],projectName=woProject["projectName"]).count()
        if pCount==0 and woProject["projectName"]!="":
            p=Project(district=woProject["district"],county=woProject["county"],projectName=woProject["projectName"])
            p.save()

        # create Work Order
        wo=WorkOrder()
        wo.tcoreCoreFunction = woDetails["coreFunction"]
        wo.tcoreAsset = woDetails["asset"]
        wo.tcoreActivity = woDetails["activity"]
        wo.tcoreRepairType = woDetails["repairType"]
        wo.costCenter = "D6 - FRA - Westerville"
        wo.entryUser = "wwelch"
        wo.approved = False
        if woProject["projectName"]!="":
            proj=Project.objects.filter(district=woProject["district"],county=woProject["county"],projectName=woProject["projectName"]).first()
            wo.project=proj
        wo.save()

        #create Labor
        for lb in labor:
            lbObj=WOLabor()
            lbObj.woid=wo
            lbObj.lbDt=date.fromisoformat(lb["lbDt"])
            lbObj.employee=lb["employee"]
            lbObj.costCenter=lb["costcenter"]
            lbObj.hours=lb["hours"]
            lbObj.rate=lb["rate"]
            lbObj.callback=lb["callback"]
            lbObj.save()

        #create Equip
        for eq in equip:
            eqObj=WOEquip()
            eqObj.woid=wo
            eqObj.equipDt=date.fromisoformat(eq["equipDt"])
            eqObj.equipType=int(eq["equipDesc"][:3])
            eqObj.equipDesc=eq["equipDesc"]
            eqObj.equipId=eq["equipId"]
            eqObj.costCenter=eq["equipCostCenter"]
            eqObj.meterUsage=eq["meterUsage"]
            eqObj.meterType=eq["meterType"]
            eqObj.equipRate=eq["equipRate"]
            eqObj.save()

        #create Material
        for mt in materials:
            mtObj=WOMaterial()
            mtObj.woid=wo
            mtObj.mtDt=date.fromisoformat(mt["mtDt"])
            mtObj.mtDesc=mt["mtDesc"]
            mtObj.mtId=mt["mtId"]
            mtObj.costCenter=mt["mtCostCenter"]
            mtObj.mtQty=mt["mtQty"]
            mtObj.mtRate=mt["mtRate"]
            mtObj.save()

        #create OtherContract
        for oc in otherContract:
            ocObj=WOOtherContract()
            ocObj.woid=wo
            ocObj.ocDt=date.fromisoformat(oc["ocDt"])
            ocObj.ocType=oc["ocType"]
            ocObj.ocDesc=oc["ocDesc"]
            ocObj.ocCost=oc["ocCost"]
            ocObj.save()

        #create Asset
        for asset in assets:
            for accomp in [x for x in accomplishments if x["accAssetType"]==asset["type"] and x["accAssetIdentifier"]==asset["assetId"]]:
                assetObj=WOAsset()
                assetObj.woid=wo
                assetObj.assetDt=date.fromisoformat(accomp["accWorkDate"])
                assetObj.assetType=asset["type"]
                assetObj.assetIdentifier=asset["assetId"]
                assetObj.assetBeginLat=asset["latBegin"]
                assetObj.assetBeginLong=asset["lngBegin"]
                assetObj.assetEndLat=asset["latEnd"]
                assetObj.assetEndLong=asset["lngEnd"]
                assetObj.assetLogStart=asset["logBegin"]
                assetObj.assetLogEnd=asset["logEnd"]
                assetObj.assetAccomplishment=accomp["accAmount"]
                assetObj.save()
        return StreamingHttpResponse('success')
    elif request.method=='GET':
        return render(request,'mms/new_work_order.html')

@csrf_exempt
def projectsAPI(request):
    if request.method=='POST':
        data=json.loads(request.POST['data'])
        dist=data["district"]
        cty=data["county"]
        text=data["text"]
        p=Project(district=dist,county=cty,projectName=text)
        p.save()
        return StreamingHttpResponse('success')
    elif request.method=='GET':
        text=request.GET['text']
        matches=Project.objects.filter(projectName__icontains=text).all()
        data=serializers.serialize('json',matches)
        return HttpResponse(data,content_type='application/json')