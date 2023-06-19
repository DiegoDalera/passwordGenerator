const resultPG = document.getElementById('result')
const lengthPG = document.getElementById('length')
const uppercasePG = document.getElementById('uppercase')
const lowercasePG = document.getElementById('lowercase')
const numbersPG = document.getElementById('numbers')
const symbolsPG = document.getElementById('symbols')
const generatePG = document.getElementById('generate')
const clipboardPG = document.getElementById('clipboard')

clipboardPG.addEventListener('click', () => {
    const password = resultPG.innerText;
    if (!password) {
        return;
    }

    navigator.clipboard.writeText(password);
    const messageCopy = document.getElementById('message');
    messageCopy.classList.remove("hidden");
    
    setTimeout(function () {
      messageCopy.classList.add("hidden");
    }, 3000);
}
)

generatePG.addEventListener('click', () => {
    const length = +lengthPG.value
    const containUpper = uppercasePG.checked
    const containLower = lowercasePG.checked
    const containNumber = numbersPG.checked
    const containSymbol = symbolsPG.checked

    resultPG.innerText = generatePassword(containUpper, containLower,
        containNumber, containSymbol, length)
})

function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = ''
    const typesCharCount = upper + lower + number + symbol
    const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(item => Object.values(item)[0])

    if (typesCharCount === 0) {
        return ''
    }

    for (let i = 0; i < length; i += typesCharCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

