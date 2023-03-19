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
