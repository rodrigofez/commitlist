resource "aws_ecs_task_definition" "td" {
  family = "commitlist"
  container_definitions = jsonencode([
    {
      "essential" : true,
      "memory" : 512,
      "name" : "worker",
      "cpu" : 512,
      "image" : "${replace(aws_ecr_repository.commitlist_worker.repository_url, "https://", "")}:latest",
      "environment" : [],
      "portMappings" : [
        {
          "containerPort" : 3000,
          "protocol" : "tcp",
          "hostPort" : 0
        }
      ],
    }
  ])
}
