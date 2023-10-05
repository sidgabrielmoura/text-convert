const textForConvert = document.querySelector(".text-for-convert")
const convertedText = document.querySelector(".converted-text")
const capitalizeButton = document.querySelector(".capitalize-button")
const uppercaseButton = document.querySelector(".uppercase-button")
const lowercaseButton = document.querySelector(".lowercase-button")
const translateButton = document.querySelector(".translate-button")
const convertButton = document.querySelector(".convert-button")
const copyButton = document.querySelector(".copy-button")

capitalizeButton.addEventListener("click", () => {
    capitalizeButton.classList.toggle("ficaVerde")
})

uppercaseButton.addEventListener("click", () => {
    uppercaseButton.classList.toggle("ficaVerde")
})

lowercaseButton.addEventListener("click", () => {
    lowercaseButton.classList.toggle("ficaVerde")
})

translateButton.addEventListener("click", () => {
    translateButton.classList.toggle("ficaVerde")
})

function copyTxtCapitalize(){
    let textoConvertido = convertedText.value
    const str = textoConvertido.charAt(0).toUpperCase() + textoConvertido.slice(1);
    navigator.clipboard.writeText(str).then(() => {
        alert("texto copiado para o clipboard")
    });
}
function copyTxtUpperCase(){
    let textoConvertido = convertedText.value
    textoConvertido = textoConvertido.toUpperCase()
    navigator.clipboard.writeText(textoConvertido).then(() => {
        alert("texto copiado para o clipboard")
    });
}
function copyTxtLowerCase(){
    let textoConvertido = convertedText.value
    textoConvertido = textoConvertido.toLowerCase()
    navigator.clipboard.writeText(textoConvertido).then(() => {
        alert("texto copiado para o clipboard")
    });
}

function ifsCopyText(){
    if(convertedText.classList.contains("fica-capitalize")){
        copyTxtCapitalize();
    }else if(convertedText.classList.contains("fica-uppercase")){
        copyTxtUpperCase();
    }else if(convertedText.classList.contains("fica-lowercase")){
        copyTxtLowerCase();
    }else{
        return
    }
}

function adicionaConfigurçoesNosTextos(){
    if(capitalizeButton.classList.contains("ficaVerde")){
        convertedText.classList.add("fica-capitalize")
    }else{
        convertedText.classList.remove("fica-capitalize")
    }

    if(uppercaseButton.classList.contains("ficaVerde")){
        convertedText.classList.add("fica-uppercase")
    }else{
        convertedText.classList.remove("fica-uppercase")
    }

    if(lowercaseButton.classList.contains("ficaVerde")){
        convertedText.classList.add("fica-lowercase")
    }else{
        convertedText.classList.remove("fica-lowercase")
    }

    if(translateButton.classList.contains("ficaVerde")){
        txtTranslate();
        copyButton.disabled = true
    }else{
        copyButton.disabled = false
    }
}

copyButton.addEventListener("click", () => {
    if(verificaRepeticaoDaClasseFicaVerde() == true || transfereTexto() == true){
        return
    }else{
        ifsCopyText();
    }
})

function verificaRepeticaoDaClasseFicaVerde(){
    if(capitalizeButton.classList.contains("ficaVerde") && uppercaseButton.classList.contains("ficaVerde") || 
    capitalizeButton.classList.contains("ficaVerde") && lowercaseButton.classList.contains("ficaVerde")||
    lowercaseButton.classList.contains("ficaVerde") && uppercaseButton.classList.contains("ficaVerde")) {
        convertedText.value = "Calma lá!! clique apenas em uma configuração de texto por vez (com exceção do tradutor)..."
        convertedText.style.color = 'red'
        return true;
    }else{
        adicionaConfigurçoesNosTextos()
        convertedText.style.color = 'white'
    }
}

function transfereTexto(){
    let textoNaoConvertido = textForConvert.value
    convertedText.value = textoNaoConvertido
    if(textForConvert.value == ""){
        convertedText.value = "- Oops! parece que você esqueceu de adicionar um texto na área acima."
        convertedText.style.color = '#fbff3a'
        return true;
    }else{
        verificaRepeticaoDaClasseFicaVerde()
    }
}

convertButton.addEventListener("click", () => {
    transfereTexto()
})

// text translator code

function loadTranslate(){
    fetch(
        `https://api.mymemory.translated.net/get?q=${convertedText.value}&langpair=pt-BR|en-US`
    ).then((res) => res.json()).then((data) => {
        convertedText.value = data.responseData.translatedText;
    })
    return true
}

function txtTranslate(){
    loadTranslate();
}