/*

implement function returning Readable Stream
of objects from supplied generator

Sample: usage
function* generator(limit) {
	for (let i = 1; i <= limit; i++) yield i;
}
let sequence = generator(10000);

fromGenerator(sequence).on("data", function(data){
	console.log()
});

fromGenerator(sequence).pipe(stringify).pipe(process.stdout);
*/
module.exports = function(generator) {


}