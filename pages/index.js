import { useState } from "react";

export default function IndexPage() {
    const [link, setLink] = useState("");
    const [text, setText] = useState("");
    const [btn, setBtn] = useState("Copy to Clipboard");

    async function submit(e) {
        e.preventDefault();

        if (!link) {
            alert("Bad Request");
            return;
        }

        const m = link.match(/imgur\.com\/a\/(.*)/);

        if (!m || !m[1]) {
            alert(
                "Not a valid Imgur Album Link, Album links are of this format \n https://imgur.com/a/XXXXXX"
            );
            return;
        }

        const URL = `https://api.imgur.com/3/album/${m[1]}/images`;

        const resp = await fetch(URL, {
            method: "GET",
            headers: {
                Authorization: `Client-ID c7b3c5478bd225c`,
            },
        });

        const json = await resp.json();
        console.log(json);

        const links = json.data.map((img) => img.link).join(" ");
        console.log(links);

        setText(links);
        setLink("");
    }

    return (
        <div className="max-w-2xl px-2 mx-auto">
            <h1 className="py-8 text-3xl">Imgur Links Converter</h1>
            <div className="w-full">
                <form
                    onSubmit={submit}
                    className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
                >
                    <div className="mb-4">
                        <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="username"
                        >
                            Imgur Album Link
                        </label>
                        <input
                            onChange={(e) => setLink(e.target.value)}
                            value={link}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="https://imgur.com/a/XXXXXX"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Get Links
                        </button>
                    </div>

                    {text && (
                        <>
                            <div className="mt-4">✅ Success!</div>
                            <div className="mt-4 text-gray-600">
                                Copy the text below and use it in your data
                            </div>

                            <textarea
                                readOnly
                                value={text}
                                className="w-full p-2 mt-4 bg-gray-200"
                            ></textarea>

                            <button
                                type="button"
                                className="px-4 py-2 mt-2 border border-gray-400"
                                onClick={() => {
                                    navigator.clipboard.writeText(text);
                                    setBtn("Copied!");
                                }}
                            >
                                {btn}
                            </button>
                        </>
                    )}
                </form>
                <p className="text-xs text-center text-gray-500">
                    ©2020 MIT Liscence -{" "}
                    <a
                        href="https://github.com/saidattax/imgur-album-link-parser"
                        target="_blank"
                    >
                        Github
                    </a>
                </p>
            </div>
        </div>
    );
}
