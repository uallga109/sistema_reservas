import React, { useState } from 'react';
import { User, Clock, Users, MapPin, CheckCircle, Phone, UserX, AlertCircle } from 'lucide-react';

interface Reservation {
  id: string;
  name: string;
  phone: string;
  time: string;
  guests: number;
  zone: string;
  status: 'pending' | 'checked-in' | 'no-show';
}

const initialReservations: Reservation[] = [
  { id: '1', name: 'Juan Pérez', phone: '600 123 456', time: '14:00', guests: 4, zone: 'Terraza', status: 'pending' },
  { id: '2', name: 'María García', phone: '611 222 333', time: '14:30', guests: 2, zone: 'Salón Principal', status: 'checked-in' },
  { id: '3', name: 'Carlos Rodríguez', phone: '622 333 444', time: '21:00', guests: 6, zone: 'Privado', status: 'pending' },
  { id: '4', name: 'Elena Martínez', phone: '633 444 555', time: '21:15', guests: 3, zone: 'Terraza', status: 'pending' },
  { id: '5', name: 'Roberto López', phone: '644 555 666', time: '21:30', guests: 2, zone: 'Barra', status: 'no-show' },
];

const TodayReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);

  const handleStatusChange = (id: string, newStatus: 'checked-in' | 'no-show') => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, status: newStatus } : res
    ));
    console.log(`Status changed for reservation ${id} to ${newStatus}`);
  };

  const getStatusBadge = (status: Reservation['status']) => {
    switch (status) {
      case 'checked-in':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">En Sala</span>;
      case 'no-show':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">No Presentado</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">Pendiente</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Reservas de Hoy</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">12 Confirmadas</span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">5 Pendientes</span>
        </div>
      </div>

      {/* PC Table View */}
      <div className="hidden md:block overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Hora</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Comensales</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Zona</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map((res) => (
              <tr 
                key={res.id} 
                className={`transition-colors duration-150 ${
                  res.status === 'checked-in' ? 'bg-green-50/50 hover:bg-green-50' : 
                  res.status === 'no-show' ? 'bg-red-50/30 hover:bg-red-50/50' : 
                  'hover:bg-gray-50'
                } ${res.status === 'pending' ? 'border-l-4 border-l-yellow-400' : 'border-l-4 border-l-transparent'}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs mr-3 ${
                      res.status === 'checked-in' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {res.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{res.name}</span>
                      <div className="md:hidden">
                        {getStatusBadge(res.status)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {res.phone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {res.time}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    {res.guests} pax
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {res.zone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {res.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleStatusChange(res.id, 'checked-in')}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
                        >
                          Check-in
                        </button>
                        <button
                          onClick={() => handleStatusChange(res.id, 'no-show')}
                          title="No presentado"
                          className="p-1.5 border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 rounded-lg transition-all"
                        >
                          <UserX className="h-5 w-5" />
                        </button>
                      </>
                    ) : (
                      getStatusBadge(res.status)
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {reservations.map((res) => (
          <div 
            key={res.id} 
            className={`bg-white p-5 rounded-xl border shadow-sm space-y-4 transition-all ${
              res.status === 'checked-in' ? 'bg-green-50/30 border-green-200' : 
              res.status === 'no-show' ? 'bg-red-50/20 border-red-200' : 
              'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${
                  res.status === 'checked-in' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {res.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{res.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 space-x-2">
                    <span className="uppercase tracking-wide">{res.zone}</span>
                    <span>•</span>
                    <span className="flex items-center"><Phone className="h-3 w-3 mr-1" /> {res.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-indigo-600">{res.time}</span>
                <span className="text-xs text-gray-500">{res.guests} personas</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 gap-3">
              <div className="flex-shrink-0">
                {getStatusBadge(res.status)}
              </div>
              
              {res.status === 'pending' && (
                <div className="flex items-center space-x-2 w-full justify-end">
                  <button
                    onClick={() => handleStatusChange(res.id, 'checked-in')}
                    className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Check-in
                  </button>
                  <button
                    onClick={() => handleStatusChange(res.id, 'no-show')}
                    className="p-2 border border-gray-200 text-gray-400 hover:text-red-600 rounded-lg"
                  >
                    <UserX className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayReservations;
