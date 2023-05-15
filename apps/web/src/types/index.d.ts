export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  roles?: string[]
}

export type MainNavItem = NavItem

export type DashboardConfig = {
  mainNav: MainNavItem[]
}
