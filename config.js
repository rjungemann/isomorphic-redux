module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  secret: process.env.SECRET || 'ayl3wvruk0e07vwnklp2fljxe',
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL || 'postgres://localhost/isomorphic_redux_development',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379'
};
