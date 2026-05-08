import React from 'react';
import Header from '../components/Header';
import ReservationForm from '../components/ReservationForm';

const BookingView: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
              Reserva tu Mesa
            </h2>
            <p className="text-gray-500 font-medium">
              Completa los datos y confirma tu reserva al instante
            </p>
          </div>
          <ReservationForm />
        </div>
      </main>
    </div>
  );
};

export default BookingView;
