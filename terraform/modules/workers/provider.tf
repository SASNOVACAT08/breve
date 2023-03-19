terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
    }
  }
}

provider "cloudflare" {
  cloud {
    organization = "Ruben08"

    workspaces {
      name = "breve"
    }
  }
}
