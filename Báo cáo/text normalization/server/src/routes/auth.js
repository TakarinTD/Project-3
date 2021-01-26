const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const axios = require('axios')
const { loginValidate, registerValidate } = require('../validations/auth');
const authController = require('../controllers/auth');
const Excel = require('exceljs')
const GoogleSpreadsheet = require("google-spreadsheet")
const {promisify} = require("util")

const creds = require("./client_secret.json")

const {createTransport} =  require('nodemailer');

/* eslint-disable prettier/prettier */


let bufferExcel = async(data, pass, fail) => {
    let workbook = new Excel.Workbook()
                  
    let worksheet = workbook.addWorksheet('Debtors')

    worksheet.columns = [
      {header: 'INPUT', key: 'input'},
      {header: 'EXPECTED', key: 'expected'},
      {header: 'OUTPUT', key: 'output'},
      {header: 'RESULT', key: 'result'},
    ]

    worksheet.columns.forEach(column => {
      column.width = column.header.length < 30 ? 30 : column.header.length
    })
    worksheet.getRow(1).font = {bold: true}

    // Dump all the data into Excel
    data.forEach(e => worksheet.addRow(e))

    // Add the total Rows
    worksheet.addRow(['', 'PASS', pass])
    worksheet.addRow(['', 'FAIL', fail])

    // loop through all of the rows and set the outline style.
    worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
      const insideColumns = ['B', 'C']
      
      worksheet.getCell(`A${rowNumber}`).border = {
          top: {style: 'thin'},
          left: {style: 'thin'},
          bottom: {style: 'thin'},
          right: {style: 'none'}
      }

      worksheet.getCell(`D${rowNumber}`).border = {
          top: {style: 'thin'},
          left: {style: 'none'},
          bottom: {style: 'thin'},
          right: {style: 'thin'}
        }

      insideColumns.forEach((v) => {
        worksheet.getCell(`${v}${rowNumber}`).border = {
          top: {style: 'thin'},
          bottom: {style: 'thin'},
          left: {style: 'none'},
          right: {style: 'none'}
        }
      })
    })

    worksheet.getCell(`A${worksheet.rowCount}`).border = {
      top: {style: 'none'},
      left: {style: 'none'},
      bottom: {style: 'none'},
      right: {style: 'thin'}
    }

    worksheet.getCell(`D${worksheet.rowCount}`).border = {
      top: {style: 'none'},
      left: {style: 'thin'},
      bottom: {style: 'none'},
      right: {style: 'none'}
    }

    worksheet.getCell(`A${worksheet.rowCount-1}`).border = {
      top: {style: 'thin'},
      left: {style: 'none'},
      bottom: {style: 'none'},
      right: {style: 'thin'}
    }

    worksheet.getCell(`D${worksheet.rowCount-1}`).border = {
      top: {style: 'thin'},
      left: {style: 'thin'},
      bottom: {style: 'none'},
      right: {style: 'none'}
    }

    const totalCell = worksheet.getCell(`B${worksheet.rowCount}`)
    totalCell.font = {bold: true}
    totalCell.alignment = {horizontal: 'center'}

    const totalCell3 = worksheet.getCell(`C${worksheet.rowCount}`)
    totalCell3.font = {bold: true}
    totalCell3.alignment = {horizontal: 'center'}

    const totalCell4 = worksheet.getCell(`C${worksheet.rowCount-1}`)
    totalCell4.font = {bold: true}
    totalCell4.alignment = {horizontal: 'center'}

    const totalCell2 = worksheet.getCell(`B${worksheet.rowCount-1}`)
    totalCell2.font = {bold: true}
    totalCell2.alignment = {horizontal: 'center'}

    return workbook.xlsx.writeBuffer();

}
let initRouter = (app) => {
    router.post('/auths/register', registerValidate, asyncMiddleware(authController.register));
    router.post('/auths/login', loginValidate, asyncMiddleware(authController.login));
    router.get('/auths/verify', auth, asyncMiddleware(authController.verifyAccessToken));
    
    router.post('/expand', async(req, res) => {
        let data2req = req.body
        let adr1 = data2req.sentenceWithAbbrev.indexOf("~")
        let adr2 = data2req.sentenceWithAbbrev.indexOf("#")
        
        if(adr1 === -1 || adr2 === -1){
            try {
                let res2normalize = await axios.post('http://43.239.223.87:5000/text_normalize', {sentence : data2req.sentenceWithAbbrev}) 
                return res.status(200).send({expand : res2normalize.data.content})
            } catch (error) {
                return res.status(500).send("Lỗi rồi :))")
            }
        }else{
            let normallize1 =  data2req.sentenceWithAbbrev.slice(0, adr1).trim()
            let normallize2 =  data2req.sentenceWithAbbrev.slice(adr2 + 1).trim()
            let expand = data2req.sentenceWithAbbrev.slice(adr1 + 1, adr2).trim()
            try {
                let res2normalize1 = normallize1 !== '' ? await axios.post('http://43.239.223.87:5000/text_normalize', {sentence : normallize1}) : ''
                let res2normalize2 = normallize2 !== '' ? await axios.post('http://43.239.223.87:5000/text_normalize', {sentence : normallize2}) : ''
                data2req = {sentenceWithAbbrev : (`${res2normalize1} ~ ${expand} # ${res2normalize2}`).trim() }
                let {data} = await axios.post('http://43.239.223.87:5050/expand', data2req)
                data.expand =  (normallize1 + " " + (data.expand !=='null' ? data.expand : expand) + " " + normallize2).trim()
                return res.status(200).send(data)
            } catch (error) {
                return res.status(500).send("Lỗi rồi :))")
            }
        }
    })
    router.post("/data2excel", async(req, res) => {
        try {
              const buffer =  await bufferExcel(req.body.items, req.body.pass, req.body.fail)
              const filename = 'text_nomarlization.xlsx';
              const transporter = createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: false,
                auth: {
                    user: process.env.MAIL_PUBLIC_ME,
                    pass: process.env.PASS_PUBLIC_ME,
                },
            });
            const mailOptions = {
                from: process.env.MAIL_PUBLIC_ME,
                to: [process.env.MAIL_SEND],
                subject: 'Text nomarlization: Kết quả kiểm tra',
                html: `<h2> Bạn nhận được Email vì đã sử dụng ứng dụng text nomarlization</h2>
                        <h3>Đọc file để xem kết quả</h3>`,
                attachments: [
                    {
                        filename,
                        content: buffer,
                        contentType:
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    },
                ],
            };
            await transporter.sendMail(mailOptions);
            return res.status(200).send("OKKKK:))")
        } catch (error) {
            return res.status(500).send("Lỗi rồi :((")
        }
    })
    router.post("/get-data-from-url", async(req, res) => {
      let url = req.body.url
      let start_id = url.indexOf("/d/") + 3
      let end_id = url.indexOf("/edit")
      try {
          let id = url.slice(start_id, end_id)
          console.log(id)
          const doc = new GoogleSpreadsheet(id)
          await promisify(doc.useServiceAccountAuth)(creds)
          const info = await promisify(doc.getInfo)()
          const sheet = info.worksheets[0]
          const rows = await promisify(sheet.getRows)({
            offset : 1
          })
          let data2res = []
          rows.forEach(row => {
            if(row.input && row.expected) data2res.push({input : row.input, expected : row.expected })
          })
          return res.status(200).send(data2res)
      } catch (error) {
          return res.status(500).send("lỗi đọc url :))")
      }
    })


    return app.use('/', router)
}

/* eslint-enable prettier/prettier */

module.exports = initRouter;
