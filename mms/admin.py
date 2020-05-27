from django.contrib import admin
from .models import Project, WorkOrder, WOAsset, WOEquip, WOLabor, WOMaterial, WOOtherContract

# Register your models here.

admin.site.register(Project)
admin.site.register(WorkOrder)
admin.site.register(WOAsset)
admin.site.register(WOEquip)
admin.site.register(WOLabor)
admin.site.register(WOMaterial)
admin.site.register(WOOtherContract)