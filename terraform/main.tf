terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
    }
  }

  cloud {
    organization = "Ruben08"

    workspaces {
      name = "breve"
    }
  }
}

provider "cloudflare" {
  email   = var.cloudflare_email
  api_key = var.cloudflare_api_key
}

module "cloudflare_workers" {
  source       = "./modules/workers"
  account_id   = var.account_id
  kv_namespace = var.kv_namespace
}

module "cloudflare_web" {
  source       = "./modules/web"
  account_id   = var.account_id
  project_name = var.project_name
}
