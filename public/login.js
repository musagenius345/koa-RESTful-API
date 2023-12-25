
const form = document.querySelector('form')
log('hello')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = new FormData(form)
  const userObj = {username: data.get('username'), password: data.get('password')}
  try{
    await fetch('/login', {method: 'POST', body: userObj})
  } catch(e){
    log(e)
  }
})
function log(msg) {
  console.log(JSON.stringify(msg))
}
