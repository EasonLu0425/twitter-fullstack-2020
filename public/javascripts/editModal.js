const editModal = document.querySelector('#editModal')
const introductionCount = document.querySelector('#introduction-area')
const nameCount = document.querySelector('#name-area')
const inputName = document.querySelector('#name')
const inputIntroduction = document.querySelector('#introduction')
const editButton = document.querySelector('#editButton')
const backgroundImage = document.querySelector('#background-image')
const deleteBgButton = document.querySelector('.edit-x-icon')
const inputBackground = document.querySelector('#background')
const avatarImage = document.querySelector('#avatar-image')
const inputAvatar = document.querySelector('#avatar')

inputBackground.addEventListener('change', async () => {
  try{
  const formData = new FormData()
  formData.append('background', inputBackground.files[0])
  const data = await axios.post(`/api/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  backgroundPath = data.data.uploadBackground
  backgroundImage.src = backgroundPath
  } catch (err) { console.log(err) }
})


deleteBgButton.addEventListener('click', async () => {
  try {
    const data = await axios.post(`/api/imagex`)
    backgroundPath = data.data.uploadBackground
    backgroundImage.src = backgroundPath
    inputBackground.value = ''
  } catch (err) { console.log(err) }
})

inputAvatar.addEventListener('change', async () => {
  try {
    const formData = new FormData()
    formData.append('avatar', inputAvatar.files[0])
    const data = await axios.post(`/api/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    avatarPath = data.data.uploadAvatar
    avatarImage.src = avatarPath
  } catch (err) { console.log(err) }
})

// 儲存modal資訊，刷新頁面
editModal.addEventListener('submit', function (event) {
  event.preventDefault()
  const target = event.target
  const UserId = target.dataset.id
  const formData = new FormData()
  formData.append('name', inputName.value)
  formData.append('introduction', inputIntroduction.value)
  formData.append('background', inputBackground.files[0])
  formData.append('avatar', inputAvatar.files[0])
  axios
    .post(`/api/users/${UserId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(res => {
      history.go(0) // 刷新本頁
    })
    .catch(err => console.log(err))
})

function introWordsCheck () {
  const content = document.querySelector('#introduction').value.trim().length
  if (content === 160) {
    introductionCount.innerHTML = `<span style="font-weight: 500;font-size: 12px;color: #FC5A5A;">字數不可超過${content}字</span>`
  } else {
    introductionCount.innerHTML = `<p class="text-end text-muted now2" style="font-size:12px;">${content}/160</p>`
  }
}
function nameWordsCheck () {
  const content = document.querySelector('#name').value.trim().length
  if (content === 50) {
    nameCount.innerHTML = `<span style="font-weight: 500;font-size: 12px;color: #FC5A5A;">字數不可超過${content}字</span>`
  } else {
    nameCount.innerHTML = `<p class="text-end text-muted now1" style="font-size: 12px;">${content}/50</p>`
  }
}