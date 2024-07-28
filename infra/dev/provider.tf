terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  features {}

  skip_provider_registration = true

  subscription_id = var.subscription_id
  tenant_id = var.tenant_id
  client_id = var.aks_client_id
  client_secret = var.aks_client_secret
}
