// supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_DB_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY // process.env.SUPABASE_DB_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey);

// Multer middleware to handle multipart/form-data (file uploads)
const storage = multer.memoryStorage(); // store file in memory
export const upload = multer({ storage });

async function testConnection() {
    try {
      // Just a simple query to list tables (use a real table name you have)
      const { data, error } = await supabase.from('users').select('*').limit(1);
  
      if (error) {
        console.error('❌ Supabase error:', error.message);
      } else {
        // console.log('✅ Supabase connected! Sample data:', data);
        console.log('✅ Supabase connected!');
      }
    } catch (err) {
      console.error('❌ Error testing Supabase connection:', err.message);
    }
  }
  
  testConnection();
  