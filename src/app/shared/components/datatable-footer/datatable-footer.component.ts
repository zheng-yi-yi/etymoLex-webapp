import { ListService } from '@abp/ng.core';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-datatable-footer',
  templateUrl: './datatable-footer.component.html',
  styleUrl: './datatable-footer.component.scss',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  host: {
    class: 'datatable-footer'
  }
})
export class DatatableFooterComponent implements OnChanges {
  maxResultCount = 10;
  showPageSizeSelect = false;
  @Input() list: ListService;
  footerHeight: number = 50;
  @Input() rowCount: number;
  @Input() pageSize: number;
  @Input() offset: number;
  pagerLeftArrowIcon: string = 'datatable-icon-left';
  pagerRightArrowIcon: string = 'datatable-icon-right';
  pagerPreviousIcon: string = 'datatable-icon-prev';
  pagerNextIcon: string = 'datatable-icon-skip';
  totalMessage: string = 'total';
  selectedMessage: string | boolean = 'selected';
  @Input() selectedCount: number;
  @Output() page: EventEmitter<number> = new EventEmitter();
  get curPage(): number {
    return this.offset + 1;
  }

  get isVisible(): boolean {
    return this.rowCount / this.pageSize > 1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rowCount?.currentValue > 10) {
      this.showPageSizeSelect = true;
    }
  }

  pageChange(event) {
    this.list.page = event.page - 1;
  }

  maxResultCountChange() {
    this.list.maxResultCount = this.maxResultCount;
    this.page.emit(this.maxResultCount)
  }
}
