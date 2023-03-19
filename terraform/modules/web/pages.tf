resource "cloudflare_pages_project" "project" {
  account_id        = var.account_id
  name              = var.project_name
  production_branch = "main"
}
