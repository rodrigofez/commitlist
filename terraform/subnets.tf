
resource "aws_subnet" "private_subnet" {
  count             = length(var.aws_zones)
  vpc_id            = aws_vpc.vpc.id
  availability_zone = element(var.aws_zones, count.index)
  cidr_block        = "10.0.${count.index + 3}.0/24"
  tags = {
    Name = "private-${element(var.aws_zones, count.index)}"
    Env  = "production"
  }
}

resource "aws_subnet" "public_subnet" {
  count                   = length(var.aws_zones)
  vpc_id                  = aws_vpc.vpc.id
  map_public_ip_on_launch = true
  availability_zone       = element(var.aws_zones, count.index)
  cidr_block              = "10.0.${count.index + 1}.0/24"
  tags = {
    Name = "public-${element(var.aws_zones, count.index)}"
    Env  = "production"
  }
}
