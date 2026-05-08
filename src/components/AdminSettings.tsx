import React, { useState } from 'react';
import { Clock, Calendar, Plus, Trash2, Save } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [openingTime, setOpeningTime] = useState('12:00');
  const [closingTime, setClosingTime] = useState('23:00');
  const [closedDays, setClosedDays] = useState({
    Lunes: true,
    Martes: false,
    Miércoles: false,
    Jueves: false,
    Viernes: false,
    Sábado: false,
    Domingo: false,
  });
  const [exceptionalDate, setExceptionalDate] = useState('');
  const [exceptionalDays, setExceptionalDays] = useState<string[]>([]);

  const handleDayToggle = (day: string) => {
    setClosedDays(prev => ({
      ...prev,
      [day]: !prev[day as keyof typeof prev]
    }));
  };

  const addExceptionalDay = () => {
    if (exceptionalDate && !exceptionalDays.includes(exceptionalDate)) {
      setExceptionalDays([...exceptionalDays, exceptionalDate]);
      setExceptionalDate('');
    }
  };

  const removeExceptionalDay = (date: string) => {
    setExceptionalDays(exceptionalDays.filter(d => d !== date));
  };

  const handleSave = () => {
    const settings = {
      horarios: {
        apertura: openingTime,
        cierre: closingTime,
      },
      diasCierreDefault: Object.keys(closedDays).filter(day => closedDays[day as keyof typeof closedDays]),
      diasExcepcionales: exceptionalDays,
    };
    console.log('Guardando Ajustes:', JSON.stringify(settings, null, 2));
    alert('Ajustes guardados correctamente (ver consola)');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Configuración del Sistema</h1>
        <button
          onClick={handleSave}
          className="flex items-center px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
        >
          <Save className="w-5 h-5 mr-2" />
          Guardar Ajustes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tarjeta 1 - Horarios */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center space-x-3 text-indigo-600">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Horarios de Reserva</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Hora de Apertura</label>
              <input
                type="time"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Hora de Cierre</label>
              <input
                type="time"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">
            * Define el rango en el que los clientes pueden realizar reservas.
          </p>
        </div>

        {/* Tarjeta 2 - Días de Cierre */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center space-x-3 text-indigo-600">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Gestión de Descanso</h2>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-600 block">Días de cierre semanal</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(closedDays).map((day) => (
                <button
                  key={day}
                  onClick={() => handleDayToggle(day)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    closedDays[day as keyof typeof closedDays]
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50 space-y-4">
            <label className="text-sm font-medium text-gray-600 block">Días Excepcionales (Festivos/Vacaciones)</label>
            <div className="flex space-x-2">
              <input
                type="date"
                value={exceptionalDate}
                onChange={(e) => setExceptionalDate(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50"
              />
              <button
                onClick={addExceptionalDay}
                className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>

            <div className="max-h-32 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {exceptionalDays.map((date) => (
                <div key={date} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                  <span className="text-sm text-gray-700">{new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <button
                    onClick={() => removeExceptionalDay(date)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {exceptionalDays.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-2">No hay días excepcionales añadidos</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
