module.export = function(environment) {
    var ENV = {
        modulePrefix: 'ember-admin',
        environment: environment,
        baseURL: '/ember_admin/',
        locationType: 'hash',
        EmberENV: {
            FEATURES: {

            }
        },
        
        APP: {

        },

        contentSecurityPolicy: {
            'default-src':"'none'",
            'script-src':"'self'",
            'font-src': "'self'",
            'connect-src': "'self'",
            'img-src':"'self'",
            'media-src': "'self'"
        }
    
    };

    if(environment === 'development'){

    }


}