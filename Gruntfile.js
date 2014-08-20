module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ac : {
      token: ''
    }
  });

  // load the tasks
  grunt.loadTasks('install')

  // Default task(s).
  grunt.registerTask('default', ['ac-token', 'ac-install']);

};