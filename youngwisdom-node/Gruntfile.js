module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		src_dir: '../webapp',
		dest_dir: '../webapp/dist',
		less:{
			all:{
				files: {
					'<%=dest_dir%>/styles/youngwisdom.css': '<%=src_dir%>/styles/*.less'
				}
			}
		},
		
		autoprefixer:{
			options: {
			  browsers: ['last 3 versions', 'ie 8', 'ie 9']
			},
			all:{
				src:['<%=dest_dir%>/styles/*.css']
			}
		},
		
		watch:{
			js:{
				files:[ '<%=src_dir%>/js/*.js', '!<%=src_dir%>/js/i18n/*.js'],
				tasks: ['concat:js']
			},
			less:{
				files:['<%=src_dir%>/styles/**/*.less'],
				tasks: ['less', 'autoprefixer']
			}
		},
		
		concat:{
			js: {
				files:{
					'<%=dest_dir%>/js/youngwisdom.js': ['<%=src_dir%>/js/modules.js', '<%=src_dir%>/js/**/*.js', '!<%=src_dir%>/js/i18n/*.js']
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.registerTask('default', ['concat', 'less', 'autoprefixer']);
	
}
