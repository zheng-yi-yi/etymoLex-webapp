import { Component } from '@angular/core';

@Component({
  selector: 'app-words',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './words.component.html',
  styleUrl: './words.component.scss'
})
  
export class WordsComponent {
  libraries = [
    { id: 1, name: '词库 1', description: '描述 1', imageUrl: 'assets/imgs/library1.png' },
    { id: 2, name: '词库 2', description: '描述 2', imageUrl: 'assets/imgs/library2.png' },
    { id: 3, name: '词库 3', description: '描述 3', imageUrl: 'assets/imgs/library3.png' },
    { id: 4, name: '词库 4', description: '描述 4', imageUrl: 'assets/imgs/library4.png' },
    { id: 5, name: '词库 5', description: '描述 5', imageUrl: 'assets/imgs/library5.png' },
    { id: 6, name: '词库 6', description: '描述 6', imageUrl: 'assets/imgs/library6.png' },
    { id: 7, name: '词库 7', description: '描述 7', imageUrl: 'assets/imgs/library7.png' },
    { id: 8, name: '词库 8', description: '描述 8', imageUrl: 'assets/imgs/library8.png' },
    { id: 9, name: '词库 9', description: '描述 9', imageUrl: 'assets/imgs/library9.png' },
    { id: 10, name: '词库 10', description: '描述 10', imageUrl: 'assets/imgs/library10.png' },
    { id: 11, name: '词库 11', description: '描述 11', imageUrl: 'assets/imgs/library11.png' },
    { id: 12, name: '词库 12', description: '描述 12', imageUrl: 'assets/imgs/library12.png' },
    { id: 13, name: '词库 13', description: '描述 13', imageUrl: 'assets/imgs/library13.png' },
    { id: 14, name: '词库 14', description: '描述 14', imageUrl: 'assets/imgs/library14.png' },
    { id: 15, name: '词库 15', description: '描述 15', imageUrl: 'assets/imgs/library15.png' },
    { id: 16, name: '词库 16', description: '描述 16', imageUrl: 'assets/imgs/library16.png' },
    { id: 17, name: '词库 17', description: '描述 17', imageUrl: 'assets/imgs/library17.png' },
    { id: 18, name: '词库 18', description: '描述 18', imageUrl: 'assets/imgs/library18.png' },
    { id: 19, name: '词库 19', description: '描述 19', imageUrl: 'assets/imgs/library19.png' },
    { id: 20, name: '词库 20', description: '描述 20', imageUrl: 'assets/imgs/library20.png' }
  ];
  currentPage = 1;
  itemsPerPage = 8; // 每页显示 8 个词库
  isCreateLibraryModalVisible = false;

  showCreateLibraryModal(): void {
    this.isCreateLibraryModalVisible = true;
  }

  hideCreateLibraryModal(): void {
    this.isCreateLibraryModalVisible = false;
  }

  get totalPages() {
    return Array(Math.ceil(this.libraries.length / this.itemsPerPage)).fill(0).map((_, i) => i + 1);
  }

  get paginatedLibraries() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.libraries.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
    }
  }

  startLearning(libraryId: number) {
    console.log(`开始学习词库 ID: ${libraryId}`);
    // 跳转到学习页面或执行其他逻辑
  }

  selectedGradient: string = '';

  onGradientChange(gradient: string): void {
    this.selectedGradient = gradient;
    console.log('Selected Gradient:', gradient);
  }
}
