const {random : rd, floor: fr} = Math

const serverInit = (port) => (() => { console.log('Server Running http://127.0.0.1:'+port) })

const random = (startNumber, count) => fr( rd() * count ) + startNumber;

const zp = n => n < 10 ? '0'+n : n;

const numberFormat = v => v.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
// 숫자 3자리마타 쉼표

const getPlayTime = s => {
	if(s >= 3600)
	return zp(parseInt(s/3600)) + ':' + zp(parseInt((s%3600)/60)) + ':' + zp(s%60);
	else
	return zp(parseInt((s%3600)/60)) + ':' + zp(s%60);
}
// 동영상의 초를 시, 분, 초로 나눠 보여줌

const genFile = () => {
  var folder = moment().format('YYYYMMDDHH')
  return {
    folder: folder,
    file: folder + '_' + uuidv4()
  }
}
// 현 시점의 시간으로 폴더명과 파일명을 생성 - uuid 참조 필요


module.exports = { random, zp, getPlayTime, serverInit, numberFormat, genFile }