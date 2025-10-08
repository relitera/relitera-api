import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  saltRounds: number;
  tokenKey?: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
  tokenKey: process.env.TOKEN_KEY,
};

export default config;