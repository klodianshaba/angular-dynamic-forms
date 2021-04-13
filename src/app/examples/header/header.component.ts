import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'formify-examples-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output('toggleCollapse') toggleCollapse: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('label') label: string = 'Membershqip Formify';
  public collapse: boolean = true;
  constructor() { }
  ngOnInit(): void {
  }
  onToggleCollapse(): void{
    this.collapse = !this.collapse;
    this.toggleCollapse.emit(this.collapse);
  }
}
