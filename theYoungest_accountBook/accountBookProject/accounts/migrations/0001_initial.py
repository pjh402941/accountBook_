

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "id",
                    models.CharField(
                        default="",
                        max_length=100,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("phone", models.CharField(default="", max_length=100, unique=True)),
                ("birth", models.CharField(default="", max_length=100, unique=True)),
                ("nickname", models.CharField(default="", max_length=100, unique=True)),
                ("name", models.CharField(default="", max_length=100)),
                ("is_active", models.BooleanField(default=False)),
                ("is_admin", models.BooleanField(default=True)),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
