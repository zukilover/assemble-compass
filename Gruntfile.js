/*
 * Generated on 2016-07-14
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2016 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    src: 'src',
    dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({

    config: config,

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/**/*.{md,hbs,yml}'],
        tasks: ['assemble']
      },

      compass: {
        files: ['<%= config.src %>/assets/styles/*.{scss,sass}'],
        tasks: ['compass']
      },

      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: {
        files: [{
          src: [
            '<%= config.dist %>/**/*.{html,xml}'
          ]
        }]
      }
    },

    browserSync: {
      options: {
        notify: false,
        background: true,
        watchOptions: {
          ignored: ''
        }
      },
      livereload: {
        options: {
          port: 9000,
          files: [
            '<%= config.dist %>/*.html',
            '<%= config.dist %>/assets/**/*.css',
            '<%= config.dist %>/assets/**/*.js',
            '<%= config.dist %>/assets/**/*.{png,jpg,jpeg,gif,webp,svg}'
          ],
          server: {
            baseDir: ['<%= config.dist %>', config.src],
            routes: {
              '/bower_components': './bower_components'
            }
          }
        }
      },
      dist: {
        options: {
          background: false,
          server: '<%= config.dist %>'
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: false,
          expand: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs'
        },
        files: [
          {
            expand: true, 
            cwd: '<%= config.src %>/templates/pages/', 
            src: '**/*.hbs', 
            dest: '<%= config.dist %>/', 
            ext: '.html'
          }
        ]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= config.src %>/assets/styles',
        cssDir: '<%= config.dist %>/assets/styles',
        imagesDir: '<%= config.src %>/assets/images',
        javascriptsDir: '<%= config.src %>/assets/scripts',
        fontsDir: '<%= config.src %>/assets/fonts',
        importPath: '.',
        relativeAssets: false
      },
      dist: {
        options: {
          config: 'compass.rb',
          force: true
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Automatically inject Bower components into layout files
    wiredep: {
      task: {
        src: ['<%= config.src %>/**/*.hbs'],
        ignorePath: /^(\.\.\/)*\.\./
      },
      compass: {
        src: ['<%= config.src %>/assets/styles/**/*.{scss,sass}'],
        ignorePath: /^(\.\.\/)+/
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.src %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'assets/**/*.*',
            '!assets/styles/**'
          ]
        }]
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'compass'
      ],
      dist: [
        'compass'
      ]
    }

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('serve', 'start the server and preview your app', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'assemble',
      'browserSync:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'concurrent:dist',
    'copy:dist',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
