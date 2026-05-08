import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';
import { Calendar, Users, Clock, CheckCircle, XCircle, AlertCircle, Phone } from 'lucide-react';

registerLocale('es', es);

interface PastReservation {
  id: string;
  name: string;
  phone: string;
  time: string;
  guests: number;
  zone: string;
  status: 'completed' | 'no-show' | 'cancelled';
  date: string; // YYYY-MM-DD
}

const mockHistory: PastReservation[] = [
  { id: '101', name: 'Ana Belén', phone: '677 888 999', time: '13:30', guests: 2, zone: 'Salón', status: 'completed', date: '2024-05-07' },
  { id: '102', name: 'Pedro Picapiedra', phone: '600 000 000', time: '14:00', guests: 4, zone: 'Terraza', status: 'no-show', date: '2024-05-07' },
  { id: '103', name: 'Laura Palmer', phone: '655 444 333', time: '21:00', guests: 2, zone: 'Salón', status: 'cancelled', date: '2024-05-07' },
  { id: '104', name: 'James Cooper', phone: '644 111 222', time: '21:30', guests: 3, zone: 'Privado', status: 'completed', date: '2024-05-07' },
  { id: '105', name: 'Diane Selwyn', phone: '633 999 888', time: '22:00', guests: 2, zone: 'Barra', status: 'completed', date: '2024-05-07' },
  // More data for other days
  { id: '201', name: 'Sonia Monroy', phone: '699 888 777', time: '14:00', guests: 5, zone: 'Salón', status: 'completed', date: '2024-05-06' },
];

const HistoryReservations: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
  const filteredReservations = mockHistory.filter(res => res.date === formattedDate);

  const stats = {
    total: filteredReservations.length,
    completed: filteredReservations.filter(res => res.status === 'completed').length,
    noShow: filteredReservations.filter(res => res.status === 'no-show').length,
  };

  const getStatusBadge = (status: PastReservation['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" /> Completada
          </span>
        );
      case 'no-show':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" /> No presentado
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" /> Cancelada
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Historial de Reservas</h2>
          <p className="text-gray-500">Consulta el rendimiento de días anteriores</p>
        </div>

        <div className="relative inline-block">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Filtrar por fecha</label>
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <Calendar className="w-5 h-5 text-indigo-500 mr-2" />
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              locale="es"
              dateFormat="dd 'de' MMMM, yyyy"
              className="bg-transparent outline-none text-gray-700 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total del día</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-green-500">
          <p className="text-sm font-medium text-gray-500">Completadas</p>
          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-red-500">
          <p className="text-sm font-medium text-gray-500">No presentados</p>
          <p className="text-3xl font-bold text-red-600">{stats.noShow}</p>
        </div>
      </div>

      {/* PC Table */}
      <div className="hidden md:block overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Hora</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Comensales</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Zona</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado Final</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredReservations.map((res) => (
              <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">{res.name}</span>
                    <span className="text-xs text-gray-500 flex items-center mt-1">
                      <Phone className="w-3 h-3 mr-1" /> {res.phone}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" /> {res.time}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-400" /> {res.guests} pax
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {res.zone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {getStatusBadge(res.status)}
                </td>
              </tr>
            ))}
            {filteredReservations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                  No hay datos para esta fecha
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {filteredReservations.map((res) => (
          <div key={res.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{res.name}</h3>
                <p className="text-xs text-gray-500">{res.phone}</p>
              </div>
              {getStatusBadge(res.status)}
            </div>
            <div className="flex justify-between text-sm text-gray-600 pt-2 border-t border-gray-50">
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-gray-400" /> {res.time}</span>
              <span className="flex items-center"><Users className="w-4 h-4 mr-1 text-gray-400" /> {res.guests} pax</span>
              <span>{res.zone}</span>
            </div>
          </div>
        ))}
        {filteredReservations.length === 0 && (
          <div className="bg-gray-50 p-8 rounded-xl text-center text-gray-400 italic border border-dashed border-gray-200">
            No hay registros para este día
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryReservations;
