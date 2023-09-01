terraform {
  backend "s3" {
    bucket         = "commitlist-tf-state-stg-2"
    key            = "tf-infra/terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "commitlist-tf-state-locking-stg"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.14.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

