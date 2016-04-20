'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);


grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  sass: {
    dist: {
      files: {
        'css/main.css' : 'css/scss/main.scss'
      }
    }
  },

  postcss: {
    options: {
      map: true,

      processors: [
        require('pixrem')(),
        require('autoprefixer')({browsers: 'last 2 versions'}),
        require('cssnano')()
      ]
    },
    dist: {
      files: {
        'css/main.css': ['css/main.css']
      }
    }
  },

  imagemin: {
    dynamic: {
      files: [{
        expand: true,
        cwd: 'images/orig_assets',
        src: ['*.{png,jpg,gif}'],
        dest: 'images'
      }]
    }
  },

  watch: {
    css: {
      files: ['css/scss/**/*.scss'],
      tasks: ['sass', 'postcss'],
    }
  }

});

grunt.registerTask('build', ['sass', 'postcss', 'imagemin', 'watch']);

};
