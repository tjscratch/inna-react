module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/Users/alex/work/inna-front-react/build',
            deployTo: '/home/deploy/www/inna-react',
            repositoryUrl: 'git@bitbucket.org:innatec/inna-front-react.git',
            branch: 'master',
            ignores: ['.git', 'node_modules'],
            keepReleases: 2,
            deleteOnRollback: false,
            //key: '~/.ssh/id_rsa.pub',
            shallowClone: true
        },
        staging: {
            servers: 'root@5.200.60.73:2223'
        }
    });

    shipit.task('pwd', function () {
        return shipit.remote('pwd');
    });

    shipit.task('ls', function () {
        return shipit.remote('ls -la');
    });

    shipit.on('cleaned', function () {
        console.log('event cleaned');

        return shipit.start(
            'after.deploy::copy.package.json',
            'after.deploy::run.npm.install',
            'after.deploy::npm.install.fix',
            'after.deploy::run.build',
            'after.deploy::restart.forever',
            'print.rollback'
        );
    });

    shipit.task('print.rollback', function () {
        console.log('=================================================');
        console.log('Отменить деплой:');
        console.log('shipit staging rollback');
        console.log('=================================================');
    });

    //копируем package.json в корневую папку,
    //чтобы каждый раз не устанавливать все пакеты заново
    //для ускорения билда короче
    shipit.blTask('after.deploy::copy.package.json', function () {
        return shipit.remote('cd ' + shipit.currentPath + ' && cp package.json ' + shipit.config.deployTo);
    });

    //запускаем npm install в корневой папке
    shipit.blTask('after.deploy::run.npm.install', function () {
        return shipit.remote('cd ' + shipit.config.deployTo + ' && npm install');
    });

    //react-routing кривой, должен быть установлен в папку c билдом
    shipit.blTask('after.deploy::npm.install.fix', function () {
        return shipit.remote('cd ' + shipit.currentPath + '; npm install react-routing; npm install normalize.css');
    });

    //запускаем build --release в текущем билде
    shipit.blTask('after.deploy::run.build', function () {
        return shipit.remote('cd ' + shipit.currentPath + ' && npm run build --release');
    });

    //перезапускаем приложение
    //forever list | grep -q build.server.js - возвращает 0 - если не нашлось строки 'build.server.js', 1 - если нашлось
    //и соответственно запускается команда
    shipit.blTask('after.deploy::restart.forever', function () {
        var cmd = '';
        cmd += ' forever list | grep -q build.server.js && forever stop '+ shipit.currentPath + '/build/server.js;';
        cmd += ' forever start '+ shipit.currentPath + '/build/server.js;';
        return shipit.remote(cmd);
    });
};


//ssh -p 2223 root@5.200.60.73 "cd /home/deploy/www/inna-react/current; forever list | grep -q build.server.js && forever restart build/server.js; !(forever list | grep -q build.server.js) && forever start build/server.js;"