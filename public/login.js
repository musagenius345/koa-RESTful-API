// const { URLSearchParams } = require("url")
const passwordInput = document.getElementById('#password')
const emailInput = document.getElementById('#email')
const form = document.querySelector('form')
log('hello')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = new FormData(form)
  const fdUrlEncoded = new URLSearchParams(data).toString()

  /**
    * @constant {ResponseInit}
    */
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  console.log(fdUrlEncoded)
  // const userObj = {username: data.get('username'), password: data.get('password')}
  try{
    await fetch('/login', {
      method: 'POST',
      body: fdUrlEncoded,
      headers
    })
  } catch(e){
    log(e)
  }
})
function log(msg) {
  console.log(JSON.stringify(msg))
}
