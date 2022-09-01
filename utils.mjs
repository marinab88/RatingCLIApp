// working with files & directories
import { readdir, readFile, writeFile } from 'node:fs'

// working with input/output from console
import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'

import util from 'node:util'
import printf from 'printf'

const io = readline.createInterface({input, output})

const spacePadding = (nr) => {
  let space = ''
  for ( let i=0; i<nr; i++) space+= ' '
  return space
}

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
            // let rate = parseFloat(fragments[1])

            
           
            let avgRate = 0
            let output
            
            // for (let i=1; i<fragments.length; i++) {
            //   avgRate += +parseFloat(fragments[i])
            // }
            // avgRate /= (fragments.length - 1)
            
            //HW3: Try to rewrite this code using Array.reduce()
            let fragmn = fragments.slice(1)

            let rates = fragmn.map((str) => {
              return parseFloat(str)
            })
              
            let result = rates.reduce((total, num) => {
              return total + num
            })
            
            avgRate = result / rates.length 
            
          // format data & 4. show data
            // 'John' --> '        John'

            // First version
            // name = spacePadding(12 - name.length) + name
            // rate = spacePadding(7) + rate.toFixed(1)
            // console.log(`  ${name} ${rate}`)
            
            // Second version
            output = printf('%12s %10.1f', name, avgRate)
            
            // HW4: check if there is no rate, show n/a 
            if (avgRate === 0) {
              avgRate = `n/a`
              output = printf('%12s %10s', name, avgRate)
            }

            console.log(output)

            // My version
            // let val1 = util.format('%s', name)
            // let valRate = util.format('%s', avgRate.toFixed(1))
            // let paddedName = name.padStart(12, ' ')
            // let paddedRate = valRate.padStart(10, ' ')
            
            // console.log(paddedName, paddedRate)

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

        // HW3: lose the rate = 0.0
        // let rate = 0.0
        
        // 0. stringify data
        // let data = `${name}\r\n${rate}`
        let data = `${name}`
    
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

const rateUser = () => {
  console.clear();
  io.question('Enter user name : ', (nameToFind) => {
    readdir('users', (err, fileNames) => {
      fileNames.forEach((fileName) => {
        readFile(`users/${fileName}`, (err, content) => {
          if (!err) {
            let fragments = content.toString().split('\r\n')
            let name = fragments[0]
            if (name == nameToFind) {
              io.question('Enter user rate: ', (rate) => {
                fragments.push(rate)
                let data = fragments.join('\r\n')
                writeFile(`users/${fileName}`, data, (err) => {
                  if (err) {
                    console.log('An error occured during saving!')
                  }
                  io.close()
                })
              })
            }
          }
        })
      })
    })
  })
}

export {showUsers, addUser, rateUser}