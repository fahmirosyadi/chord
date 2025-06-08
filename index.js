function stripHtml(html)
{
   let tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return (tmp.textContent || tmp.innerText || "").trim();
}

let songData = [];

let songList = songs.split("[End]")
console.log(songList)
songList.forEach(s => {
	let part = s.split("</p>");
	let song = {};
	let i = 0;
	while(stripHtml(part[i]) == ''){	
		i++
	}
	song.title = stripHtml(part[i]);
	if(part[i + 1] != null){
		song.key = stripHtml(part[i + 1]);
	}
	if(part[i + 2] != null){
		song.range = stripHtml(part[i + 2]);
	}
	
	song.parts = [];
	part = s.split("[");
	delete(part[0]);
	let mod = "";
	part.forEach(p => {
		let chord = "";
		let prt = p.split("]");
		let lines = prt[1].replace(/<\/p>/g, "<br>").trim();
		lines = lines.replace(/<p>/g, "<br>");
		lines = lines.replace(/<br \/>/g, "<br>");
		lines = lines.split("<br>");
		lines.forEach(line => {
			let p = line.replace(/<br>/g, "").trim();
			if(!p.includes("null") && p != "" && p != " " && p != "&nbsp;"){
				chord += `<p>${p}</p>`;
			}
		})
		let title = stripHtml(prt[0]);
		if(title == "Mod"){
			mod = `${title} ${stripHtml(chord)}`;
		}else{
			song.parts.push({title: title, mod: mod, chord: chord});
			mod = "";
		}
				
	})
	if(song.title && song.title != "" && song.title != 'undefined'){
		songData.push(song);
	}
})

console.log(songData)

function getChord(song, partTitle){
	let res = "";
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
	console.log(res);
	res.parts.forEach(p => {
		if(p.title.includes("To ")){
			let to = p.title.replace("To ","");
			p.chord = p.chord + getChord(res, to);
			p.chord = p.chord.replace(/<strong>/g, "");
			p.chord = p.chord.replace(/<strong\/>/g, "");
		}
	})
	
	return res;
}

let ind = 0;
let song = null;

function setModStyle(){
	const paragraphs = document.getElementsByTagName('strong');
	console.log('tes')
	for (let i = 0; i < paragraphs.length; i++) {
	  console.log(paragraphs[i])
	  if (paragraphs[i].textContent.includes('Mod')) {
	  	paragraphs[i].classList.add('text-danger');
	  }
	}
}

function next(title){
	if(ind < song.parts.length - 1){
		show(song, ++ind);				
	}
}

function prev(title){
	if(ind > -1){
		show(song, --ind);
	}
}

function showPart(i){
	let title = song.parts[i].title.replace("To ", "");
	let mod = song.parts[i].mod;
	let chord = song.parts[i].chord;
	console.log(title, chord)
	if(mod != ""){
		content.innerHTML += `<p><strong class="text-danger">[${title} | ${mod}]</strong></p> ${chord}`;	
	}else{
		content.innerHTML += `<p>[${title}]</p> ${chord}`;
	}
}

function show(song){
	content.innerHTML = ``;
	if(ind < 0){
		content.innerHTML += `
		<p>[Key]</p> 
		<div style="margin-bottom: 10px">${song.key.replace("M:", "Male:").replace("F:", "Female:").replace("Ori:", "Original:").replace(/ \| /g, "<br>")}</div>
		<p>Pitch Range : ${song.range}</p>
		`;
	}else{
		showPart(ind);
	}
	if(ind < song.parts.length - 1){
		content.innerHTML += "<hr>"; 
		showPart(ind + 1);
	}
	if(song.parts[ind] && (song.parts[ind].title == "Mod" || song.parts[ind + 1].title == "Mod")){
		content.innerHTML += "<hr>";
		showPart(ind + 2);
	}
	window.scrollTo({ top: 0, behavior: 'instant' });
	setModStyle();
}

function detail(title){
	ind = -1;
	song = getSong(title);
	document.getElementById("title").innerHTML = song.title;
	show(song);

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
      	return `<span style="${row.parts[0] && row.parts[0].chord == '' ? 'color: #DC3545 !important' : ''}" onClick="detail('${row.title}')">${row.title}</span>`;
      }
    },
    {
      title: "Key",
      className: "only-pc",  // Add a custom class
      render: function(data, type, row) {
      	return `<span style="${row.parts[0] && row.parts[0].chord == '' ? 'color: #DC3545 !important' : ''}" onClick="detail('${row.title}')">${row.key}</span>`;
      }
    },
    {
      title: "Range",
      className: "only-pc",  // Add a custom class
      render: function(data, type, row) {
      	return `<span style="${row.parts[0] && row.parts[0].chord == '' ? 'color: #DC3545 !important' : ''}" onClick="detail('${row.title}')">${row.range}</span>`;
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

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    next(song.title);
  } else if (event.key === 'ArrowLeft') {
    prev(song.title);
  } else if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'f') {
  	$('#song-options').select2('open').focus(); // Replace #yourSelect2Id with your actual Select2 element's ID
  }
});