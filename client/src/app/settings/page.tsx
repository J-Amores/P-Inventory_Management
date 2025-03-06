import React from 'react'
import { AppLayout } from '../components/app-layout'

const SettingsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Settings Content</h2>
          <p>Settings page content will go here.</p>
        </div>
      </div>
    </AppLayout>
  )
}

export default SettingsPage;