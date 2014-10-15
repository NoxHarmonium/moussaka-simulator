// Main entry point
(function (require, module) {
  'use strict';

  module.exports = function (grunt) {

    // Load modules
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-urequire');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-open');

    // Define config
    var config = {};

    var paths = {
      srcDir: 'lib',
      src: ['lib/**/*.js'],
      dest: 'dist/<%= pkg.name %>.js',
      uglifyDest: 'dist/<%= pkg.name %>.min.js',
    };

    config['http-server'] = {
        'dev': {
            root: './',
            port: 8282,
            host: "127.0.0.1",
            showDir : true,
            autoIndex: true,
            ext: "html",
            runInBackground: false
        }
    };

    config.open = {
      dev : {
        path: 'http://127.0.0.1:8282/public/simulator.html',
      }
    };

    config.jsbeautifier = {
      all: paths.src,
      options: {
        config: '.jsbeautifyrc'
      }
    };

    config.jshint = {
      reporter: require('jshint-stylish'),
      all: paths.src,
      options: {
        jshintrc: true
      }
    };

    config.urequire = {
        all: {
          path: paths.srcDir,
          dstPath: paths.dest,
          template: 'combined',
        }
    };

    config.uglify = {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      moussaka_client: {
        files: {} // See below
      }
    };

    config.uglify.moussaka_client
      .files[paths.uglifyDest] = [paths.dest];

    // Read in package.json for templating
    config.pkg = grunt.file.readJSON('package.json');

    // Init grunt
    grunt.initConfig(config);

    // Define tasks
    grunt.registerTask('lint', ['jshint:all', 'jsbeautifier:all']);
    grunt.registerTask('compile', ['lint', 'urequire', 'uglify']);
    grunt.registerTask('default', ['compile']);
    grunt.registerTask('serve', ['lint', 'compile', 'open:dev', 'http-server:dev']);
  };

})(require, module);
