locals {
  stack = "${var.app}-${var.env}-${var.location}"

  default_tags = {
    environment = var.env
    owner = "zico-io"
    app = var.app
  }
}

module "rg" {
  source = "../modules/rg"
  name = local.stack
  location = var.location
}

module "log" {
  source = "../modules/log"
  name = local.stack
  location = module.rg.location
  rg_name = module.rg.name
}

module "sql" {
  source = "../modules/sql"
  name = local.stack
  location = module.rg.location
  rg_name = module.rg.name

  admin_username = var.db_user
  admin_password = var.db_pass
}

module "aks" {
  source = "../modules/aks"
  name = local.stack
  location = module.rg.location
  rg_name = module.rg.name
  
  client_id = var.aks_client_id
  client_secret = var.aks_client_secret
}
