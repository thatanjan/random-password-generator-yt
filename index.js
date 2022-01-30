// elements
const copyBtnEl = document.querySelector('.copy__btn')
const passwordTextEl = document.querySelector('.password__text')
const generateBtnEl = document.querySelector('.generate__btn')
const formEl = document.querySelector('.form__container')

const lengthEl = document.getElementById('length')
const upperCaseEl = document.getElementById('uppercase')
const lowerCaseEl = document.getElementById('lowercase')
const symbolsEl = document.getElementById('symbols')
const numbersEl = document.getElementById('numbers')

// random functions

const caseRanges = {
	lower: [97, 122],
	upper: [65, 90],
}

const getRandomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min

const getRandomChar = range => String.fromCharCode(getRandomInt(...range))

const getLowerChar = () => getRandomChar(caseRanges.lower)
const getUpperChar = () => getRandomChar(caseRanges.upper)

const getRandomSymbol = () => {
	const symbols = '!@#$%^&*()_+{}[]|:;<>?/'
	const index = getRandomInt(0, symbols.length - 1)

	return symbols[index]
}

const getRandomNum = () => getRandomInt(0, 9)

const randomFuncs = {
	lower: getLowerChar,
	upper: getUpperChar,
	symbol: getRandomSymbol,
	number: getRandomNum,
}

const getRandomFuncs = () => {
	const values = {
		lower: lowerCaseEl.checked,
		upper: upperCaseEl.checked,
		symbol: symbolsEl.checked,
		number: numbersEl.checked,
	}

	const keys = Object.keys(values)

	let selectedFuncs = []

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]

		if (values[key]) selectedFuncs.push(randomFuncs[key])
	}

	return selectedFuncs
}

const keys = Object.keys(randomFuncs)

const generatePassword = () => {
	let password = ''
	const passwordLength = lengthEl.value

	const funcs = getRandomFuncs()

	const funcsLength = funcs.length

	if (!funcsLength) return ''

	while (password.length < passwordLength) {
		const randomFunc = funcs[getRandomInt(0, funcsLength - 1)]
		password += randomFunc()
	}

	return password
}

const writePassword = () => {
	const password = generatePassword()
	passwordTextEl.innerText = password

	return true
}

const copyToClipBoard = async () => {
	const password = passwordTextEl.innerText

	if (!password) return

	await navigator.clipboard.writeText(password)

	copyBtnEl.innerText = 'Copied!'

	setTimeout(() => {
		copyBtnEl.innerText = 'Copy'
	}, 1500)

	return true
}

writePassword()

// eventListeners

formEl.addEventListener('submit', e => {
	writePassword()
	e.preventDefault()
})

copyBtnEl.addEventListener('click', copyToClipBoard)
