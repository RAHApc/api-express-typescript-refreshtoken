export default {
    port: 5000,
    dbUri: 'mongodb://localhost:27017/api-typescript-refreshtoken',
    secret: "bezkoder-secret-key",
    jwtExpiration: 3600, // 1 hour
    jwtRefreshExpiration: 86400, // 24 hours
}