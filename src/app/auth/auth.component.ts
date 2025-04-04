import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLogin = true;
  email = '';
  password = '';
  name = '';
  city = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (this.isLogin) {
      this.authService.login(this.email, this.password).subscribe({
        next: () => {
          const role = this.authService.getRole();
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigate([role === 'doctor' ? '/admin' : '/paciente']);
          });
        },
        error: (err) => {
          Swal.fire('Error', 'Credenciales incorrectas', 'error');
          console.error(err);
        },
      });
    } else {
      this.authService.register(this.name, this.email, this.password, this.city).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario registrado correctamente',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => (this.isLogin = true));
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudo registrar el usuario', 'error');
          console.error(err);
        },
      });
    }
  }

}
