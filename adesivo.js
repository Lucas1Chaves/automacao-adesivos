import fs from 'fs';

// Lendo a imagem do logo
var logo;
fs.readFile('logo.png', (err, data) => {
  if (err) throw err;
  logo = Buffer.from(data).toString('base64');
});

export function desenharAdesivo(doc,x0,y0,data,cliente){
  doc.rect(x0,y0,40,135)
  doc.addImage(logo,'png',x0+4.46,y0+1.53,31.7,18.37)
  
  doc.line(x0+4,y0+26.6,x0+35.7,y0+26.6)
  doc.setFont('Arial Narrow','bold')
  doc.setFontSize(10)
  const {w,h} = doc.getTextDimensions(cliente)
  const height = (Math.floor(w/35)+1)*h
  doc.text(cliente,x0+20,y0+30,{align:'center',baseline:'top',maxWidth:35})
  doc.line(x0+4,y0+30+height+2,x0+35.7,y0+30+height+2)

  if (data.tipoTrelica){
    doc.text(
      data.tipoTrelica,
      x0+20,
      y0+30+height+6,
      {align:'center',baseline:'top',maxWidth:35}
    )
  }

  // Escrevendo o texto "AMBIENTE"
  doc.setFontSize(12)
  var textWidth = doc.getTextWidth('AMBIENTE') / 2;
  doc.text('AMBIENTE', x0 + 20 + textWidth, y0 + 130 , {angle: 180});

  // Escrevendo o texto do ambiente lido na planilha
  doc.setFont('Arial Narrow','normal')
  doc.setFontSize(20)
  var textWidth = doc.getTextWidth(data.ambiente) / 2;
  doc.text(data.ambiente, x0 + 20 + textWidth, y0 + 120 , {angle: 180});

  doc.line(x0+4,y0+116,x0+35.7,y0+116)
  
  // Escrevendo o texto "COMPRIMENTO"
  doc.setFont('Arial Narrow','bold')
  doc.setFontSize(12)
  textWidth = doc.getTextWidth('COMPRIMENTO') / 2;
  doc.text('COMPRIMENTO', x0 + 20 + textWidth, y0 + 110 , {angle: 180});

  // Escrevendo o comprimento lido na planilha
  doc.setFont('Arial Narrow','normal')
  doc.setFontSize(20)
  textWidth = doc.getTextWidth(`${data.comprimento} m`) / 2;
  doc.text(`${data.comprimento} m`, x0 + 20 + textWidth, y0 + 102 , {angle: 180});

  doc.line(x0+4,y0+96,x0+35.7,y0+96);

  // Escrevendo o texto "QUANTIDADE"
  doc.setFont('Arial Narrow','bold')
  doc.setFontSize(12)
  textWidth = doc.getTextWidth('QUANTIDADE') / 2;
  doc.text('QUANTIDADE', x0 + 20 + textWidth, y0 + 90 , {angle: 180});

  // Escrevendo a quantidade lida na planilha
  doc.setFont('Arial Narrow','normal')
  doc.setFontSize(20)
  textWidth = doc.getTextWidth(`${data.quantidade}`) / 2;
  doc.text(`${data.quantidade}`, x0 + 20 + textWidth, y0 + 82 , {angle: 180});
}