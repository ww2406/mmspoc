from django.db import models
import uuid
import django.utils.timezone
from datetime import datetime


# Create your models here.

class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    projectName = models.CharField(max_length=100)
    county = models.CharField(max_length=4, blank=True)
    district = models.CharField(max_length=4)


class WorkOrder(models.Model):
    tcoreCoreFunction = models.CharField(max_length=100)
    tcoreAsset=models.CharField(max_length=100)
    tcoreActivity=models.CharField(max_length=100)
    tcoreRepairType=models.CharField(max_length=100)
    costCenter = models.CharField(max_length=50)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, blank=True,null=True)
    entryUser = models.CharField(max_length=50)
    entryDt = models.DateField(default=django.utils.timezone.now)
    approved = models.BooleanField()
    approvedUser = models.CharField(max_length=50,blank=True)
    approvedDt=models.DateField(blank=True,null=True)


class WOLabor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    woid = models.ForeignKey(WorkOrder, on_delete=models.CASCADE)
    lbDt = models.DateField()
    costCenter=models.CharField(max_length=100)
    employee = models.CharField(max_length=100)
    hours = models.DecimalField(max_digits=4, decimal_places=1)
    rate = models.DecimalField(max_digits=10, decimal_places=2)
    callback=models.BooleanField()


class WOEquip(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    woid = models.ForeignKey(WorkOrder, on_delete=models.CASCADE)
    equipDt = models.DateField()
    equipType = models.IntegerField()
    equipDesc = models.CharField(max_length=100)
    equipId = models.IntegerField()
    costCenter = models.CharField(max_length=100)
    meterUsage = models.DecimalField(max_digits=10, decimal_places=1)
    meterType = models.CharField(max_length=10)
    equipRate = models.DecimalField(max_digits=10, decimal_places=2)


class WOMaterial(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    woid = models.ForeignKey(WorkOrder, on_delete=models.CASCADE)
    mtDt = models.DateField()
    mtDesc = models.CharField(max_length=100)
    mtId = models.IntegerField()
    costCenter = models.CharField(max_length=100)
    mtQty = models.DecimalField(max_digits=10, decimal_places=1)
    mtRate = models.DecimalField(max_digits=10, decimal_places=2)


class WOOtherContract(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    woid = models.ForeignKey(WorkOrder, on_delete=models.CASCADE)
    ocDt = models.DateField()
    ocType = models.CharField(max_length=10)
    ocDesc = models.CharField(max_length=100)
    ocCost = models.DecimalField(max_digits=10, decimal_places=2)


class WOAsset(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    woid = models.ForeignKey(WorkOrder, on_delete=models.CASCADE)
    assetDt = models.DateField()
    assetType = models.CharField(max_length=20)
    assetIdentifier = models.CharField(max_length=25)
    assetBeginLat = models.DecimalField(max_digits=17, decimal_places=15, blank=True)
    assetBeginLong = models.DecimalField(max_digits=17, decimal_places=15, blank=True)
    assetEndLat=models.DecimalField(max_digits=17,decimal_places=15,blank=True)
    assetEndLong=models.DecimalField(max_digits=17,decimal_places=15,blank=True)
    assetLogStart = models.DecimalField(max_digits=6, decimal_places=2,blank=True)
    assetLogEnd = models.DecimalField(max_digits=6, decimal_places=2,blank=True)
    assetAccomplishment = models.DecimalField(max_digits=5, decimal_places=1,blank=True)
