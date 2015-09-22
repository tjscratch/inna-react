module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/Users/alex/work/inna-front-react/build',
            deployTo: '/home/deploy/www/inna-react',
            repositoryUrl: 'git@bitbucket.org:innatec/inna-front-react.git',
            ignores: ['.git', 'node_modules'],
            keepReleases: 2,
            deleteOnRollback: false,
            key: '~/.ssh/id_rsa.pub',
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
};