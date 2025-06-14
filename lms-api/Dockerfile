FROM php:8.3-fpm

# Instala dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Instala Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Establece el directorio de trabajo
WORKDIR /var/www

# Copia los archivos de la aplicación
COPY . .

# Instala dependencias de Laravel
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Permisos para Laravel
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Expone el puerto 9000 y define el usuario
EXPOSE 9000
USER www-data

CMD ["php-fpm"]