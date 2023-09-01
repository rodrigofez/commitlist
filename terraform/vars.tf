/*
 * Code to declare the variables for terraform
 */

variable "aws_region" {
  type        = string
  description = "Region to use"
  default     = "us-east-2"
}


variable "aws_zones" {
  type        = list(string)
  description = "List of availability zones to use"
  default     = ["us-east-2a", "us-east-2b"]
}

variable "aws_ecr_repo" {
  type    = string
  default = "commitlist-repo"
}
