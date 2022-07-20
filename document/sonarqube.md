# SONARQUBE
   We will use docker to run [Sonarqube](https://www.sonarqube.org/).

## Steps for install Docker
Install docker using following link for your OS.
    -[Install Docker](https://docs.docker.com/compose/install/compose-desktop/)

------------------------------------------------
## Implement Sonarqube with Docker

### Steps for Windows

Using the cmd terminal,

1. Get SonarQube
```
docker pull sonarqube
```

2. Run SonarQube
```
docker run --name sonarqube --restart always -p 9000:9000 -d sonarqube
```

3. Go to localhost: 9000 and there should be a running instance with admin as default login details

4. To run Sonarqube image use docker container.

### Steps for Ubuntu
- Download the SonarQube Docker image from the online repository
```
 docker pull sonarqube
```
- List the Docker images installed on your system
```
 docker images
```
- Here is the command output:
```
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
sonarqube           latest              3287e6831017        3 weeks ago         461MB
```
- Create Docker volumes to store the SonarQube persistent data
```
docker volume create sonarqube-conf 
docker volume create sonarqube-data
docker volume create sonarqube-logs
docker volume create sonarqube-extensions
```
- Verify the persistent data directories.
```
docker volume inspect sonarqube-conf 
docker volume inspect sonarqube-data
docker volume inspect sonarqube-logs
docker volume inspect sonarqube-extensions
```
- Optionally, create symbolic links to an easier access location.
```
mkdir /sonarqube
ln -s /var/lib/docker/volumes/sonarqube-conf/_data /sonarqube/conf
ln -s /var/lib/docker/volumes/sonarqube-data/_data /sonarqube/data
ln -s /var/lib/docker/volumes/sonarqube-logs/_data /sonarqube/logs
ln -s /var/lib/docker/volumes/sonarqube-extensions/_data /sonarqube/extensions
```
- Start a SonarQube container with persistent data storage.
```
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 -v sonarqube-conf:/opt/sonarqube/conf -v sonarqube-data:/opt/sonarqube/data -v sonarqube-logs:/opt/sonarqube/logs -v sonarqube-extensions:/opt/sonarqube/extensions sonarqube
```

SonarQube - Docker container management
- Verify the containers status using the following command:
```
docker ps -a
```

- Verify the status of a container.
```
docker ps -a -f name=sonarqube
```

- To stop a container, use the following command:
```
docker container stop sonarqube
```

- To start a container, use the following command:
```
docker container start sonarqube
```

- To restart a container, use the following command:
```
docker container restart sonarqube
```

- In case of error, use the following command to verify the container logs.
```
docker logs sonarqube
```

### Step for SonarQube dashboard

- Open your browser and enter the IP address of your web server plus :9000
- In our example, the following URL was entered in the Browser:
    - http://localhost:9000
    - http://127.0.0.1/:9000
    - http://yourip:9000
- The SonarQube dashboard will be presented.
- Click on the Login button and use the Sonarqube default username and password.
    - Default Username: admin
    - Default Password: admin
- After First time login you need to set new password.
- Congratulations! You have finished the SonarQube Docker installation !!!


------------------------------------------------
## Create project using GITHUB

- You need to use a GitHub App to connect SonarQube and GitHub so you can import your GitHub repositories into SonarQube. This is also the first step in adding authentication, and, starting in `Developer Edition`, the first step in reporting your analysis and Quality Gate status to your pull requests.\

- Steps...
    1. Creating your GitHub App
        - https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app
        - Navigate to `settings > Developer settings > GitHub Apps`
        - Follow other steps from docs.
    2. Installing your GitHub App in your organization
        - https://docs.sonarqube.org/latest/analysis/github-integration/
    3. Updating your SonarQube global settings with your GitHub App information
        - Navigate to Administration > Configuration > General Settings > DevOps Platform Integrations > GitHub

- Docs for follow the steps : https://docs.sonarqube.org/latest/analysis/github-integration

------------------------------------------------
## Create project using GITLAB

- You can delegate authentication to GitLab using a dedicated GitLab OAuth application.

- Steps...
    1. Creating a GitLab OAuth app
        - https://docs.gitlab.com/ee/integration/oauth_provider.html
        - After saving your application, you find your Application ID and Secret.
        - Add Application ID, secret to the `Administration > Configuration > General Settings > DevOps Platform Integrations > GitLab > Authentication`.
    2. GitLab group synchronization
        - To synchronize a GitLab group or subgroup with a SonarQube group, name the SonarQube group with the full path of the GitLab group or subgroup URL (Synchronize user groups at `Administration > Configuration > General Settings > DevOps Platform Integrations > GitLab`).
    3. Importing your GitLab projects into SonarQube
        - To set up the import of GitLab projects:
            1. Set your global settings
            2. Add a personal access token for importing repositories
    4. Analyzing projects with GitLab CI/CD
        - To analyze your projects with GitLab CI/CD, you need to:
            1. Set your environment variables.
            2. Configure your gilab-ci.yml file.

- Docs for follow the steps : https://docs.sonarqube.org/latest/analysis/gitlab-integration



