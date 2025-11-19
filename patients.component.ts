import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

interface Patient {
  name: string;
  age: number;
  gender: string;
  id: string;
  doctor: string;
  department: string;
  admissionDate: string;
  status: string;
  image: string;
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit, AfterViewInit {

  allPatients: Patient[] = [
    { name: 'Keerthana', age: 25, gender: 'Female', id: 'P101', doctor: 'Dr. Rahul', department: 'Cardiology', admissionDate: '2025-11-18', status: 'Admitted', image: 'assets/img/patient1.jpg' },
    { name: 'Arjun', age: 32, gender: 'Male', id: 'P102', doctor: 'Dr. Meera', department: 'Neurology', admissionDate: '2025-11-17', status: 'Out-Patient', image: 'assets/img/patient2.jpg' },
    { name: 'Priya', age: 29, gender: 'Female', id: 'P103', doctor: 'Dr. Priya', department: 'Dermatology', admissionDate: '2025-11-18', status: 'Critical', image: 'assets/img/patient3.jpg' },
    { name: 'Anil', age: 40, gender: 'Male', id: 'P104', doctor: 'Dr. Anil', department: 'Orthopedic', admissionDate: '2025-11-16', status: 'Admitted', image: 'assets/img/patient4.jpg' }
  ];

  filteredPatients: Patient[] = [];
  newPatients: Patient[] = [];
  inPatients: Patient[] = [];
  outPatients: Patient[] = [];
  criticalPatients: Patient[] = [];

  ngOnInit(): void {
    this.filteredPatients = [...this.allPatients];

    const today = new Date().toISOString().slice(0,10);
    this.newPatients = this.allPatients.filter(p => p.admissionDate === today);
    this.inPatients = this.allPatients.filter(p => p.status === 'Admitted');
    this.outPatients = this.allPatients.filter(p => p.status === 'Out-Patient');
    this.criticalPatients = this.allPatients.filter(p => p.status === 'Critical');
  }

  ngAfterViewInit(): void {
    const ctx = document.getElementById('patientChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Cardiology', 'Neurology', 'Dermatology', 'Orthopedic'],
        datasets: [{
          label: 'Patients by Department',
          data: [1, 1, 1, 1],
          backgroundColor: ['#007bff', '#28a745', '#ff9800', '#6c757d']
        }]
      },
      options: { responsive: true }
    });
  }

  filterPatients(search: string, filter: string = 'all') {
    search = search.toLowerCase();
    this.filteredPatients = this.allPatients.filter(p =>
      (filter === 'all' || 
       (filter === 'in-patient' && p.status === 'Admitted') ||
       (filter === 'out-patient' && p.status === 'Out-Patient') ||
       (filter === 'critical' && p.status === 'Critical')) &&
      (p.name.toLowerCase().includes(search) || 
       p.id.toLowerCase().includes(search) ||
       p.doctor.toLowerCase().includes(search))
    );
  }

  filterByStatus(status: string) {
    if(status === 'all') this.filteredPatients = [...this.allPatients];
    else if(status === 'new') this.filteredPatients = [...this.newPatients];
    else if(status === 'in-patient') this.filteredPatients = [...this.inPatients];
    else if(status === 'out-patient') this.filteredPatients = [...this.outPatients];
    else if(status === 'critical') this.filteredPatients = [...this.criticalPatients];
  }

}

