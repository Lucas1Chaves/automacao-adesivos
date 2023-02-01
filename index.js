import ExcelJS from 'exceljs';
import {jsPDF} from 'jspdf';
import { desenharAdesivo } from './adesivo.js';
import fontBold  from './Arial Narrow-bold.js';
import fontNormal from './Arial Narrow-normal.js';

// Lendo dados no arquivo xlsx
const workbook = new ExcelJS.Workbook();
const worksheet = await workbook.xlsx.readFile('lista.xlsx').then((workbook)=>{return workbook.getWorksheet('adesivos')});
const qtdCol = worksheet.getColumn(2)

const cliente = qtdCol.values[1]
let data =[]

function createData(row,rowNumber){
  if (rowNumber>2){
    data.push({
      ambiente:row.values[1],
      quantidade:row.values[2],
      comprimento:row.values[3],
      tipoTrelica:row.values[4]
    })
  }
}

worksheet.eachRow(createData)

var doc = new jsPDF();
fontNormal;
fontBold;

var paginaAtual=1
var adesivosInseridos = 0

while (data.length>=1){
  const dadosAtual = data.pop()
  var qtdAdesivos = 0
  while (qtdAdesivos<parseInt(dadosAtual.quantidade)){
    const linha = Math.floor(adesivosInseridos/5)
    const coluna = adesivosInseridos % 5 
    doc.setPage(paginaAtual)
    desenharAdesivo(doc,5+40*coluna,13.5+135*linha,dadosAtual,cliente)
    qtdAdesivos +=1
    adesivosInseridos+=1
    if (adesivosInseridos===10){
      doc.addPage()
      adesivosInseridos=0
      paginaAtual+=1
    }
  }
}

doc.save('Adesivos.pdf')


