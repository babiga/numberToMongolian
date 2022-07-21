const texts = {
    separatrix: ["мянга","сая","тэр бум","наяд","маш дэлгэмэл","тунамал","ингүүмэл","хямралгүй","ялгаруулагч","өвөр дээр","хөөн удирдагч","хязгаар үзэгдэл ","шалтгааны зүйл","үзэсгэлэнт гэрэлт","эрхэт","сайтар хүргэсэн","онон одох","живэх тоосон","бэлэг тэмдэг","хүчин нөхөр","дохио мэдэхүй","тийн болсон","хүчин нүдэн","асрангуй","нигүүлсэнгүй","баясангуй","тэгш","тоомьгүй","хэмжээлшгүй","цаглашгүй","өгүүлшгүй","хирлэшгүй","үлэшгүй","үлэж дуусашгүй","сэтгэшгүй"],
    unity: ["","нэг","хоёр","гурав","дөрөв","тав","зургаа","долоо","найм","ес"],
    unity_bander: ["","нэг","хоёр","гурван","дөрвөн","таван","зургаан","долоон","найман","есөн"],
    decimal: ["","арав","хорь","гуч","дөч","тавь","жар","дал","ная","ер",],
    decimal_bander: ["","арван","хорин","гучин","дөчин","тавин","жаран","далан","наян","ерэн"],
    centurion: ["зуу"],
    centurion_bander: ["зуун"]
};

const number_to_text = (number) => {
    number = Math.round(number);
    if(number === 0) {
        return "тэг"
    }
    let converted_text = ''
    let counter = 0
    let tsifr; 
    if(number >= 0) {
        tsifr = number.toString().split('').reverse().join('');
        tsifr = tsifr.match(/.{1,3}/g).map((m) => m.split('').reverse().join('')).reverse()
    } else {
        tsifr = number.toString().split(`-`).reverse().join('');
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

// example 
// console.log(number_to_text(-45.7))