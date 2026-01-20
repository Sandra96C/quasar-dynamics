import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { CheckboxModule } from "primeng/checkbox";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-entity-modal",
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: "./entity-modal.component.html",
  styleUrl: "./entity-modal.component.scss",
})
export class EntityModalComponent implements OnInit {
  @Input() entity?: any;
  @Input() visible: boolean = true;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor() {}
  ngOnInit() {}

  onClose() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
