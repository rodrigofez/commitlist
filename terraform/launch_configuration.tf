
resource "aws_launch_configuration" "aws_conf" {
  image_id                    = data.aws_ami.ecs_ami.id
  instance_type               = "t2.micro"
  security_groups             = [aws_security_group.ecs.id]
  associate_public_ip_address = true
  iam_instance_profile        = aws_iam_instance_profile.ecs.name
  name_prefix                 = "launch-configuration-"

  user_data = templatefile("user_data.tftpl", {
    ecs_cluster_name = aws_ecs_cluster.production.name
  })

  lifecycle {
    create_before_destroy = true
  }
}
