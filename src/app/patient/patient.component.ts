import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { AppointmentService, Appointment } from '../appointment/appointment.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent implements OnInit {
  appointments: Appointment[] = [];
  displayedColumns: string[] = ['date', 'doctor', 'specialty'];

  constructor(private AppointmentService: AppointmentService, private authService: AuthService) {}

  ngOnInit() {
    const patient = this.authService.getRole() === 'paciente' ? this.authService.getUserId() : '';
    if (patient) {
      this.AppointmentService.findOneByPatient(patient).subscribe({
        next: (appointment) => (this.appointments = appointment),
        error: (err) => console.error(err),
      });
    }
  }
}
