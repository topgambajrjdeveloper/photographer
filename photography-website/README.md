# Photography Portfolio Website

A professional photography portfolio website built with Next.js 15, Prisma ORM, and shadcn/ui components.

## Features

- 🎨 **Elegant Design** - 18% gray base color scheme perfect for photography
- 📱 **Responsive** - Works on all devices with PWA capabilities
- 🔐 **Admin Panel** - Secure admin interface for content management
- 📸 **Gallery Management** - Create categories and galleries with image uploads
- 🌐 **SEO Optimized** - Proper metadata and social sharing
- 🍪 **Cookie Consent** - GDPR compliant cookie management
- 📧 **Contact Form** - Built-in contact form with admin management
- 🔄 **Share Features** - Social media sharing for galleries and pages

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS 3 + shadcn/ui
- **Authentication**: NextAuth.js
- **Deployment**: Vercel
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd photography-website
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` with your database URL and other configuration.

4. Set up the database:
\`\`\`bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Admin Access

- URL: `/admin`
- Username: `admin`
- Password: `admin123`

## Database Schema

The application uses the following main entities:

- **Categories** - Photography categories (Wedding, Portrait, etc.)
- **Galleries** - Collections of photos within categories
- **Images** - Individual photos with metadata
- **Contacts** - Contact form submissions
- **Settings** - Site configuration
- **Users** - Admin users

## API Endpoints

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category (admin)
- `GET /api/categories/[id]` - Get single category
- `PUT /api/categories/[id]` - Update category (admin)
- `DELETE /api/categories/[id]` - Delete category (admin)

### Galleries
- `GET /api/galleries` - List galleries (with filters)
- `POST /api/galleries` - Create gallery (admin)
- `GET /api/galleries/[id]` - Get single gallery
- `PUT /api/galleries/[id]` - Update gallery (admin)
- `DELETE /api/galleries/[id]` - Delete gallery (admin)
- `GET /api/galleries/slug/[slug]` - Get gallery by slug

### Images
- `GET /api/images` - List images (with filters)
- `POST /api/images` - Upload image(s) (admin)
- `GET /api/images/[id]` - Get single image
- `PUT /api/images/[id]` - Update image (admin)
- `DELETE /api/images/[id]` - Delete image (admin)

### Contact
- `GET /api/contact` - List contact messages (admin)
- `POST /api/contact` - Submit contact form
- `GET /api/contact/[id]` - Get single message (admin)
- `PUT /api/contact/[id]` - Update message status (admin)
- `DELETE /api/contact/[id]` - Delete message (admin)

### Admin
- `GET /api/admin/stats` - Dashboard statistics (admin)

### Settings
- `GET /api/settings` - Get settings
- `POST /api/settings` - Update settings (admin)

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
4. Deploy!

### Database Setup on Vercel

For production, you can use:
- **Vercel Postgres** (recommended)
- **Supabase**
- **PlanetScale**
- **Neon**

## Customization

### Colors
The 18% gray theme can be customized in `tailwind.config.ts` and `app/globals.css`.

### Content
- Update site information in the settings table
- Replace placeholder images with your photography
- Customize the About page content

### Features
- Add image storage integration (Vercel Blob, Cloudinary)
- Set up email notifications for contact forms
- Add analytics tracking
- Implement image optimization

## License

This project is licensed under the MIT License.
