export const buildMenu = (role = 'USER_ROLE') => {
  const menu = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'Charts', url: '/dashboard/chart-1' },
        { title: 'ProgressBar', url: '/dashboard/progress' },
        { title: 'Promises', url: '/dashboard/promises' },
        { title: 'Rxjs', url: '/dashboard/rxjs' }
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        // { title: 'Users', url: 'users' },
        { title: 'Hospitals', url: 'hospitals' },
        { title: 'Doctors', url: 'doctors' }
      ]
    }
  ]

  if (role === 'ADMIN_ROLE') {
    menu.at(1).submenu.unshift({ title: 'Users', url: 'users' })
  }

  return menu
}
