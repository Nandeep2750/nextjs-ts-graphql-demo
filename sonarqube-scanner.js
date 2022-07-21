const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'https://16e4-182-70-121-2.in.ngrok.io',
        token: "sqp_2b1ed6a0793eb286aa6e2c2adfd64afc24816df9",
        options: {
            'sonar.projectName': 'test next js',
            'sonar.projectDescription': 'Next js GraphQL project',
            'sonar.sources': './',
            'sonar.login': 'admin',
            'sonar.password': 'Admin@123',
        }
    },
    () => process.exit()
)