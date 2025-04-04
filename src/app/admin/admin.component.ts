import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AppointmentService } from '../appointment/appointment.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  patients: { id: string; name: string }[] = [];
  doctors: { id: string; name: string }[] = [];
  patient_id = '';
  doctor_id = '';
  date = '';
  specialty = '';

  constructor(private AppointmentService: AppointmentService) {}

  ngOnInit() {
    // this.AppointmentService.getAll().subscribe(usuarios => {
    //   this.pacientes = usuarios.filter(u => u.role === 'paciente');
    //   this.doctores = usuarios.filter(u => u.role !== 'paciente');
    // });
  }

  onSubmit() {
    this.AppointmentService.saveAppointment(this.date, this.patient_id, this.doctor_id, this.specialty).subscribe({
      next: () => {
        this.patient_id = '';
        this.doctor_id = '';
        this.date = '';
        this.specialty = '';
        alert('Cita agendada con éxito');
      },
      error: (err) => console.error(err),
    });
  }
}
