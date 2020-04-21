import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuarioLogado: any;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.usuarioLogado = JSON.parse(localStorage.getItem('userData'));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth'], { relativeTo: this.route });
  }

}
