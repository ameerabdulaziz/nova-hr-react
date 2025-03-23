const fs = require('fs');
const path = require('path');

require('dotenv').config();

// Build absolute paths based on the project's root directory
const configPath = path.join(process.cwd(), 'public', 'web.config');
const outputPath = path.join(process.cwd(), 'build', 'web.config');

try {
  let config = fs.readFileSync(configPath, 'utf8');

  const DOMAIN_NAME = process.env.DOMAIN_NAME || '';

  config = config.replace(/__DOMAIN_NAME__/g, DOMAIN_NAME);

  fs.writeFileSync(outputPath, config, 'utf8');

  console.log('web.config updated with DOMAIN_NAME:', DOMAIN_NAME);
} catch (err) {
  console.error('Error updating web.config:', err);
  process.exit(1);
}
