# Generated by Django 3.0.6 on 2020-05-27 02:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mms', '0005_auto_20200527_0202'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workorder',
            name='approvedDt',
            field=models.DateField(blank=True, null=True),
        ),
    ]