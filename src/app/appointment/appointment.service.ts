import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Appointment {
  id: string;
  date: string;
  patient: { id: string; nombre: string };
  doctor: { id: string; nombre: string };
  specialty: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) {}

  saveAppointment(date: string, patient_id: string, doctor_di: string, specialty: string): Observable<Appointment> {
    return this.http.post<Appointment>(environment.uri, { date, patient_id, doctor_di, specialty });
  }

  findOneByPatient(patient_id: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.uri}/patient/${patient_id}`);
  }
}
