module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        plugins: [
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-chai',
            'karma-fixture',
            'karma-typescript',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-html2js-preprocessor',
            'karma-json-fixtures-preprocessor',
            'karma-typescript-preprocessor',
            'karma-coverage',
            'karma-sinon',
            'karma-typescript-es6-transform'
        ],

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'karma-typescript', 'chai', 'fixture', 'sinon'],

        files: [
            'test/*.ts',
            'src/*.ts',
            'test/fixtures/*.html'
        ],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/*.ts': ['karma-typescript', 'coverage'],
            'test/*.test.ts': ['karma-typescript'],
            'test/fixtures/**/*.html'     : ['html2js'],
            'test/fixtures/**/*.json'     : ['json_fixtures']
        },
        jsonFixturesPreprocessor: {
            variableName: '__json__'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['karma-typescript', 'mocha'],

        karmaTypescriptConfig: {
            bundlerOptions: {
                transforms: [require('karma-typescript-es6-transform')()]
            }
        },

        typescriptPreprocessor: {
            // options passed to the typescript compiler
            options: {
                sourceMap: false,                   // (optional) Generates corresponding .map file.
                "target": "ESNEXT",                 // Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'.
                "module": "ESNext",                 // Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'.
                noImplicitAny: true,                // (optional) Warn on expressions and declarations with an implied 'any' type.
                noResolve: true,                    // (optional) Skip resolution and preprocessing.
                removeComments: true,               // (optional) Do not emit comments to output.
                concatenateOutput: false,           // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
                /* Strict Type-Checking Options */
                strict: true,                       /* Enable all strict type-checking options. */
                strictNullChecks: true,             /* Enable strict null checks. */
                noImplicitThis: true,               /* Raise error on 'this' expressions with an implied 'any' type. */
                alwaysStrict: true,                 /* Parse in strict mode and emit "use strict" for each source file. */
                // /* Additional Checks */
                noUnusedLocals: true,               /* Report errors on unused locals. */
                noUnusedParameters: true,           /* Report errors on unused parameters. */
                noImplicitReturns: true,            /* Report error when not all code paths in function return a value. */
                noFallthroughCasesInSwitch: true,   /* Report errors for fallthrough cases in switch statement. */
                types: ['mocha', 'chai'],
                allowJs: true
            },
            // transforming the filenames
            transformPath: function (path) {
                return path.replace(/\.ts$/, '.js')
            }
        },

        client: {
            mocha: {
                reporter: 'html', // change Karma's debug.html to the mocha web reporter
                ui: 'bdd'
                // expose: ['body'] // This will be exposed in a reporter as `result.mocha.body`
            }
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromeHeadless', 'Firefox', 'FirefoxDeveloper', 'FirefoxNightly', 'IE'],
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: ['-headless'],
            },
            ChromeHeadlessES6: {
                base: 'ChromeHeadless',
                flags: [''],
            }
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
