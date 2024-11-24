import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { ApiConection } from '../Shared/ApiConection';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [
    MenubarModule,
    TableModule,
    ButtonModule,    
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.css'
})
export class OwnersComponent {

  formPropietario : FormGroup;
  items: MenuItem[] | undefined;  
  propietarios: any[] = [];
  verFormPropietario: boolean = false;
  selectedPropietario: any = {};

  constructor(private api: ApiConection, private fb: FormBuilder) {
    this.api.token = localStorage.getItem('token')
    this.formPropietario = this.fb.group({
      id:[''],
      nombres:['',Validators.required],
      identificacion :['',Validators.required],
      email:['',Validators.required],
      edad:['',Validators.required]

    })
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Parqueaderos',
        url:"/home",
        icon: 'pi pi-home'
      },
      {
        label: 'Propietarios',
        url: '/owners',
        icon: 'pi pi-user'
      },
    ]

    this.listaPropietarios();
    
  }

  accionFormularioPropietario(){
    if(this.formPropietario.value['id']){
      this.updatePropietario()
    }else {
      this.addPropietario()
    }
  }

  listaPropietarios() {
    console.log(this.api.token)
    this.api.get('propietario')
      .subscribe(
        data => {
          this.propietarios = data
        })
  }

  addPropietario() {

    this.api.add('propietario/', this.formPropietario.value)
      .subscribe(
        data => {
          this.listaPropietarios()
          this.verFormPropietario  = false
          this.formPropietario.reset()
        }
      )
  }

  updatePropietario(){
    this.api.update('propietario', this.formPropietario.value,this.selectedPropietario.id)
      .subscribe(
        data => {
          this.listaPropietarios()
          this.verFormPropietario  = false
          this.formPropietario.reset()
        }
      )
  }

  seleccionarPropietario() {
    this.formPropietario.patchValue(this.selectedPropietario)
    this.verFormPropietario = true
  }

  cancel(){
    this.formPropietario.reset()
    this.verFormPropietario = false
    this.selectedPropietario = {}
  }
}
