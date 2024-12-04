import { config } from 'dotenv';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

function checkEnvironmentVariables(): boolean {
  // Load environment variables
  config();

  const requiredVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'PORT',
    'VITE_API_URL'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    return false;
  }

  console.log('✅ All required environment variables are set');
  return true;
}

// Check if .env file exists
const envPath = join(__dirname, '..', '.env');
if (!existsSync(envPath)) {
  console.error('❌ .env file not found');
  console.log('💡 Tip: Copy .env.example to .env and update the values');
  process.exit(1);
}

// Check environment variables
if (!checkEnvironmentVariables()) {
  process.exit(1);
}

console.log('✅ Environment check completed successfully');