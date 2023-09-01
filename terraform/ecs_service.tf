
resource "aws_ecs_service" "service" {
  name                 = "commitlist"
  cluster              = aws_ecs_cluster.production.id
  desired_count        = 1
  force_new_deployment = true
  iam_role             = aws_iam_role.ecs-service-role.arn
  task_definition      = aws_ecs_task_definition.td.arn

  load_balancer {
    target_group_arn = aws_alb_target_group.default.arn
    container_name   = "worker"
    container_port   = 3000
  }

  depends_on = [aws_alb_listener.http, aws_iam_role_policy.ecs-service-role-policy]
}
