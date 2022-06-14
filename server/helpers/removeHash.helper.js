module.exports = function removeHash(fileName, extname, symb = "_") {
	const arr = fileName.split(symb);
	const hash = arr[arr.length - 1];
	const changeFileName = fileName.replace(`_${hash}`, extname);

	return changeFileName;
};