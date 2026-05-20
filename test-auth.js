const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://repikzgnpcciqsnltewx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlcGlremducGNjaXFzbmx0ZXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1OTc2NzUsImV4cCI6MjA5NDE3MzY3NX0.RhOChtnA6-egTdn0udXzRBJqyd4ejdX7F1dMfY3NkXM'
);

async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'YOUR_EMAIL',
    password: 'YOUR_PASSWORD',
  });

  console.log(data.session.access_token);

  if (error) {
    console.log(error);
  }
}

login();