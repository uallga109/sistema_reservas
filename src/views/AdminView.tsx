import React, { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import TodayReservations from '../components/TodayReservations'
import PlanoSala from '../components/PlanoSala'
import AdminSettings from '../components/AdminSettings'
import HistoryReservations from '../components/HistoryReservations'

const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reservas')

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'reservas' && <TodayReservations />}
      {activeTab === 'historial' && <HistoryReservations />}
      {activeTab === 'plano' && <PlanoSala />}
      {activeTab === 'carta' && (
        <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.247 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Gestión de Carta</h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Próximamente: Aquí podrás añadir y modificar los platos de La Cava Aguadulce de forma dinámica.
          </p>
        </div>
      )}
      {activeTab === 'ajustes' && <AdminSettings />}
    </DashboardLayout>
  )
}

export default AdminView
