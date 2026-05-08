import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';

registerLocale('es', es)

interface ReservationData {
  date: Date | null
  time: string
  diners: number
  zone: string
  name: string
  phone: string
  email: string
}

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState<ReservationData>({
    date: new Date(),
    time: '',
    diners: 2,
    zone: 'Salón',
    name: '',
    phone: '',
    email: '',
  })

  // Simulated state for closed days (Mondays and tomorrow)
  const [closedDays] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return {
      mondays: true,
      specificDays: [tomorrow.toDateString()]
    }
  })

  // Function to generate time options every 15 minutes
  const generateTimeOptions = (start: string, end: string) => {
    const times = []
    let current = new Date(`2024-01-01T${start}:00`)
    const endTime = new Date(`2024-01-01T${end}:00`)

    while (current <= endTime) {
      times.push(current.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }))
      current.setMinutes(current.getMinutes() + 15)
    }
    return times
  }

  const timeOptions = generateTimeOptions('12:00', '23:00')

  const isDayDisabled = (date: Date) => {
    const day = date.getDay()
    const isMonday = day === 1
    const isTomorrow = date.toDateString() === closedDays.specificDays[0]
    return !isMonday && !isTomorrow
  }

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log(JSON.stringify(formData, null, 2))
      setIsLoading(false)
      setIsSuccess(true)

      // Reset form or hide success after some time if desired
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          date: new Date(),
          time: '',
          diners: 2,
          zone: 'Salón',
          name: '',
          phone: '',
          email: '',
        })
      }, 5000)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center shadow-lg transition-all">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-green-900 mb-2">¡Reserva Confirmada!</h3>
        <p className="text-green-700">Te esperamos el {formData.date?.toLocaleDateString('es-ES')} a las {formData.time}.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 space-y-6">

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <DatePicker
            selected={formData.date}
            onChange={(date: any) => setFormData(prev => ({ ...prev, date }))}
            minDate={new Date()}
            filterDate={isDayDisabled}
            locale="es"
            dateFormat="dd/MM/yyyy"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
            placeholderText="Selecciona fecha"
            required
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
          <select
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
          >
            <option value="">Selecciona hora</option>
            {timeOptions.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Diners & Zone */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="diners" className="block text-sm font-medium text-gray-700 mb-1">Comensales</label>
          <input
            type="number"
            id="diners"
            name="diners"
            min="1"
            max="20"
            required
            value={formData.diners}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
          />
        </div>
        <div>
          <label htmlFor="zone" className="block text-sm font-medium text-gray-700 mb-1">Zona</label>
          <select
            id="zone"
            name="zone"
            value={formData.zone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
          >
            <option value="Salón">Salón</option>
            <option value="Terraza">Terraza</option>
          </select>
        </div>
      </div>

      {/* Client Info */}
      <div className="space-y-4 pt-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Tu nombre completo"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="Tu número de teléfono"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full mt-6 py-4 px-6 rounded-2xl text-white font-semibold text-lg transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-300 focus:outline-none flex items-center justify-center ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
          }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </>
        ) : (
          'Confirmar Reserva'
        )}
      </button>
    </form>
  )
}

export default ReservationForm
