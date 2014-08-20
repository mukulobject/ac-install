var http = require('http');
var querystring = require('querystring');

module.exports = function(grunt) {
    grunt.registerTask('ac-token', function() {
        var done = this.async();

        var options = {
            hostname: 'localhost',
            port: 2990,
            path: '/jira/rest/plugins/1.0/?'+querystring.stringify({ "os_authType": "basic" }),
            method: 'GET',
            headers: { 
                'content-type': 'application/json',
                'accept': '*/*',
                'authorization': 'Basic ' + new Buffer('admin:admin').toString('base64') 
            }
        };

        grunt.log.writeln("### sendHttpRequest: fetching upm-token");
        http.get(options, function(response) {
            response.once('data', function (chunk) {
                if(!response || !response.headers || !response.headers["upm-token"]){
                    grunt.log.writeln('### Response undefined! Could not fetch upm-token');
                    return;
                }
                else{
                    var upm_token = response.headers["upm-token"];
                    grunt.log.writeln('### UPM Token - '+ upm_token);
                    grunt.config.set('ac.token', upm_token);
                    
                }
            });
            response.once('error', function (e) {
                grunt.log.writeln('### error fetching upm-token - '+e.message);
            });
            response.once('end', function () {
                grunt.log.writeln('### end request: fetching upm-token');
                done(true);
            });
        });
    });
};