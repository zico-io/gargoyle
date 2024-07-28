variable "name" {
  type = string
  description = "Application name stack"
}

variable "location" {
  type = string
  description = "Resource Group location"
}

variable "rg_name" {
  type = string
  description = "Name of Resource Group"
}

variable "admin_username" {
  type = string
  description = "Administrator username of the SQL logical server."
}

variable "admin_password" {
  type = string
  description = "Administrator password of the SQL logical server."
  sensitive = true
}
