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
