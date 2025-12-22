import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  public items?: MenuItem[];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/dashboard/home']
      },
      {
        label: 'Proyectos',
        icon: 'pi pi-briefcase',
        routerLink: ['/dashboard/projects']
      },
      {
        label: 'Tareas',
        icon: 'pi pi-list',
        routerLink: ['/dashboard/tasks']
      },
      {
        label: 'Empleados',
        icon: 'pi pi-users',
        routerLink: ['/dashboard/employees']
      },
      {
        separator: true
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
    this.router.events.subscribe(() => {
      this.items?.forEach(item => this.setActiveItem(item));
    });
  }


  setActiveItem(item: MenuItem) {
    if (item.routerLink && this.router.isActive(item.routerLink[0], true)) {
      item.expanded = true;
    }
    item.items?.forEach(sub => this.setActiveItem(sub));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

