variable "name" {
  type = string
  description = "Application tag"
}

variable "location" {
  type = string
  description = "Resource Group location"
  default = "eastus2"
}
