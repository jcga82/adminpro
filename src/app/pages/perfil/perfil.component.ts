import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { KaleaConsumosChartComponent } from 'src/app/components/kalea-consumos-chart/kalea-consumos-chart.component';
import { Comentario, MejoraPropuesta, ConsumoAnualKalea } from 'src/app/interfaces/interfaces';
import { ConsumosService } from 'src/app/services/consumos.service';
import { PdfMakeService } from 'src/app/services/pdf-make.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CalidadDato, Consumo, Contrato, Cups, Profile } from 'src/assets/querys/querysGraphql';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComentarioComponent } from 'src/app/components/comentario/comentario.component';
import { MejoraComponent } from 'src/app/components/mejora/mejora.component';
import Swal from 'sweetalert2'

declare var jQuery:any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit, AfterViewInit {

  public formEnviado = false;
  usuario: any;
  usuarioId: string = '';
  cups = '';
  potencia = '';
  tarifa = '';
  newComentario = {
    date: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    comentario: ''
  };
  comentarios: Comentario[] = [];
  newMejora = {
    date: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    titulo: '',
    tag: '',
    descripcion: ''
  };
  mejoras: MejoraPropuesta[] = [];
  consumos: ConsumoAnualKalea[] = [];
  consumo2019 = 0;
  consumo2020 = 0;
  calidad2020: any = [
    {
      'numDias': 0,
      'porcentajeCorrecto': 0,
      'totalEstimado': 0

    }
  ];
  calidad2021: any = [
    {
      'numDias': 0,
      'porcentajeCorrecto': 0,
      'totalEstimado': 0,
      'totalFallo': 0,
      'totalNulo': 0,
      'totalZero': 0
    }
  ];

  dataArea: number[] = [20,40,40,60,80,50,60,40,80,60,60,80];
  data: any;
  dataConsumoMes: any;
  dataPotencia: any;
  dataMes: any;

  public updateForm = this.fb.group({
    identifier: [''],
    usuario: ['', [ Validators.required ]],
    cuentaUsuario: ['', [ Validators.required ]],
    telefono: ['', ],
    password: ['', [ Validators.required ]],
    zona: ['', [ Validators.required ]],
    actividad: ['', [ Validators.required ]],
    descripcion: ['', ]
  });

  public updateFormLocalizacion = this.fb.group({
    identifier: [''],
    longitud: ['', ],
    latitud: ['', ]
  });

  public updateFormBooleanos = this.fb.group({
    identifier: [''],
    agrupada: [false, [ Validators.required ]],
    activo: [false, [ Validators.required ]],
  });

  @ViewChild(KaleaConsumosChartComponent, { static: false }) kaleConsumos: any;
  @ViewChild('comentariosModal') comentariosModal!: ElementRef;
  @ViewChild('mejorasModal') mejorasModal!: ElementRef;

  constructor(
    private pdfService: PdfMakeService,
    private apollo: Apollo,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private consumosService: ConsumosService,
    private datePipe: DatePipe,
    private modalService: NgbModal
  ) { }

  ngAfterViewInit() {
    console.log('Recuperando elemento: ', this.kaleConsumos);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      console.log(params['id']);
      this.usuarioId = params['id'];

      this.apollo.watchQuery(
        { query: Profile,
          variables: {
            usuario: this.usuarioId
          }
        })
        .valueChanges.subscribe((result: any) => {
          console.log(result);
          this.usuario = result.data.profiles[0];
          this.comentarios = this.usuario.comentarios;
          this.mejoras = this.usuario.mejoras;

          // Actualizo los valores de las tres partes del formulario de editar
          this.updateForm.patchValue({
            identifier: this.usuario.identifier,
            usuario: this.usuario.usuario,
            actividad: this.usuario.actividad,
            zona: this.usuario.zona,
            cuentaUsuario: this.usuario.cuentaUsuario,
            descripcion: this.usuario.descripcion,
          });

          this.updateFormLocalizacion.patchValue({
            identifier: this.usuario.identifier,
            longitud: this.usuario.localizacion ? this.usuario.localizacion.coordinates[0] : null,
            latitud: this.usuario.localizacion ? this.usuario.localizacion.coordinates[1] : null
          });

          this.updateFormBooleanos.patchValue({
            identifier: this.usuario.identifier,
            activo: this.usuario.abierto,
            agrupada: this.usuario.esAgrupada,
          });

          // Pido los datos de calidad del dato
          this.apollo.watchQuery(
            { query: CalidadDato,
              variables: {
                oidProfile: this.usuario['identifier'],
                initDate: "2020-01-01",
                endDate: "2020-12-31"
              } })
            .valueChanges.subscribe((result: any) => {
              console.log(result);
              this.calidad2020[0].numDias = result.data.analisis[0].numDias;
              this.calidad2020[0].porcentajeCorrecto = result.data.analisis[0].porcentajeCorrecto;
              this.calidad2020[0].totalEstimado = result.data.analisis[0].totalEstimado;
          });
          this.apollo.watchQuery(
            { query: CalidadDato,
              variables: {
                oidProfile: this.usuario['identifier'],
                initDate: "2021-01-01",
                endDate: "2021-01-31"
              } })
            .valueChanges.subscribe((result: any) => {
              console.log(result);
              this.calidad2021[0].numDias = result.data.analisis[0].numDias;
              this.calidad2021[0].porcentajeCorrecto = result.data.analisis[0].porcentajeCorrecto;
              this.calidad2021[0].totalEstimado = result.data.analisis[0].totalEstimado;
              this.calidad2021[0].totalCorrecto = result.data.analisis[0].totalCorrecto;
              this.calidad2021[0].totalFallo = result.data.analisis[0].totalFallo;
              this.calidad2021[0].totalNulo = result.data.analisis[0].totalNulo;
              this.calidad2021[0].totalZero = result.data.analisis[0].totalZero;
          });

          // Pido los valores del contrato
          this.apollo.watchQuery(
            { query: Cups,
              variables: {
                oidProfile: this.usuario.identifier
              }
            })
            .valueChanges.subscribe((result: any) => {
              this.cups = result.data.suministro[0] ? result.data.suministro[0].cups : '-';
            });
            this.apollo.watchQuery(
              { query: Contrato,
                variables: {
                  oidCuenta: this.usuario.identifier
                }
              })
              .valueChanges.subscribe((result: any) => {
                this.tarifa = result.data.contrato[0] ? result.data.contrato[0].tarifa : 'N/A';
                this.potencia = result.data.contrato[0] ? result.data.contrato[0].potenciaP1 : '-';
              });
              this.apollo.watchQuery(
              { query: Consumo,
                variables: {
                  idPerfilIn: [this.usuario.idPerfil],
                  firstYear: 2018,
                  secondYear: 2019,
                  extraYear: 2020
                }
              })
              .valueChanges.subscribe((result: any) => {
                console.log(result.data);
                this.consumo2019 = result.data.consumo2019[0] ? result.data.consumo2019[0].consumoWh / 1000 : 0;
                this.consumo2020 = result.data.consumo2020[0] ? result.data.consumo2020[0].consumoWh / 1000 : 0;
                // this.consumos.push(
                //   {
                //     idPerfil: this.usuario.id_perfil,
                //     year: new Date('2020-01-01'),
                //     consumoWh: result.data.consumo2020[0].consumoWh,
                //   }
                // );
              });

          // Pido los valores de consumo
          this.consumosService.getToken('fomentoss', 'fomentoss')
            .subscribe(async (token: any) => {
              // console.log(token);
              const cups = this.usuario.tipoCuenta === 'Efergy' ? 'source_efergy' : this.cups; //'ES0021000003411460EM';
              this.consumosService.getDataConsumos(this.usuarioId, cups, token.token)
                .subscribe((result: any) => {
                  console.log(result);
                  this.data = result.items;
                });
          });
          // Pilo los valores mensuales
          this.consumosService.getDataMensual(this.usuarioId)
            .subscribe((result: any) => {
              console.log('mensual', result.me);
              this.dataMes = result.me;
          });
          // Pido los valores de potencia máxima
          const cups = this.usuario.tipoCuenta === 'Efergy' ? 'source_efergy' : this.cups;
          this.consumosService.getDataPotencias(this.usuarioId, cups)
            .subscribe((result: any) => {
              console.log(result);
              this.dataPotencia = result.items;
          });

        });
    });

  }


  update(){
    console.log(this.updateForm.value);
    this.formEnviado = true;
    this.usuarioService.cambiarPerfil(this.updateForm.value);
  }

  updateBooleanos(){
    console.log(this.updateFormBooleanos.value);
    this.usuarioService.cambiarBooleanos(this.updateFormBooleanos.value);
  }

  updateLocalizacion() {
    console.log(this.updateFormLocalizacion.value);
    this.usuarioService.cambiarLocalizacion(this.updateFormLocalizacion.value);
  }

  addComentario(comentario: any) {
    jQuery(this.comentariosModal.nativeElement).modal('hide');
    this.usuarioService.addComentario(this.usuario.identifier, comentario.form.value)
      .subscribe( (com: any) => {
        this.comentarios = com.data.addComentario.comentarios;
        Swal.fire({
          title: 'Comentario',
          text: 'El comentario ha sido añadido correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      },(error: any) => {
        Swal.fire({
          title: 'Error Comenantario',
          text: error,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      });
  }

  deleteComentario(comentario: any) {
    console.log(comentario);
    Swal.fire({
      title: '¿Está seguro de borrar el comentario?',
      text: 'El comentario será borrado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    })
    .then( ok => {
      if (ok.value) {

        this.usuarioService.deleteComentario(this.usuario.identifier, comentario)
          .subscribe( (com: any) => {
            this.comentarios = com.data.deleteComentario.comentarios;
            Swal.fire({
              title: 'Comentario',
              text: 'El comentario ha sido borrado correctamente.',
              icon: 'success',
              confirmButtonText: 'OK'
            })
          },(error: any) => {
            Swal.fire({
              title: 'Error Comenantario',
              text: error,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          });

      }
    });
  }

  openComentarioModal(comentario: any) {
    const modalRef = this.modalService.open(ComentarioComponent);
    modalRef.componentInstance.comentario = comentario;
    modalRef.result
      .then((comentarioEditado) => {
        console.log('resultado:', comentarioEditado); 
        this.usuarioService.editComentario(this.usuario.identifier, comentario, comentarioEditado)
        .subscribe( (com: any) => {
          this.comentarios = com.data.replaceComentario.comentarios;
          Swal.fire({
            title: 'Comentario',
            text: 'El comentario ha sido editado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        },(error: any) => {
          Swal.fire({
            title: 'Error Comenantario',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK'
          })
      });
    });
  }

  addMejora(mejora: any) {
    console.log(mejora);
    jQuery(this.mejorasModal.nativeElement).modal('hide');
    this.usuarioService.addMejora(this.usuario.identifier, mejora.form.value)
      .subscribe( (mej: any) => {
        this.mejoras = mej.data.addMejoraPropuesta.mejoras;
        Swal.fire({
          title: 'Mejora',
          text: 'La mejora ha sido añadido correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      },(error: any) => {
        Swal.fire({
          title: 'Error Mejora',
          text: error,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      });
  }

  deleteMejora(mejora: any) {
    console.log(mejora);
    Swal.fire({
      title: '¿Está seguro de borrar la mejora?',
      text: 'La mejora será borrada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    })
    .then( ok => {
      if (ok.value) {
        this.usuarioService.deleteMejora(this.usuario.identifier, mejora)
          .subscribe( (mej: any) => {
            this.mejoras = mej.data.deleteMejoraPropuesta.mejoras;
            Swal.fire({
              title: 'Mejora',
              text: 'La mejora ha sido borrada correctamente.',
              icon: 'success',
              confirmButtonText: 'OK'
            })
          },(error: any) => {
            Swal.fire({
              title: 'Error Mejora',
              text: error,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          });
      }
    });
  }

  openMejoraModal(mejora: any) {
    const modalRef = this.modalService.open(MejoraComponent);
    modalRef.componentInstance.mejora = mejora;
    modalRef.result
      .then((mejoraEditada) => {
        console.log('resultado:', mejoraEditada); 
        this.usuarioService.editMejora(this.usuario.identifier, mejora, mejoraEditada)
        .subscribe( (mej: any) => {
          console.log(mej);
          this.comentarios = mej.data.replaceMejoraPropuesta.mejoras;
          Swal.fire({
            title: 'Mejora',
            text: 'La mejora ha sido editada correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        },(error: any) => {
          Swal.fire({
            title: 'Error Mejora',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK'
          })
      });
    });
  }

  downloadInforme() {
    
  }

  generarInformeSeguimiento() {
    console.log(this.tarifa);
    this.pdfService.generatePdf(this.usuario, this.kaleConsumos.getImageBase64(), this.consumo2019, this.consumo2020, this.potencia, this.tarifa);
  }

}
