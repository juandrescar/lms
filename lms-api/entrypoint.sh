#!/bin/bash
# filepath: lms-api/entrypoint.sh

# Espera a que la base de datos esté lista antes de continuar
echo "Esperando a que MySQL esté listo..."
until php artisan migrate:status > /dev/null 2>&1; do
  sleep 3
  echo "Aún esperando a MySQL..."
done
echo "¡MySQL está listo!"

# Copia .env si no existe
if [ ! -f .env ]; then
  cp .env.example .env
fi

# Instala dependencias si es necesario
composer install --no-interaction --prefer-dist --optimize-autoloader

# Genera la clave de la app si no existe
php artisan key:generate --force

# Ejecuta migraciones y seeders
php artisan migrate --seed --force

# Permisos para Laravel
chmod -R 775 storage bootstrap/cache

# Inicia PHP-FPM
exec php-fpm