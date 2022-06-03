import { convertFromDirectory } from 'joi-to-typescript';
import {getOpenApiWriter, getTypeScriptReader, makeConverter} from "typeconv";
const { convert } = require("joi-openapi");
import * as fs from "fs";
import * as Path from "path";
const YAML = require('json-to-pretty-yaml');

async function types(): Promise<void> {
    console.log('Running joi-to-typescript...');

    // Configure your settings here
    const result = await convertFromDirectory({
        schemaDirectory: './src/entities/schemas/definitions',
        typeOutputDirectory: './src/entities/schemas/types',
        debug: true
    });

    if (result) {
        console.log('Completed joi-to-typescript');
    } else {
        console.log('Failed to run joi-to-typescrip');
    }

    let files: string[]  = [];
    const iterateFolder = (directory: string) => {
        fs.readdirSync(directory).forEach(File => {
            const Absolute = Path.join(directory, File);
            if (fs.statSync(Absolute).isDirectory()) return iterateFolder(Absolute);
            else return files.push(Absolute);
        });
    }
    // generate docs api from joi schemas
    try {
        console.log("Generating OAPI from JOI Schemas");
        files = [];
        iterateFolder("./src/entities/schemas/definitions")
        fs.rmdirSync("generated-oapi/schemas", { recursive: true });
        for(const file of files){
            const fileContent = require(__dirname+"/../"+file)
            for(const key of Object.keys(fileContent)){
                const result = convert(fileContent[key], './test.json');
                const newPath = "generated-oapi/schemas/"+ file.replace("src\\entities\\schemas\\", "").replace(".ts", "");
                const filePath = newPath + "." + key + ".yaml";
                fs.mkdirSync(Path.dirname(filePath), { recursive: true });
                fs.writeFileSync(
                    filePath,
                    YAML.stringify({title: key, ...result})
                );
            }
        }
    }catch (e) {
        console.error(e);
    }
    // generate docs api from typescript interfaces
    try {
        console.log("Generating OAPI from Entities");
        files = [];
        iterateFolder("./src/entities/models")
        const reader = getTypeScriptReader();
        const writer = getOpenApiWriter( { format: 'json', title: 'My API', version: 'v1' } );
        const { convert } = makeConverter( reader, writer, {
            simplify: false,
            shortcut: false
        } );
        fs.rmdirSync("generated-oapi/models", { recursive: true });
        for(const file of files){
            const dirPath = file.split("\\")
            dirPath.pop()
            const paramsInput = { filename: file,cwd: __dirname +"/../" + dirPath.join("\\")  };
            const data = JSON.parse((await convert( paramsInput )).data);
            const iterate = (obj: any, stack: string) => {
                for (const property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        const value = obj[property];
                        if (typeof value == "object") {
                            iterate(value, stack + '.' + property);
                        } else {
                            if(typeof value === "string"){
                                if(value.includes("/Date")){
                                    delete obj["$ref"];
                                    obj.type = "string";
                                    obj.format = "date-time";
                                }
                                if(value.includes(".")){
                                    delete obj.title;
                                }
                            }
                        }
                    }
                }
            }
            iterate(data, "");
            //
            const filePath = "generated-oapi/models/"+ file.replace(".ts", ".yaml").replace("src\\entities\\models\\", "");
            fs.mkdirSync(Path.dirname(filePath), { recursive: true });
            fs.writeFileSync(
                filePath,
                YAML.stringify(data)
            );
        }
    }catch (e) {
        console.error(e);
    }
}

types();
