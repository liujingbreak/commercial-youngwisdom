module.exports = function (grunt) {
	// Load NPM modules as needed
	require('jit-grunt')(grunt);
  
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		src_dir: 'webapp',
		dest_dir: 'webapp/dist',
		less:{
			all:{
				files: {
					'<%=dest_dir%>/styles/youngwisdom-temp.css': '<%=src_dir%>/styles/*.less'
				}
			}
		},
		
		autoprefixer:{
			options: {
			  browsers: ['last 3 versions', 'ie 8', 'ie 9']
			},
			all:{
				src:['<%=dest_dir%>/styles/*.css','!<%=dest_dir%>/styles/youngwisdom.css'],
				dest:'<%=dest_dir%>/styles/youngwisdom.css'
			}
		},
		
		watch:{
			js:{
				files:[ '<%=src_dir%>/js/**/*.js', '!<%=src_dir%>/js/i18n/*.js'],
				tasks: ['concat','uglify']
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
		},
		
		uglify:{
			options:{
				sourceMap: true
			},
			js:{
				files:{
					'<%=dest_dir%>/js/youngwisdom.min.js':'<%=dest_dir%>/js/youngwisdom.js'
				}
			}
		},
		
		hashres: {
			options: {
				fileNameFormat: '${name}.${ext}?${hash}',
				renameFiles: false
			},
			prod: {
				src: ['<%= dest_dir %>/js/*.js', '<%= dest_dir %>/styles/*.css'],
				dest: '<%=src_dir%>/views/index.html'
			}
		}
	});
	grunt.registerTask('default', ['concat', 'less', 'autoprefixer', 'uglify']);
	grunt.registerTask('production', ['concat', 'less', 'autoprefixer', 'uglify', 'hashres']);
}
