const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

const fs = require('fs'); // test
const xlsx = require('xlsx'); // test

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let loginWindow;
let mainWindow;

function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'), // Ruta al archivo preload.js
    },
  });

  loginWindow.loadFile(path.join(__dirname, 'login.html'));
  
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1000,
    minHeight: 800,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'), // Ruta al archivo preload.js
    },
  });

  mainWindow.maximize();
  loginWindow.close();

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  ipcMain.on('open-main-window', createMainWindow)
  ipcMain.on('validateLogin', (event, user, password) => {
    if (user === '1' && password === '1') {
      loginWindow.webContents.send('loginResult', true);
    } else {
      loginWindow.webContents.send('loginResult', false);
    }
  });
  ipcMain.on('saveData', (event, data) => {
    try {
      const save = guardarDatos(data);
      event.reply('saveResult', save);
    } catch (error) {
      console.error('Error en el proceso principal:', error);
      
      mainWindow.webContents.executeJavaScript('alert("Error al guardar los datos.");');
    }
  });
  ipcMain.on('openExcel', openExcel)
  createLoginWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createLoginWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


function guardarDatos(data) {
  try {
    const filePath = path.join(__dirname, 'Pacientes.xlsx');
    const headers = [
    'Consecutivo', 'Número asignado al paciente', 'Año de nacimiento', 'Área de residencia', 
    'Departamento de residencia','Afiliación al sistema de salud', 'Fecha de diagnóstico de cáncer de próstata', 
    'Método de detección', 'Escenario', 'Estadío', 'Gleason', 'Grupo', 'PSA inicial', 'Grupo de riesgo', 
    'Fecha de diagnóstico de mHSPC', 'Carga tumoral', 'PSA al progresar a mCRPC', 'Fecha de diagnóstico de mCRPC', 
    'Sitios de metástasis', 'ECOG', 'Biomarcadores', 'Fecha de reporte', 'PTEN', 'Resultado PTEN', 'TP53', 'Resultado TP53', 'RB1', 
    'Resultado RB1', 'BRCA1', 'Resultado BRCA1', 'BRCA2', 'Resultado BRCA2', 'MMR', 'Resultado MMR', 'MSI', 'Resultado MSI', 'Otro', 
    'Cuál', 'Resultado Otro', 'Antecedente HTA','Antecedente DM', 'Antecedente enfermedad cardíaca isquémica', 'Antecedente ERC', 
    'Antecedente familiar de cáncer de próstata', 'Tratamiento para tumor localizado', 'Fecha primer tratamiento cáncer localizado', 
    'Nombre primer tratamiento', 'Prostatectomía radical', 'Radioterapia de tumor primario', 'Intención curativa', 
    'Tratamiento para mHSPC', 'Fecha de inicio del primer tratamiento sistémico para mHSPC',
    'Terapia de primera línea para mHSPC', 'Médico encargado de administrar la primera línea para mHSPC',
    'Fecha de inicio de la primera línea de tratamiento para mCRPC', 'Terapia de primera línea para mCRPC', 
    'Clasificación de la primera línea', 'Segunda línea', 'Fecha de inicio de la segunda línea de tratamiento para mCRPC', 
    'Terapia de segunda línea para mCRPC', 'Clasificación de la segunda línea', 'Tercera línea',
    'Fecha de inicio de la tercera línea de tratamiento para mCRPC', 'Terapia de tercera línea para mCRPC', 
    'Clasificación de la tercera línea', 'nmCRPC', 'Fecha de diagnóstico del nmCRPC', 'PSA al diagnóstico del nmCRPC',
    'Fecha de inicio del primer tratamiento sistémico para nmCRPC', 'Fecha de progresión de la enfermedad',
    'Número de visitas ambulatorias al oncólogo luego del diagnóstico de enfermedad metástasica', '¿Requirió hospialización?',
    'Causa de hospitalización', 'Número de hospitalizaciones', 'Fracturas patológicas', 'Número de fracturas patológicas',
    'Cirugía para fracturas patológicas', 'Radioterapia paliativa', 'Número de cursos', 'Tratamiento por especialista en dolor',
    'Número de consultas con especialista en dolor', '¿Ingresó a urgencias?', 'Causa de visita a urgencias', 'Número de visitas',
    '¿Cómo se documentó la progresión de mHSPC a mCRPC?', 'Fecha de progresión de mHSPC a mCRPC', 
    'Progresión a la primera línea de tratamiento en mCRPC', 'Fecha de progresión a la primera línea de tratamiento',
    'Progresión a la segunda línea de tratamiento en mCRPC', 'Fecha de progresión a la segunda línea de tratamiento',
    'Progresión a la tercera línea de tratamiento en mCRPC', 'Fecha de progresión a la tercera línea de tratamiento',
    'Fecha de último contacto', 'Estado vital', 'Fecha de muerte', 'Observaciones', 'Nombre de quien diligencia', 'Nombre del sitio',
    'Fecha de ingreso de los datos'
    ];

    let workbook;
    let worksheet;

    if (!fs.existsSync(filePath)) {
      // Si el archivo no existe, crea uno nuevo con encabezados
      workbook = xlsx.utils.book_new();
      worksheet = xlsx.utils.json_to_sheet([headers]);
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Pacientes');
    } else {
      // Leer el archivo existente
      workbook = xlsx.readFile(filePath);
      worksheet = workbook.Sheets[workbook.SheetNames[0]];
    }

    // Encontrar la última fila ocupada en la hoja de trabajo
    const lastRow = worksheet['!ref'] ? xlsx.utils.decode_range(worksheet['!ref']).e.r + 1 : 0;

    // Agregar una nueva fila con los datos del formulario
    const newRow = [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[11], 
    data[12], data[13], data[14], data[15], data[16], data[17], data[18], data[19], data[20], data[21], data[22], data[23], data[24], 
    data[25], data[26], data[27], data[28], data[29], data[30], data[31], data[32], data[33], data[34], data[35], data[36], data[37], 
    data[38], data[39], data[40], data[41], data[42], data[43], data[44], data[45], data[46], data[47], data[48], data[49], data[50], 
    data[51], data[52], data[53], data[54], data[55], data[56], data[57], data[58], data[59], data[60], data[61], data[62], data[63], 
    data[64], data[65], data[66], data[67], data[68], data[69], data[70], data[71], data[72], data[73], data[74], data[75], data[76], 
    data[77], data[78], data[79], data[80], data[81], data[82], data[83], data[84], data[85], data[86], data[87], data[88], data[89],
    data[90], data[91], data[92], data[93], data[94], data[95], data[96], data[97], data[98]];

    // Convertir la fila de datos a un objeto con claves coincidentes con los encabezados
    const rowData = {};
    headers.forEach((header, index) => {
      rowData[header] = newRow[index];
    });

    // Agregar la fila de datos a la hoja de trabajo
    const newRowIndex = lastRow + 1;
    headers.forEach((header, index) => {
      const cellAddress = xlsx.utils.encode_cell({ c: index, r: newRowIndex });
      worksheet[cellAddress] = { t: 's', v: rowData[header] };
    });

    // Verificar si ya existe una fila con los mismos datos en la hoja de trabajo
    let existingRow = -1;
    const sheetData = xlsx.utils.sheet_to_json(worksheet, { header: headers });
    sheetData.forEach((row, index) => {
      if (Object.keys(rowData).every(key => row[key] === rowData[key])) {
        existingRow = index;
        return false; // Salir del bucle si se encuentra una fila existente
      }
    });

    // Si no existe una fila igual, agregar la nueva fila
    if (existingRow === -1) {
      xlsx.utils.sheet_add_json(worksheet, [rowData], { skipHeader: true, origin: lastRow });
    }
    else {
    // Alertar al usuario de que la fila ya existe
    mainWindow.webContents.executeJavaScript('alert("Los datos no se pueden guardar porque el paciente ya existe.");');
    mainWindow.webContents.send('saveResult', false);
    return false
    }

    // Escribir de nuevo en el archivo
    fs.writeFileSync(filePath, xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' }));
    mainWindow.webContents.executeJavaScript('alert("Los datos se guardaron correctamente.");');
    mainWindow.webContents.send('saveResult', true);
    return true

  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: 'Error al guardar los datos' };
  }
}


function openExcel(){
  const filePath = path.join(__dirname, 'Pacientes.xlsx');
  shell.openPath(filePath);
}
















/*
function guardarDatos(data) {
  try {
    const filePath = 'Pacientes.xlsx';
    const headers = [
    'Consecutivo', 'Número asignado al paciente', 'Año de nacimiento', 'Área de residencia', 
    'Departamento de residencia','Afiliación al sistema de salud', 'Fecha de diagnóstico de cáncer de próstata', 
    'Método de detección', 'Escenario', 'Estadío', 'Gleason', 'Grupo', 'PSA inicial', 'Grupo de riesgo', 
    'Fecha de diagnóstico de mHSPC', 'Carga tumoral', 'PSA al progresar a mCRPC', 'Fecha de diagnóstico de mCRPC', 
    'Sitios de metástasis', 'ECOG', 'Biomarcadores', 'Fecha de reporte', 'PTEN', 'Resultado PTEN', 'TP53', 'Resultado TP53', 'RB1', 
    'Resultado RB1', 'BRCA1', 'Resultado BRCA1', 'BRCA2', 'Resultado BRCA2', 'MMR', 'Resultado MMR', 'MSI', 'Resultado MSI', 'Otro', 
    'Cuál', 'Resultado Otro', 'Antecedente HTA','Antecedente DM', 'Antecedente enfermedad cardíaca isquémica', 'Antecedente ERC', 
    'Antecedente familiar de cáncer de próstata', 'Fecha primer tratamiento cáncer localizado', 'Nombre primer tratamiento', 
    'Prostatectomía radical', 'Radioterapia de tumor primario', 'Intención curativa', 
    'Fecha de inicio del primer tratamiento sistémico para mHSPC',
    'Terapia de primera línea para mHSPC', 'Médico encargado de administrar la primera línea para mHSPC',
    'Fecha de inicio de la primera línea de tratamiento para mCRPC', 'Terapia de primera línea para mCRPC', 
    'Clasificación de la primera línea', 'Fecha de inicio de la segunda línea de tratamiento para mCRPC', 
    'Terapia de segunda línea para mCRPC', 'Clasificación de la segunda línea', 
    'Fecha de inicio de la tercera línea de tratamiento para mCRPC', 'Terapia de tercera línea para mCRPC', 
    'Clasificación de la tercera línea', 'Fecha de diagnóstico del nmCRPC', 'PSA al diagnóstico del nmCRPC',
    'Fecha de inicio del primer tratamiento sistémico para nmCRPC', 'Fecha de progresión de la enfermedad',
    'Número de visitas ambulatorias al oncólogo luego del diagnóstico de enfermedad metástasica', '¿Requirió hospialización?',
    'Causa de hospitalización', 'Número de hospitalizaciones', 'Fracturas patológicas', 'Número de fracturas patológicas',
    'Cirugía para fracturas patológicas', 'Radioterapia paliativa', 'Número de cursos', 'Tratamiento por especialista en dolor',
    'Número de consultas con especialista en dolor', '¿Ingresó a urgencias?', 'Causa de visita a urgencias', 'Número de visitas',
    '¿Cómo se documentó la progresión de mHSPC a mCRPC?', 'Fecha de progresión de mHSPC a mCRPC', 
    'Progresión a la primera línea de tratamiento en mCRPC', 'Fecha de progresión a la primera línea de tratamiento',
    'Progresión a la segunda línea de tratamiento en mCRPC', 'Fecha de progresión a la segunda línea de tratamiento',
    'Progresión a la tercera línea de tratamiento en mCRPC', 'Fecha de progresión a la tercera línea de tratamiento',
    'Fecha de último contacto', 'Estado vital', 'Fecha de muerte'
    ];

    let workbook;
    let worksheet;

    if (!fs.existsSync(filePath)) {
      // Si el archivo no existe, crea uno nuevo con encabezados
      workbook = xlsx.utils.book_new();
      worksheet = xlsx.utils.json_to_sheet([headers]);
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Pacientes');
    } else {
      // Leer el archivo existente
      workbook = xlsx.readFile(filePath);
      worksheet = workbook.Sheets[workbook.SheetNames[0]];
    }

    // Encontrar la última fila ocupada en la hoja de trabajo
    const lastRow = worksheet['!ref'] ? xlsx.utils.decode_range(worksheet['!ref']).e.r + 1 : 0;

    // Agregar una nueva fila con los datos del formulario
    const newRow = [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[11], 
    data[12], data[13], data[14], data[15], data[16], data[17], data[18], data[19], data[20], data[21], data[22], data[23], data[24], 
    data[25], data[26], data[27], data[28], data[29], data[30], data[31], data[32], data[33], data[34], data[35], data[36], data[37], 
    data[38], data[39], data[40], data[41], data[42], data[43], data[44], data[45], data[46], data[47], data[48], data[49], data[50], 
    data[51], data[52], data[53], data[54], data[55], data[56], data[57], data[58], data[59], data[60], data[61], data[62], data[63], 
    data[64], data[65], data[66], data[67], data[68], data[69], data[70], data[71], data[72], data[73], data[74], data[75], data[76], 
    data[77], data[78], data[79], data[80], data[81], data[82], data[83], data[84], data[85], data[86], data[87], data[88], data[89]];

    // Convertir la fila de datos a un objeto con claves coincidentes con los encabezados
    const rowData = {};
    headers.forEach((header, index) => {
      rowData[header] = newRow[index];
    });

    // Agregar la fila de datos a la hoja de trabajo
    xlsx.utils.sheet_add_json(worksheet, [rowData], { skipHeader: true, origin: lastRow });

    // Escribir de nuevo en el archivo
    fs.writeFileSync(filePath, xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' }));

    return { success: true, message: 'Datos guardados correctamente' };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: 'Error al guardar los datos' };
  }
}


function openExcel(){
  const filePath = 'Pacientes.xlsx';
  shell.openPath(filePath);
}*/
