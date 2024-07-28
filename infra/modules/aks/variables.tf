variable "name" {
  type = string
  description = "Application tag"
}

variable "location" {
  type = string
  description = "Resource Group location"
}

variable "rg_name" {
  type = string
  description = "Name of Resource Group"
}

variable "client_id" {
  description = "Azure Kubernetes Service Cluster service principal"
  type = string
  default = null
}

variable "client_secret" {
  description = "Azure Kubernetes Service Cluster password"
  type = string
  sensitive = true
  default = null
}
