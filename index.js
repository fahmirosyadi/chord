function stripHtml(html)
{
   let tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

let songData = [];

let songList = songs.split("<p>[End]</p>")
songList.forEach(s => {
	let part = s.split("</p>");
	let song = {};
	song.title = part[0].replace("<p>","").replace("<strong>","")
		.replace("</strong>","").trim();
	if(part[1] != null){
		song.key = part[1].replace("<p>","").replace("<strong>","")
		.replace("</strong>","").trim();
	}

	song.parts = [];
	part = s.split("[");
	delete(part[0]);
	part.forEach(p => {
		let prt = p.split("]");
		song.parts.push({title: prt[0], chord: prt[1]})
	})
	songData.push(song)
})

console.log(songData)

function getChord(song, partTitle){
	let res = null;
	song.parts.forEach(p => {
		if(p.title == partTitle){
			res = p.chord;
		}
	})
	return res;
}

function getSong(title){
	var res = null;
	songData.forEach(s => {
		if(s.title == title){
			res = s;
		}
	})
	res.parts.forEach(p => {
		if(p.title.includes("To ")){
			let to = p.title.split(" ")[1];
			p.chord = p.chord + getChord(res, to);
		}
	})
	
	return res;
}

let ind = 0;
let song = null;

function next(title){
	if(ind < song.parts.length - 1){
		show(song, ++ind);				
	}
}

function prev(title){
	if(ind > 0){
		show(song, --ind);
	}
}

function show(song, i){
	content.innerHTML = `[${song.parts[i].title.replace("To ", "")}] ${song.parts[i].chord}`;
	if(i < song.parts.length - 1){
		 content.innerHTML += "<hr>" + `[${song.parts[i + 1].title.replace("To ", "")}] ${song.parts[i + 1].chord}`
	}
}

function detail(title){
	song = getSong(title);
	document.getElementById("title").innerHTML = song.title;
	document.getElementById("key").innerHTML = song.key;
	show(song, 0);

	document.addEventListener('keydown', function(event) {
	  if (event.key === 'ArrowRight') {
	    next(song.title);
	  } else if (event.key === 'ArrowLeft') {
	    prev(song.title);
	  }
	});

	let order = document.getElementById("order");
	order.innerHTML = `
		<button class="btn btn-lg btn-danger" onClick="prev('${song.title}')">Prev</button>
		<button class="btn btn-lg btn-primary" style="margin-left: 20px" onClick="next('${song.title}')">Next</button>
	`
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
		<option>${row.title}</option>	
	`
})

$('#song-options').select2({
	placeholder: "-Select Song-"	
});

$('#song-options').on('select2:select', function (e) {
    var data = e.params.data;
    detail(data.id);
});