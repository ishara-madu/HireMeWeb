
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uwrxzasoqpbzqkavjugj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3cnh6YXNvcXBienFrYXZqdWdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjQ3MjI4NCwiZXhwIjoyMDQ4MDQ4Mjg0fQ.z7JUI8ONw8apy83Xh07oW1HmC3pI4_Ybs9NsI6Hqaoo';
export const supabase = createClient(supabaseUrl, supabaseKey)