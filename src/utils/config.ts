import fs from 'fs';
import path from 'path';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const env = process.env.NODE_ENV;
const dotenvPath = path.resolve(process.cwd(), '.env');
const specificDotenvPath = path.resolve(process.cwd(), `.env.${env}`);

const setVariables = (config: string, forceOverwrite = false) => {
  config.split('\n').forEach((line) => {
    if (!line) {
      return;
    }

    // tslint:disable-next-line:prefer-const
    let [key, value]: any = line.split('=');

    if (!forceOverwrite && env === 'production' && key in process.env) {
      console.log('Did not overwrite: ', key);
      return;
    }

    // parsing booleans to truly great booleans
    if (value === 'true' || value === 'false') {
      value = value === 'true';
    } else {
      value = value.trim();
    }

    process.env[key] = value;
  });
};

try {
  setVariables(fs.readFileSync(dotenvPath).toString());
} catch (error) {
  console.log('failed to load default .env', error);
}

try {
  setVariables(fs.readFileSync(specificDotenvPath).toString(), true);
} catch (error) {
  console.log('failed to load env specific .env');
}
