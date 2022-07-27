const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'https://sonarqube.openxcell.dev',
        token: "sqp_a4e1c564ea212348fbbf9a5c767468d8993826ce",
        options: {
            'sonar.projectName': 'nextjs-ts-graphql-demo',
            'sonar.projectDescription': 'Next js GraphQL project',
            'sonar.sources': './',
            'sonar.login': 'admin',
            'sonar.password': 'admin123',
        }
    },
    () => process.exit()
)