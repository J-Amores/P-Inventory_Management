#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Script to set up the database with Prisma
 * 
 * This script will:
 * 1. Generate Prisma migrations
 * 2. Apply the migrations to the database
 * 3. Generate the Prisma client
 * 4. Seed the database with initial data
 */

// Make sure we're in the client directory
const clientDir = path.resolve(__dirname, '..');
process.chdir(clientDir);

console.log('🔍 Checking if .env file exists...');
const envPath = path.join(clientDir, '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found. Creating one with SQLite configuration...');
  fs.writeFileSync(
    envPath,
    'DATABASE_URL="file:./prisma/dev.db"\n',
    'utf8'
  );
  console.log('✅ .env file created.');
} else {
  console.log('✅ .env file found.');
}

try {
  console.log('\n🧹 Cleaning up any existing database files...');
  const dbPath = path.join(clientDir, 'prisma', 'dev.db');
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('✅ Removed existing database file.');
  } else {
    console.log('✅ No existing database file found.');
  }

  console.log('\n🔧 Generating Prisma migrations...');
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
  console.log('✅ Migrations generated and applied.');

  console.log('\n🔄 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated.');

  console.log('\n🌱 Seeding the database...');
  execSync('npx prisma db seed', { stdio: 'inherit' });
  console.log('✅ Database seeded.');

  console.log('\n🎉 Database setup complete!');
  console.log('\nYou can now start your application with:');
  console.log('npm run dev');
} catch (error) {
  console.error('❌ An error occurred during setup:', error.message);
  process.exit(1);
} 