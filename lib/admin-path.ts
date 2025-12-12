// Admin path - change this to something random and keep it secret!
// Format: admin-{20 alphanumeric characters}
// Generate new path: node -e "const chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; console.log('admin-'+Array.from({length:20},()=>chars[Math.floor(Math.random()*chars.length)]).join(''))"
export const ADMIN_PATH = process.env.ADMIN_PATH || 'admin-vJWIU8yIa8OU4IEVVrOE'
