import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Project } from '../../services/project.service';

export interface Column {
  name: string
};

export interface DataItem {
  name: string,
  type: string,
  value: any
};

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, ConfirmDialogModule, ToastModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})

export class TableComponent implements OnInit {
  @Input() columns: Column[] = [];
  @Input() items: any = [];
  @Input() crud: boolean = false;
  itemDialog = false;
  selectedItem!: DataItem;


  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {

  }

  editItem(item: any) {

    this.selectedItem;
    this.itemDialog = true;
  }

  onSave(updatedItem: Project) {
    console.log('Item guardado:', updatedItem);
    this.itemDialog = false;
  }

  deleteItem(item: any, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

}
