
resource "aws_route_table" "internet_route_table" {
  vpc_id = aws_vpc.vpc.id
  tags = {
    Name = "internet-route-table"
    Env  = "production"
  }
}

resource "aws_route_table_association" "public_route" {
  count          = length(var.aws_zones)
  subnet_id      = element(aws_subnet.public_subnet.*.id, count.index)
  route_table_id = aws_route_table.internet_route_table.id
}

resource "aws_route_table" "private_route_table" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "private-route-table"
    Env  = "production"
  }
}

resource "aws_route_table_association" "private_route" {
  count          = length(var.aws_zones)
  subnet_id      = element(aws_subnet.private_subnet.*.id, count.index)
  route_table_id = aws_route_table.private_route_table.id
}



