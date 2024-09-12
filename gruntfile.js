module.exports = function(grunt) {
    // Configuração do Grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Configuração do LESS
        less: {
            development: {
                files: {
                'dev/styles/style.css': 'src/styles/style.less'
                }
            }
        },

        // Configuração da compressão de JavaScript
        uglify: {
            build: {
                src: 'src/scripts/script.js',
                dest: 'dev/scripts/script.min.js'
            }
        },
        // configuração do plugin watch
        watch: { 
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },

        replace: {
            dev: {// criar o arquivo index.html no ambiente de desenvolvimento
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/style.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/script.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true, // desconsidera a pasta original src na hora de criar a pasta destino
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
        }
    })

    // Carregar os plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Registrar as tarefas padrão
    grunt.registerTask('default', ['less', 'uglify', 'watch', 'replace:dev']);
};
