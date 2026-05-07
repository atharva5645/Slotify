-- Slotify Seed Data

-- Insert Sample Users
INSERT INTO users (id, name, email, role) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Alex Carter', 'alex@slotify.app', 'admin'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Sarah Lee', 'sarah@slotify.app', 'employee'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'John Doe', 'john@slotify.app', 'employee');

-- Insert Sample Tasks for Alex
INSERT INTO tasks (title, assigned_to, assigned_by, priority, status) VALUES
  ('Initial Backend Setup', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'high', 'in-progress'),
  ('Design System Audit', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'medium', 'todo');
