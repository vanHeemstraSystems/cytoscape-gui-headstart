module.exports = {   
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.node = {
                net: 'empty',
                tls: 'empty'
            };
        }
        return config;
    }
}