# Terraform infrastructure

This terraform project uses Amazon S3 as Backend to store the .tfstate files. Also it uses a DynamoDB Table to lock the state of the infrastructure.

Note: you can choose to instead store locally the state by just commenting out the backend definition in the root `main.tf` and ignoring step 1.

## Prerequisites

- AWS CLI
- Terraform CLI

## 1. Create the AWS backend to store tfstate

1. Login into your AWS Account

   ```bash
   aws configure
   ```

2. Go to the `/terraform-backend` directory

   ```bash
   cd terraform-backend
   ```

3. Initialize terraform

   ```bash
   terraform init
   ```

4. Create the variable definition file local.tfvars in the root of `terraform-backend`:
   ```bash
   touch local.tfvars
   ```
5. Add into the local.tfvars the variables defined in `vars.tf`, make sure they're unique:
   ```bash
   aws_dynamodb_backend_state_lock="your-dynamodb-table-name"
   aws_s3_backend_state="your-s3-bucket-name"
   ```
6. Execute all terraforms value using the flag --var-file
   ```bash
   terraform plan --var-file="local.tfvars"
   terraform apply --var-file="local.tfvars" -auto-approve
   ```
7. Your backend is created, now you can use this S3 bucket and DynamoDB table as a backend to save the state of your infrastructure, and return to the root directory to provision the app infrastructure.

---

## 2. Provision AWS infrastructure

1. Make sure you're in the root directory.

2. Login into your AWS Account

   ```bash
   aws configure
   ```

3. Initialize terraform, replace `your-s3-bucket-name` and `your-dynamodb-table` with the names of the S3 bucket and DynamoDb tables created in step 1 (note: if you choose to have a local state just run `terraform init`)

   ```bash
   terraform init \
    -backend-config="bucket=your-s3-bucket-name" \
    -backend-config="dynamodb_table=your-dynamodb_table"
   ```

4. Execute the plan command to review the resources to be created

   ```bash
   terraform plan
   ```

5. Execute the apply command to create the resources
   ```bash
   terraform apply
   ```
6. Once all resources are created you will receive the `ecr_repository_worker_endpoint` as an output which you can use to push the Docker image to ECR and deploy your app.

7. Now you can go to the root where you have your Dockerfile, and run the following commands, replacing in each of them `ecr_repository_worker_endpoint` with the output received to push your containarized app to ECR and deploy it to ECS.

   ```bash
   aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin ecr_repository_worker_endpoint

   docker build -t worker .

   docker tag worker:latest ecr_repository_worker_endpoint

   docker push ecr_repository_worker_endpoint
   ```
