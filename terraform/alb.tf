
resource "aws_lb" "alb" {
  name               = "alb"
  load_balancer_type = "application"
  internal           = false
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public_subnet.*.id
}

resource "aws_alb_target_group" "default" {
  name     = "alb-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.vpc.id

  health_check {
    path = "/api/v1/docs"
  }
}

resource "aws_alb_listener" "http" {
  load_balancer_arn = aws_lb.alb.id
  port              = "80"
  protocol          = "HTTP"
  depends_on        = [aws_alb_target_group.default]

  default_action {
    target_group_arn = aws_alb_target_group.default.arn
    type             = "forward"
  }

}
