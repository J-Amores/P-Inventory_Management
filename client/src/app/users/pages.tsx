import React from 'react'
import { AppLayout } from '../components/app-layout'

const UsersPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Users List</h2>
          <p>Users list content will go here.</p>
        </div>
      </div>
    </AppLayout>
  )
}

export default UsersPage;