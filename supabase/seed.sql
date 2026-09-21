-- Digital Heroes Seed File (6 Clearly Labelled Demo Charities)
-- Seed File: supabase/seed.sql

INSERT INTO public.charities (id, slug, name, category, description, website, is_active, is_featured)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'veterans-golf-wellness',
    'Veterans Golf & Wellness Foundation',
    'Veterans & Rehabilitation',
    'Providing therapeutic golf programs, mental health counseling, and community support for military veterans.',
    'https://example.org/veterans-golf',
    TRUE,
    TRUE
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'junior-golf-opportunity',
    'Junior Golf & Youth Opportunity Fund',
    'Youth & Education',
    'Granting equipment, coaching, and academic scholarships to underrepresented youth across the country.',
    'https://example.org/junior-golf',
    TRUE,
    FALSE
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'clean-oceans-trust',
    'Clean Oceans & Environmental Trust',
    'Environment & Conservation',
    'Funding coastal cleanup initiatives and marine habitat restoration through grassroots ocean protection projects.',
    'https://example.org/clean-oceans',
    TRUE,
    FALSE
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'national-cancer-research',
    'National Cancer Research Alliance',
    'Health & Medical Research',
    'Pioneering breakthrough medical research and providing patient care assistance for families affected by cancer.',
    'https://example.org/cancer-research',
    TRUE,
    TRUE
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'food-bank-hero-network',
    'Food Bank Hero Network',
    'Hunger & Community',
    'Distributing fresh produce and nutritious meals to local food pantries and underserved communities.',
    'https://example.org/food-bank-heroes',
    TRUE,
    FALSE
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    'wildlife-habitat-rescue',
    'Wildlife Habitat Rescue Fund',
    'Animal Welfare',
    'Rescuing injured wildlife and rehabilitating native forest and wetland sanctuaries.',
    'https://example.org/wildlife-rescue',
    TRUE,
    FALSE
  )
ON CONFLICT (slug) DO NOTHING;

-- Seed Demo Charity Events
INSERT INTO public.charity_events (charity_id, title, description, event_date, location)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Annual Veterans Golf Classic',
    'Celebratory 18-hole scramble tournament supporting military veteran wellness programs.',
    NOW() + INTERVAL '30 days',
    'Pine Valley Golf Club & Resort'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Youth Equipment Drive & Clinic',
    'Free Junior Golf Coaching Clinic and gear distribution for young aspiring golfers.',
    NOW() + INTERVAL '45 days',
    'Community Municipal Golf Center'
  );
