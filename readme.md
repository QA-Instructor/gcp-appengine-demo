# Deploying to App Engine
This repo is an example of how to deploy a React/SpringBoot/MySQL application to GCP App Engine using Cloud Build. The 
front-end and back-end are configuerd as seperate services in the same App Engine instance, and connected using a 
[dispach.yaml file](https://cloud.google.com/appengine/docs/standard/python/reference/dispatch-yaml).

In this example Cloud Builder builds two images (front end and back end image), stores both in Container Registry and 
then uses the `gcloud app deploy` command do deploy each image to the same App Engine.

## Steps

### 1. Set up the environment and create app engine

````
export PROJECT=[PROJECT-NAME]
export ZONE=europe-west1-b
export REGION=europe-west1

gcloud app create
gcloud auth application-default login
````

Enable all APIs:

````
gcloud services enable appengine.googleapis.com --async
gcloud services enable appengineflex.googleapis.com --async
gcloud services enable sqladmin.googleapis.com --async
gcloud services enable sql-component.googleapis.com --async
````

### 2. Set up Cloud SQL
In this example we will be using the MySQL version of Cloud SQL.

````
# Create cloud SQL instance
gcloud sql instances create [DATABASE-NAME] \
    --tier=db-n1-standard-1 \
    --region=${REGION}

# Set password for user
gcloud sql users set-password root \
    --host=% --instance [DATABASE-NAME] \
    --password [PASSWORD]

# Create database
gcloud sql databases create inventory \
    --instance=[DATABASE-NAME]
````

Get the connection name using:
````
gcloud sql instances describe [DATABASE-NAME] | grep connectionName
````
Paste the connection name in resources/application-mysql.properties, update the password and database-name properties.

Use `mvn spring-boot:run` from the terminal to test the application.

### Set up Cloud Builder

Navigate to Cloud Build -> Triggers -> Connect Repository. Connect your GitHub repo which holds this repo (Skip creating
the first trigger).

To avoid manually setting up the trigger you can pull soruce code into cloud shell, navigate to the repo folder and use
the below script to call the api:

````
    curl -X POST \
        https://cloudbuild.googleapis.com/v1/projects/${PROJECT}/triggers \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
        --data-binary @buildtrigger.json
````

This trigger will monitor the repo and call the `cloudbuild.yaml` file when there is a push to master. 

#### Grant Cloud Builder SA Necessary permissions

We need to grant some more permissions to the cloudbuild service account. Navigate to IAM & Admin page and use the edit
(pencil button) to add these accounts to the `cloud build service account`.
- App Engine Admin
- Cloud SQL Admin

### Set up App Engine
Change the `<deploy.projectId>` in the pom.xm file to point to your GCP project.

### Test
Push some code to the master branch of your github. This should activate the trigger and deploy to App Engine.

