import fs from "fs"

const BASE_URL = process.env.BASE_URL || "https://andyvanee.github.io"

const { icons, preferences } = JSON.parse(
    fs.readFileSync("icomoon/selection.json", { encoding: "utf-8" })
)

const { prefix } = preferences.fontPref

const linkList = icons.map(({ properties }) => {
    const { name } = properties
    const id = name.split(",").shift()
    const href = `/icomoon/PNG/${id}.png`
    const embed = `=IMAGE("${BASE_URL}${href}", 4, 12, 12)`
    return `<tr>
        <td><img src="${href}"/></td>
        <td><a href="${href}">${name}</a></td>
        <td><textarea>${embed}</textarea></td>
    </tr>`
})

const html = `<!doctype html>
<html>
<head>
    <title>Sheet Icons</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        body, html {
            font-size: 16px;
            font-family: sans-serif;
        }
        a {
            color: #604def;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        table {
            border-collapse: collapse;
        }
        td {
            border: 1px solid #ddd;
            text-align: center;
            padding: 3px;
        }
        img {
            height: 16px;
        }
        textarea {
            width: 800px;
            height: 1rem;
        }
    </style>
</head>
<body>
    <main>
        <table>
            <thead>
                <tr>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Embed Code</th>
                </tr>
            </thead>
            <tbody>
                ${linkList.join("\n")}
            </tbody>
        </ul>
    </main>
</body>
`
fs.writeFileSync("index.html", html, { encoding: "utf-8" })
