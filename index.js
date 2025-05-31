const songData = [
  ["Perfect - Ed Sheeran", "perfect-ed-sheeran"],
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

new DataTable('#songlist', {
  data: songData,
  columns: [
    {
      title: "Song",
      render: function(data, type, row) {
        return `<a href="?page=${row[1]}">${row[0]}</a>`;
      }
    }
  ]
});