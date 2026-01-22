import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
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
  @Output() submitEntity = new EventEmitter<any>();
  formValues: any = {};

  constructor() {}
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["entity"]) {
      this.formValues = this.entity?.fields.reduce((acc: any, field: any) => {
        acc[field.key] = field.value ?? null;
        return acc;
      }, {});
    }
  }

  onFieldChange(name: string, value: any) {
    this.formValues[name] = value;
  }

  onClose() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  submit() {
    this.entity.onSave(this.formValues).subscribe({
      next: (data: any) => {
        console.log("updated", { data });

        this.visible = false;
        this.visibleChange.emit(this.visible);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
