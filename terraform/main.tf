terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

variable "image_tag" {
  description = "Imagem Docker que leva deploy"
  type        = string
  default     = "latest"
}

variable "image_repo" {
  description = "Repositório da imagem Docker (user/repo)"
  type        = string
  default     = "JeffAlexandrino/strapi-a3"
}

# Cria o Grupo de Recursos
resource "azurerm_resource_group" "rg" {
  name     = "rg-strapi-a3-devops-projeto"
  location = "East US"
}

# Cria os Containers 
resource "azurerm_container_group" "strapi" {
  name                = "strapi-container-projeto"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  ip_address_type     = "Public"
  dns_name_label      = "strapi-devops-a3-${random_string.suffix.result}"
  os_type             = "Linux"

  container {
    name   = "strapi"
    image  = "${var.image_repo}:${var.image_tag}"
    cpu    = "1"
    memory = "1.5"

    ports {
      port     = 1337
      protocol = "TCP"
    }
    
    # Ambiente para Azure
    environment_variables = {
      NODE_ENV            = "production"
      APP_KEYS            = "chaveSeguraA,chaveSeguraB"
      API_TOKEN_SALT      = "saltGeradoAleatoriamente"
      ADMIN_JWT_SECRET    = "segredoAdminDificil"
      TRANSFER_TOKEN_SALT = "outroSaltDificil"
      JWT_SECRET          = "segredoJWTDificil"
      DATABASE_CLIENT     = "sqlite"
    }
  }
}

resource "random_string" "suffix" {
  special = false
  upper   = false
  length  = 6
}

output "app_url" {
  value = "http://${azurerm_container_group.strapi.fqdn}:1337"
}