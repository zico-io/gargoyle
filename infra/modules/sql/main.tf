resource "azurerm_mssql_server" "sql_server" {
  name = "sql-${var.name}"
  location = var.location
  resource_group_name = var.rg_name
  administrator_login = var.admin_username
  administrator_login_password = var.admin_password

  version = "12.0"
}

resource "azurerm_mssql_database" "db" {
  name = "db-${var.name}"
  server_id = azurerm_mssql_server.sql_server.id
}

