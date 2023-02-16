import { writeFile, readFile } from "fs/promises";

function findImageNamesAndURLS() {
	function parseExtensionFromURL(url) {
		const pathname = new URL(url).pathname;
		return pathname.slice(pathname.lastIndexOf("."));
	}

	const PREDICAMENT = (a) => a.classList.contains("max-h-[150px]");
	const getHumanName = (a) => a.parentElement.nextSibling.firstChild.innerText;
	const getFileName = (n) => n.toLowerCase().replaceAll(" ", "_");

	const images = [...document.querySelectorAll("img").values()];
	const namesAndURLS = images
		.filter(PREDICAMENT)
		.map((i) => [
			getFileName(getHumanName(i)) + parseExtensionFromURL(i.src),
			i.src,
		]);
	return JSON.stringify(names);
}

// Use the above function in the JavaScript console and paste the output here:
const urls = null;

async function downloadFiles() {
	const prefix = "images/";

	const promises = urls.map(([name, url]) =>
		fetch(url)
			.then((res) => res.arrayBuffer())
			.then((ab) => writeFile(prefix + name, Buffer.from(ab)))
	);
	await Promise.all(promises);
}

await downloadFiles();
