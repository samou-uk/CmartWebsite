/**
 * Utility script to hash a password for use with bcrypt
 * 
 * Usage:
 *   node scripts/hash-password.js "your-password-here"
 * 
 * Or run interactively:
 *   node scripts/hash-password.js
 */

const bcrypt = require('bcryptjs')
const readline = require('readline')

async function hashPassword(password) {
  const saltRounds = 12
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}

async function main() {
  let password
  
  // Check if password provided as command line argument
  if (process.argv[2]) {
    password = process.argv[2]
  } else {
    // Interactive mode
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    
    password = await new Promise((resolve) => {
      rl.question('Enter password to hash: ', (answer) => {
        rl.close()
        resolve(answer)
      })
    })
  }
  
  if (!password) {
    console.error('Error: Password is required')
    console.log('\nUsage: node scripts/hash-password.js "your-password-here"')
    process.exit(1)
  }
  
  try {
    const hash = await hashPassword(password)
    const fs = require('fs')
    const path = require('path')
    
    console.log('\n✅ Password hashed successfully!')
    
    // Create .config directory if it doesn't exist (hidden directory, not web-accessible)
    const configDir = path.join(process.cwd(), '.config')
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true })
    }
    
    // Write to config file
    const configPath = path.join(configDir, 'admin.json')
    const config = { passwordHash: hash }
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    
    console.log('\n✅ Hash saved to .config/admin.json (hidden directory, not web-accessible)')
    console.log('\nAlternatively, you can add this to your .env.local file (quoted):')
    console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`)
    console.log('⚠️  Keep this hash secure and never commit it to version control!')
    console.log('⚠️  config/admin.json is already in .gitignore')
  } catch (error) {
    console.error('Error hashing password:', error)
    process.exit(1)
  }
}

main()

