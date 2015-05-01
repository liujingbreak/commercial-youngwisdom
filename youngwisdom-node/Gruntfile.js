module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		src_dir: '../webapp',
		dest_dir: '../webapp/dist',
		less:{
			lj:{
				files: {
					'<%=dest_dir%>/styles/youngwisdom.css': '<%=src_dir%>/styles/youngwisdom.less'
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.registerTask('default', ['less']);
	
}
