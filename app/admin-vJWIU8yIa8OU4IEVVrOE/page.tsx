'use client'

import Link from 'next/link'
import { ADMIN_PATH } from '@/lib/admin-path'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
            <div className="space-y-4">
              <Link
                href={`/${ADMIN_PATH}/recipes`}
                className="block w-full p-6 bg-primary-dark text-white rounded-xl hover:bg-primary-dark/90 transition-colors"
              >
                <h2 className="text-xl font-semibold mb-2">Recipe Management</h2>
                <p className="text-white/80 text-sm">Add, edit, and delete recipes</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

