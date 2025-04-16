import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GRADIENTS } from './gradient-list';

@Component({
  selector: 'app-gradient-selector',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './gradient-selector.component.html',
  styleUrls: ['./gradient-selector.component.scss']
})
export class GradientSelectorComponent implements OnInit {
  @ViewChild('gradientSelector', { static: false }) gradientSelector!: ElementRef;
  @Output() gradientChange = new EventEmitter<string>();

  isPickerVisible = false;
  selectedGradient = 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)'; // 默认背景色
  pickerPosition = {};
  gradients = GRADIENTS; // 全部渐变色
  visibleGradients: string[] = []; // 当前页显示的渐变色
  currentPage = 1; // 当前页码
  itemsPerPage = 9; // 每页显示的渐变色数量

  ngOnInit(): void {
    this.updateVisibleGradients();
  }

  togglePicker() {
    this.isPickerVisible = !this.isPickerVisible;

    if (this.isPickerVisible) {
      const rect = this.gradientSelector.nativeElement.getBoundingClientRect();
      this.pickerPosition = {
        position: 'fixed',
        top: `${rect.bottom}px`,
        left: `${rect.left}px`,
        zIndex: 1000
      };
    }
  }

  selectGradient(gradient: string): void {
    this.selectedGradient = gradient;
    this.isPickerVisible = false;
    this.gradientChange.emit(gradient); // 通知父组件
  }

  updateVisibleGradients(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.visibleGradients = this.gradients.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateVisibleGradients();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateVisibleGradients();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.gradients.length / this.itemsPerPage);
  }
}