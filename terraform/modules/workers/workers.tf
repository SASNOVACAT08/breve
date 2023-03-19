resource "cloudflare_workers_kv_namespace" "kv_namespace" {
  account_id = var.account_id
  title      = var.kv_namespace
}

resource "cloudflare_worker_script" "get_file" {
  account_id = var.account_id
  name       = "get"
  content    = file("../apps/workers/dist/get/index.js")
  module     = true

  kv_namespace_binding {
    name         = var.kv_namespace
    namespace_id = cloudflare_workers_kv_namespace.kv_namespace.id
  }
}

resource "cloudflare_worker_script" "post_file" {
  account_id = var.account_id
  name       = "upload"
  content    = file("../apps/workers/dist/post/index.js")
  module     = true

  kv_namespace_binding {
    name         = var.kv_namespace
    namespace_id = cloudflare_workers_kv_namespace.kv_namespace.id
  }
}
