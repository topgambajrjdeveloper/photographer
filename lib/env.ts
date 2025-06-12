import { z } from "zod"

// Esquema de validación para variables de entorno
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url().optional(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  ADMIN_REGISTRATION_KEY: z.string().min(8),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
})

// Validar variables de entorno al iniciar la aplicación
export const env = envSchema.parse(process.env)

// Función para verificar si estamos en producción
export const isProduction = env.NODE_ENV === "production"
export const isDevelopment = env.NODE_ENV === "development"
