output "aws_zones" {
  value = [var.aws_zones]
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.production.name
}

output "ecsServiceRole_arn" {
  value = aws_iam_role.ecs-service-role.arn
}

output "vpc_default_sg_id" {
  value = aws_security_group.ecs.id
}

output "vpc_id" {
  value = aws_vpc.vpc.id
}
