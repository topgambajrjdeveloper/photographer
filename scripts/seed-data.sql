-- Seed the database with sample data

-- Insert sample categories
INSERT OR IGNORE INTO "Category" ("id", "name", "slug", "description") VALUES
('cat1', 'Wedding Photography', 'wedding-photography', 'Capturing the most important day of your life with elegance and emotion'),
('cat2', 'Portrait Photography', 'portrait-photography', 'Professional portraits that reveal personality and character'),
('cat3', 'Nature & Landscape', 'nature-landscape', 'Breathtaking natural scenes and outdoor photography'),
('cat4', 'Street Photography', 'street-photography', 'Candid moments and urban life captured in their natural state'),
('cat5', 'Architecture', 'architecture', 'Stunning architectural photography showcasing design and structure');

-- Insert sample galleries
INSERT OR IGNORE INTO "Gallery" ("id", "title", "slug", "description", "categoryId", "featured") VALUES
('gal1', 'Sunset Beach Wedding', 'sunset-beach-wedding', 'A romantic beach wedding captured during golden hour', 'cat1', true),
('gal2', 'Corporate Portraits 2024', 'corporate-portraits-2024', 'Professional headshots for business executives', 'cat2', false),
('gal3', 'Mountain Landscapes', 'mountain-landscapes', 'Majestic mountain views from various hiking expeditions', 'cat3', false),
('gal4', 'City Life Chronicles', 'city-life-chronicles', 'Street photography capturing the essence of urban living', 'cat4', false),
('gal5', 'Modern Architecture', 'modern-architecture', 'Contemporary buildings and architectural marvels', 'cat5', false);

-- Insert sample images
INSERT OR IGNORE INTO "Image" ("id", "url", "alt", "galleryId") VALUES
-- Sunset Beach Wedding images
('img1', '/placeholder.svg?height=800&width=1200', 'Beach wedding ceremony at sunset', 'gal1'),
('img2', '/placeholder.svg?height=800&width=1200', 'Wedding couple portrait on beach', 'gal1'),
('img3', '/placeholder.svg?height=800&width=1200', 'Beach wedding reception setup', 'gal1'),
('img4', '/placeholder.svg?height=800&width=1200', 'First dance on the beach', 'gal1'),

-- Corporate Portraits images
('img5', '/placeholder.svg?height=800&width=600', 'Professional business headshot', 'gal2'),
('img6', '/placeholder.svg?height=800&width=600', 'Executive portrait in office', 'gal2'),
('img7', '/placeholder.svg?height=800&width=600', 'Corporate team portrait', 'gal2'),

-- Mountain Landscapes images
('img8', '/placeholder.svg?height=800&width=1200', 'Mountain landscape at sunrise', 'gal3'),
('img9', '/placeholder.svg?height=800&width=1200', 'Alpine lake with mountain reflection', 'gal3'),
('img10', '/placeholder.svg?height=800&width=1200', 'Mountain peak above clouds', 'gal3'),

-- City Life Chronicles images
('img11', '/placeholder.svg?height=800&width=600', 'Urban street scene', 'gal4'),
('img12', '/placeholder.svg?height=800&width=600', 'City lights at night', 'gal4'),
('img13', '/placeholder.svg?height=800&width=600', 'People walking on busy street', 'gal4'),

-- Modern Architecture images
('img14', '/placeholder.svg?height=800&width=600', 'Modern building facade', 'gal5'),
('img15', '/placeholder.svg?height=800&width=600', 'Architectural interior design', 'gal5'),
('img16', '/placeholder.svg?height=800&width=600', 'Glass building with reflections', 'gal5');
