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
            },
            production: { // compilação no ambiente de produção
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/style.min.css': 'src/styles/style.less'
                }
            }
        },

        // Configuração da compressão de JavaScript
        uglify: {
            build: {
                src: 'src/scripts/script.js',
                dest: 'dist/scripts/script.min.js'
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
                            replacement: './scripts/script.js'
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
            dist: {// criar o arquivo index.html no ambiente de produção
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/style.min.css'
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
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true // remove espaços em branco
                },
                files: {
                    'prebuild/index.html': 'src/index.html' // minificação para uma pasta temporária
                }
            }

        },
        clean: ['prebuild'], // apagar a pasta temporária prebuild
        uglify: {
            options: {
            // Opções do UglifyJS aqui
            },
            target: {
                files: {
                    'dist/scripts/script.min.js' : 'src/scripts/script.js' // Configuração dos arquivos de origem e destino aqui
                }
            }
        }

    })

    // Carregar os plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');//mimificação do html
    grunt.loadNpmTasks('grunt-contrib-clean');// apaga a pasta temporária prebuild


    // Registrar as tarefas padrão
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'uglify', 'clean']);
    grunt.registerTask('dev', ['less:development', 'replace:dev']);
};
