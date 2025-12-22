import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [PanelMenuModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  public items?: MenuItem[];

  constructor(private router: Router) { }

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
        icon: 'pi pi-home',
        routerLink: ['/dashboard/tasks']
      },
      {
        label: 'Empleados',
        icon: 'pi pi-briefcase',
        routerLink: ['/dashboard/employees']
      }
    ];
    this.router.events.subscribe(() => {
      this.items?.forEach(item => this.setActiveItem(item));
    });
  }


  setActiveItem(item: MenuItem) {
    if (item.routerLink && this.router.isActive(item.routerLink[0], true)) {
      item.expanded = true;   // abrir submenú si aplica
    }
    item.items?.forEach(sub => this.setActiveItem(sub));
  }
}

