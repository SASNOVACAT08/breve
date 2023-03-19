variable "account_id" {
  type      = string
  sensitive = true
}

variable "kv_namespace" {
  type = string
}

variable "project_name" {
  type = string
}

variable "cloudflare_email" {
  type      = string
  sensitive = true
}

variable "cloudflare_api_key" {
  type      = string
  sensitive = true
}
