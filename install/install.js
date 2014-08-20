var http = require('http');

module.exports = function(grunt) {
    grunt.registerTask('ac-install', function() {
    var done = this.async();
    var upm_token = grunt.config.get('ac.token');
    var pkg= grunt.file.readJSON('package.json');
    grunt.log.writeln('### sending post request to install add on - '+ upm_token);

    var post_options = {
        hostname: pkg.host,
        port: pkg.port,
        path: '/jira/rest/plugins/1.0/?token='+upm_token,
        method: 'POST',
        headers: { 
            'Content-Type': 'application/vnd.atl.plugins.install.uri+json',
            'authorization': 'Basic ' + new Buffer('admin:admin').toString('base64') 
        }
    };

    var post_data = {
                'pluginUri' : 'http://localhost:9000/atlassian-connect.json'
            };
    
    var post_request = http.request(post_options, function(res) {
        res.once('data', function (chunk) {
            if(!res || res.statusCode !== 202){
                grunt.log.writeln('### Error installing addon!' + res.statusCode);
                return;
            }
            grunt.log.writeln('### data - '+chunk);
        });
        res.once('error', function (e) {
            grunt.log.writeln('### Error installing addon - '+e.message);
        });
        res.once('end', function () {
            grunt.log.writeln('### end request: installing addon');
            done(true);   
        });
    });
    
    post_request.write(JSON.stringify(post_data));
    post_request.end();

    });
};