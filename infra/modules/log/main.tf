resource "azurerm_log_analytics_workspace" "log" {
  name = "rg-${var.name}"
  location = var.location
  resource_group_name = var.rg_name
}
