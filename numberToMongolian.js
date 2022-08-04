const texts = {
    separatrix: ["мянга","сая","тэрбум","их наяд","маш дэлгэмэл","тунамал","ингүүмэл"],
    unity: ["","нэг","хоёр","гурав","дөрөв","тав","зургаа","долоо","найм","ес"],
    unity_bander: ["","нэгэн","хоёр","гурван","дөрвөн","таван","зургаан","долоон","найман","есөн"],
    decimal: ["","арав","хорь","гуч","дөч","тавь","жар","дал","ная","ер",],
    decimal_bander: ["","арван","хорин","гучин","дөчин","тавин","жаран","далан","наян","ерэн"],
    centurion: ["зуу"],
    centurion_bander: ["зуун"]
};

const number_to_text = (number) => {
    
    if(parseInt(number.toString().substring(number.toString().length - 2)) > 21) {
        return "Хэтэрхий том тоо тул bigIntToMongolian.js ээр хөрвүүлнэ үү..."
    }
    if(parseInt(number.toString().substring(number.toString().length - 2)) == 21) {
        return texts.unity_bander[parseInt(number.toString().substring(0,number.toString().indexOf("e")))]+' '+texts.separatrix[6]
    }
    if(number === 0) {
        return "тэг"
    }
    if(number.toString().includes('.')){
        number = Math.round(number);
    }
    number = number.toString();
    let converted_text = ''
    let counter = 0
    let tsifr; 
    if(number > 0) {
        tsifr = number.split('').reverse().join('');
        tsifr = tsifr.match(/.{1,3}/g).map((m) => m.split('').reverse().join('')).reverse()
    } else {
        tsifr = number.split(`-`).reverse().join('');
        tsifr = tsifr.match(/.{1,3}/g).map((m) => m.split('').join(''))
    }
    converted_text = zuutaar(tsifr.pop(), true) + converted_text
    while (tsifr.length) {
        let pop = tsifr.pop()
        if (pop !== '000') {
            converted_text = zuutaar(pop) + texts.separatrix[counter] + ' ' + converted_text
        }
        counter += 1
    }
    converted_text = converted_text.trim().replace(/ +/g, ' ');
    if(number < 0) {
        converted_text = "хасах " + converted_text
    } 
    return converted_text
}

const zuutaar = (number, is_last=false) => {
    let converted_text = ''
    let tsifr = ('000'+number).match(/.{3}$/g)[0]
    if (tsifr === '001') {
        if (is_last) {
            converted_text = texts.unity[tsifr[2]]
        }
    } else {
        if (tsifr[0] !== '0') {
            if (tsifr[0] !== '1') {
                converted_text += texts.unity_bander[tsifr[0]] + ' '
            }
            if (is_last && tsifr[1] === '0' && tsifr[2] === '0') {
                converted_text += texts.centurion + ' '
            } else {
                converted_text += texts.centurion_bander + ' '
            }
        }
        if (is_last) {
            if (tsifr[1] !== '0' && tsifr[2] !== '0') {
                converted_text += texts.decimal_bander[tsifr[1]] + ' '
            } else {
                converted_text += texts.decimal[tsifr[1]] + ' '
            }
            converted_text += texts.unity[tsifr[2]] + ' '
        } else {
            if (tsifr[1] !== '0') {
                converted_text += texts.decimal_bander[tsifr[1]] + ' '
            }
            converted_text += texts.unity_bander[tsifr[2]] + ' '
        }
    }
    return converted_text
}

 console.log(number_to_text(8_999_999_999_999_999_999_999))
