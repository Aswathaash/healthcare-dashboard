import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

interface Appointment {
  patient: string;
  doctor: string;
  time: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit, AfterViewInit {

  allAppointments: Appointment[] = [
    { patient: 'Keerthana', doctor: 'Dr. Rahul', time: '11:00 AM', date: '2025-11-19', status: 'Confirmed' },
    { patient: 'Arjun', doctor: 'Dr. Meera', time: '12:30 PM', date: '2025-11-19', status: 'Pending' },
    { patient: 'Priya', doctor: 'Dr. Priya', time: '2:00 PM', date: '2025-11-20', status: 'Canceled' },
    { patient: 'Anil', doctor: 'Dr. Anil', time: '3:30 PM', date: '2025-11-21', status: 'Confirmed' },
  ];

  filteredAppointments: Appointment[] = [];
  todayAppointments: Appointment[] = [];
  upcomingAppointments: Appointment[] = [];
  completedAppointments: Appointment[] = [];
  canceledAppointments: Appointment[] = [];

  ngOnInit(): void {
    this.filteredAppointments = [...this.allAppointments];

    const today = new Date().toISOString().slice(0,10);
    this.todayAppointments = this.allAppointments.filter(a => a.date === today);
    this.upcomingAppointments = this.allAppointments.filter(a => a.date > today);
    this.completedAppointments = this.allAppointments.filter(a => a.status === 'Confirmed' && a.date < today);
    this.canceledAppointments = this.allAppointments.filter(a => a.status === 'Canceled');
  }

  ngAfterViewInit(): void {
    const ctx = document.getElementById('appointmentsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Appointments',
          data: [5, 8, 6, 10, 7, 12, 9],
          backgroundColor: 'rgba(0,123,255,0.2)',
          borderColor: '#007bff',
          fill: true,
          tension: 0.4
        }]
      },
      options: { responsive: true }
    });
  }

  filterAppointments(search: string, filter: string = 'all') {
    search = search.toLowerCase();
    this.filteredAppointments = this.allAppointments.filter(a =>
      (filter === 'all' || 
       (filter === 'today' && a.date === new Date().toISOString().slice(0,10)) ||
       (filter === 'upcoming' && a.date > new Date().toISOString().slice(0,10)) ||
       (filter === 'completed' && a.date < new Date().toISOString().slice(0,10) && a.status==='Confirmed') ||
       (filter === 'canceled' && a.status==='Canceled')) &&
      (a.patient.toLowerCase().includes(search) || a.doctor.toLowerCase().includes(search))
    );
  }

  filterByStatus(status: string) {
    if(status==='all') this.filteredAppointments = [...this.allAppointments];
    else if(status==='today') this.filteredAppointments = [...this.todayAppointments];
    else if(status==='upcoming') this.filteredAppointments = [...this.upcomingAppointments];
    else if(status==='completed') this.filteredAppointments = [...this.completedAppointments];
    else if(status==='canceled') this.filteredAppointments = [...this.canceledAppointments];
  }
}

