# Generated by Django 3.0.6 on 2020-05-27 02:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mms', '0004_wolabor_callback'),
    ]

    operations = [
        migrations.AddField(
            model_name='woequip',
            name='costCenter',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='womaterial',
            name='costCenter',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]