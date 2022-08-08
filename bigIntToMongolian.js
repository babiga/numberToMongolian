const texts = {
    separatrix: ["мянга","сая","тэрбум","их наяд","маш дэлгэмэл","тунамал","ингүүмэл","хямралгүй","ялгаруулагч","өвөр дээр","хөөн удирдагч","хязгаар үзэгдэл ","шалтгааны зүйл","үзэсгэлэнт гэрэлт","эрхэт","сайтар хүргэсэн","онон одох","живэх тоосон","бэлэг тэмдэг","хүчин нөхөр","дохио мэдэхүй","тийн болсон","хүчин нүдэн","асрангуй","нигүүлсэнгүй","баясангуй","тэгш","тоомьгүй","хэмжээлшгүй","цаглашгүй","өгүүлшгүй","хирлэшгүй","үлэшгүй","үлэж дуусашгүй","сэтгэшгүй"],
    unity: ["","нэг","хоёр","гурав","дөрөв","тав","зургаа","долоо","найм","ес"],
    unity_bander: ["","нэгэн","хоёр","гурван","дөрвөн","таван","зургаан","долоон","найман","есөн"],
    decimal: ["","арав","хорь","гуч","дөч","тавь","жар","дал","ная","ер",],
    decimal_bander: ["","арван","хорин","гучин","дөчин","тавин","жаран","далан","наян","ерэн"],
    centurion: ["зуу"],
    centurion_bander: ["зуун"]
};

const bigInteger_to_text = (number) => {
    console.log(number)
    number = number.toString().replace("-","")
    let converted_text = ''
    let counter = 0
    let tsifr; 
    
    tsifr = number.split('').reverse().join('');
    tsifr = tsifr.match(/.{1,3}/g).map((m) => m.split('').reverse().join('')).reverse()
    
    converted_text = zuutaar(tsifr.pop(), true) + converted_text
    while (tsifr.length) {
        let pop = tsifr.pop()
        if (pop !== '000') {
            converted_text = zuutaar(pop) + texts.separatrix[texts.separatrix.length > counter ? counter : counter - texts.separatrix.length] + ' ' + converted_text
        }
        counter += 1
    }
    converted_text = converted_text.trim().replace(/ +/g, ' ');
    
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
 console.log(bigInteger_to_text(123_567_890_456_123_213_213_441_123_213_887_221_222_222_245_234n * 247_539_910_554_678_567_563_444_555_678_456_234_123_999_567_420_112_085_710_999_247n))
