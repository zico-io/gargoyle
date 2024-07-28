variable "app" {
  description = "Application to deploy"
  type = string
  default = "gargoyle"
}

variable "env" {
  description = "Deployment environment"
  type = string
  default = "dev"
}

variable "aks_client_id" {
  description = "Azure Kubernetes Service Cluster service principal"
  type = string
  default = null
}

variable "aks_client_secret" {
  description = "Azure Kubernetes Service Cluster password"
  type = string
  default = null
}

variable "subscription_id" {
  description = "Azure subscription ID"
  type = string
  default = null
}

variable "tenant_id" {
  description = "Azure subscription tenant ID"
  type = string
  default = null
}

variable "location" {
  type = string
  description = "Location for all resources."
  default = "eastus2"
}

variable "db_user" {
  type = string
  description = "Administrator username of the SQL logical server."
  default = "azureadmin"
}

variable "db_pass" {
  type = string
  description = "Administrator password of the SQL logical server."
  sensitive = true
  default = null
}
