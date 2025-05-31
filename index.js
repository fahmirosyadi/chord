const songData = [
  ["Perfect - Ed Sheeran"],
	["Kiss Me - Sixpence"],
	["Heaven - Bryan Adams"],
	["Just The Way You Are - Bruno Mars"],
	["Chantall - Leaving on a Jet Plane"],
	["You Are Still the One - Shania"],
	["Marry You - Bruno Mars"],
	["Marry Your Daughter - Brian McKnight"],
	["Can't Help Falling in Love - Elvis Presley"],
	["It's You - Sezairi (Easy)"],
	["Nothing’s Gonna Change My Love for You - George Benson"],
	["Can’t Take My Eyes Off You - Frankie Valli"],
	["All of Me - John Legend"],
	["A Thousand Years - Christina Perri"],
	["Beautiful in White - Shane Filan"],
	["Sugar - Maroon 5"],
	["Jaz - Dari Matamu"],
	["Teman Hidup - Tulus"],
	["Cinta - Chrisye"],
	["Panah Asmara - Afgan"],
	["Sempurna - Andra"],
	["Kasih Putih - Glenn"],
	["Anugerah Terindah - Andmesh"],
	["Lebih Indah - Adera"],
	["Pandangan Pertama - RAN"]
];

new DataTable('#songlist', {
  data: songData,
  columns: [
    { title: "Song" }
  ]
});