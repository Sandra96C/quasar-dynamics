import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { Column, Entity } from "../../models/models";
import { TagModule } from "primeng/tag";

@Component({
  selector: "app-table",
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    TagModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: "./table.component.html",
  styleUrl: "./table.component.scss",
})
export class TableComponent implements OnInit {
  @Input() columns: Column[] = [];
  @Input() items: any = [];
  @Input() crud: boolean = false;
  itemDialog = false;
  @Output() editEvent = new EventEmitter<Entity>();
  @Output() deleteEvent = new EventEmitter<Entity>();
  @Output() createEvent = new EventEmitter<Entity>();
  @Output() viewItem = new EventEmitter<Entity>();

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}
  ngOnInit(): void {
    console.log(this.crud);
  }

  onEditEvent(item: any) {
    this.editEvent.emit(item);
  }

  deleteItem(item: any, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Record deleted",
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected",
        });
      },
    });
  }

  onViewItem(item: any) {
    this.viewItem.emit(item);
  }
}
