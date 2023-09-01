/*
 * Code to declare the variables for terraform
 */

variable "aws_region" {
  type        = string
  description = "Region to use"
  default     = "us-east-2"
}

variable "aws_s3_backend_state" {
  type        = string
  description = "Insert the name of the S3 bucket to be created to be used as backend"
}

variable "aws_dynamodb_backend_state_lock" {
  type        = string
  description = "Insert the name the dynamodb table to be created to be used as backend"
}

