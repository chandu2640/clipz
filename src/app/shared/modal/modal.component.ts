import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // providers: [ModalService]
})
export class ModalComponent implements OnInit{
  @Input() ModalId = '';
  constructor(public modal: ModalService, public el: ElementRef){
    
  }

  closeModal(){
    this.modal.toogleModal(this.ModalId);
  }

  ngOnInit(): void{
    document.body.appendChild(this.el.nativeElement)
  }

}
