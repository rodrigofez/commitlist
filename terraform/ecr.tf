
resource "aws_ecr_repository" "commitlist_worker" {
  name = "worker"
}

output "ecr_repository_worker_endpoint" {
  value = aws_ecr_repository.commitlist_worker.repository_url
}
