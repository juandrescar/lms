#!/bin/bash
# filepath: lms-api/entrypoint.sh

# Copia .env si no existe
if [ ! -f .env ]; then
  cp .env.example .env
fi

# Instala dependencias si es necesario
composer install --no-interaction --prefer-dist --optimize-autoloader

# Genera la clave de la app si no existe
php artisan key:generate --force

# Permisos para Laravel
chmod -R 775 storage bootstrap/cache

# Inicia PHP-FPM
exec php-fpm
