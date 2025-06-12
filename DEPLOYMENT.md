# 🚀 Guía de Deployment en Vercel

Esta guía te ayudará a desplegar tu sitio web de fotografía en Vercel paso a paso.

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener:

- [ ] Cuenta en [Vercel](https://vercel.com)
- [ ] Cuenta en [Cloudinary](https://cloudinary.com)
- [ ] Base de datos PostgreSQL (recomendamos [Vercel Postgres](https://vercel.com/storage/postgres) o [Neon](https://neon.tech))
- [ ] Repositorio en GitHub con tu código

## 🗄️ Configuración de Base de Datos

### Opción 1: Vercel Postgres (Recomendado)

1. Ve a tu dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a la pestaña "Storage"
4. Crea una nueva base de datos Postgres
5. Copia las variables de entorno que te proporciona Vercel

### Opción 2: Neon Database

1. Crea una cuenta en [Neon](https://neon.tech)
2. Crea una nueva base de datos
3. Copia la connection string

## 🔧 Configuración de Variables de Entorno

En tu proyecto de Vercel, ve a Settings > Environment Variables y añade:

### Variables Requeridas

\`\`\`bash
# Base de datos
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth.js
NEXTAUTH_URL="https://tu-dominio.vercel.app"
NEXTAUTH_SECRET="clave-super-secreta-y-larga-para-produccion"

# Clave de registro de admin
ADMIN_REGISTRATION_KEY="clave-segura-para-admin"

# Cloudinary
CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"
\`\`\`

### Variables Opcionales

\`\`\`bash
# Email (opcional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="tu-email@gmail.com"
SMTP_PASS="tu-app-password"

# Analytics (opcional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
\`\`\`

## 🚀 Proceso de Deployment

### 1. Preparar el Repositorio

\`\`\`bash
# Asegúrate de que todos los cambios estén committeados
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
\`\`\`

### 2. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) y haz login
2. Haz clic en "New Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js

### 3. Configurar el Build

Vercel usará automáticamente el comando de build definido en `package.json`:

\`\`\`json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma db push && next build"
  }
}
\`\`\`

### 4. Configurar Variables de Entorno

1. En la página de configuración del proyecto, añade todas las variables de entorno
2. Asegúrate de marcar las variables sensibles como "Sensitive"

### 5. Deploy

1. Haz clic en "Deploy"
2. Vercel construirá y desplegará tu aplicación
3. El primer deploy puede tomar unos minutos

## 🔄 Configuración Post-Deployment

### 1. Verificar la Base de Datos

Después del primer deploy exitoso:

\`\`\`bash
# Conecta a tu base de datos y verifica que las tablas se crearon
# Puedes usar Prisma Studio o cualquier cliente PostgreSQL
\`\`\`

### 2. Crear Usuario Admin

1. Ve a `https://tu-dominio.vercel.app/auth/register`
2. Usa la clave de admin que configuraste
3. Crea tu cuenta de administrador

### 3. Configurar Dominio Personalizado (Opcional)

1. En Vercel, ve a Settings > Domains
2. Añade tu dominio personalizado
3. Configura los DNS según las instrucciones

## 🛠️ Comandos Útiles

### Logs de Deployment

\`\`\`bash
# Ver logs en tiempo real
vercel logs tu-proyecto.vercel.app

# Ver logs de una función específica
vercel logs tu-proyecto.vercel.app --function=api/galleries
\`\`\`

### Redeploy

\`\`\`bash
# Redeploy desde la línea de comandos
vercel --prod

# O simplemente haz push a main
git push origin main
\`\`\`

### Variables de Entorno Locales

\`\`\`bash
# Descargar variables de entorno de Vercel
vercel env pull .env.local
\`\`\`

## 🔍 Troubleshooting

### Error de Build

Si el build falla:

1. Verifica que todas las variables de entorno estén configuradas
2. Revisa los logs de build en Vercel
3. Asegúrate de que la base de datos esté accesible

### Error de Base de Datos

\`\`\`bash
# Verificar conexión a la base de datos
npx prisma db push

# Regenerar el cliente de Prisma
npx prisma generate
\`\`\`

### Error de Cloudinary

1. Verifica las credenciales de Cloudinary
2. Asegúrate de que el cloud name sea correcto
3. Verifica que la API key y secret sean válidos

## 📊 Monitoreo

### Analytics

1. Configura Google Analytics (opcional)
2. Usa Vercel Analytics para métricas de rendimiento
3. Monitorea los logs de errores

### Performance

1. Vercel Speed Insights te dará métricas de Core Web Vitals
2. Usa Lighthouse para auditorías de rendimiento
3. Monitorea el uso de Cloudinary

## 🔒 Seguridad

### Variables de Entorno

- ✅ Usa claves largas y aleatorias para `NEXTAUTH_SECRET`
- ✅ Cambia `ADMIN_REGISTRATION_KEY` por algo único
- ✅ Nunca expongas las credenciales de Cloudinary

### Headers de Seguridad

El proyecto incluye headers de seguridad configurados en `next.config.mjs`:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin

## 🎉 ¡Listo!

Tu sitio web de fotografía debería estar funcionando en:
`https://tu-proyecto.vercel.app`

### Próximos Pasos

1. Sube algunas categorías y galerías de prueba
2. Configura tu dominio personalizado
3. Añade contenido real
4. Configura backups de la base de datos
5. Monitorea el rendimiento y errores

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en Vercel Dashboard
2. Consulta la [documentación de Vercel](https://vercel.com/docs)
3. Revisa la [documentación de Prisma](https://www.prisma.io/docs)
4. Consulta la [documentación de Cloudinary](https://cloudinary.com/documentation)
