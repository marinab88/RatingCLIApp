// working with files & directories
import { readdir, readFile, writeFile } from 'node:fs'

// working with input/output from console
import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'

import util from 'node:util'

const io = readline.createInterface({input, output})

const showUsers = () => {
  console.clear()
  
  // 1. scan users folder
  readdir('users', (err, fileNames) => {
    if (!err) {
      console.log('USERS:')

      // 2. loop through each file
      fileNames.forEach((fileName) => {
        // console.log(fileName)

        // 3. read file
        readFile(`users/${fileName}`, (err, content) => {
          if (!err) {
            // console.log(content.toString())
            // John\n0.0

            // 3.b parse data
            let fragments = content.toString().split('\r\n')
            // console.log(fragments);
            let name = fragments[0]
            let rate = parseFloat(fragments[1])
            
            // 4. show data
            // let val1 = util.format('%s', name)
            let valRate = util.format('%s', rate.toFixed(1))
            let paddedName = name.padStart(12, ' ')
            let paddedRate = valRate.padStart(10, ' ')
            
            console.log(paddedName, paddedRate)

            io.close()
          }
        })
      })
    }
  })
}

const addUser = () => {
  console.clear()
  io.question('Enter user name : ', (name) => {

    // -1. find out how many files there are?
    readdir('users', (err, fileNames) => {
      if (!err) {
        let nextFileNumber = fileNames.length
        let rate = 0.0

        // 0. stringify data
        let data = `${name}\r\n${rate}`
    
        // 1. open and write this name and rate 0.0 into a new file
        writeFile(`users/${nextFileNumber}.txt`, data, (err) => {
          if (err) {
            console.log('An error occured during saving!')
          }
          io.close()
        })
      }
    })
  })
}

export {showUsers, addUser}