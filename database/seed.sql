-- Seed Data for Slotify
-- Run this AFTER running schema.sql

-- FIX: Remove auth constraint for demo data
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- 1. Create Mock User (using a fixed UUID for our demo)
-- Note: In a real app, users are created via Supabase Auth
INSERT INTO public.profiles (id, full_name, email, bio)
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Alex Carter', 'alex@slotify.com', 'Product Designer at Slotify Labs'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Sarah Lee', 'sarah@slotify.com', 'Lead Engineer'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'John Doe', 'john@slotify.com', 'Marketing Lead')
ON CONFLICT (id) DO NOTHING;

-- 2. Set Availability for Alex (Mon-Fri 9-5)
INSERT INTO public.availability (user_id, day_of_week, start_time, end_time)
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 1, '09:00:00', '17:00:00'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 2, '09:00:00', '17:00:00'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 3, '09:00:00', '17:00:00'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 4, '09:00:00', '17:00:00'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 5, '09:00:00', '17:00:00')
ON CONFLICT DO NOTHING;

-- 3. Create initial tasks
INSERT INTO public.tasks (title, priority, status, assigned_by, assigned_to)
VALUES 
('Design Refactor', 'urgent', 'in-progress', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('Q4 Strategy', 'high', 'todo', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
('Fix Navigation bug', 'medium', 'completed', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12')
ON CONFLICT DO NOTHING;
