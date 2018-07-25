'use strict';
module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Show grunt task time
  require('time-grunt')(grunt);

  // Configurable paths for the app
  var appConfig = {
    app: 'app',
    dist: 'dist'
  };

  // Grunt configuration
  grunt.initConfig({

    // Project settings
    fleetmanager: appConfig,

    // The grunt server settings
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              //connect.static(appConfig.app)
              connect.static(appConfig.dist)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= fleetmanager.dist %>'
        }
      }
    },
    // Compile less to css
    less: {
      development: {
        options: {
          compress: true,
          optimization: 2
        },
        files: {
          "app/styles/style.css": "app/less/style.less"
        }
      }
    },
    // Watch for changes in live edit
    watch: {
      styles: {
        files: ['app/less/**/*.less'],
        tasks: ['less', 'copy:styles'],
        options: {
          nospawn: true,
          livereload: '<%= connect.options.livereload %>'
        }
      },
      js: {
        files: ['<%= fleetmanager.app %>/scripts/**/*.*'],
        tasks: ['uglify'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        tasks: ['copy:html','copy:resources'],
        files: [
          '<%= fleetmanager.app %>/**/*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= fleetmanager.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= fleetmanager.app %>/resources/*.*'
        ]
      }
    },
    concat: {
      options: {
        separator: '\n\n',
        banner: '/**************************************************************/\n' +
        '/*********Concatenated Vendor minified dependencies ***********/\n' +
        '/**************************************************************/\n'
      },
      'vendor-js': {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/jquery-ui/jquery-ui.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/metisMenu/dist/metisMenu.min.js',
          'bower_components/jquery-slimscroll/jquery.slimscroll.min.js',
          'bower_components/angular/angular.min.js',
          'bower_components/ng-file-upload/ng-file-upload.min.js',
          'bower_components/angular-ui-router/release/angular-ui-router.min.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
          'bower_components/angular-animate/angular-animate.min.js',
          'bower_components/ngstorage/ngStorage.js',
          'bower_components/angular-sanitize/angular-sanitize.js',
          'bower_components/angular-notify/dist/angular-notify.js',
          'bower_components/jstree/dist/jstree.js',
          'bower_components/ng-js-tree/dist/ngJsTree.js',
          'bower_components/sweetalert/dist/sweetalert.min.js',
          'bower_components/angular-sweetalert/SweetAlert.min.js',
          'bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.js',
          'bower_components/datatables/media/js/jquery.dataTables.min.js',
          'bower_components/datatables/media/js/dataTables.bootstrap.min.js',
          'bower_components/angular-datatables/dist/angular-datatables.min.js',
          'bower_components/pace/pace.min.js',
          'bower_components/moment/min/moment.min.js',
          'bower_components/angular-datepicker/dist/angular-datepicker.min.js',
          'bower_components/fullcalendar/dist/fullcalendar.min.js',
          'bower_components/angular-ui-calendar/src/calendar.js',
          'bower_components/angular-deckgrid/angular-deckgrid.js',
          'bower_components/fullcalendar/dist/lang-all.js'
        ],
        dest: 'dist/scripts/vendor.min.js'
      },
      'vendor-css': {
        src: [
          'bower_components/fontawesome/css/font-awesome.min.css',
          'bower_components/bootstrap/dist/css/bootstrap.min.css',
          'bower_components/iCheck/skins/all.css',
          'bower_components/angular-notify/dist/angular-notify.css',
          'bower_components/jstree/dist/themes/default/style.css',
          'bower_components/sweetalert/dist/sweetalert.css',
          'bower_components/jasny-bootstrap/dist/css/jasny-bootstrap.min.css',
          'bower_components/datatables/media/css/dataTables.bootstrap.css',
          'bower_components/angular-datatables/dist/angular-datatables.css',
          'bower_components/angular-datepicker/dist/angular-datepicker.min.css',
          'bower_components/fullcalendar/dist/fullcalendar.min.css'
        ],
        dest: 'dist/styles/vendor.min.css'
      }
    },
    uglify: {
      options: {
        beautify: true,
        mangle: true,
        compress: { warnings: false },
        preserveComments: false,
        drop_console: false,
        sourceMap: true,
        banner: '/**** fleetmanager ***/'
      },
      main: {
        files: {
          'dist/scripts/script.v1.0.min.js': [
            'app/scripts/app.styles.js',
            'app/scripts/app.module.js',
            'app/scripts/app.constants.js',
            'app/scripts/app.route.js',
            'app/scripts/app.run.js',
            'app/scripts/directive/**/*.js',
            'app/scripts/factory/**/*.js',
            'app/scripts/filters/**/*.js',
            'app/scripts/service/**/*.js',
            'app/scripts/controller/**/*.js'
          ]
        }
      }
    },
    // Clean dist folder
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= fleetmanager.dist %>/{,*/}*',
            '!<%= fleetmanager.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= fleetmanager.app %>',
            dest: '<%= fleetmanager.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '*.html',
              'views/{,*/}*.html',
              'styles/{,*/}*.*',
              'img/{,*/}*.*',
              'resources/{,*/}*.*',
              'assets/**'
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: 'bower_components/fontawesome',
            src: ['fonts/*.*'],
            dest: '<%= fleetmanager.dist %>'
          },
          {
            expand: true,
            dot: true,
            cwd: 'bower_components/bootstrap',
            src: ['fonts/*.*'],
            dest: '<%= fleetmanager.dist %>'
          }
        ]
      },
      html: {
        expand: true,
        dot: true,
        cwd: '<%= fleetmanager.app %>',
        dest: '<%= fleetmanager.dist %>',
        src: [
          '*.html',
          'views/{,*/}*.html'
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= fleetmanager.app %>/styles',
        dest: '.tmp/styles/',
        src: '**'
      },
      resources : {
        expand: true,
        dot: true,
        cwd: '<%= fleetmanager.app %>',
        dest: '<%= fleetmanager.dist %>',
        src: [
          'resources/{,*/}*'
        ]
      }
    },
    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= fleetmanager.dist %>/scripts/**',
          '<%= fleetmanager.dist %>/styles/{,*/}*.css',
          '<%= fleetmanager.dist %>/styles/fonts/*'
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= fleetmanager.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= fleetmanager.dist %>'
        }]
      }
    },
    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/index.html']
    }
  });

  // Run dev version of app
  grunt.registerTask('dev', [
    'clean:server',
    'clean:dist',
    'less',
    'concat:vendor-js',
    'concat:vendor-css',
    'copy:styles',
    'copy:dist',
    'uglify',
    'connect:livereload',
    'watch'
  ]);

  // Run build version of app
  grunt.registerTask('server', [
    'build',
    'connect:dist:keepalive'
  ]);

  // Build version for production
  grunt.registerTask('build', [
    'clean:server',
    'clean:dist',
    'less',
    'concat:vendor-js',
    'concat:vendor-css',
    'uglify',
    'copy:styles',
    'copy:dist',
    'copy:resources'
  ]);

  //grunt.registerTask('build', [
  //  'clean:dist',
  //  'less',
  //  'useminPrepare',
  //  'concat',
  //  'copy:dist',
  //  'cssmin',
  //  'uglify',
  //  'filerev',
  //  'usemin',
  //  'htmlmin',
  //  'copy:webapp'
  //]);

};
