import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [NavBarComponent, CommonModule],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {
  isModalVisible = false;
  modalContent = '';

  showModal(linkText: string) {
    this.modalContent = `Has hecho clic en ${linkText}`;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  closeModalOutside(event: MouseEvent): void {
    const modalBackground = document.querySelector('.modal-background') as HTMLElement;
  if (event.target === modalBackground) {
    this.closeModal();
  }
  }
}
