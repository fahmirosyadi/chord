let songData = [
  ["Perfect - Ed Sheeran", "perfect"],
  ["Kiss Me - Sixpence", "kiss-me-sixpence"],
  ["Heaven - Bryan Adams", "heaven-bryan-adams"],
  ["Just The Way You Are - Bruno Mars", "just-the-way-you-are-bruno-mars"],
  ["Chantall - Leaving on a Jet Plane", "leaving-on-a-jet-plane-chantall"],
  ["You Are Still the One - Shania", "you-are-still-the-one-shania"],
  ["Marry You - Bruno Mars", "marry-you-bruno-mars"],
  ["Marry Your Daughter - Brian McKnight", "marry-your-daughter-brian-mcknight"],
  ["Can't Help Falling in Love - Elvis Presley", "cant-help-falling-in-love-elvis-presley"],
  ["It's You - Sezairi (Easy)", "its-you-sezairi-easy"],
  ["Nothing’s Gonna Change My Love for You - George Benson", "nothings-gonna-change-my-love-for-you-george-benson"],
  ["Can’t Take My Eyes Off You - Frankie Valli", "cant-take-my-eyes-off-you-frankie-valli"],
  ["All of Me - John Legend", "all-of-me-john-legend"],
  ["A Thousand Years - Christina Perri", "a-thousand-years-christina-perri"],
  ["Beautiful in White - Shane Filan", "beautiful-in-white-shane-filan"],
  ["Sugar - Maroon 5", "sugar-maroon-5"],
  ["Jaz - Dari Matamu", "jaz-dari-matamu"],
  ["Teman Hidup - Tulus", "teman-hidup-tulus"],
  ["Cinta - Chrisye", "cinta-chrisye"],
  ["Panah Asmara - Afgan", "panah-asmara-afgan"],
  ["Sempurna - Andra", "sempurna-andra"],
  ["Kasih Putih - Glenn", "kasihPutih"],
  ["Anugerah Terindah - Andmesh", "anugerahTerindah"],
  ["Lebih Indah - Adera", "lebih-indah-aedera"],
  ["Pandangan Pertama - RAN", "pandangan-pertama-ran"]
];

songData = [];


let songList = songs.split("<p><strong><u>")
songList.forEach(s => {
	let part = s.split("</u></strong></p>");
	let song = {};
	song.title = part[0];
	let body = part[1];
	if(body != undefined){
		let paragraph = body.split("</p>");
		song.key = paragraph[0] + "</p>";
		delete(paragraph[0]);
		song.chord = "";
		paragraph.forEach(p => {
			if(p != "undefined"){
				song.chord += (p + "</p>")
			}
		})
		songData.push(song);
	}
})
console.log(songData);

function getSong(title){
	var res = null;
	songData.forEach(s => {
		if(s.title == title){
			res = s;
		}
	})
	return res;
}

function detail(title){
	let content = document.getElementById("content");
	content.innerHTML = getSong(title).chord;
}

new DataTable('#songlist', {
  data: songData,
  columns: [
    {
      title: "Song",
      render: function(data, type, row) {
        return `<span onClick="detail('${row.title}')">${row.title}</span>`;
      }
    }
  ]
});

let songOption = document.getElementById("song-options");
songOption.innerHTML += `<option value="" disabled selected>-Select Song-</option>`
songData.forEach((row) => {
	songOption.innerHTML += `
		<option value="?page=${row[1]}">${row.title}</option>	
	`
})

$('#song-options').select2({
	placeholder: "-Select Song-"	
});

$('#song-options').on('select2:select', function (e) {
    var data = e.params.data;
    window.location.href = data.id
});