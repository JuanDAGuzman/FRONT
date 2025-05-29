import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, User } from 'lucide-react';

const EventsCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Ajustar para que lunes sea 0
    
    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };
  
  const days = getDaysInMonth(currentDate);
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const isCurrentMonth = currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear;
  
  const upcomingEvents = [
    {
      id: 1,
      title: 'Consulta Endocrinología',
      date: '28 May',
      time: '10:00 AM',
      doctor: 'Dr. García',
      location: 'Consultorio 201'
    },
    {
      id: 2,
      title: 'Examen de Laboratorio',
      date: '30 May',
      time: '8:00 AM',
      doctor: 'Lab. Central',
      location: 'Piso 1'
    },
    {
      id: 3,
      title: 'Control Pie Diabético',
      date: '5 Jun',
      time: '2:00 PM',
      doctor: 'Dr. Rodríguez',
      location: 'Consultorio 105'
    }
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Calendar className="w-6 h-6 text-red-600 mr-2" />
        Próximos Eventos
      </h2>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold text-gray-800">
            {months[currentDate.getMonth()]} de {currentDate.getFullYear()}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center text-sm font-medium py-2 text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center text-sm rounded transition-colors ${
                day === null
                  ? ''
                  : day === today && isCurrentMonth
                  ? 'bg-red-700 text-white font-bold shadow-sm'
                  : 'hover:bg-red-50 hover:text-red-700 cursor-pointer text-gray-700'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Próximas Citas</h3>
        
        {upcomingEvents.map((event) => (
          <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-800 text-sm">{event.title}</h4>
              <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded">
                {event.date}
              </span>
            </div>
            
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-2" />
                {event.time}
              </div>
              <div className="flex items-center">
                <User className="w-3 h-3 mr-2" />
                {event.doctor}
              </div>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-2" />
                {event.location}
              </div>
            </div>
          </div>
        ))}
        
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
          Ver todas las citas
        </button>
      </div>
    </div>
  );
};

export default EventsCalendar;