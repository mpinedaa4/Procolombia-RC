document.addEventListener("DOMContentLoaded", function() {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach(content => content.classList.remove("active"));
  // Crea una variable para almacenar el color original de cada pestaña
  const originalTabColors = {};
  tabs.forEach(tab => {
    originalTabColors[tab] = tab.style.backgroundColor;
  });

  // Agrega un listener de eventos "click" a cada pestaña
  tabs.forEach(tab => {
    // Activa el tab1 al iniciar
    tab.classList.add("active");
    tab.addEventListener("click", () => {
      const h1Element = document.querySelector("h1");
      h1Element.style.display = "none";
      const pElement = document.querySelector("p");
      pElement.style.display = "none";
      // Obtiene el color original de la pestaña
      const originalColor = originalTabColors[tab];

      // Obtiene el color nuevo de la pestaña
      const newColor = "#65bee5";

      // Establece el color de la pestaña al color nuevo
      tab.style.backgroundColor = newColor;

      // Elimina el color de la pestaña anterior
      tabs.forEach(t => {
        if (t !== tab) {
          t.style.backgroundColor = originalColor;
        }
      });

      // Oculta todos los contenidos de pestañas
      tabContents.forEach(content => content.classList.remove("active"));

      // Muestra el contenido de la pestaña correspondiente
      const target = tab.querySelector("a").getAttribute("href");
      document.querySelector(target).classList.add("active");
    });
  });
});

function capitalize(str) {
  return str
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
}

function validarFormulario() {
  const formulario = document.getElementById('main-form');

  // Iterar sobre los elementos del formulario
  Array.from(formulario.elements).forEach(elemento => {
    // Verificar si el elemento es un input, select, radio o checkbox y si es inválido
    if (
      (elemento.tagName === 'INPUT' || elemento.tagName === 'SELECT') &&
      elemento.checkValidity() === false
    ) {
      // Aplicar estilo de campo inválido
      elemento.classList.add('campo-invalido');
    } else {
      // Remover estilo de campo inválido si existe
      elemento.classList.remove('campo-invalido');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Obtener referencia al formulario y al botón de submit
  const formulario = document.getElementById('main-form');
  const btn = document.getElementById('save');

  // Verificar si los elementos existen antes de agregar el event listener
  if (formulario && btn) {
    // Agregar un event listener al formulario
    btn.addEventListener('click', (event) => {
      // Prevenir el comportamiento predeterminado del formulario (recargar la página)
      event.preventDefault();

      // Aquí puedes realizar acciones adicionales antes de enviar el formulario,
      // si es necesario.
      if (!formulario.checkValidity()){
        alert('Formulario incompleto:\nPor favor revisar los datos faltantes');
        validarFormulario();
        return;
      }
      else{
        validarFormulario();
      }

      try {
        //tab1
        const consecutivo = document.getElementById('consecutivo').value;
        const num_paciente = document.getElementById('num_paciente').value.toUpperCase();
        const birth_year = document.getElementById('birth_year').value;
        const residencia = document.getElementById('residencia').value;
        const departamento = capitalize(document.getElementById('departamento').value); //Hacer lista de departamentos???
        const regimen = document.getElementById('regimen').value;

        //tab2
        const fecha_dx = document.getElementById('fecha_dx').value;
        const deteccion = document.getElementById('deteccion').value;
        const escenario = document.getElementById('escenario').value;
        const estadio = document.getElementById('estadio').value;
        const gleason = document.getElementById('gleason').value;
        const grupo = document.getElementById('grupo').value;
        const ipsa = document.getElementById('ipsa').value;
        const riesgo = document.getElementById('riesgo').value;
        const fecha_mhspc = document.getElementById('fecha_mhspc').value;
        const carga = document.getElementById('carga').value;
        const psa_prog = document.getElementById('psa_prog').value;
        const fecha_mcrpc = document.getElementById('fecha_mcrpc').value;
        const sitios_metastasis = document.getElementById('sitios_metastasis').value;
        const ecog = document.getElementById('ecog').value;

        //tab3
        const biomarcadores = document.querySelector('input[name="biomarcadores"]:checked')?.value;
        const fecha_biomarcador = document.getElementById('fecha_biomarcador').value;
        const pten = document.getElementById('pten').checked ? 'Si' : 'No';
        const resultado_pten = document.getElementById('resultado_pten').value;
        const tp53 = document.getElementById('tp53').checked ? 'Si' : 'No';
        const resultado_tp53 = document.getElementById('resultado_tp53').value;
        const rb1 = document.getElementById('rb1').checked ? 'Si' : 'No';
        const resultado_rb1 = document.getElementById('resultado_rb1').value;
        const brca1 = document.getElementById('brca1').checked ? 'Si' : 'No';
        const resultado_brca1 = document.getElementById('resultado_brca1').value;
        const brca2 = document.getElementById('brca2').checked ? 'Si' : 'No';
        const resultado_brca2 = document.getElementById('resultado_brca2').value;
        const mmr = document.getElementById('mmr').checked ? 'Si' : 'No';
        const resultado_mmr = document.getElementById('resultado_mmr').value;
        const msi = document.getElementById('msi').checked ? 'Si' : 'No';
        const resultado_msi = document.getElementById('resultado_msi').value;
        const otro_biomarcador = document.getElementById('otro_biomarcador').checked ? 'Si' : 'No';
        const cual_otro = document.getElementById('cual_otro').value.toUpperCase();
        const resultado_otro = document.getElementById('resultado_otro').value;

        //tab4
        const hta = document.querySelector('input[name="hta"]:checked')?.value;
        const dm = document.querySelector('input[name="dm"]:checked')?.value;
        const coronariopatia = document.querySelector('input[name="coronariopatia"]:checked')?.value;
        const erc = document.querySelector('input[name="erc"]:checked')?.value;
        const familiar_pc = document.querySelector('input[name="familiar_pc"]:checked')?.value;

        //tab5
        const tumor_localizado = document.querySelector('input[name="tumor_localizado"]:checked')?.value;
        const fecha_tto1 = document.getElementById('fecha_tto1').value;
        const nombre_tto1 = capitalize(document.getElementById('nombre_tto1').value);
        const cx = document.querySelector('input[name="cx"]:checked')?.value;
        const rxtx = document.querySelector('input[name="rxtx"]:checked')?.value;
        const intencion = document.querySelector('input[name="intencion"]:checked')?.value;

        //tab6
        const mhspc = document.querySelector('input[name="mhspc"]:checked')?.value;
        const fecha_tto_mhspc = document.getElementById('fecha_tto_mhspc').value;
        const l1_mhspc = document.getElementById('l1_mhspc').value;
        const medico_mhspc = document.getElementById('medico_mhspc').value;

        //tab7
        const fecha_l1_mcrpc = document.getElementById('fecha_l1_mcrpc').value;
        const nombre_l1_mcrpc = capitalize(document.getElementById('nombre_l1_mcrpc').value);
        const l1_mcrpc = document.getElementById('l1_mcrpc').value;
        const recibio_2l = document.querySelector('input[name="recibio_2l"]:checked')?.value;
        const fecha_l2_mcrpc = document.getElementById('fecha_l2_mcrpc').value;
        const nombre_l2_mcrpc = capitalize(document.getElementById('nombre_l2_mcrpc').value);
        const l2_mcrpc = document.getElementById('l2_mcrpc').value;
        const recibio_3l = document.querySelector('input[name="recibio_3l"]:checked')?.value;
        const fecha_l3_mcrpc = document.getElementById('fecha_l3_mcrpc').value;
        const nombre_l3_mcrpc = capitalize(document.getElementById('nombre_l3_mcrpc').value);
        const l3_mcrpc = document.getElementById('l3_mcrpc').value;

        //tab8
        const nmcrpc = document.querySelector('input[name="nmcrpc"]:checked')?.value;
        const fecha_nmcrpc = document.getElementById('fecha_nmcrpc').value;
        const ipsa_nmcrpc = document.getElementById('ipsa_nmcrpc').value;
        const fecha_tto_nmcrpc = document.getElementById('fecha_tto_nmcrpc').value;
        const fecha_prog_nmcrpc = document.getElementById('fecha_prog_nmcrpc').value;

        //tab9
        const consultas = document.getElementById('consultas').value;
        const hosp = document.querySelector('input[name="hosp"]:checked')?.value;
        const causa_hosp = document.getElementById('causa_hosp').value;
        const num_hosp = document.getElementById('num_hosp').value;
        const fx = document.querySelector('input[name="fx"]:checked')?.value;
        const num_fx = document.getElementById('num_fx').value;
        const fx_cx = document.querySelector('input[name="fx_cx"]:checked')?.value;

        //tab10
        const rxtx_paliativa = document.querySelector('input[name="rxtx_paliativa"]:checked')?.value;
        const cursos = document.getElementById('cursos').value;
        const esp_dolor = document.querySelector('input[name="esp_dolor"]:checked')?.value;
        const num_consultas_dolor = document.getElementById('num_consultas_dolor').value;
        const er = document.querySelector('input[name="er"]:checked')?.value;
        const causa_er = document.getElementById('causa_er').value;
        const num_er = document.getElementById('num_er').value;

        //tab11
        const mhspc2mcrpc = document.getElementById('mhspc2mcrpc').value;
        const fecha_prog_mhspc = document.getElementById('fecha_prog_mhspc').value;
        const prog_l1 = document.querySelector('input[name="prog_l1"]:checked')?.value;
        const fecha_prog_l1 = document.getElementById('fecha_prog_l1').value;
        const prog_l2 = document.querySelector('input[name="prog_l2"]:checked')?.value;
        const fecha_prog_l2 = document.getElementById('fecha_prog_l2').value;
        const prog_l3 = document.querySelector('input[name="prog_l3"]:checked')?.value;
        const fecha_prog_l3 = document.getElementById('fecha_prog_l3').value;

        //tab12
        const fecha_last_followup = document.getElementById('fecha_last_followup').value;
        const estado_vital = document.getElementById('estado_vital').value;
        const fecha_muerte = document.getElementById('fecha_muerte').value;
        const observaciones = document.getElementById('observaciones').value;

        //tab13
        const diligenciador = capitalize(document.getElementById('diligenciador').value);
        const sitio = document.getElementById('sitio').value;
        const fecha_datos = document.getElementById('fecha_datos').value;
      
    
        const data = [
        consecutivo, num_paciente, birth_year, residencia, departamento, regimen, fecha_dx, deteccion, escenario, estadio, gleason, 
        grupo, ipsa, riesgo, fecha_mhspc, carga, psa_prog, fecha_mcrpc, sitios_metastasis, ecog, biomarcadores, fecha_biomarcador,
        pten, resultado_pten, tp53, resultado_tp53, rb1, resultado_rb1, brca1, resultado_brca1, brca2, resultado_brca2, mmr,
        resultado_mmr, msi, resultado_msi, otro_biomarcador, cual_otro, resultado_otro, hta, dm, coronariopatia, erc, familiar_pc,
        tumor_localizado, fecha_tto1, nombre_tto1, cx, rxtx, intencion, mhspc, fecha_tto_mhspc, l1_mhspc, medico_mhspc, fecha_l1_mcrpc, 
        nombre_l1_mcrpc, l1_mcrpc, recibio_2l, fecha_l2_mcrpc, nombre_l2_mcrpc, l2_mcrpc, recibio_3l, fecha_l3_mcrpc, nombre_l3_mcrpc, 
        l3_mcrpc, nmcrpc, fecha_nmcrpc, ipsa_nmcrpc, fecha_tto_nmcrpc, fecha_prog_nmcrpc, consultas, hosp, causa_hosp, num_hosp, fx, 
        num_fx, fx_cx, rxtx_paliativa, cursos, esp_dolor, num_consultas_dolor, er, causa_er, num_er, mhspc2mcrpc, fecha_prog_mhspc, 
        prog_l1, fecha_prog_l1, prog_l2, fecha_prog_l2, prog_l3, fecha_prog_l3, fecha_last_followup, estado_vital, fecha_muerte, 
        observaciones, diligenciador, sitio, fecha_datos
        ];

        window.electronAPI.sendForm(data);
        window.electronAPI.saveResult((event, value) => {
          if(value == true){
            clearForm(formulario);
            inicializarBiomarcadores();
            inicializarLocalizado();
            inicializarMhspc();
            inicializarSegundaLinea();
            inicializarTerceraLinea();
            inicializarNmcrpc();
            inicializarHospitalizacion();
            inicializarFracturas();
            inicializarRxtx();
            inicializarDolor();
            inicializarUrgencias();
            inicializarFechaProgresion();
            inicializarProgresion1();
            inicializarProgresion2();
            inicializarProgresion3();
            inicializarMuerte();
          }
        })
        
      } 
      catch (error) {
        console.error("Error:", error);
      }
    });
  } else {
    console.error('No se encontraron los elementos del formulario o el botón de submit.');
  }
});


const btnOpen = document.getElementById('excel');

btnOpen.addEventListener('click', (event) => {
  event.preventDefault();
  window.electronAPI.openExcel();
});



function clearForm(formulario){
  for (const elemento of formulario.elements) {
    // Verificar el tipo de elemento
    switch (elemento.type) {
      case 'text':
      case 'number':
      case 'password':
      case 'textarea':
      case 'select-one':
      case 'date':
        // Establecer el valor en una cadena vacía para inputs de texto, número, contraseña, textarea y select
        elemento.value = '';
        break;
      case 'checkbox':
      case 'radio':
        // Desmarcar checkboxes y radios
        elemento.checked = false;
        break;
      }
    }
}



function inicializarBiomarcadores() {
  // tab3 - biomarcadores 
  var biomarcadoresRadioSi = document.getElementById("biomarcadores1");
  var biomarcadoresRadioNo = document.getElementById("biomarcadores2");
  var biomarkerBox = document.getElementById("biomarker-box");
  var biomarkerResultContainers = document.querySelectorAll(".biomarker-result");
  var fechaBiomarcadorInputPair = document.getElementById("input-pair-fecha-biomarcador");
  var fechaBiomarcadorInput = document.getElementById("fecha_biomarcador");
  var separadorElement = document.querySelector(".separador");
  var cualesLabel = document.getElementById("cuales-tab3");

  // Oculta inicialmente los elementos
  biomarkerBox.style.display = 'none';
  fechaBiomarcadorInputPair.style.display = 'none';
  fechaBiomarcadorInput.style.display = 'none';
  separadorElement.style.display = 'none';
  cualesLabel.style.display = 'none';

  // Oculta inicialmente los contenedores de biomarcadores y otros
  biomarkerResultContainers.forEach(function(container) {
    container.style.height = '0';
    container.style.overflow = 'hidden';
  });

  document.querySelector('.otro .resultado-otro').style.height = '0';
  document.querySelector('.otro .resultado-otro').style.overflow = 'hidden';

  // Agrega un evento de cambio al radio button "biomarcadores1"
  biomarcadoresRadioSi.addEventListener('change', function() {
    if (this.checked) {
      biomarkerBox.style.display = 'flex';
      fechaBiomarcadorInputPair.style.display = 'flex';
      fechaBiomarcadorInput.style.display = 'block';
      separadorElement.style.display = 'block';
      cualesLabel.style.display = 'block';
      fechaBiomarcadorInput.required = true;
    }
  });

  biomarcadoresRadioNo.addEventListener('change', function() {
    if (this.checked) {
      biomarkerBox.style.display = 'none';
      fechaBiomarcadorInputPair.style.display = 'none';
      fechaBiomarcadorInput.style.display = 'none';
      separadorElement.style.display = 'none';
      cualesLabel.style.display = 'none';
      fechaBiomarcadorInput.required = false;

      // Oculta los contenedores de biomarcadores y otros cuando se selecciona "No"
      biomarkerResultContainers.forEach(function(container) {
        container.style.height = '0';
      });

      document.querySelector('.otro .resultado-otro').style.height = '0';

      fechaBiomarcadorInput.value = '';

      // Borra los checkbox
      biomarkerCheckboxes.forEach(function(checkbox) {
        checkbox.checked = false;
      });

      // Borra los inputs y selects
      biomarkerResultContainers.forEach(function(container) {
        var input = container.querySelector('input[type="text"]');
        var select = container.querySelector('select');
    
        if (input) {
          input.value = '';
        }
    
        if (select) {
          select.value = '';
        }
      });
    
      var otroInput = document.querySelector('.otro input[type="text"]');
      var otroSelect = document.querySelector('.otro select');
    
      if (otroInput) {
        otroInput.value = '';
      }
    
      if (otroSelect) {
        otroSelect.value = '';
      }
    }
  });

  // Obtén referencias a los checkboxes dentro de los divs biomarker
  var biomarkerCheckboxes = document.querySelectorAll('.biomarker input[type="checkbox"]');

  // Agrega un evento de cambio a cada checkbox biomarker
  biomarkerCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      // Encuentra el contenedor biomarker-result asociado al checkbox actual
      var biomarkerResultContainer = this.closest('.biomarker').querySelector('.biomarker-result');

      // Muestra u oculta el contenedor biomarker-result según si el checkbox está marcado
      biomarkerResultContainer.style.height = this.checked ? 'auto' : '0';
    });
  });

  // Agrega un evento de cambio al checkbox "otro_biomarcador"
  document.getElementById("otro_biomarcador").addEventListener('change', function() {
    var otroBiomarcadorResult = document.querySelector('.otro .resultado-otro');

    // Muestra u oculta el contenedor resultado-otro según si el checkbox está marcado
    otroBiomarcadorResult.style.height = this.checked ? 'auto' : '0';
  });
}



function inicializarLocalizado() {
  // tab5 - tto tumor localizado
  var localizadoSi = document.getElementById("tumor_localizado1");
  var localizadoNo = document.getElementById("tumor_localizado2");
  var tumor_localizado = document.querySelector(".tumor-localizado");

  tumor_localizado.style.display = 'none';

  localizadoSi.addEventListener('change', function() {
    if (this.checked) {
      tumor_localizado.style.display = 'flex';
      document.getElementById("fecha_tto1").required = true;
    }
  });

  localizadoNo.addEventListener('change', function() {
    if (this.checked) {
      tumor_localizado.style.display = 'none';
      document.getElementById("fecha_tto1").required = false;
      tumor_localizado.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });
    }
  });
}

function inicializarMhspc(){
   // tab6 - tto mHSPC
   var mhspcSi = document.getElementById("mhspc1");
   var mhspcNo = document.getElementById("mhspc2");
   var mhspc = document.querySelector(".mhspc");
 
   mhspc.style.display = 'none';
 
   mhspcSi.addEventListener('change', function() {
     if (this.checked) {
       mhspc.style.display = 'flex';
       document.getElementById("fecha_tto_mhspc").required = true;
     }
   });
 
   mhspcNo.addEventListener('change', function() {
     if (this.checked) {
       mhspc.style.display = 'none';
       document.getElementById("fecha_tto_mhspc").required = false;
       mhspc.querySelectorAll('input, select').forEach(elemento => {
         if (elemento.type === 'radio' || elemento.type === 'checkbox') {
           elemento.checked = false;
         } else {
           elemento.value = '';
         }
       });
     }
   });
}

function inicializarSegundaLinea(){
  var segundaSi = document.getElementById("recibio_2l1");
  var segundaNo = document.getElementById("recibio_2l2");
  var mcrpc_2l = document.querySelector(".mcrpc_2l");
  var mcrpc_3l = document.querySelector(".mcrpc_3l");

  mcrpc_2l.style.display = 'none';

  segundaSi.addEventListener('change', function() {
    if (this.checked) {
      mcrpc_2l.style.display = 'flex';
      document.getElementById("fecha_l2_mcrpc").required = true;
    }
  });

  segundaNo.addEventListener('change', function() {
    if (this.checked) {
      mcrpc_2l.style.display = 'none';
      document.getElementById("fecha_l2_mcrpc").required = false;

      mcrpc_2l.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });
      mcrpc_3l.style.display = 'none';
      mcrpc_3l.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });
    }
  });
}

function inicializarTerceraLinea(){
  var terceraSi = document.getElementById("recibio_3l1");
  var terceraNo = document.getElementById("recibio_3l2");
  var mcrpc_3l = document.querySelector(".mcrpc_3l");

  mcrpc_3l.style.display = 'none';

  terceraSi.addEventListener('change', function() {
    if (this.checked) {
      mcrpc_3l.style.display = 'flex';
      document.getElementById("fecha_l3_mcrpc").required = true;
    }
  });

  terceraNo.addEventListener('change', function() {
    if (this.checked) {
      mcrpc_3l.style.display = 'none';
      document.getElementById("fecha_l3_mcrpc").required = false;
      mcrpc_3l.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });
    }
  });
}

function inicializarNmcrpc(){
  var nmcrpcSi = document.getElementById("nmcrpc1");
  var nmcrpcNo = document.getElementById("nmcrpc2");
  var nmcrpc = document.querySelector(".nmcrpc");

  nmcrpc.style.display = 'none';

  nmcrpcSi.addEventListener('change', function() {
    if (this.checked) {
      nmcrpc.style.display = 'flex';
      nmcrpc.querySelectorAll('input').forEach(input => {
        if (input.type === 'date') {
          input.required = true;
        }
      });
    }
  });

  nmcrpcNo.addEventListener('change', function() {
    if (this.checked) {
      nmcrpc.style.display = 'none';
      nmcrpc.querySelectorAll('input').forEach(input => {
        if (input.type === 'date') {
          input.required = false;
        }
      });
      nmcrpc.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });
    }
  });
}

function inicializarHospitalizacion(){
  var hospSi = document.getElementById("hosp1");
  var hospNo = document.getElementById("hosp2");
  var hosp = document.querySelector(".hospitalizacion");

  hosp.style.display = 'none';

  hospSi.addEventListener('change', function() {
    if (this.checked) {
      hosp.style.display = 'flex';
    }
  });

  hospNo.addEventListener('change', function() {
    if (this.checked) {
      hosp.style.display = 'none';
      hosp.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });
    }
  });
}

function inicializarFracturas(){
  var fxSi = document.getElementById("fx1");
  var fxNo = document.getElementById("fx2");
  var fx = document.querySelector(".fracturas");

  fx.style.display = 'none';

  fxSi.addEventListener('change', function() {
    if (this.checked) {
      fx.style.display = 'flex';
    }
  });

  fxNo.addEventListener('change', function() {
    if (this.checked) {
      fx.style.display = 'none';
      fx.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });
    }
  });
}

function inicializarRxtx(){
  var rxtxSi = document.getElementById("rxtx_paliativa1");
  var rxtxNo = document.getElementById("rxtx_paliativa2");
  var rxtx = document.getElementById("radioterapia");

  rxtx.style.display = 'none';

  rxtxSi.addEventListener('change', function() {
    if (this.checked) {
      rxtx.style.display = 'flex';
    }
  });

  rxtxNo.addEventListener('change', function() {
    if (this.checked) {
      rxtx.style.display = 'none';
      rxtx.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });
    }
  });
}

function inicializarDolor(){
  var dolorSi = document.getElementById("esp_dolor1");
  var dolorNo = document.getElementById("esp_dolor2");
  var dolor = document.getElementById("dolor");

  dolor.style.display = 'none';

  dolorSi.addEventListener('change', function() {
    if (this.checked) {
      dolor.style.display = 'flex';
    }
  });

  dolorNo.addEventListener('change', function() {
    if (this.checked) {
      dolor.style.display = 'none';
      dolor.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });
    }
  });
}

function inicializarUrgencias(){
  var erSi = document.getElementById("er1");
  var erNo = document.getElementById("er2");
  var er = document.querySelector(".urgencias");

  er.style.display = 'none';

  erSi.addEventListener('change', function() {
    if (this.checked) {
      er.style.display = 'flex';
    }
  });

  erNo.addEventListener('change', function() {
    if (this.checked) {
      er.style.display = 'none';
      er.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });
    }
  });
}

function inicializarFechaProgresion(){
  const prog = document.getElementById('mhspc2mcrpc');
  const fechaProgresion = document.getElementById('fechaProgresion');
  const input = document.getElementById('fecha_prog_mhspc');

  prog.addEventListener('change', function() {
    if (prog.style.display = this.value === 'No aplica'){
      fechaProgresion.style.display = 'none';
      document.getElementById("fecha_prog_mhspc").required = false;
      input.value = '';
    }
    else{
      fechaProgresion.style.display = 'flex';
      document.getElementById("fecha_prog_mhspc").required = true;
    }
  });
}

function inicializarProgresion1(){
  var progSi = document.getElementById("prog_l1_1");
  var progNo = document.getElementById("prog_l1_2");
  var prog = document.querySelector(".prog1");
  var prog2 = document.querySelector(".prog2");
  var prog3 = document.getElementById("prog3");

  prog.style.display = 'none';

  progSi.addEventListener('change', function() {
    if (this.checked) {
      prog.style.display = 'flex';
      document.getElementById("fecha_prog_l1").required = true;
    }
  });

  progNo.addEventListener('change', function() {
    if (this.checked) {
      prog.style.display = 'none';
      document.getElementById("fecha_prog_l1").required = false;

      prog.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });

      prog2.style.display = 'none';

      prog2.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });

      prog3.style.display = 'none';

      prog3.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });
    }
  });
}

function inicializarProgresion2(){
  var progSi = document.getElementById("prog_l2_1");
  var progNo = document.getElementById("prog_l2_2");
  var prog = document.querySelector(".prog2");
  var prog3 = document.getElementById("prog3");

  prog.style.display = 'none';

  progSi.addEventListener('change', function() {
    if (this.checked) {
      prog.style.display = 'flex';
      document.getElementById("fecha_prog_l2").required = true;
    }
  });

  progNo.addEventListener('change', function() {
    if (this.checked) {
      prog.style.display = 'none';
      document.getElementById("fecha_prog_l2").required = false;

      prog.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });

      prog3.style.display = 'none';

      prog3.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });
    }
  });
}

function inicializarProgresion3(){
  var progSi = document.getElementById("prog_l3_1");
  var progNo = document.getElementById("prog_l3_2");
  var prog = document.getElementById("prog3");

  prog.style.display = 'none';

  progSi.addEventListener('change', function() {
    if (this.checked) {
      prog.style.display = 'flex';
      document.getElementById("fecha_prog_l3").required = true;
    }
  });

  progNo.addEventListener('change', function() {
    if (this.checked) {
      prog.style.display = 'none';
      document.getElementById("fecha_prog_l3").required = false;
      prog.querySelectorAll('input, select').forEach(elemento => {
        if (elemento.type === 'radio' || elemento.type === 'checkbox') {
          elemento.checked = false;
        } else {
          elemento.value = '';
        }
      });
    }
  });
}

function inicializarMuerte(){
  const estadoVital = document.getElementById('estado_vital');
  const fechaMuerte = document.getElementById('fechaMuerte');
  const input = document.getElementById('fecha_muerte');

  fechaMuerte.style.display = 'none';

  estadoVital.addEventListener('change', function() {
    if (fechaMuerte.style.display = this.value === 'Muerto'){
      fechaMuerte.style.display = 'flex';
      document.getElementById("fecha_muerte").required = true;
    }
    else{
      fechaMuerte.style.display = 'none';
      document.getElementById("fecha_muerte").required = false;
      input.value = '';
    }
  });
}


// Llamado a las funciones para desplegar el formulario según las opciones de radio
inicializarBiomarcadores();
inicializarLocalizado();
inicializarMhspc();
inicializarSegundaLinea();
inicializarTerceraLinea();
inicializarNmcrpc();
inicializarHospitalizacion();
inicializarFracturas();
inicializarRxtx();
inicializarDolor();
inicializarUrgencias();
inicializarFechaProgresion();
inicializarProgresion1();
inicializarProgresion2();
inicializarProgresion3();
inicializarMuerte();