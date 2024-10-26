import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { VALIDATION } from '@app/core/constants/validators.const';
import { MergeCodeNamePipe } from '@app/core/pipes/merge-code-name.pipe';
import { CommonModule } from '@common/common.module';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'finance-manager-add-saving-modal',
  templateUrl: './add-saving-modal.component.html',
  styleUrls: [
    '../../../../css/components/personal-finance/savings/add-saving-modal/add-saving-modal.scss',
  ],
  standalone: true,
  imports: [CommonModule, NgIf, ReactiveFormsModule, NgClass],
  providers: [MergeCodeNamePipe],
})
export class AddSavingModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() savingGoalAdded = new EventEmitter<any>();

  readonly VALIDATION = VALIDATION;

  private formBuilder = inject(FormBuilder);

  imageSrc: string | ArrayBuffer | null = null;

  savingFormGroup!: FormGroup<{
    name: FormControl<string | null>;
    targetAmount: FormControl<number | null>;
    startDate: FormControl<string | null>;
    endDate: FormControl<string | null>;
    img: FormControl<string | ArrayBuffer | null>;
  }>;

  ngOnInit(): void {
    this.savingFormGroup = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        targetAmount: [0, [Validators.required, Validators.min(0.01)]],
        startDate: [this.getTodayDate(), Validators.required],
        endDate: ['', Validators.required],
        img: [''],
      },
      { validators: this.dateValidator },
    );
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  dateValidator(form: FormGroup) {
    const start = new Date(form.get('startDate')?.value);
    const end = new Date(form.get('endDate')?.value);
    return end > start ? null : { dateInvalid: true };
  }

  closeModal(): void {
    this.close.emit();
    this.resetForm();
  }

  onSubmit(): void {
    if (this.savingFormGroup.valid) {
      const savingData = this.savingFormGroup.value;
      savingData.img = this.imageSrc;
      this.savingGoalAdded.emit(savingData);
      this.resetForm();
      this.closeModal();
    }
  }

  resetForm(): void {
    this.savingFormGroup.reset({
      name: '',
      targetAmount: 0,
      startDate: this.getTodayDate(),
      endDate: '',
      img: '',
    });
    this.imageSrc = null;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File): void {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
        this.savingFormGroup.patchValue({ img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
