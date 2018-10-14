/*


Usage: node changelogGen.js <version>

Ex: node changelogGen.js 6.3.2


*/
class Changelog {
	constructor(v) {
		const date = new Date()
		this.formatedChange.then(data => {
			const changes = data
			const changesToAdd = this.model(v, date, changes)
			const text = this.newChangelog(changesToAdd)
			this.save(text)
		})
	}
	get getChanges() {
		return new Promise(function(resolve, reject) {
			const {
				exec
			} = require('child_process');
			exec('git --no-pager log --oneline $(git describe --tags --abbrev=0 @^)..@', (err, stdout, stderr) => {
				if (err) {
					// node couldn't execute the command
					reject(err)
				}

				// the *entire* stdout and stderr (buffered)
				const out = stdout
				resolve(out)
			});
		});
	}
	get changelog() {
		const fs = require('fs')
		const path = require('path')
		const filePath = path.join(__dirname, 'CHANGELOG.md');
		return fs.readFileSync(filePath, 'utf8');
	}
	get formatedChange() {
		return new Promise((resolve, reject) => {
			this.getChanges.then(data => {
				const changes = data.split("\n")
				let array = []
				for (let i of changes) {
					array.push(i.substring(8)) // ex: "4492912 ".length => 8
				}
				resolve(array)
			})
		});
	}
	save(text) {
		const fs = require('fs')
		const path = require('path')
		const filePath = path.join(__dirname, 'CHANGELOG.md');
		fs.writeFileSync(filePath, text)
	}
	model(v, d, changes) {
		changes.pop() // last item is generally empty

		let model = `# [${v}] - ${d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear()}`
		model += "\n\n"
		for (let i of changes) {
			model += `- ${i}\n`
		}
		return model
	}
	newChangelog(text) {
		const changelog = this.changelog
		const position = 82 // Cursor position (where to write)
		return changelog.substr(0, position) + text + changelog.substr(position);
	}
}

new Changelog(process.argv[2])
