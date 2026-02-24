import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useAppStore } from '@/store/appStore'
import { GreenyAI } from './GreenyAI'

export function AppShell() {
  const { sidebarOpen } = useAppStore()

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <Sidebar open={sidebarOpen} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <GreenyAI />
    </div>
  )
}
