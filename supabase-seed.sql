-- ================================================================
-- Pallabi Das — Seed Data
-- Run AFTER supabase-schema.sql
-- Supabase Dashboard → SQL Editor → paste and Run
-- ================================================================

-- COURSES
insert into courses (title, tag, duration, seats, price, description, bullets, featured) values
(
  'AI + Digital Marketing',
  'Cohort',
  '6 weeks',
  '40 seats',
  '₹9,999',
  'The modern marketer''s playbook — strategy, copy, design and ops, supercharged with AI.',
  array['Live weekly sessions', 'AI-prompt library', 'Real client case studies', 'Lifetime community access'],
  true
),
(
  'Beginner SEO Mastery',
  'Self-paced',
  '4 weeks',
  'Unlimited',
  '₹4,999',
  'Everything you need to rank, from technical foundations to content systems.',
  array['12 video modules', 'SEO audit template', 'Backlink playbook', 'Q&A office hours'],
  false
),
(
  'Branding Basics',
  'Live',
  '3 weeks',
  '25 seats',
  '₹6,499',
  'Build a brand that looks expensive and feels human — in three intensive weeks.',
  array['Brand strategy framework', 'Identity workshop', 'Live feedback sessions', 'Brand guidelines template'],
  false
);

-- BOOKS
insert into books (title, description, cover_url, amazon_url, tag, accent) values
(
  'Start Designing',
  'A beginner-friendly guide to visual thinking and design fundamentals for modern creators.',
  '/book-start-designing.avif',
  'https://amzn.in/d/0b4NVeCp',
  'Design',
  'oklch(0.65 0.27 295)'
),
(
  'Hope — Don''t Let Go',
  'An honest and heartfelt book on resilience, ambition, and holding on when it feels impossible.',
  '/book-hope-dont-let-go.avif',
  'https://amzn.in/d/06Rc1uB5',
  'Mindset',
  'oklch(0.72 0.2 240)'
);

-- PORTFOLIO
insert into portfolio (title, description, image_url, cat, tags, link, accent, sort_order) values
(
  'Driving 360° Marketing Strategies Across Leading Retail Brands',
  'I have successfully managed ATL, BTL, and Digital Marketing campaigns for reputed brands like Reliance, Big Bazaar, and Easyday — overseeing operations across the East Zone. From conceptualising creative campaigns to executing impactful brand activations, my focus has always been on building connections that drive visibility, engagement, and growth.',
  '/project-retail.avif',
  '360° Marketing',
  array['Reliance', 'Big Bazaar', 'Easyday', 'East Zone'],
  null,
  'from-fuchsia-500/30 to-purple-500/10',
  0
),
(
  'Empowering Creativity with AI — My Session at Adda 24×7',
  'A proud moment from my journey as a designer and educator — visiting Adda 24×7 to interact with talented students and creative minds. As part of my course "Advanced Graphic Designing + AI", I conducted a special lecture exploring how AI is transforming the creative industry, from concept generation to visual storytelling, and how designers can blend artistic vision with smart technology to stay ahead.',
  '/project-webinar.avif',
  'Education · AI',
  array['Keynote', 'AI + Design', 'Adda 24×7', 'Mentorship'],
  null,
  'from-cyan-400/30 to-blue-500/10',
  1
),
(
  'GiftYour.in — Spreading Smiles, One Gift at a Time',
  'GiftYour.in is my dream project — an Indian e-commerce platform dedicated to celebrating emotions through thoughtful, handmade gifts. Built with the mission to empower small creators and simplify gifting, GiftYour connects creativity with compassion. Every product tells a story, every order carries a smile — because gifting isn''t just about things, it''s about feelings shared from one heart to another.',
  '/project-giftyour.avif',
  'Founder Project',
  array['E-commerce', 'Brand', 'Handmade', 'India'],
  'https://giftyour.in',
  'from-rose-500/30 to-orange-400/10',
  2
);